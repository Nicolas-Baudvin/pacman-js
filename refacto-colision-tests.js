const hostiles = app.hostiles;

        hostiles.forEach((hostile) => {

            if (
                this.rightPressed || this.leftPressed ?
                    (
                        this.rightPressed ?
                            this.x + playerWidth > hostile.getPosX() :
                            this.x - playerWidth > hostile.getPosX()
                    ) &&
                    (
                        this.rightPressed ?
                            this.x + playerWidth < hostile.getPosX() + hostileWidth :
                            this.x - playerWidth < hostile.getPosX() + hostileWidth
                    ) :

                    (
                        this.upPressed ?
                            this.y - playerHeight < hostile.getPosY() + hostileHeight :
                            this.y + playerHeight < hostile.getPosY() + hostileHeight
                    ) &&
                    (
                        this.upPressed ?
                            this.y + playerHeight > hostile.getPosY() :
                            this.y - playerHeight > hostile.getPosY()
                    )
            ) {

                if (
                    this.rightPressed || this.leftPressed ?
                        this.y + playerHeight < hostile.getPosY() + hostileHeight :
                        this.x - playerWidth > hostile.getPosX()
                ) {

                    if (this.leftPressed || this.rightPressed ?
                        this.y + playerHeight > hostile.getPosY() :
                        this.x - playerWidth < hostile.getPosX() + hostileWidth + playerWidth
                    ) {
                        this.leftPressed || this.rightPressed ?
                            (this.rightPressed ?
                                this.x = hostile.getPosX() - playerWidth :
                                this.x = hostile.getPosX() + hostileWidth + playerWidth
                            ) :
                            (this.upPressed ?
                                this.y = hostile.getPosY() + hostileHeight + playerHeight :
                                this.y = hostile.getPosY() - playerHeight
                            )
                    }

                    if (this.leftPressed || this.rightPressed ?
                        this.y + playerHeight === hostile.getPosY() + hostileHeight :
                        this.x - playerWidth === hostile.getPosX()
                    ) {
                        this.leftPressed || this.rightPressed ?
                            (this.rightPressed ?
                                this.x = hostile.getPosX() - playerWidth :
                                this.x = hostile.getPosX() + hostileWidth + playerWidth
                            ) :
                            (this.upPressed ?
                                this.y = hostile.getPosY() + hostileHeight + playerHeight :
                                this.y = hostile.getPosY() - playerHeight
                            )
                    }

                }

                if (
                    this.leftPressed || this.rightPressed ?
                        this.y - playerHeight < hostile.getPosY() + hostileHeight :
                        this.x + playerWidth > hostile.getPosX()
                ) {

                    if (
                        this.rightPressed || this.leftPressed ?
                            this.y - playerHeight > hostile.getPosY() :
                            this.x + playerWidth < hostile.getPosX() + hostileWidth - 1
                    ) {
                        this.leftPressed || this.rightPressed ?
                            (this.rightPressed ?
                                this.x = hostile.getPosX() - playerWidth :
                                this.x = hostile.getPosX() + hostileWidth + playerWidth
                            ) :
                            (this.upPressed ?
                                this.y = hostile.getPosY() + hostileHeight + playerHeight :
                                this.y = hostile.getPosY() - playerHeight
                            )
                    }

                    if (
                        this.leftPressed || this.rightPressed ?
                            this.y - playerHeight === hostile.getPosY() :
                            this.x + playerWidth === hostile.getPosX() + hostileWidth
                    ) {
                        this.leftPressed || this.rightPressed ?
                            (this.rightPressed ?
                                this.x = hostile.getPosX() - playerWidth :
                                this.x = hostile.getPosX() + hostileWidth + playerWidth
                            ) :
                            (this.upPressed ?
                                this.y = hostile.getPosY() + hostileHeight + playerHeight :
                                this.y = hostile.getPosY() - playerHeight
                            )
                    }

                }
            }
        });






        if (this.rightPressed && !this.upPressed && !this.leftPressed && !this.downPressed) {
            if (this.x + playerWidth > hostile.getPosX() && this.x + playerWidth < hostile.getPosX() + hostileWidth) {
                if (this.y + playerHeight < hostile.getPosY() + hostileHeight) {
                    if (this.y + playerHeight > hostile.getPosY()) {
                        console.log(this.x)
                        this.x = hostile.getPosX() - playerWidth;
                        console.log(this.x, hostile.getPosX(), playerWidth)
                    }
                    if (this.y + playerHeight === hostile.getPosY() + hostileHeight) {
                        this.x = hostile.getPosX() - playerWidth;
                    }
                }

                if (this.y - playerHeight < hostile.getPosY() + hostileHeight) {
                    if (this.y - playerHeight > hostile.getPosY()) {
                        console.log(this.x)
                        this.x = hostile.getPosX() - playerWidth;
                        console.log(this.x, hostile.getPosX(), playerWidth)
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
                    if (this.x - playerWidth < hostile.getPosX() + hostileWidth - 1) {
                        this.y = hostile.getPosY() - playerHeight - 1;
                    }
                    if (this.x - playerWidth === hostile.getPosX()) {
                        this.y = hostile.getPosY() - playerHeight - 1;
                    }
                }

                if (this.x + playerWidth > hostile.getPosX()) {
                    if (this.x + playerWidth < hostile.getPosX() + hostileWidth) {
                        this.y = hostile.getPosY() - playerHeight - 1;
                    }
                    if (this.x + playerWidth === hostile.getPosX() + hostileWidth) {
                        this.y = hostile.getPosY() - playerHeight - 1;
                    }
                }
            }

        }