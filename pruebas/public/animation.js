window.addEventListener('load', function() {
    let text = `if(action=="I|imagine|it"){ \n iProgramIt(); \n}`;
    let textAux=''; 
    let colorMetria= {
        'if':'text-red-500',
        'action':'',
        '==':'text-red-500',
        ';':'',
        '(':'text-cyan-500',
        ')':'text-cyan-500',
        '"I|imagine|it"':'text-amber-400',
        '{':'text-fuchsia-400',
        '}':'text-fuchsia-400',
        'iProgramIt()':'text-lime-400',
    };
        
    let delay = 0; // Comienza en 0
    let breakLine = false;
    const target = document.getElementById('textIntroducction');
    const targetFinal = document.getElementById('final');

    for (let letra of text) {
        delay += 200; // Incrementa ANTES de cada setTimeout
        setTimeout(() => {
            textAux+=[' ','\s', '\n', '\t'].includes(letra)? '':letra;
            
            if (letra === '\n') {
                if(!breakLine){
                    target.innerHTML +='<br>&nbsp;&nbsp;&nbsp;&nbsp;'; 
                    breakLine = true;
                 }else{
                     target.innerHTML +='<br>';
                 } // Agrega salto de línea HTML
            } else {
                target.innerHTML += letra;
            }

            if  (textAux in colorMetria){
                console.log(`Coincidencia de color para: "${textAux}"`);
                target.innerHTML ='';
                targetFinal.innerHTML += `<span class="${colorMetria[textAux]}">${textAux}</span>`;
                textAux='';
            }
        }, delay);
    }
});