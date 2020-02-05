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
        this.height = 30;
        this.width = 30;

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

    checkCollisionWithMap = (width, height, maxPosX, maxPosY) => {
        /**
         * Logique de vérification de collision avec un mur
         */
        let ctx = this.canvas.getContext("2d");
        const pix = ctx.getImageData(
            this.rightPressed ? this.x + maxPosX : this.x - maxPosX,
            this.downPressed ? this.y + maxPosY : this.y - maxPosY,
            width,
            height
        );

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
        else if (rgba[Math.floor(rgba.length / 2)][0] === 0 && rgba[Math.floor(rgba.length / 2)][1] === 0 && rgba[Math.floor(rgba.length / 2)][2] === 0 && rgba[Math.floor(rgba.length / 2)][3] === 255) {
            return true
        }
        else if (rgba[rgba.length - 1][0] === 0 && rgba[rgba.length - 1][1] === 0 && rgba[rgba.length - 1][2] === 0 && rgba[rgba.length - 1][3] === 255) {

            return true;
        }
        else if (rgba[0][0] !== 255 && rgba[0][1] !== 255 && rgba[0][2] !== 255 && rgba[0][3] !== 255) {
            if (rgba[0][0] !== 0 && rgba[0][1] !== 0 && rgba[0][2] !== 0 && rgba[0][3] !== 0) {
                console.log(rgba[0][0], rgba[0][1], rgba[0][2], rgba[0][3])
                return true;
            }
        }
        else {
            return false;
        }

    }

    checkCollisionWithHostiles = (
        playerWidth = 30,
        playerHeight = 30,
        hostileWidth = 60,
        hostileHeight = 60
    ) => {
        const hostiles = app.hostiles;

        hostiles.forEach((hostile) => {

            if (this.rightPressed && !this.upPressed && !this.leftPressed && !this.downPressed) {
                if (this.x + playerWidth > hostile.getPosX() && this.x + playerWidth < hostile.getPosX() + hostileWidth) {
                    if (this.y + playerHeight < hostile.getPosY() + hostileHeight) {
                        if (this.y + playerHeight > hostile.getPosY()) {
                            this.x = hostile.getPosX() - playerWidth;
                        }
                        if (this.y + playerHeight === hostile.getPosY() + hostileHeight) {
                            this.x = hostile.getPosX() - playerWidth;
                        }
                    }

                    if (this.y - playerHeight < hostile.getPosY() + hostileHeight) {
                        if (this.y - playerHeight > hostile.getPosY()) {
                            this.x = hostile.getPosX() - playerWidth;
                        }
                        if (this.y - playerHeight === hostile.getPosY()) {
                            this.x = hostile.getPosX() - playerWidth;
                        }
                    }
                }
            }

            else if (this.leftPressed && !this.upPressed && !this.downPressed && !this.rightPressed) {

                if (this.x - playerWidth < hostile.getPosX() + hostileWidth && this.x - playerWidth > hostile.getPosX()) {

                    if (this.y + playerHeight < hostile.getPosY() + hostileHeight) {
                        if (this.y + playerHeight > hostile.getPosY()) {
                            this.x = hostile.getPosX() + hostileWidth + playerWidth;
                        }
                        if (this.y + playerHeight === hostile.getPosY() + hostileHeight) {
                            this.x = hostile.getPosX() + hostileWidth + playerWidth;
                        }
                    }

                    if (this.y - playerHeight < hostile.getPosY() + hostileHeight) {
                        if (this.y - playerHeight > hostile.getPosY()) {
                            this.x = hostile.getPosX() + hostileWidth + playerWidth;
                        }
                        if (this.y - playerHeight === hostile.getPosY()) {
                            this.x = hostile.getPosX() + hostileWidth + playerWidth;
                        }
                    }
                }
            }
            else if (this.upPressed && !this.downPressed && !this.leftPressed && !this.rightPressed) {

                if (this.y - playerHeight < hostile.getPosY() + hostileHeight && this.y + playerHeight > hostile.getPosY()) {

                    if (this.x - playerWidth > hostile.getPosX()) {
                        if (this.x - playerWidth < hostile.getPosX() + hostileWidth) {
                            this.y = hostile.getPosY() + hostileHeight + playerHeight;
                        }
                        if (this.x - playerWidth === hostile.getPosX()) {
                            this.y = hostile.getPosY() + hostileHeight + playerHeight;
                        }
                    }

                    if (this.x + playerWidth > hostile.getPosX()) {
                        if (this.x + playerWidth < hostile.getPosX() + hostileWidth - 1) {
                            this.y = hostile.getPosY() + hostileHeight + playerHeight;
                        }
                        if (this.x + playerWidth === hostile.getPosX() + hostileWidth) {
                            this.y = hostile.getPosY() + hostileHeight + playerHeight;
                        }
                    }
                }

            }
            else if (this.downPressed && !this.upPressed && !this.leftPressed && !this.rightPressed) {

                if (this.y + playerHeight > hostile.getPosY() && this.y - playerHeight < hostile.getPosY() + hostileHeight) {

                    if (this.x - playerWidth > hostile.getPosX()) {
                        if (this.x - playerWidth < hostile.getPosX() + hostileWidth) {
                            this.y = hostile.getPosY() - playerHeight;
                        }
                        if (this.x - playerWidth === hostile.getPosX()) {
                            this.y = hostile.getPosY() - playerHeight;
                        }
                    }

                    if (this.x + playerWidth > hostile.getPosX()) {
                        if (this.x + playerWidth < hostile.getPosX() + hostileWidth) {
                            this.y = hostile.getPosY() - playerHeight;
                        }
                        if (this.x + playerWidth === hostile.getPosX() + hostileWidth) {
                            this.y = hostile.getPosY() - playerHeight;
                        }
                    }
                }

            }

        });

    }

    move = () => {
        let ctx = this.canvas.getContext("2d");
        if (this.rightPressed && !this.upPressed && !this.leftPressed && !this.downPressed) {
            ctx.clearRect(this.x - this.width - 1, this.y - this.height - 1, this.width * 2 + 2, this.height * 2 + 2);

            /**
             * Logique de vérification d'une collision avec le rebord.
             */
            if (this.x + this.width > this.canvas.width) {
                this.x = this.canvas.width - this.width
            }
            /**
             * Logique de vérification d'une collision avec un ennemi.
             * TODO: Régler les bugs de collision
             */
            this.checkCollisionWithHostiles();

            /**
             * Logique de vérification de collision avec un mur
             */
            if (this.checkCollisionWithMap(1, 62, 35, 31)) {
                this.speed = 0;
            }
            else {
                this.speed = 4;
            }

            /**
             * On aditionne le vitesse aux coordonnées x ou y en fonction de la touche appuyée
             */
            this.x += this.speed;

            /**
             * On redessine le joueur avec les nouvelles coordonnées s'il n'y a pas d'obstacle sur le chemin
             * en appliquant l'animation que l'on avance ou non
             */
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, (this.fltOpen * 0.2) * Math.PI, (2 - this.fltOpen * 0.2) * Math.PI);

            ctx.lineTo(this.x, this.y);
            ctx.closePath();

            ctx.fillStyle = "#FF0";
            ctx.fill();

            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
        else if (this.leftPressed && !this.upPressed && !this.downPressed && !this.rightPressed) {
            ctx.clearRect(this.x - this.width - 1, this.y - this.height - 1, this.width * 2 + 2, this.height * 2 + 2);

            if (this.x - this.width < 0) {
                this.x = this.width
            }

            this.checkCollisionWithHostiles();

            if (this.checkCollisionWithMap(1, 62, 35, 31)) {
                this.speed = 0;
            }
            else {
                this.speed = 4;
            }

            this.x -= this.speed;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, (1 + this.fltOpen * 0.2) * Math.PI, (3 - this.fltOpen * 0.2) * Math.PI);

            ctx.lineTo(this.x, this.y);
            ctx.closePath();

            ctx.fillStyle = "#FF0";
            ctx.fill();

            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
        else if (this.upPressed && !this.downPressed && !this.leftPressed && !this.rightPressed) {
            ctx.clearRect(this.x - this.width - 1, this.y - this.height - 1, this.width * 2 + 2, this.height * 2 + 2);

            if (this.y - this.height < 0) {
                this.y = this.height;
            }

            this.checkCollisionWithHostiles();

            if (this.checkCollisionWithMap(62, 1, 31, 37)) {
                this.speed = 0;
            }
            else {
                this.speed = 4;
            }

            this.y -= this.speed;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, (1.511 + this.fltOpen * 0.2) * Math.PI, (1.5 - this.fltOpen * 0.2) * Math.PI);

            ctx.lineTo(this.x, this.y);
            ctx.closePath();

            ctx.fillStyle = "#FF0";
            ctx.fill();

            ctx.strokeStyle = '#000';
            ctx.stroke();
        }
        else if (this.downPressed && !this.upPressed && !this.leftPressed && !this.rightPressed) {
            ctx.clearRect(this.x - this.width - 1, this.y - this.height - 1, this.width * 2 + 2, this.height * 2 + 2);
            if (this.y + 30 > this.canvas.height) {
                this.y = this.canvas.height - this.height
            }

            this.checkCollisionWithHostiles();

            if (this.checkCollisionWithMap(62, 1, 31, 37)) {
                this.speed = 0;
            }
            else {
                this.speed = 4;
            }

            this.y += this.speed;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, (0.5 + this.fltOpen * 0.2) * Math.PI, (2.5 - this.fltOpen * 0.2) * Math.PI);

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