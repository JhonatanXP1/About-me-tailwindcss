window.addEventListener('load', function () {
    const holeBlack = document.getElementById('holeBlack');
    const startTime = new Date().getTime();
    const maxorbit = 255;
    const stars = [];
    let w = 0;
    let h = 0;
    let centerX = '';
    let centerY = '';
    let currentTime = 0;
    let collapse = false;
    let expanse = false;
    let returning = false;
    let canvas, ctx;
    let autoClicked = true;
    
    window.addEventListener('animacionTerminada', () => {
        autoClicked= true;
    });

    const ResizeObserverHole = new ResizeObserver(entries => {
        for (let entry of entries) {
            const div = entry.target;
            const rect = div.getBoundingClientRect();
            requestAnimationFrame(() => {
                console.log(rect.width, rect.height);
                [w, h, centerX, centerY] = [rect.width, rect.height, rect.width / 2, rect.height / 2];
                console.log('Dimensiones actualizadas:', w, h, centerX, centerY);
                initCanvas();
                init();

                // ✅ Click automático la primera vez que se inicializa
                if (!autoClicked) {
                    autoClicked = true;
                    holeBlack.dispatchEvent(new Event('click'));
                }
            });
        }
    });

    ResizeObserverHole.observe(holeBlack);

    function initCanvas() {
        if (!canvas) {
            canvas = document.createElement('canvas');
            holeBlack.appendChild(canvas);
            ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = "multiply";

            holeBlack.addEventListener('click', function() {
                collapse = false;
                expanse = true;
                returning = false;
            });

            holeBlack.addEventListener('mouseover', function() {
                if (expanse === false) {
                    collapse = true;
                }
            });

            holeBlack.addEventListener('mouseout', function() {
                if (expanse === false) {
                    collapse = false;
                }
            });
        }

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

    function rotate(cx, cy, x, y, angle) {
        const radians = angle;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
        const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return [nx, ny];
    }

    class Star {
        constructor() {
            const rands = [];
            rands.push(Math.random() * (maxorbit / 2) + 1);
            rands.push(Math.random() * (maxorbit / 2) + maxorbit);

            this.orbital = (rands.reduce((p, c) => p + c, 0) / rands.length);
            
            this.x = centerX;
            this.y = centerY + this.orbital;
            this.yOrigin = centerY + this.orbital;

            this.speed = (Math.floor(Math.random() * 2.5) + 1.5) * Math.PI / 180;
            this.rotation = 0;
            this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180;

            this.id = stars.length;
            this.collapseBonus = this.orbital - (maxorbit * 0.7);
            if (this.collapseBonus < 0) {
                this.collapseBonus = 0;
            }

            this.color = 'rgba(255,255,255,' + (1 - ((this.orbital) / 255)) + ')';
            this.hoverPos = centerY + (maxorbit / 2) + this.collapseBonus;
            this.expansePos = centerY + (this.id % 100) * -10 + (Math.floor(Math.random() * 20) + 1);

            this.prevR = this.startRotation;
            this.prevX = this.x;
            this.prevY = this.y;
            this.originalY = this.yOrigin;

            stars.push(this);
        }

        draw() {
            if (!expanse && !returning) {
                this.rotation = this.startRotation + (currentTime * this.speed);
                if (!collapse) {
                    if (this.y > this.yOrigin) {
                        this.y -= 2.5;
                    }
                    if (this.y < this.yOrigin - 4) {
                        this.y += (this.yOrigin - this.y) / 10;
                    }
                } else {
                    this.trail = 1;
                    if (this.y > this.hoverPos) {
                        this.y -= (this.hoverPos - this.y) / -5;
                    }
                    if (this.y < this.hoverPos - 4) {
                        this.y += 2.5;
                    }
                }
            } else if (expanse && !returning) {
                this.rotation = this.startRotation + (currentTime * (this.speed / 2));
                if (this.y > this.expansePos) {
                    this.y -= Math.floor(this.expansePos - this.y) / -80;
                }
            } else if (returning) {
                this.rotation = this.startRotation + (currentTime * this.speed);
                if (Math.abs(this.y - this.originalY) > 2) {
                    this.y += (this.originalY - this.y) / 50;
                } else {
                    this.y = this.originalY;
                    this.yOrigin = this.originalY;
                }
            }

            ctx.save();
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            ctx.beginPath();
            const oldPos = rotate(centerX, centerY, this.prevX, this.prevY, -this.prevR);
            ctx.moveTo(oldPos[0], oldPos[1]);
            ctx.translate(centerX, centerY);
            ctx.rotate(this.rotation);
            ctx.translate(-centerX, -centerY);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
            ctx.restore();

            this.prevR = this.rotation;
            this.prevX = this.x;
            this.prevY = this.y;
        }
    }

    function loop() {
        const now = new Date().getTime();
        currentTime = (now - startTime) / 50;

        ctx.fillStyle = 'rgba(25,25,25,0.2)';
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < stars.length; i++) {
            if (stars[i] !== undefined) {
                stars[i].draw();
            }
        }
        requestAnimationFrame(loop);
    }

    function init() {
        ctx.fillStyle = 'rgba(25,25,25,1)';
        ctx.fillRect(0, 0, w, h);

        stars.length = 0;
        
        for (let i = 0; i < 2500; i++) {
            new Star();
        }
        loop();
    }
});
