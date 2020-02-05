class Player {
    constructor(life, playerPosX, playerPosY) {
        this.life = life;
        this.x = playerPosX;
        this.y = playerPosY;
        this.canvas = document.querySelector('#canvas');
        this.isDraw = false;
        this.interval = "";
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        this.speed = 4;

        window.addEventListener('keydown', this.keyDownHandler, false);
        window.addEventListener('keyup', this.KeyUpHandler, false);

        this.dir = -10
        this.pctOpen = 100;
        this.fltOpen = this.pctOpen / 100;

        this.draw();
    }

    keyDownHandler = (e) => {

        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = true;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = true;
        }
        else if (e.key == "Up" || e.key == "ArrowUp") {
            e.preventDefault();
            this.upPressed = true;
        }
        else if (e.key == "Down" || e.key == "ArrowDown") {
            e.preventDefault();
            this.downPressed = true
        }
    }

    KeyUpHandler = (e) => {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = false;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = false;
        }
        else if (e.key == "Up" || e.key == "ArrowUp") {
            this.upPressed = false;
        }
        else if (e.key == "Down" || e.key == "ArrowDown") {
            this.downPressed = false
        }
    }

    setPosY = (pos) => {
        this.y = pos;
    }

    setPosX = (pos) => {
        this.x = pos;
    }

    getPosX = () => {
        return this.x
    }

    getPosY = () => {
        return this.y
    }

    /**
     *  Dessin du modèle joueur
     */
    draw = () => {
        console.log(this.x, this.y)
        let ctx = this.canvas.getContext("2d");
        if (!this.isDraw) {

            ctx.beginPath();
            ctx.arc(this.x, this.y, 20, (this.fltOpen * 0.2) * Math.PI, (2 - this.fltOpen * 0.2) * Math.PI);
            ctx.lineTo(this.x, this.y);
            ctx.closePath();
            ctx.fillStyle = "#FF0";
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.stroke();

            this.isDraw = true
        }
        this.interval = setInterval(() => {
            this.pctOpen = this.pctOpen += this.dir;
            this.fltOpen = this.pctOpen / 100;
            this.move();
            if (this.pctOpen % 100 == 0) {
                this.dir = -this.dir;
            }
        }, 10);
    }

    move = () => {
        let ctx = this.canvas.getContext("2d");
        const hostiles = app.hostiles;
        if (this.rightPressed) {
            ctx.clearRect(this.x - 20 - 1, this.y - 20 - 1, 20 * 2 + 2, 20 * 2 + 2);

            /**
             * Logique de vérification d'une collision avec le rebord.
             */
            if (this.x + 20 > this.canvas.width) {
                this.x = this.canvas.width - 20
            }
            /**
             * Logique de vérification d'une collision avec un ennemi.
             */
            hostiles.forEach((hostile) => {

                if (this.x + 20 > hostile.getPosX() && this.x + 20 < hostile.getPosX() + 60) { // 60 correspond ici à la largeur de l'image svg

                    if (this.y + 20 < hostile.getPosY() + 60) { // 60 correspond ici à la hauteur de l'image svg
                        if (this.y + 20 > hostile.getPosY()) {
                            this.x = hostile.getPosX() - 20;
                        }
                        if (this.y + 20 === hostile.getPosY() + 60) {
                            this.x = hostile.getPosX() - 20;
                        }
                    }

                    if (this.y - 20 < hostile.getPosY() + 60) {
                        if (this.y - 20 > hostile.getPosY()) {
                            this.x = hostile.getPosX() - 20;
                        }
                        if (this.y - 20 === hostile.getPosY()) {
                            this.x = hostile.getPosX() - 20;
                        }
                    }
                }
            });

            /**
             * Logique de vérification de collision avec un mur
             */
            const pix = ctx.getImageData(this.x + 25, this.y - 21, 1, 42);
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
                this.speed = 0;
            }
            else if (rgba[Math.floor(rgba.length / 2)][0] === 0 && rgba[Math.floor(rgba.length / 2)][1] === 0 && rgba[Math.floor(rgba.length / 2)][2] === 0 && rgba[Math.floor(rgba.length / 2)][3] === 255) {
                this.speed = 0;
            }
            else if (rgba[rgba.length - 1][0] === 0 && rgba[rgba.length - 1][1] === 0 && rgba[rgba.length - 1][2] === 0 && rgba[rgba.length - 1][3] === 255) {

                this.speed = 0;
            }
            else {
                this.speed = 4;
            }
            
            this.x += this.speed;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 20, (this.fltOpen * 0.2) * Math.PI, (2 - this.fltOpen * 0.2) * Math.PI);

            ctx.lineTo(this.x, this.y);
            ctx.closePath();

            ctx.fillStyle = "#FF0";
            ctx.fill();

            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
        else if (this.leftPressed) {
            ctx.clearRect(this.x - 20 - 1, this.y - 20 - 1, 20 * 2 + 2, 20 * 2 + 2);

            if (this.x - 20 < 0) {
                this.x = 20
            }

            hostiles.forEach((hostile) => {

                if (this.x - 20 < hostile.getPosX() + 60 && this.x - 20 > hostile.getPosX()) {

                    if (this.y + 20 < hostile.getPosY() + 60) {
                        if (this.y + 20 > hostile.getPosY()) {
                            this.x = hostile.getPosX() + 90;
                        }
                        if (this.y + 20 === hostile.getPosY() + 60) {
                            this.x = hostile.getPosX() + 90;
                        }
                    }

                    if (this.y - 20 < hostile.getPosY() + 60) {
                        if (this.y - 20 > hostile.getPosY()) {
                            this.x = hostile.getPosX() + 90;
                        }
                        if (this.y - 20 === hostile.getPosY()) {
                            this.x = hostile.getPosX() + 90;
                        }
                    }
                }
            });

            const pix = ctx.getImageData(this.x - 25, this.y - 21, 1, 42);
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
                this.speed = 0;
            }
            else if (rgba[Math.floor(rgba.length / 2)][0] === 0 && rgba[Math.floor(rgba.length / 2)][1] === 0 && rgba[Math.floor(rgba.length / 2)][2] === 0 && rgba[Math.floor(rgba.length / 2)][3] === 255) {
                this.speed = 0;
            }
            else if (rgba[rgba.length - 1][0] === 0 && rgba[rgba.length - 1][1] === 0 && rgba[rgba.length - 1][2] === 0 && rgba[rgba.length - 1][3] === 255) {
                this.speed = 0;
            }
            else {
                this.speed = 4;
            }
            this.x -= this.speed;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 20, (1 + this.fltOpen * 0.2) * Math.PI, (3 - this.fltOpen * 0.2) * Math.PI);

            ctx.lineTo(this.x, this.y);
            ctx.closePath();

            ctx.fillStyle = "#FF0";
            ctx.fill();

            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
        else if (this.upPressed) {
            ctx.clearRect(this.x - 20 - 1, this.y - 20 - 1, 20 * 2 + 2, 20 * 2 + 2);

            if (this.y - 20 < 0) {
                this.y = 20;
            }

            hostiles.forEach((hostile) => {

                if (this.y - 20 < hostile.getPosY() + 60 && this.y + 20 > hostile.getPosY()) {

                    if (this.x - 20 > hostile.getPosX()) {
                        if (this.x - 20 < hostile.getPosX() + 60) {
                            this.y = hostile.getPosY() + 90;
                        }
                        if (this.x - 20 === hostile.getPosX()) {
                            this.y = hostile.getPosY() + 90;
                        }

                    }

                    if (this.x + 20 > hostile.getPosX()) {
                        if (this.x + 20 < hostile.getPosX() + 59) {
                            this.y = hostile.getPosY() + 90;
                        }
                        if (this.x + 20 === hostile.getPosX() + 60) {
                            this.y = hostile.getPosY() + 90;
                        }
                    }

                }
            });

            const pix = ctx.getImageData(this.x - 21, this.y - 27, 42, 1);
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
                this.speed = 0;
            }
            else if (rgba[Math.floor(rgba.length / 2)][0] === 0 && rgba[Math.floor(rgba.length / 2)][1] === 0 && rgba[Math.floor(rgba.length / 2)][2] === 0 && rgba[Math.floor(rgba.length / 2)][3] === 255) {
                this.speed = 0;
            }
            else if (rgba[rgba.length - 1][0] === 0 && rgba[rgba.length - 1][1] === 0 && rgba[rgba.length - 1][2] === 0 && rgba[rgba.length - 1][3] === 255) {
                this.speed = 0;
            }
            else {
                this.speed = 4;
            }

            this.y -= this.speed;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 20, (1.511 + this.fltOpen * 0.2) * Math.PI, (1.5 - this.fltOpen * 0.2) * Math.PI);

            ctx.lineTo(this.x, this.y);
            ctx.closePath();

            ctx.fillStyle = "#FF0";
            ctx.fill();

            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
        else if (this.downPressed) {
            ctx.clearRect(this.x - 20 - 1, this.y - 20 - 1, 20 * 2 + 2, 20 * 2 + 2);
            if (this.y + 20 > this.canvas.height) {
                this.y = this.canvas.height - 20
            }

            hostiles.forEach((hostile) => {

                if (this.y + 20 > hostile.getPosY() && this.y - 20 < hostile.getPosY() + 20) {

                    if (this.x - 20 > hostile.getPosX()) {
                        if (this.x - 20 < hostile.getPosX() + 59) {
                            this.y = hostile.getPosY() - 31;
                        }
                        if (this.x - 20 === hostile.getPosX()) {
                            this.y = hostile.getPosY() - 31;
                        }
                    }

                    if (this.x + 20 > hostile.getPosX()) {
                        if (this.x + 20 < hostile.getPosX() + 60) {
                            this.y = hostile.getPosY() - 21;
                        }
                        if (this.x + 20 === hostile.getPosX() + 60) {
                            this.y = hostile.getPosY() - 21;
                        }
                    }
                }
            })

            const pix = ctx.getImageData(this.x - 21, this.y + 27, 42, 1);
            let rgba = [];

            for (let i = 0; i < pix.data.length; i += 4) {
                const red = pix.data[i];
                const green = pix.data[i + 1];
                const blue = pix.data[i + 2];
                const alpha = pix.data[i + 3];
                const array = [red, green, blue, alpha];
                rgba.push(array);
            }
            console.log(rgba[0][0] === 0 && rgba[0][1] === 0 && rgba[0][2] === 0 && rgba[0][3] === 255);
            if (rgba[0][0] === 0 && rgba[0][1] === 0 && rgba[0][2] === 0 && rgba[0][3] === 255) {
                this.speed = 0;
            }
            else if (rgba[Math.floor(rgba.length / 2)][0] === 0 && rgba[Math.floor(rgba.length / 2)][1] === 0 && rgba[Math.floor(rgba.length / 2)][2] === 0 && rgba[Math.floor(rgba.length / 2)][3] === 255) {
                this.speed = 0;
            }
            else if (rgba[rgba.length - 1][0] === 0 && rgba[rgba.length - 1][1] === 0 && rgba[rgba.length - 1][2] === 0 && rgba[rgba.length - 1][3] === 255) {
                this.speed = 0;
            }
            else {
                this.speed = 4;
            }


            this.y += this.speed;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 20, (0.5 + this.fltOpen * 0.2) * Math.PI, (2.5 - this.fltOpen * 0.2) * Math.PI);

            ctx.lineTo(this.x, this.y);
            ctx.closePath();

            ctx.fillStyle = "#FF0";
            ctx.fill();

            ctx.strokeStyle = '#000';
            ctx.stroke();
        }

    }

    getHit = (damage) => {
        this.life = this.life - damage;
        if (this.life <= 0) {
            console.log('PERDU');
            return this.life;
        }
    }

    die = () => {
        app.score = 0;
        clearInterval(this.interval);
        this.draw();
    }

}