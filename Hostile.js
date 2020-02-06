class Hostile {
    constructor(posX, posY, name) {
        this.x = posX;
        this.y = posY;
        this.name = name;
        this.canvas = document.querySelector('#canvas');
        this.isDraw = false;
        this.interval = "";
        this.ctx = this.canvas.getContext('2d');
        this.speed = 4;
        this.height = "";
        this.width = "";
        this.done = false;
        this.moveDirection = this.name === "blinky" || this.name === "clyde" ? "left" : "right";

        window.addEventListener("click", (e) => {
            console.log(e.clientX, e.clientY);
            console.log(this.name, this.x, this.y)
        });

        this.img = new Image();
        this.img.addEventListener('load', this.draw);
        this.img.src = `./image/${name}.svg`;
    }

    draw = () => {
        this.ctx.drawImage(this.img, this.x, this.y);
        this.ctx.stroke();
        this.height = this.img.height;
        this.width = this.img.width;
        this.interval = setInterval(() => {
            if (this.done) {
                clearInterval(this.interval);
                this.interval = setInterval(() => {
                    this.startMoving();
                }, 10);
            }
            this.leaveSpawn();
        }, 10);
    }

    leaveSpawn = () => {
        switch (this.name) {
            case "blinky": {
                console.log(true, this.x, this.y)
                if (this.x <= 735) {
                    this.moveRight();
                }
                if (this.x >= 736 && this.y >= 240) {
                    this.moveUp();

                }
                if (this.y <= 240) {
                    this.done = true;
                }
                break;
            }
            case "clyde": {
                setTimeout(() => {

                }, 3000);
                break;
            }
            case "inky": {
                setTimeout(() => {

                }, 5000);
                break;
            }
            case "pinky": {
                setTimeout(() => {

                }, 1500);
                break;
            }
            default: {
                break;
            }
        }
    }

    checkCollisionWithMap = () => {

        let pix;
        /**
         * Logique de vérification de collision avec un mur
         */
        if (this.moveDirection === "right") {

            pix = this.ctx.getImageData(this.x + 67, this.y, 1, 60);
        }
        else if (this.moveDirection === "left") {
            pix = this.ctx.getImageData(this.x - 7, this.y, 1, 60);
        }
        else if (this.moveDirection === "up") {
            pix = this.ctx.getImageData(this.x, this.y - 7, 60, 1);
        }
        else if (this.moveDirection === "down") {
            pix = this.ctx.getImageData(this.x, this.y + 67, 60, 1);
        }

        let rgba = [];

        for (let i = 0; i < pix.data.length; i += 4) {
            const red = pix.data[i];
            const green = pix.data[i + 1];
            const blue = pix.data[i + 2];
            const alpha = pix.data[i + 3];
            const array = [red, green, blue, alpha];
            rgba.push(array);
        }
        if (rgba[0][0] === 0 && rgba[0][1] === 0 && rgba[0][2] === 0 && rgba[0][3] === 255) {
            return true;
        }
        else if (rgba[Math.floor(rgba.length - rgba.length * 25 / 100)][0] === 0 && rgba[Math.floor(rgba.length - rgba.length * 25 / 100)][1] === 0 && rgba[Math.floor(rgba.length - rgba.length * 25 / 100)][2] === 0 && rgba[Math.floor(rgba.length - rgba.length * 25 / 100)][3] === 255) {
            return true
        }
        else if (rgba[Math.floor(rgba.length - rgba.length * 50 / 100)][0] === 0 && rgba[Math.floor(rgba.length - rgba.length * 50 / 100)][1] === 0 && rgba[Math.floor(rgba.length - rgba.length * 50 / 100)][2] === 0 && rgba[Math.floor(rgba.length - rgba.length * 50 / 100)][3] === 255) {

            return true;
        }
        else if (rgba[Math.floor(rgba.length - rgba.length * 75 / 100)][0] === 0 && rgba[Math.floor(rgba.length - rgba.length * 75 / 100)][1] === 0 && rgba[Math.floor(rgba.length - rgba.length * 75 / 100)][2] === 0 && rgba[Math.floor(rgba.length - rgba.length * 75 / 100)][3] === 255) {

            return true;
        }
        else if (rgba[Math.floor(rgba.length - 1)][0] === 0 && rgba[Math.floor(rgba.length - 1)][1] === 0 && rgba[Math.floor(rgba.length - 1)][2] === 0 && rgba[Math.floor(rgba.length - 1)][3] === 255) {

            return true;
        }
        else if (rgba[0][0] !== 255 && rgba[0][1] !== 255 && rgba[0][2] !== 255 && rgba[0][3] !== 255) {
            if (rgba[0][0] !== 0 && rgba[0][1] !== 0 && rgba[0][2] !== 0 && rgba[0][3] !== 0) {
                return true;
            }
        }
        else {
            return false;
        }

    }

    changeDir = () => {
        const dir = Math.floor(Math.random() * 2) + 1;
        switch (this.moveDirection) {
            case "right": {
                if (dir === 1) {
                    this.moveUp();
                }
                else if (dir === 2) {
                    this.moveDown();
                }
                break;
            }
            case "left": {
                if (dir === 1) {
                    this.moveUp();
                }
                else if (dir === 2) {
                    this.moveDown();
                }
                break;
            }
            case "up": {
                if (dir === 1) {
                    this.moveLeft();
                }
                else if (dir === 2) {
                    this.moveRight();
                }
                break;
            }
            case "down": {
                if (dir === 1) {
                    this.moveLeft();
                }
                else if (dir === 2) {
                    this.moveRight();
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    startMoving = () => {
        switch (this.name) {
            case "blinky": {

                if (this.checkCollisionWithMap()) {
                    console.log('collision avec un mur');
                    this.speed = 0;
                    this.changeDir();
                }
                else {
                    if (this.moveDirection === "left") {


                        this.speed = 4;
                        this.moveLeft();

                    }
                    else if (this.moveDirection === "right") {

                        this.speed = 4;
                        this.moveRight();

                    }
                    else if (this.moveDirection === "down") {

                        this.speed = 4;
                        this.moveDown();

                    }
                    else if (this.moveDirection === "up") {

                        this.speed = 4;
                        this.moveUp();

                    }
                }

                break;
            }
            case "clyde": {

                break;
            }
            case "inky": {

                break;
            }
            case "pinky": {

                break;
            }
            default: {
                break;
            }
        }
    }

    moveRight = () => {
        console.log("right")
        this.moveDirection = "right";
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        this.x += this.speed;
        this.ctx.drawImage(this.img, this.x, this.y);
        this.ctx.stroke();
    }

    moveLeft = () => {
        console.log("left")
        this.moveDirection = "left";
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        this.x -= this.speed;
        this.ctx.drawImage(this.img, this.x, this.y);
        this.ctx.stroke();
    }

    moveUp = () => {
        console.log("up")
        this.moveDirection = "up";
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        this.y -= this.speed;
        this.ctx.drawImage(this.img, this.x, this.y);
        this.ctx.stroke();
    }

    moveDown = () => {
        console.log("down")
        this.moveDirection = "down";
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        this.y += this.speed;
        this.ctx.drawImage(this.img, this.x, this.y);
        this.ctx.stroke();
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