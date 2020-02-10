class Hostile {
    constructor(posX, posY, name) {
        this.x = posX;
        this.y = posY;
        this.name = name;
        this.type = "hostile";
        this.canvas = document.querySelector('#canvas');
        this.isDraw = false;
        this.interval = "";
        this.ctx = this.canvas.getContext('2d');
        this.speed = 4;
        this.height = "";
        this.width = "";
        this.moveDirection = this.name === "blinky" || this.name === "clyde" ? "right" : "left";

        this.img = new Image();
        this.img.addEventListener('load', this.draw);
        this.img.src = `./image/${name}.svg`;
    }

    restart = () => {
        this.x = undefined;
        this.y = undefined;
        clearInterval(this.interval);
    }

    draw = () => {
        this.ctx.drawImage(this.img, this.x, this.y);
        this.ctx.stroke();
        this.height = this.img.height;
        this.width = this.img.width;
        if (this.name === "blinky") {
            this.interval = setInterval(() => {
                this.move();
            }, 10);
        }
        if (this.name === "inky") {
            setTimeout(() => {
                this.interval = setInterval(() => {
                    this.move();
                }, 10);
            }, 500);
        }
        if (this.name === "clyde") {
            setTimeout(() => {
                this.interval = setInterval(() => {
                    this.move();
                }, 10);
            }, 1000);
        }
        if (this.name === "pinky") {
            setTimeout(() => {
                this.interval = setInterval(() => {
                    this.move();
                }, 10);
            }, 1500);
        }

    }

    /**
    * Logique de vérification de collision avec un mur à droite
    * 
    * @returns Boolean - true => collision / false => pas de collision
    */
    checkRightCollision = () => {

        const pixRight = this.ctx.getImageData(this.x + 61, this.y, 1, 60);

        let rgba = [];

        for (let i = 0; i < pixRight.data.length; i += 4) {
            const red = pixRight.data[i];
            const green = pixRight.data[i + 1];
            const blue = pixRight.data[i + 2];
            const alpha = pixRight.data[i + 3];
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
            else {
                return false
            }
        }
        else {
            return false;
        }

    }
    /**
    * Logique de vérification de collision avec un mur à gauche
    * 
    * @returns Boolean - true => collision / false => pas de collision
    */
    checkLeftCollision = () => {
        const pixLeft = this.ctx.getImageData(this.x - 1, this.y, 1, 60);

        let rgba = [];

        for (let i = 0; i < pixLeft.data.length; i += 4) {
            const red = pixLeft.data[i];
            const green = pixLeft.data[i + 1];
            const blue = pixLeft.data[i + 2];
            const alpha = pixLeft.data[i + 3];
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
            else {
                return false
            }
        }
        else {
            return false;
        }
    }

    /**
    * Logique de vérification de collision avec un mur en haut
    * 
    * @returns Boolean - true => collision / false => pas de collision
    */
    checkUpCollision = () => {
        const pixUp = this.ctx.getImageData(this.x, this.y - 1, 60, 1);

        let rgba = [];

        for (let i = 0; i < pixUp.data.length; i += 4) {
            const red = pixUp.data[i];
            const green = pixUp.data[i + 1];
            const blue = pixUp.data[i + 2];
            const alpha = pixUp.data[i + 3];
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
            else {
                return false
            }
        }
        else {
            return false;
        }
    }

    /**
    * Logique de vérification de collision avec un mur en bas
    * 
    * 
    * @returns Boolean - true => collision / false => pas de collision
    * 
    */
    checkDownCollision = () => {
        const pixDown = this.ctx.getImageData(this.x, this.y + 61, 60, 1);

        let rgba = [];

        for (let i = 0; i < pixDown.data.length; i += 4) {
            const red = pixDown.data[i];
            const green = pixDown.data[i + 1];
            const blue = pixDown.data[i + 2];
            const alpha = pixDown.data[i + 3];
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
            else {
                return false
            }
        }
        else {
            return false;
        }
    }

    move = () => {
        if (this.moveDirection === "right") {
            if (!this.checkRightCollision() && this.checkUpCollision() && this.checkDownCollision()) {
                this.moveRight();
            }
            else if ((!this.checkRightCollision() && !this.checkUpCollision() && this.checkDownCollision()) || (this.checkLeftCollision() && !this.checkUpCollision() && this.checkDownCollision())) {
                this.moveUp();
            }
            else if ((!this.checkRightCollision() && this.checkUpCollision() && !this.checkDownCollision()) || (this.checkLeftCollision() && this.checkUpCollision() && !this.checkDownCollision())) {
                this.moveDown();
            }
            else if (this.checkRightCollision() && !this.checkUpCollision() && !this.checkDownCollision()) {
                const choice = Math.floor(Math.random() * 2) + 1;
                choice === 1 ? this.moveUp() : this.moveDown();
            }
            else if ((this.checkRightCollision() && this.checkUpCollision() && !this.checkDownCollision()) || (this.checkRightCollision() && !this.checkUpCollision() && this.checkDownCollision())) {
                !this.checkDownCollision() ? this.moveDown() : this.moveUp();
            }
            else if (!this.checkRightCollision() && !this.checkUpCollision() && !this.checkDownCollision()) {
                const choice = Math.floor(Math.random() * 3) + 1;
                switch (choice) {
                    case 1: {
                        this.moveUp();
                        break;
                    }
                    case 2: {
                        this.moveDown();
                        break;
                    }
                    case 3: {
                        this.moveRight();
                        break;
                    }
                }
            }
            else if (this.checkRightCollision() && this.checkUpCollision() && this.checkDownCollision() && !this.checkLeftCollision()) {
                this.moveLeft();
            }
        }
        else if (this.moveDirection === "left") {
            if (!this.checkLeftCollision() && this.checkUpCollision() && this.checkDownCollision()) {
                this.moveLeft();
            }
            else if ((!this.checkLeftCollision() && !this.checkUpCollision() && this.checkDownCollision()) || (this.checkLeftCollision() && !this.checkUpCollision() && this.checkDownCollision())) {
                this.moveUp();
            }
            else if ((!this.checkLeftCollision() && this.checkUpCollision() && !this.checkDownCollision()) || (this.checkLeftCollision() && this.checkUpCollision() && !this.checkDownCollision())) {
                this.moveDown();
            }
            else if (this.checkLeftCollision() && !this.checkUpCollision() && !this.checkDownCollision()) {
                const choice = Math.floor(Math.random() * 2) + 1;
                choice === 1 ? this.moveUp() : this.moveDown();
            }
            else if ((this.checkLeftCollision() && this.checkUpCollision() && !this.checkDownCollision()) || (this.checkLeftCollision() && !this.checkUpCollision() && this.checkDownCollision())) {
                !this.checkDownCollision() ? this.moveDown() : this.moveUp();
            }
            else if (!this.checkRightCollision() && !this.checkUpCollision() && !this.checkDownCollision()) {
                const choice = Math.floor(Math.random() * 3) + 1;
                switch (choice) {
                    case 1: {
                        this.moveUp();
                        break;
                    }
                    case 2: {
                        this.moveDown();
                        break;
                    }
                    case 3: {
                        this.moveLeft();
                        break;
                    }
                }
            }
            else if (this.checkLeftCollision() && this.checkUpCollision() && this.checkDownCollision() && !this.checkRightCollision()) {
                this.moveRight();
            }
        }
        else if (this.moveDirection === "up") {
            if (!this.checkUpCollision() && this.checkLeftCollision() && this.checkRightCollision()) {
                this.moveUp();
            }
            else if ((!this.checkUpCollision() && !this.checkLeftCollision() && this.checkRightCollision()) || (this.checkUpCollision() && !this.checkLeftCollision() && this.checkRightCollision())) {
                this.moveLeft();
            }
            else if ((!this.checkUpCollision() && this.checkLeftCollision() && !this.checkRightCollision()) || (this.checkUpCollision() && this.checkLeftCollision() && !this.checkRightCollision())) {
                this.moveRight();
            }
            else if (this.checkUpCollision() && !this.checkLeftCollision() && !this.checkRightCollision()) {
                const choice = Math.floor(Math.random() * 2) + 1;
                choice === 1 ? this.moveLeft() : this.moveRight();
            }
            else if ((this.checkUpCollision() && !this.checkLeftCollision() && this.checkRightCollision()) || (this.checkUpCollision() && this.checkLeftCollision() && !this.checkRightCollision())) {
                !this.checkLeftCollision() ? this.moveRight() : this.moveLeft();
            }
            else if (!this.checkUpCollision() && !this.checkLeftCollision() && !this.checkRightCollision()) {
                const choice = Math.floor(Math.random() * 3) + 1;
                switch (choice) {
                    case 1: {
                        this.moveLeft();
                        break;
                    }
                    case 2: {
                        this.moveRight();
                        break;
                    }
                    case 3: {
                        this.moveUp();
                        break;
                    }
                }
            }
            else if (this.checkUpCollision() && this.checkLeftCollision() && this.checkRightCollision() && !this.checkDownCollision()) {
                this.moveDown();
            }
        }
        else if (this.moveDirection === "down") {
            if (!this.checkDownCollision() && this.checkLeftCollision() && this.checkRightCollision()) {
                this.moveDown();
            }
            else if ((!this.checkDownCollision() && !this.checkLeftCollision() && this.checkRightCollision()) || (this.checkDownCollision() && !this.checkLeftCollision() && this.checkRightCollision())) {
                this.moveLeft()
            }
            else if ((!this.checkDownCollision() && this.checkLeftCollision() && !this.checkRightCollision()) || (this.checkDownCollision() && this.checkLeftCollision() && !this.checkRightCollision())) {
                this.moveRight();
            }
            else if (this.checkDownCollision() && !this.checkLeftCollision() && !this.checkRightCollision()) {
                const choice = Math.floor(Math.random() * 2) + 1;
                choice === 1 ? this.moveLeft() : this.moveRight();
            }
            else if ((this.checkDownCollision() && this.checkLeftCollision() && !this.checkRightCollision()) || (this.checkUpCollision() && !this.checkLeftCollision() && this.checkRightCollision())) {
                !this.checkLeftCollision() ? this.moveRight() : this.moveLeft();
            }
            else if (!this.checkUpCollision() && !this.checkLeftCollision() && !this.checkRightCollision()) {
                const choice = Math.floor(Math.random() * 3) + 1;
                switch (choice) {
                    case 1: {
                        this.moveLeft();
                        break;
                    }
                    case 2: {
                        this.moveRight();
                        break;
                    }
                    case 3: {
                        this.moveDown();
                        break;
                    }
                }
            }
            else if (this.checkDownCollision() && this.checkLeftCollision() && this.checkRightCollision() && !this.checkUpCollision()) {
                this.moveUp();
            }
        }
    }

    moveRight = () => {
        this.moveDirection = "right";
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        this.x += this.speed;
        this.ctx.drawImage(this.img, this.x, this.y);
        this.ctx.stroke();
    }

    moveLeft = () => {
        this.moveDirection = "left";
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        this.x -= this.speed;
        this.ctx.drawImage(this.img, this.x, this.y);
        this.ctx.stroke();
    }

    moveUp = () => {
        this.moveDirection = "up";
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        this.y -= this.speed;
        this.ctx.drawImage(this.img, this.x, this.y);
        this.ctx.stroke();
    }

    moveDown = () => {
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

    getType = () => {
        return this.type;
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
}