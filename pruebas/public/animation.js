function debounce(fn, wait = 50) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
}

window.addEventListener('load', function () {
    const updateTrianguloSize = (elemt) => {
        if (!elemt) return;
        const totalWidth = elemt.offsetWidth;
        const totalHeight = elemt.offsetHeight;
        elemt.style.setProperty('--triangulo-w', `${Math.max((totalWidth / 2), 0)}px`);
        elemt.style.setProperty('--triangulo-h', `${Math.max((totalHeight / 2), 0)}px`);
    };

    const observerTrian = new ResizeObserver(debounce(entries => {
        for (let entry of entries) {
            updateTrianguloSize(entry.target);
        }
    }, 50));

    const ObservableAnimacion = (elemento) => {
        let idFrame;
        const inicio = performance.now();
        const duracion = 3000;
        let yaEjecutado = false;
        const presentacionDiv = document.getElementById('presentacion');
        const animacionCambios = document.getElementById('animacionCambios');

        function verificarProgreso() {
            const tiempoActual = performance.now();
            const tiempoTranscurrido = tiempoActual - inicio;
            const porcentaje = Math.min((tiempoTranscurrido / duracion) * 100, 100);

            if (porcentaje >= 20 && !yaEjecutado && presentacionDiv) {
                presentacionDiv.classList.add('hidden');
                if (animacionCambios) animacionCambios.classList.add('hidden');
                yaEjecutado = true;

                // Para ahorrar recursos: si la animación ya se ocultó, no necesitamos
                // seguir ejecutando `requestAnimationFrame` continuamente.
                // Cancelamos el rAF y usamos un `setTimeout` para completar el tiempo
                // restante y disparar el evento final cuando corresponda.
                if (idFrame) {
                    cancelAnimationFrame(idFrame);
                    idFrame = null;
                }

                setTimeout(() => {
                    if (elemento.id == 'animacion-change-top')
                        window.dispatchEvent(new CustomEvent('animacionTerminada'));
                }, 200);
                // No seguimos programando rAF aquí para ahorrar CPU.
                return;
            }

            if (porcentaje < 100) {
                idFrame = requestAnimationFrame(verificarProgreso);
            }
        }

        idFrame = requestAnimationFrame(verificarProgreso);
        return idFrame;
    }

    let text = `if(action|==|"I|imagine|it"){ \n iProgramIt(); \n}`;
    let textAux = '';
    let colorMetria = {
        'if': 'text-red-500',
        'action': '',
        '|==|': 'text-red-500',
        ';': '',
        '(': 'text-cyan-500',
        ')': 'text-cyan-500',
        '"I|imagine|it"': 'text-amber-400',
        '{': 'text-fuchsia-400',
        '}': 'text-fuchsia-400',
        'iProgramIt()': 'text-lime-400',
    };

    let delay = 0; // Comienza en 0
    let breakLine = false;
    const target = document.getElementById('textIntroducction');
    const targetFinal = document.getElementById('final');
    const animacion_change_top = document.getElementById('animacion-change-top');
    const animacion_change_bottom = document.getElementById('animacion-change-bottom');

    const miTriaBottomPadre = document.getElementById('triaBottomPadre');
    const miTriaTopPadre = document.getElementById('triaTopPadre');
    observerTrian.observe(miTriaBottomPadre);
    observerTrian.observe(miTriaTopPadre);

    for (let letra of text) {
        let letraSec = letra;
        delay += 150; // Incrementa ANTES de cada setTimeout
        setTimeout(() => {
            if (letra === '\n') {
                if (!breakLine) {
                    target.innerHTML += '<br>&nbsp;&nbsp;&nbsp;&nbsp;';
                    breakLine = true;
                } else {
                    target.innerHTML += '<br>';
                } // Agrega salto de línea HTML

            } else {
                letra = (letra == '|') ? ' ' : letra;
                target.innerHTML += letra;
            }

            textAux += [' ', '\s', '\n', '\t'].includes(letraSec) ? '' : letraSec;

            if (textAux in colorMetria) {
                target.innerHTML = '';
                if (textAux == 'iProgramIt()') {
                    targetFinal.innerHTML += `<span class="${colorMetria[textAux]}"><br>&nbsp;&nbsp;&nbsp;&nbsp;${textAux}</span>`;
                } else if (textAux == ';') {
                    targetFinal.innerHTML += `<span class="${colorMetria[textAux]}">${textAux}</span><br>`;
                } else if (textAux.includes('|')) {
                    targetFinal.innerHTML += `<span class="${colorMetria[textAux]}">${textAux.replaceAll('|', ' ')}</span>`;
                } else {
                    targetFinal.innerHTML += `<span class="${colorMetria[textAux]}">${textAux}</span>`;
                }

                textAux = '';
            }
        }, delay);
    }

    setTimeout(() => {
        if (animacion_change_top) {
            //animacion_change_top.classList.add('animate-desplazar-left');
            //ObservableAnimacion(animacion_change_top);
        }
        if (animacion_change_bottom) {
            //animacion_change_bottom.classList.add('animate-desplazar-rigth');
            //ObservableAnimacion(animacion_change_bottom);
        }
    }, delay + 500);
});