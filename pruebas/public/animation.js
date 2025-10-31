window.addEventListener('load', function () {

    const observerTrian = new ResizeObserver(entries => {
        for (let entry of entries) {
           const { width, height } = entry.contentRect;
           const div = entry.target;
            div.style.setProperty('--triangulo-w', `${(width/2)}px`);
            div.style.setProperty('--triangulo-h', `${(height/2)}px`);
        }
    });

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
    observerTrian.observe(miTriaBottomPadre);

    for (let letra of text) {
        let letraSec = letra;
        //delay += 200; // Incrementa ANTES de cada setTimeout
        delay += 50;
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
           // animacion_change_top.classList.add('animate-desplazar-left');
        }
        if (animacion_change_bottom) {
            //animacion_change_bottom.classList.add('animate-desplazar-rigth');
        }
    }, delay + 500);
});