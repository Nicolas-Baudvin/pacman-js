class Map {
    constructor(map) {
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
                    console.log("this.x :", j*20, "this.y", i*20);
                }
            }
        }
    }
}