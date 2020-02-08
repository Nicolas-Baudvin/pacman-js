class Coin {
    constructor(posX, posY) {
        this.ctx = app.canvas.getContext("2d");
        this.x = posX;
        this.y = posY;
        this.img = "";
        this.height = "";
        this.width = "";
        this.img = new Image();
        this.img.addEventListener('load', this.draw);
        this.img.src = "./image/coin.svg";
    }

    draw = () => {
        this.ctx.drawImage(this.img, this.x, this.y);
        this.ctx.stroke();
        this.height = this.img.height;
        this.width = this.img.width;
    }

    getPosX = () => {
        return this.x;
    }

    getPosY = () => {
        return this.y;
    }

    remove = () => {
        this.ctx.clearRect(this.x, this.y, thix.x + 20, this.y + 20);
        app.score++;
    }
}