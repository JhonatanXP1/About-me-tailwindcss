window.addEventListener('load', () => {
    let index = 0;
    let angle = 0;
    let delay = 2800;
    let timer;
    let spinInterval;
    let isSpinning = false;
    let hoverActive = false;
    let perfilToHabilidades = false; //alternar entre Interfaces
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
        titulo.classList.remove('animate-showUp');
        bodyCardH.classList.remove('animate-showUp');

        void titulo.offsetWidth;
        void bodyCardH.offsetWidth;
        titulo.classList.add('animate-showUp');
        bodyCardH.classList.add('animate-showUp');
    }

    function renderContenido() {
        if (perfilToHabilidades) {
            titulo.innerHTML = "Habilidades Técnicas";
            bodyCardH.innerHTML = `<a 
            class="relative bg-transparent block  p-6 border border-transparent rounded-base shadow-xs hover:bg-neutral-800" id="showDescrip-1" data-Image='backend'>
                    <h5 class=" text-2xl font-semibold tracking-tight text-amber-50 leading-8"><span
                        class="text-lg text-[#fc4b08]">01.</span> Backend & APIs</h5>
                    <i class="absolute right-2 top-1/2 -translate-y-1/2 fi fi-rr-angle-small-down"></i>
                    <i class="absolute  rotate-180 right-2 top-1/2 -translate-y-1/2 fi fi-rr-angle-small-down hidden"></i>
                  </a>
                  <div class="pl-8 py-3 hidden" id="showInfo-1">
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body"> C# / ASP.NET (Core / APIs)</span>
                      <span class="text-sm font-medium text-body">81%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-purple-600 h-2 rounded-full" style="width: 81%"></div>
                    </div>
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body">MariaDB / MySQL</span>
                      <span class="text-sm font-medium text-body">82%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-blue-400 h-2 rounded-full" style="width: 82%"></div>
                    </div>
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body">SQL Server</span>
                      <span class="text-sm font-medium text-body">75%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-brand h-2 rounded-full" style="width: 75%"></div>
                    </div>
                  </div>
                  <a 
                  class="relative bg-transparent block  p-6 border border-transparent rounded-base shadow-xs hover:bg-neutral-800" id="showDescrip-2" data-Image='frontend'>
                    <h5 class=" text-2xl font-semibold tracking-tight text-amber-50 leading-8"><span
                        class="text-lg text-[#fc4b08]">02.</span> Frontend</h5>
                    <i class="absolute right-2 top-1/2 -translate-y-1/2 fi fi-rr-angle-small-down"></i>
                    <i class="absolute  rotate-180 right-2 top-1/2 -translate-y-1/2 fi fi-rr-angle-small-down hidden"></i>
                  </a>
                  <div class="pl-8 py-3 hidden" id="showInfo-2">
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body"> HTML / CSS avanzado</span>
                      <span class="text-sm font-medium text-body">82%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-[#d44512] h-2 rounded-full" style="width: 82%"></div>
                    </div>
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body">Tailwind CSS</span>
                      <span class="text-sm font-medium text-body">85%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-blue-600 h-2 rounded-full" style="width: 82%"></div>
                    </div>
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body">Diseño UI custom</span>
                      <span class="text-sm font-medium text-body">62%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-neutral-400 h-2 rounded-full" style="width: 62%"></div>
                    </div>
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body">JavaScript / TypeScript</span>
                      <span class="text-sm font-medium text-body">75%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-amber-400 h-2 rounded-full" style="width: 75%"></div>
                    </div>
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body">Angular</span>
                      <span class="text-sm font-medium text-body">61%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-[#bd1919] h-2 rounded-full" style="width: 61%"></div>
                    </div>
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body">Node</span>
                      <span class="text-sm font-medium text-body">70%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-[#215732] h-2 rounded-full" style="width: 70%"></div>
                    </div>
                  </div>
                  <a
                  class="relative bg-transparent block  p-6 border border-transparent rounded-base shadow-xs hover:bg-neutral-800" id="showDescrip-3"
                  data-Image='devOps'>
                    <h5 class=" text-2xl font-semibold tracking-tight text-amber-50 leading-8"><span
                        class="text-lg text-[#fc4b08]">03.</span> DevOps</h5>
                    <i class="absolute right-2 top-1/2 -translate-y-1/2 fi fi-rr-angle-small-down"></i>
                    <i class="absolute  rotate-180 right-2 top-1/2 -translate-y-1/2 fi fi-rr-angle-small-down hidden"></i>
                  </a>
                  <div class="pl-8 py-3 hidden" id="showInfo-3">
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body"> Linux (Rocky / Ubuntu)</span>
                      <span class="text-sm font-medium text-body">85%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-[#00FF00] h-2 rounded-full" style="width: 82%"></div>
                    </div>
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body">Bash Scripting (Automatización de tareas)</span>
                      <span class="text-sm font-medium text-body">82%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-zinc-700 h-2 rounded-full" style="width: 82%"></div>
                    </div>
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body">Docker / Docker Compose</span>
                      <span class="text-sm font-medium text-body">78%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-brand h-2 rounded-full" style="width: 78%"></div>
                    </div>
                    <div class="flex justify-between mb-1">
                      <span class="text-sm font-medium text-body">Nginx / Reverse Proxy</span>
                      <span class="text-sm font-medium text-body">80%</span>
                    </div>
                    <div class="w-full bg-[#364153] rounded-full h-2">
                      <div class="bg-[#159a4d] h-2 rounded-full" style="width: 80%"></div>
                    </div>
                  </div>
                  <a
                  class="relative bg-transparent block  p-6 border border-transparent rounded-base shadow-xs hover:bg-neutral-800" id="showDescrip-4" data-Image=''>
                    <h5 class=" text-2xl font-semibold tracking-tight text-amber-50 leading-8"><span
                        class="text-lg text-[#fc4b08]">04.</span> Integraciones y Procesamiento de Pagos</h5>
                    <i class="absolute right-2 top-1/2 -translate-y-1/2 fi fi-rr-angle-small-down"></i>
                    <i class="absolute  rotate-180 right-2 top-1/2 -translate-y-1/2 fi fi-rr-angle-small-down hidden"></i>
                  </a>
                  <div class="pl-8 py-3 hidden" id="showInfo-4">
                    →&nbsp;&nbsp;&nbsp;&nbsp;Integración de pasarelas de pago como <b>OpenPay, EVO y Digital
                      FEMSA</b>.<br>
                    →&nbsp;&nbsp;&nbsp;&nbsp;Implementación de algoritmos para generación y validación de
                    referencias bancarias.<br>
                    →&nbsp;&nbsp;&nbsp;&nbsp;Diseño de flujos backend para procesamiento seguro de pagos, manejo de
                    estados transaccionales y validaciones de integridad.<br>
                    →&nbsp;&nbsp;&nbsp;&nbsp;Comunicación con servicios externos mediante APIs de terceros, manejo de
                    errores, reintentos y respuestas asincrónicas.<br>
                  </div>`;
        } else {
            titulo.innerHTML = "Perfil Profesional";
            bodyCardH.innerHTML = `<span>
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
                  un flujo de trabajo sólido entre los colaboradores.`;
        }
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
        startAutoSpin()
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

    bodyCardH.addEventListener('click', (e) => {
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