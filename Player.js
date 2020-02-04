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
            ctx.arc(this.x, this.y, 30, (this.fltOpen * 0.2) * Math.PI, (2 - this.fltOpen * 0.2) * Math.PI);
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
            ctx.clearRect(this.x - 30 - 1, this.y - 30 - 1, 30 * 2 + 2, 30 * 2 + 2);
            this.x += 4;
            /**
             * Logique de vérification d'une collision avec le rebord.
             */
            if (this.x + 30 > this.canvas.width) {
                this.x = this.canvas.width - 30
            }
            /**
             * Logique de vérification d'une collision avec un ennemi.
             */
            hostiles.forEach((hostile) => {

                if (this.x + 30 > hostile.getPosX() && this.x + 30 < hostile.getPosX() + 60) { // 60 correspond ici à la largeur de l'image svg

                    if (this.y + 30 < hostile.getPosY() + 60) { // 60 correspond ici à la hauteur de l'image svg
                        if (this.y + 30 > hostile.getPosY()) {
                            this.x = hostile.getPosX() - 30;
                        }
                        if (this.y + 30 === hostile.getPosY() + 60) {
                            this.x = hostile.getPosX() - 30;
                        }
                    }

                    if (this.y - 30 < hostile.getPosY() + 60) {
                        if (this.y - 30 > hostile.getPosY()) {
                            this.x = hostile.getPosX() - 30;
                        }
                        if (this.y - 30 === hostile.getPosY()) {
                            this.x = hostile.getPosX() - 30;
                        }
                    }
                }
            })
            ctx.beginPath();
            ctx.arc(this.x, this.y, 30, (this.fltOpen * 0.2) * Math.PI, (2 - this.fltOpen * 0.2) * Math.PI);

            ctx.lineTo(this.x, this.y);
            ctx.closePath();

            ctx.fillStyle = "#FF0";
            ctx.fill();

            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
        else if (this.leftPressed) {
            ctx.clearRect(this.x - 30 - 1, this.y - 30 - 1, 30 * 2 + 2, 30 * 2 + 2);
            this.x -= 4;
            if (this.x - 30 < 0) {
                this.x = 30
            }

            hostiles.forEach((hostile) => {

                if (this.x - 30 < hostile.getPosX() + 60 && this.x - 30 > hostile.getPosX()) {

                    if (this.y + 30 < hostile.getPosY() + 60) {
                        if (this.y + 30 > hostile.getPosY()) {
                            this.x = hostile.getPosX() + 90;
                        }
                        if (this.y + 30 === hostile.getPosY() + 60) {
                            this.x = hostile.getPosX() + 90;
                        }
                    }

                    if (this.y - 30 < hostile.getPosY() + 60) {
                        if (this.y - 30 > hostile.getPosY()) {
                            this.x = hostile.getPosX() + 90;
                        }
                        if (this.y - 30 === hostile.getPosY()) {
                            this.x = hostile.getPosX() + 90;
                        }
                    }
                }
            })
            ctx.beginPath();
            ctx.arc(this.x, this.y, 30, (1 + this.fltOpen * 0.2) * Math.PI, (3 - this.fltOpen * 0.2) * Math.PI);

            ctx.lineTo(this.x, this.y);
            ctx.closePath();

            ctx.fillStyle = "#FF0";
            ctx.fill();

            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
        else if (this.upPressed) {
            ctx.clearRect(this.x - 30 - 1, this.y - 30 - 1, 30 * 2 + 2, 30 * 2 + 2);
            this.y -= 4;
            if (this.y - 30 < 0) {
                this.y = 30;
            }

            hostiles.forEach((hostile) => {

                if (this.y - 30 < hostile.getPosY() + 60 && this.y + 30 > hostile.getPosY()) {

                    if (this.x - 30 > hostile.getPosX()) {
                        if (this.x - 30 < hostile.getPosX() + 60) {
                            this.y = hostile.getPosY() + 90;
                        }
                        if (this.x - 30 === hostile.getPosX()) {
                            this.y = hostile.getPosY() + 90;
                        }

                    }

                    if (this.x + 30 > hostile.getPosX()) {
                        if (this.x + 30 < hostile.getPosX() + 59) {
                            this.y = hostile.getPosY() + 90;
                        }
                        if (this.x + 30 === hostile.getPosX() + 60) {
                            this.y = hostile.getPosY() + 90;
                        }
                    }

                }
            });
            ctx.beginPath();
            ctx.arc(this.x, this.y, 30, (1.511 + this.fltOpen * 0.2) * Math.PI, (1.5 - this.fltOpen * 0.2) * Math.PI);

            ctx.lineTo(this.x, this.y);
            ctx.closePath();

            ctx.fillStyle = "#FF0";
            ctx.fill();

            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
        else if (this.downPressed) {
            ctx.clearRect(this.x - 30 - 1, this.y - 30 - 1, 30 * 2 + 2, 30 * 2 + 2);
            this.y += 4;
            if (this.y + 30 > this.canvas.height) {
                this.y = this.canvas.height - 30
            }

            hostiles.forEach((hostile) => {

                if (this.y + 30 > hostile.getPosY() && this.y - 30 < hostile.getPosY() + 60) {

                    if (this.x - 30 > hostile.getPosX()) {
                        if (this.x - 30 < hostile.getPosX() + 59) {
                            this.y = hostile.getPosY() - 31;
                        }
                        if (this.x - 30 === hostile.getPosX()) {
                            this.y = hostile.getPosY() - 31;
                        }
                    }

                    if (this.x + 30 > hostile.getPosX()) {
                        if (this.x + 30 < hostile.getPosX() + 60) {
                            this.y = hostile.getPosY() - 31;
                        }
                        if (this.x + 30 === hostile.getPosX() + 60) {
                            this.y = hostile.getPosY() - 31;
                        }
                    }
                }
            })
            ctx.beginPath();
            ctx.arc(this.x, this.y, 30, (0.5 + this.fltOpen * 0.2) * Math.PI, (2.5 - this.fltOpen * 0.2) * Math.PI);

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