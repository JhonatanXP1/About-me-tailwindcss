document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-carousel]').forEach(function (root) {
        const track = root.querySelector('[data-carousel-track]');
        if (!track || track.children.length === 0) return;

        const slides = track.children;
        const dotsWrap = root.querySelector('[data-carousel-dots]');
        let index = 0;
        let timer;

        function render() {
            track.style.transform = 'translateX(-' + (index * 100) + '%)';
            if (dotsWrap) {
                Array.from(dotsWrap.children).forEach(function (dot, i) {
                    dot.classList.toggle('bg-emerald-400', i === index);
                    dot.classList.toggle('bg-white/40', i !== index);
                });
            }
        }

        function go(i) {
            index = (i + slides.length) % slides.length;
            render();
        }

        if (dotsWrap) {
            for (let i = 0; i < slides.length; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'w-2 h-2 rounded-full bg-white/40 transition-colors cursor-pointer';
                dot.addEventListener('click', function () { go(i); restart(); });
                dotsWrap.appendChild(dot);
            }
        }

        const prev = root.querySelector('[data-carousel-prev]');
        const next = root.querySelector('[data-carousel-next]');
        if (prev) prev.addEventListener('click', function () { go(index - 1); restart(); });
        if (next) next.addEventListener('click', function () { go(index + 1); restart(); });

        function start() { timer = setInterval(function () { go(index + 1); }, 4000); }
        function restart() { clearInterval(timer); start(); }

        root.addEventListener('mouseenter', function () { clearInterval(timer); });
        root.addEventListener('mouseleave', start);

        render();
        start();
    });
});
