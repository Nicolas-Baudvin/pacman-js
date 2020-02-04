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
        const playerPosX = app.currentPlayer.getPosX();
        const playerPosY = app.currentPlayer.getPosY();
        console.log(playerPosX, playerPosY);
        if (this.x !== playerPosX || this.y !== playerPosY) {
            // if (this.x + 60 > playerPosX + 30 && this.x - 60 < playerPosX - 30){
            //     return this.draw();
            // }
            // if (this.y + 60 > playerPosY + 30 && this.y - 60 < playerPosY - 30) {
            //     return this.draw();
            // }
            console.log("X position", this.x)
            console.log("Y position", this.y)
            this.img.classList.add('hostile');
            this.ctx.drawImage(this.img, this.x, this.y);
            this.ctx.stroke();
            console.log(this.img.width, this.img.height)
        } else {
            console.log("X position", this.x, playerPosX)
            console.log("Y position", this.y, playerPosY)
            return this.draw();
        }
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