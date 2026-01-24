window.addEventListener('load', () => {
    let index = 0;
    let angle = 0;
    let delay = 2500;
    let timer;
    let spinInterval;
    let isSpinning = false;
    let hoverActive = false;

    const images = {
        './images/net.avif': {
            'titulo':'Perfil Profesional',
            'text':`<span>
                    Como profesional apasionado por la innovación tecnológica y la optimización de procesos,
                    mi objetivo es diseñar e implementar soluciones como desarrollador Full-Stack centradas en el usuario
                    que impulsen la calidad,
                    el rendimiento y la relevancia de los sistemas digitales.
                  </span>
                  <br>
                  <br>
                  Logro esto mediante el desarrollo de sistemas web utilizando entornos como .NET, Angular y otras
                  tecnologías,
                  así como la gestión y el despliegue de soluciones sobre entornos Linux, integrando backend,
                  frontend e infraestructura de manera coherente y escalable.
                  <br>
                  <br>
                  Mi enfoque se centra en transformar desafíos técnicos en oportunidades de crecimiento, escalabilidad y
                  desarrollo sostenible,
                  optimizando el código para facilitar su mantenimiento, mejorar el rendimiento de los proyectos y
                  permitir la integración fluida de nuevas funcionalidades y tecnologías, promoviendo 
                  un flujo de trabajo sólido entre los colaboradores.`},
        './images/Angular.avif': ``,
        './images/bash.avif': ``
    };

    const hex = document.getElementById('hexTech');
    const img = document.getElementById('hexImg');
    const titulo = document.getElementById('lineAbout');

    // Función para girar 4 veces y cambiar imagen
    function doFourSpins() {
        if (isSpinning) return;

        isSpinning = true;
        clearInterval(spinInterval);

        let spinCount = 0;
        const totalSpins = 4;
        const spinSpeed = 100;

        spinInterval = setInterval(() => {
            angle += 180;
            spinCount++;
            hex.style.transform = `rotateY(${angle}deg)`;

            if (spinCount === totalSpins) {
                clearInterval(spinInterval);
                isSpinning = false;

                // Cambia la imagen después del giro
                setTimeout(() => {
                    index = (index + 1) % images.length;
                    img.src = images[index];
                }, 400);
            }
        }, spinSpeed);
    }

    // Intervalo automático normal
    function startAutoSpin() {
        clearInterval(timer);
        timer = setInterval(doFourSpins, delay);
    }

    // Iniciar automático
    //startAutoSpin();

    // Hover: gira inmediatamente UNA VEZ
    hex.addEventListener('mouseenter', () => {
        if (!hoverActive) {
            hoverActive = true;
            clearInterval(timer); // Pausa el intervalo automático
            doFourSpins(); // Gira inmediatamente
        }
    });

    // Al salir: reactiva el intervalo automático
    hex.addEventListener('mouseleave', () => {
        hoverActive = false;
        startAutoSpin(); // Vuelve al intervalo normal
    });
});