window.addEventListener('load', () => {
    let index = 0;
    let angle = 0;
    let delay = 2800;
    let timer;
    let spinInterval;
    let isSpinning = false;
    let hoverActive = false;
    let perfilToHabilidades = true; //alternar entre Interfaces
    let pointArayImage = '';
    let firstInteraction=0;

    //Hexago principal
    const hex = document.getElementById('hexTech');
    const img = document.getElementById('hexImg');
    //Hexagono sec
    const hex2 = document.getElementById('hexTechV2');
    const img2 = document.getElementById('hexImgV2');
    const titulo = document.getElementById('lineAbout');
    const bodyCardH = document.getElementById('textSkillChange');

    const images = {
        'backend': [
            './images/net.avif',
            './images/mariadb.avif',
            './images/mysql.avif',
            './images/sql-ser.avif'
        ],
        'frontend': [
            './images/Angular.avif',
            './images/cssHtml.avif',
            './images/node.avif',
            './images/JS.avif',
        ],
        'devOps': [
            './images/bash.avif',
            './images/gnix.avif',
            './images/ubuntu.avif',
            './images/docker.avif'
        ]
    };

    function animarVista() {
        [titulo, bodyCardH].forEach(el => {
            if (!el) return;
            el.classList.remove('animate-showUp');
            void el.offsetWidth;
            el.classList.add('animate-showUp');
        });
    }

    function renderContenido() {

        animarVista();
    }

    renderContenido();

    function updateImg(imgContent) {
        if (pointArayImage) {
            imagenes = Object.values(images[pointArayImage]);
            index = (index + 1) % imagenes.length;
            imgContent.src = imagenes[index];
        } else {
            const todasImages = Object.values(images).flat();
            const imagenAleotaria = todasImages[Math.floor(Math.random() * todasImages.length)];
            imgContent.src = imagenAleotaria;
        }
        if (firstInteraction>0)
            document.querySelector('.hexagonoBorder-V2')?.classList.remove('animate-hoverMax');
    }

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
            hex2.style.transform = `rotateY(${angle}deg)`;

            if (spinCount === totalSpins) {
                if (!perfilToHabilidades) {
                    clearInterval(spinInterval);
                    isSpinning = false;
                    setTimeout(() => {
                        img.src = './images/prof.avif'
                        updateImg(img2);
                    }, 400);
                    return 0;
                } else {
                    clearInterval(spinInterval);
                    isSpinning = false;
                    // Cambia la imagen después del giro
                    setTimeout(() => {
                        img2.src = './images/prof.avif'
                        updateImg(img);
                    }, 400);
                }
            }
        }, spinSpeed);
    }

    // Intervalo automático normal
    function startAutoSpin() {
        clearInterval(timer);
        timer = setInterval(doFourSpins, delay);
    }

    // Iniciar automático
    startAutoSpin();

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

    hex2.addEventListener('mouseleave', () => {
        hoverActive = false;
        perfilToHabilidades = !perfilToHabilidades;
        renderContenido();
        startAutoSpin();
    });

    // Hover: gira inmediatamente UNA VEZ
    hex2.addEventListener('mouseenter', () => {
        if (!hoverActive) {
            hoverActive = true;
            firstInteraction++;
            clearInterval(timer); // Pausa el intervalo automático
            doFourSpins(); // Gira inmediatamente
        }
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[id^="showDescrip-"]');
        if (!btn) return;

        pointArayImage = btn.getAttribute('data-Image');

        const id = btn.id.split('-')[1];
        const panel = document.getElementById(`showInfo-${id}`);
        if (!panel) return;

        const abierto = !panel.classList.contains('hidden');

        // cerrar todos
        document.querySelectorAll('[id^="showInfo-"]').forEach(p => {
            p.classList.add('hidden');
        });

        // reset iconos
        document.querySelectorAll('[id^="showDescrip-"]').forEach(b => {
            const icons = b.querySelectorAll('i');
            icons[0]?.classList.remove('hidden');
            icons[1]?.classList.add('hidden');
        });

        // abrir el actual
        if (!abierto) {
            panel.classList.remove('hidden');
            const icons = btn.querySelectorAll('i');
            icons[0]?.classList.add('hidden');
            icons[1]?.classList.remove('hidden');
        }
    });
});