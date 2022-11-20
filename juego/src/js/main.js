

var config = {     //Contiene un json

    width: 800,
    height: 600,
    parent: "container",
    type: Phaser.AUTO,

    physics: {    //Se agrega el sistema de fisicas arcade a la configuración
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player;


function preload() {

    this.load.image("sky", "../../resources/img/sky.png");
    this.load.spritesheet("dude",
        "../../resources/img/dude.png",
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {


    this.add.image(400, 300, "sky");  //Añade un nuevo elemento del juego 
    //de tipo imagen a la lista de objetos de la escena.




    //Personaje
    player = this.physics.add.sprite(100, 450, 'dude'); //Fisica dinamica (dinamic group) por defecto
    //Posicion del personaje


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), //Usa los fottogramas 0, 1, 2 y 3
        frameRate: 10,
        repeat: -1  //La animación debe volver a empezar cuando termine
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();  //Crea el objeto cursors (con 4 propiedades: up, down, left, right)


}

function update(time, delta) //Delta se usa para que en todos los navegadores el movimiento sea el mismo
{
const cursors = this.input.keyboard.createCursorKeys();

    
    if (cursors.down.isDown && cursors.left.isDown) {
    player.setVelocityY(160);
    player.setVelocityX(-160);
    player.anims.play('left', true);

    }else if (cursors.down.isDown && cursors.right.isDown) {
        player.setVelocityY(160);
        player.setVelocityX(160);
        player.anims.play('left', true);

    }else if (cursors.up.isDown && cursors.left.isDown) {
        player.setVelocityY(-160);
        player.setVelocityX(-160);
        player.anims.play('left', true);

    }else if (cursors.up.isDown && cursors.right.isDown) {
        player.setVelocityY(-160);
        player.setVelocityX(160);
        player.anims.play('left', true);
        
    } else if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);

    } else if (cursors.up.isDown) {
        player.setVelocityY(-160);
        player.anims.play('right', true);

    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
        player.anims.play('left', true);
    }else {
        player.setVelocityX(0);
        player.setVelocityY(0);

        player.anims.play('turn');
    }

}
