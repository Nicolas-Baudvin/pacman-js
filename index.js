var app = {
    canvas: document.querySelector('#canvas'),
    x: '',
    y: '',
    currentPlayer: '',
    hostiles: [],
    hostilesName: ["blinky", "clyde", "inky", "pinky"],
    score: 0,

    init: () => {
        console.log('init');
        app.x = app.canvas.width / 2;
        app.y = app.canvas.height - 60;
        window.addEventListener('keydown', app.keyDownHandler, false);
        window.addEventListener('keyup', app.KeyUpHandler, false);
        app.currentPlayer = new Player(100, app.canvas.width / 2, app.canvas.height - 60);

        app.hostilesName.forEach((name) => {
            const posY = Math.floor(Math.random() * app.canvas.height);
            const posX = Math.floor(Math.random() * app.canvas.width);

            let hostile = new Hostile(posX, posY, name);
            console.log(name)
            app.hostiles.push(hostile);
        })

    },

}

document.addEventListener('DOMContentLoaded', app.init);