window.addEventListener('load', function () {
    const inputTextPrompt = document.getElementById('inputTextPrompt');
    const buttonGenerateXSL = document.getElementById('generateXSL');
    const modal = document.getElementById('jsonModal');
    const btnYes = document.getElementById('jsonModalYes');
    const btnNo = document.getElementById('jsonModalNo');
    let asked = false;

    function openModal() {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }

    // Re-arma el aviso cada vez que el usuario entra a editar el prompt
    inputTextPrompt.addEventListener('focus', function () {
        asked = false;
    });

    inputTextPrompt.addEventListener('input', function () {
        if (asked) return;
        if (window.jsonEditor && window.jsonEditor.getValue().trim() !== '') {
            asked = true;
            openModal();
        }
    });

    [btnYes, btnNo].forEach(function (btn) {
        btn.addEventListener('mousedown', function (e) { e.preventDefault(); });
    });

    btnYes.addEventListener('click', closeModal);

    // No, borrar -> vacía el editor
    btnNo.addEventListener('click', function () {
        if (window.jsonEditor) window.jsonEditor.setValue('');
        closeModal();
    });

    const isDev = ['localhost', '127.0.0.1'].includes(location.hostname);
    const API_BASE = isDev ? 'http://localhost:5279':'https://goodev.com.mx';
    const btnPrompt = document.getElementById('inputPrompt');
    const btnGenerate = document.getElementById('generateIa');

    const ICON_ARROW = '<svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/></svg>';
    const ICON_SPINNER = '<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" stroke-opacity="0.25"/><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/></path></svg>';
    const ICON_CHECK = '<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 13 4 4L19 7"/></svg>';

    // Versiones pequeñas para el botón con leyenda (generateIa)
    const SPINNER_SM = '<svg style="width:16px;height:16px;display:inline-block;vertical-align:middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" stroke-opacity="0.25"/><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/></path></svg>';
    const CHECK_SM = '<svg style="width:16px;height:16px;display:inline-block;vertical-align:middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 13 4 4L19 7"/></svg>';
    const GEN_LABEL = btnGenerate ? btnGenerate.innerHTML : '';

    function setBtnIcon(html) {
        btnPrompt.innerHTML = html;
    }

    // Bloquea/desbloquea el textarea y el editor Monaco mientras carga
    function setInputsBlocked(blocked) {
        inputTextPrompt.disabled = blocked;
        inputTextPrompt.style.opacity = blocked ? '0.5' : '';
        if (window.jsonEditor) window.jsonEditor.updateOptions({ readOnly: blocked });
    }

    function getMachineId() {
        let id = localStorage.getItem('machineId');
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem('machineId', id);
        }
        return id;
    }

    // Sobrescribe el editor con el JSON devuelto, ya formateado
    function overwriteEditor(jsonString) {
        if (!window.jsonEditor || !jsonString) return;
        let formatted = jsonString;
        try {
            formatted = JSON.stringify(JSON.parse(jsonString), null, 2);
        } catch (_) {
            // si no es JSON parseable, se deja tal cual
        }
        window.jsonEditor.setValue(formatted);
    }

    function setLoading(isLoading) {
        [btnPrompt, btnGenerate].forEach(function (b) {
            if (b) b.disabled = isLoading;
        });
    }

    function t(es, en) { return window.currentLang === 'en' ? en : es; }

    async function callApi(path, body) {
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-Machine-Id': getMachineId()
            }
        };
        if (body !== undefined) options.body = JSON.stringify(body);

        const res = await fetch(API_BASE + path, options);
        const data = await res.json().catch(function () { return {}; });

        if (!res.ok) {
            if (res.status === 429) {
                const retrySecs = parseInt(res.headers.get('Retry-After') || '0', 10);
                const mins = Math.ceil(retrySecs / 60);
                const base = data.message || t('Alcanzaste el límite de solicitudes.', 'You have reached the request limit.');
                throw new Error(mins > 0 ? base + t(' Intenta de nuevo en ~', ' Try again in ~') + mins + ' min.' : base);
            }
            throw new Error(data.reason || data.message || ('Error ' + res.status));
        }
        return data;
    }

    // Enviar el prompt del usuario -> /prompt
    btnPrompt.addEventListener('click', async function () {
        const promptText = inputTextPrompt.value.trim();

        let jsonData = null;
        const raw = window.jsonEditor ? window.jsonEditor.getValue().trim() : '';
        if (raw !== '') {
            try {
                jsonData = JSON.parse(raw);
            } catch (_) {
                alert(t('El contenido del editor JSON no es válido.', 'The JSON editor content is not valid.'));
                return;
            }
        }

        if (promptText === '' && jsonData === null) {
            alert(t('Escribe un prompt o agrega datos en el editor JSON.', 'Write a prompt or add data in the JSON editor.'));
            return;
        }

        setLoading(true);
        setInputsBlocked(true);
        setBtnIcon(ICON_SPINNER);
        try {
            const data = await callApi('/prompt', { promptText: promptText, jsonData: jsonData });
            overwriteEditor(data.dataExport);
            setBtnIcon(ICON_CHECK);
            setTimeout(function () { setBtnIcon(ICON_ARROW); }, 1500);
        } catch (err) {
            alert(err.message);
            setBtnIcon(ICON_ARROW);
        } finally {
            setLoading(false);
            setInputsBlocked(false);
        }
    });

    // Generar ejemplo automático con IA -> /promptAutomatic
    if (btnGenerate) {
        btnGenerate.addEventListener('click', async function () {
            // borra ambos inputs antes de generar
            inputTextPrompt.value = '';
            if (window.jsonEditor) window.jsonEditor.setValue('');

            setLoading(true);
            setInputsBlocked(true);
            btnGenerate.innerHTML = SPINNER_SM;
            try {
                const data = await callApi('/promptAutomatic');
                overwriteEditor(data.data);
                btnGenerate.innerHTML = CHECK_SM;
                setTimeout(function () { btnGenerate.innerHTML = GEN_LABEL; }, 1500);
            } catch (err) {
                alert(err.message);
                btnGenerate.innerHTML = GEN_LABEL;
            } finally {
                setLoading(false);
                setInputsBlocked(false);
            }
        });
    }
    if(buttonGenerateXSL){
        buttonGenerateXSL.addEventListener('click', async function () {
            if (window.jsonEditor && window.jsonEditor.getValue().trim() !== '') {
                let dataExcel = JSON.parse(window.jsonEditor.getValue().trim());
                if(!dataExcel || typeof dataExcel !== 'object') {
                    throw new Error('dataExcel debe ser un objeto válido');
                }else{
                    try{
                        const response = await fetch(API_BASE+'/export.php',{
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(dataExcel)
                        });
                        if (!response.ok) {
                            const errorText = await response.text();
                            console.error('Error servidor:', response.status, errorText);
                            return;
                        }

                        let fileName = 'reporte.xlsx';
                        const disposition = response.headers.get('Content-Disposition');

                        if (disposition) {
                            const match = disposition.match(/filename="?([^"]+)"?/i);
                            if (match && match[1]) fileName = match[1];
                        }

                        const blob = await response.blob();
                        const blobUrl = URL.createObjectURL(blob);

                        const a = document.createElement('a');
                        a.href = blobUrl;
                        a.download = fileName;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();

                        URL.revokeObjectURL(blobUrl);

                    }catch (error){
                        console.error('Error:', error);
                    }
                }
            }
        });
    }
});