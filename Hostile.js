class Hostile {
    constructor(posX, posY, name) {
        this.x = posX;
        this.y = posY;
        this.name = name;
        this.canvas = document.querySelector('#canvas');
        this.isDraw = false;
        this.interval = "";
        this.ctx = this.canvas.getContext('2d');

        this.img = new Image();
        this.img.addEventListener('load', this.draw);
        this.img.src = `./image/${name}.svg`;
    }

    draw = () => {
            console.log("X position", this.x)
            console.log("Y position", this.y)
            this.img.classList.add('hostile');
            this.ctx.drawImage(this.img, this.x, this.y);
            this.ctx.stroke();
            console.log(this.img.width, this.img.height)
    }

    move = () => {

    }

    getPosX = () => {
        return this.x;
    }

    getPosY = () => {
        return this.y;
    }

    setPosX = (pos) => {
        this.x = pos;
    }

    setPosY = (pos) => {
        this.y = pos;
    }

    getWidth = () => {
        return this.img.width;
    }

    getHeight = () => {
        return this.img.height;
    }

    die = () => {
        clearInterval(this.interval);
    }
}