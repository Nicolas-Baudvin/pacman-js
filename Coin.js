class Coin {
    constructor(posX, posY) {
        this.ctx = app.canvas.getContext("2d");
        this.x = posX;
        this.y = posY;
        this.img = "";
        this.height = "";
        this.width = "";
        this.type = "coin"
        this.img = new Image();
        this.img.addEventListener('load', this.draw);
        this.img.src = "./image/coin.gif";
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

    getType = () => {
        return this.type;
    }

    remove = () => {
        this.ctx.clearRect(this.x, this.y, 40, 40);
        app.score++;
        document.querySelector('.score').innerText = `Votre score est de : ${app.score}`;
    }
}