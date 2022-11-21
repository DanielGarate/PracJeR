

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

var player, muros;


function preload() {

    this.load.image("campo", "../../resources/img/campo.png");
    this.load.spritesheet("dude",
        "../../resources/img/dude.png",
        { frameWidth: 32, frameHeight: 48 }
    );
    this.load.image("muro", "../../resources/img/muro.png");

}

function create() {

    this.add.image(400, 300, "campo");  //Añade un nuevo elemento del juego 
    //de tipo imagen a la lista de objetos de la escena.

    //Muros
    muros = this.physics.add.staticGroup();

    //Muros lado izquierdo
    muros.create(250, 408, "muro").setScale(0.7, 0.25).refreshBody();  //refresh body es necesario ya que se ha escalado un cuerpo estático
    muros.create(250, 208, "muro").setScale(0.7, 0.25).refreshBody();
    muros.create(150, 308, "muro").setScale(0.7, 0.25).refreshBody();

    //Muros lado derecho
    muros.create(550, 408, "muro").setScale(0.7, 0.25).refreshBody();  //refresh body es necesario ya que se ha escalado un cuerpo estático
    muros.create(550, 208, "muro").setScale(0.7, 0.25).refreshBody();
    muros.create(650, 308, "muro").setScale(0.7, 0.25).refreshBody();
    


    //Personaje
    player = this.physics.add.sprite(100, 450, 'dude'); //Fisica dinamica (dinamic group) por defecto
    //Posicion del personaje

    player.setCollideWorldBounds(true);

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

    this.physics.add.collider(player, muros);


}

function update(time, delta) //Delta se usa para que en todos los navegadores el movimiento sea el mismo
{
const cursors = this.input.keyboard.createCursorKeys();

    
    if (cursors.down.isDown && cursors.left.isDown) {
    player.setVelocityY(220);
    player.setVelocityX(-220);
    player.anims.play('left', true);

    }else if (cursors.down.isDown && cursors.right.isDown) {
        player.setVelocityY(220);
        player.setVelocityX(220);
        player.anims.play('left', true);

    }else if (cursors.up.isDown && cursors.left.isDown) {
        player.setVelocityY(-220);
        player.setVelocityX(-220);
        player.anims.play('left', true);

    }else if (cursors.up.isDown && cursors.right.isDown) {
        player.setVelocityY(-220);
        player.setVelocityX(220);
        player.anims.play('left', true);

    } else if (cursors.left.isDown) {
        player.setVelocityX(-250);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(250);

        player.anims.play('right', true);

    } else if (cursors.up.isDown) {
        player.setVelocityY(-250);
        player.anims.play('right', true);

    } else if (cursors.down.isDown) {
        player.setVelocityY(250);
        player.anims.play('left', true);
    }else {
        player.setVelocityX(0);
        player.setVelocityY(0);

        player.anims.play('turn');
    }

}
