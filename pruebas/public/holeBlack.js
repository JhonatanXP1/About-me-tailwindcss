window.addEventListener('load', function () {
    import('./class.start.js');

    const holeBlack = document.getElementById('holeBlack');

    const maxorbit = 255;
    const stars = [];
    let w = 0;
    let h = 0;
    let centerX = '';
    let centerY = '';
    let collapse = false; //Estado de hover
    let expanse = false; // Aqui las estrellas se expanden
    let canvas, ctx;
    /*Puede que no lo ocupes*/let returning = false; // Aqui las estrellas regresan a su posicion original

    const ResizeObserverHole = new ResizeObserver(entries => {
        for (let entry of entries) {
            const div = entry.target;
            const rect = div.getBoundingClientRect();
            requestAnimationFrame(() => {
                console.log(rect.width, rect.height);
                [w, h, centerX, centerY] = [rect.width, rect.height, rect.width / 2, rect.height / 2];
                console.log('Dimensiones actualizadas:', w, h, centerX, centerY);
                initCanvas();
            });

        }
    });

    ResizeObserverHole.observe(holeBlack);

    function initCanvas() {
        // Si el canvas no existe, crearlo
        if (!canvas) {
            canvas = document.createElement('canvas');
            holeBlack.appendChild(canvas);
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "multiply";
        }

        // Actualizar dimensiones del canvas
        canvas.width = w;
        canvas.height = h;

        setDPI(canvas, 192);
    }

    function setDPI(canvas, dpi) {
        if (!canvas.style.width)
            canvas.style.width = canvas.width + 'px';
        if (!canvas.style.height)
            canvas.style.height = canvas.height + 'px';

        const scaleFactor = dpi / 96;
        canvas.width = Math.ceil(canvas.width * scaleFactor);
        canvas.height = Math.ceil(canvas.height * scaleFactor);
        const ctx = canvas.getContext('2d');
        ctx.scale(scaleFactor, scaleFactor);
    }

});