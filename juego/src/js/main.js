

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

var player1, player2, muros, limites;


function preload() {

    this.load.image("campo", "../../resources/img/campo.png");
    this.load.spritesheet("dude",
        "../../resources/img/dude.png",
        { frameWidth: 32, frameHeight: 48 }
    );
    this.load.image("muro", "../../resources/img/muro.png");
    
    this.load.image("separacion", "../../resources/img/separacion.png");
    this.load.image("bomba","../../resources/img/bomb.png");



}

function create() {

    this.add.image(400, 300, "campo");  //Añade un nuevo elemento del juego 
    //de tipo imagen a la lista de objetos de la escena.

    this.add.image(400, 300, "separacion");  


    //Muros
    muros = this.physics.add.staticGroup();
    limites = this.physics.add.staticGroup();

    //Muros lado izquierdo
    muros.create(250, 408, "muro").setScale(0.7, 0.25).refreshBody();  //refresh body es necesario ya que se ha escalado un cuerpo estático
    muros.create(250, 208, "muro").setScale(0.7, 0.25).refreshBody();
    muros.create(150, 308, "muro").setScale(0.7, 0.25).refreshBody();

    //Muros lado derecho
    muros.create(550, 408, "muro").setScale(0.7, 0.25).refreshBody();  //refresh body es necesario ya que se ha escalado un cuerpo estático
    muros.create(550, 208, "muro").setScale(0.7, 0.25).refreshBody();
    muros.create(650, 308, "muro").setScale(0.7, 0.25).refreshBody();


    limites.create(400, 300, "separacion");


    //Personaje
    player1 = this.physics.add.sprite(100, 450, 'dude'); //Fisica dinamica (dinamic group) por defecto
    player2 = this.physics.add.sprite(500, 450, 'dude'); //Fisica dinamica (dinamic group) por defecto

    //Posicion del personaje

    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);


    //Jugador 1
    player1.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), //Usa los fottogramas 0, 1, 2 y 3
        frameRate: 10,
        repeat: -1  //La animación debe volver a empezar cuando termine
    });

    player1.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    player1.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //Jugador 2
    player2.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), //Usa los fottogramas 0, 1, 2 y 3
        frameRate: 10,
        repeat: -1  //La animación debe volver a empezar cuando termine
    });

    player2.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    player2.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player1, muros);
    this.physics.add.collider(player2, muros);
    this.physics.add.collider(player1, limites);
    this.physics.add.collider(player2, limites);

    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys('A,W,S,D,E,L');

       //bomba
    bombas = this.physics.add.group();
 this.physics.add.collider(player1, bombas, hitBomb, null, this);
function hitBomb (player1, bomba)
{
 player1.setActive(false).setVisible(false);
 bomba.destroy();
}
    this.physics.add.collider(muros, bombas, hitBomb1, null, this);
function hitBomb1 (muros, bomba)
{
 muros.destroy();
 bomba.destroy();
}
 this.physics.add.collider(player2, bombas, hitBomb, null, this);
function hitBomb (player2, bomba)
{
 player2.setActive(false).setVisible(false);
 bomba.destroy();
}

}





function update(time, delta) //Delta se usa para que en todos los navegadores el movimiento sea el mismo
{
    //Jugador 1
    if (cursors.down.isDown && cursors.left.isDown) {
        player1.setVelocityY(250);
        player1.setVelocityX(-250);
        player1.anims.play('left', true);

    } else if (cursors.down.isDown && cursors.right.isDown) {
        player1.setVelocityY(250);
        player1.setVelocityX(250);
        player1.anims.play('left', true);

    } else if (cursors.up.isDown && cursors.left.isDown) {
        player1.setVelocityY(-250);
        player1.setVelocityX(-250);
        player1.anims.play('left', true);

    } else if (cursors.up.isDown && cursors.right.isDown) {
        player1.setVelocityY(-250);
        player1.setVelocityX(250);
        player1.anims.play('left', true);

    } else if (cursors.left.isDown) {
        player1.setVelocityX(-250);

        player1.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player1.setVelocityX(250);

        player1.anims.play('right', true);

    } else if (cursors.up.isDown) {
        player1.setVelocityY(-250);
        player1.anims.play('right', true);

    } else if (cursors.down.isDown) {
        player1.setVelocityY(250);
        player1.anims.play('left', true);
    } else {
        player1.setVelocityX(0);
        player1.setVelocityY(0);

        player1.anims.play('turn');
    }


    //Jugador 2
    if (keys.S.isDown && keys.A.isDown) {
        player2.setVelocityY(250);
        player2.setVelocityX(-250);
        player2.anims.play('left', true);
    } else if (keys.S.isDown && keys.D.isDown) {
        player2.setVelocityY(250);
        player2.setVelocityX(250);
        player2.anims.play('left', true);

    } else if (keys.W.isDown && keys.A.isDown) {
        player2.setVelocityY(-250);
        player2.setVelocityX(-250);
        player2.anims.play('left', true);

    } else if (keys.W.isDown && keys.D.isDown) {
        player2.setVelocityY(-250);
        player2.setVelocityX(250);
        player2.anims.play('left', true);

    } else if (keys.A.isDown) {
        player2.setVelocityX(-250);

        player2.anims.play('left', true);
    }
    else if (keys.D.isDown) {
        player2.setVelocityX(250);

        player2.anims.play('right', true);

    } else if (keys.W.isDown) {
        player2.setVelocityY(-250);
        player2.anims.play('right', true);

    } else if (keys.S.isDown) {
        player2.setVelocityY(250);
        player2.anims.play('left', true);
    } else {
        player2.setVelocityX(0);
        player2.setVelocityY(0);

        player2.anims.play('turn');
    }
       if(keys.E.isDown){
      var x = player2.x;
      var y = player2.y;
        var bomba=bombas.create(x,y,'bomba');
        bomba.setBounce(1);
        bomba.setCollideWorldBounds(true);
        bomba.setVelocity(Phaser.Math.Between(-200, 0), 20);
    }
      if(keys.L.isDown){
      var x = player1.x;
      var y = player1.y;
        var bomba=bombas.create(x,y,'bomba');
        bomba.setBounce(1);
        bomba.setCollideWorldBounds(true);
        bomba.setVelocity(Phaser.Math.Between(0, 200), 20);
    }



}
