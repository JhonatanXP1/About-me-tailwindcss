export class Star {
    constructor() {
        // Get a weighted random number, so that the majority of stars will form in the center of the orbit
        const rands = [];
        rands.push(Math.random() * (maxorbit / 2) + 1);
        rands.push(Math.random() * (maxorbit / 2) + maxorbit);

        this.orbital = (rands.reduce((p, c) => p + c, 0) / rands.length);

        this.x = centerX; // All of these stars are at the center x position at all times
        this.y = centerY + this.orbital; // Set Y position starting at the center y + the position in the orbit

        this.yOrigin = centerY + this.orbital; // this is used to track the particles origin

        this.speed = (Math.floor(Math.random() * 2.5) + 1.5) * Math.PI / 180; // The rate at which this star will orbit
        this.rotation = 0; // current Rotation
        this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180; // Starting rotation

        this.id = stars.length; // This will be used when expansion takes place

        this.collapseBonus = this.orbital - (maxorbit * 0.7); // This "bonus" is used to randomly place some stars outside of the blackhole on hover
        if (this.collapseBonus < 0) { // if the collapse "bonus" is negative
            this.collapseBonus = 0; // set it to 0, this way no stars will go inside the blackhole
        }

        this.color = 'rgba(255,255,255,' + (1 - ((this.orbital) / 255)) + ')'; // Color the star white, but make it more transparent the further out it is generated

        this.hoverPos = centerY + (maxorbit / 2) + this.collapseBonus; // Where the star will go on hover of the blackhole
        this.expansePos = centerY + (this.id % 100) * -10 + (Math.floor(Math.random() * 20) + 1); // Where the star will go when expansion takes place

        this.prevR = this.startRotation;
        this.prevX = this.x;
        this.prevY = this.y;

        // Store original position for returning
        this.originalY = this.yOrigin;

        stars.push(this);
    }

    draw() {
        if (!expanse && !returning) {
            this.rotation = this.startRotation + (currentTime * this.speed);
            if (!collapse) { // not hovered
                if (this.y > this.yOrigin) {
                    this.y -= 2.5;
                }
                if (this.y < this.yOrigin - 4) {
                    this.y += (this.yOrigin - this.y) / 10;
                }
            } else { // on hover
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
                this.y -= Math.floor(this.expansePos - this.y) / -80; // Slower expansion for better visibility
            }
        } else if (returning) {
            // Returning to original orbit slowly
            this.rotation = this.startRotation + (currentTime * this.speed);
            if (Math.abs(this.y - this.originalY) > 2) {
                this.y += (this.originalY - this.y) / 50; // Much slower return
            } else {
                this.y = this.originalY;
                this.yOrigin = this.originalY;
            }
        }

        context.save();
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.beginPath();
        const oldPos = rotate(centerX, centerY, this.prevX, this.prevY, -this.prevR);
        context.moveTo(oldPos[0], oldPos[1]);
        context.translate(centerX, centerY);
        context.rotate(this.rotation);
        context.translate(-centerX, -centerY);
        context.lineTo(this.x, this.y);
        context.stroke();
        context.restore();

        this.prevR = this.rotation;
        this.prevX = this.x;
        this.prevY = this.y;
    }
}