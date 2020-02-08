class Map {
    constructor(map) {
        this.counter = 0;
        this.map = map;
        this.canvas = document.querySelector('#canvas');
        this.drawMap();
    }

    drawMap = () => {
        let ctx = this.canvas.getContext("2d");
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {

                const wall = this.map[i][j];

                if (wall == 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(j * 20, i * 20, 20, 20);
                }
                else if (wall == 0) {
                    ctx.fillStyle = 'white';
                    ctx.fillRect(j * 20, i * 20, 20, 20);
                    if (this.map[i][j - 1] === 0 && this.map[i][j + 1] === 0) {
                        if (this.map[i - 1][j] === 0 && this.map[i + 1][j] === 0 && this.map[i - 1][j - 1] === 0 && this.map[i + 1][j + 1] === 0 && this.map[i + 1][j - 1] === 0 && this.map[i - 1][j + 1] === 0) {

                            if (this.counter === 3) {
                                const coin = new Coin(j * 20, i * 20);
                                app.coins.push(coin);
                                this.counter = 0;
                            }
                            else {
                                this.counter++;
                            }
                        }
                    }
                }
            }
        }
    }
}