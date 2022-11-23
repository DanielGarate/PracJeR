var player1, player2, muros,limites,bombas,x,y; //se sacan las variables fuera de la clase
//hola esta es rama alex

export class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }
  preload() {
    this.load.image("campo", "../../resources/img/campo.png");
    this.load.spritesheet("dude",
        "../../resources/img/dude.png",
        { frameWidth: 32, frameHeight: 48 }
    );
    this.load.image("muro", "../../resources/img/muro.png");
    this.load.image("separacion", "../../resources/img/separacion.png");
    this.load.image("bomba", "../../resources/img/bomb.png");

  }

  create() {
   
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
    //creación de animaciones
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
    
    this.cursors = this.input.keyboard.createCursorKeys();  //Crea el objeto cursors (con 4 propiedades: up, down, left, right)
    this.keys = this.input.keyboard.addKeys('A,W,S,D,E,L');

    this.physics.add.collider(player1, muros);
    this.physics.add.collider(player2, muros);
    this.physics.add.collider(player1, limites);
    this.physics.add.collider(player2, limites);

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

update(time, delta) //Delta se usa para que en todos los navegadores el movimiento sea el mismo
{
//Jugador 1
    if (this.cursors.down.isDown && this.cursors.left.isDown) {
      player1.setVelocityY(250);
      player1.setVelocityX(-250);
      player1.anims.play('left', true);
          
    }   else if (this.cursors.down.isDown && this.cursors.right.isDown) {
      player1.setVelocityY(250);
      player1.setVelocityX(250);
      player1.anims.play('left', true);
    } else if (this.cursors.up.isDown && this.cursors.left.isDown) {
      player1.setVelocityY(-250);
      player1.setVelocityX(-250);
      player1.anims.play('left', true);
    } else if (this.cursors.up.isDown && this.cursors.right.isDown) {
      player1.setVelocityY(-250);
        player1.setVelocityX(250);
        player1.anims.play('left', true);
    } else if (this.cursors.left.isDown) {
      player1.setVelocityX(-250);
      player1.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      player1.setVelocityX(250);
      player1.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      player1.setVelocityY(-250);
      player1.anims.play('right', true);
    } else if (this.cursors.down.isDown) {
      player1.setVelocityY(250);
      player1.anims.play('left', true);
    } else {
      player1.setVelocityX(0);
      player1.setVelocityY(0);
      player1.anims.play('turn');
    }
    //Jugador 2
    if (this.keys.S.isDown && this.keys.A.isDown) {
      player2.setVelocityY(250);
      player2.setVelocityX(-250);
      player2.anims.play('left', true);
  } else if (this.keys.S.isDown && this.keys.D.isDown) {
      player2.setVelocityY(250);
      player2.setVelocityX(250);
      player2.anims.play('left', true);

  } else if (this.keys.W.isDown && this.keys.A.isDown) {
      player2.setVelocityY(-250);
      player2.setVelocityX(-250);
      player2.anims.play('left', true);

  } else if (this.keys.W.isDown && this.keys.D.isDown) {
      player2.setVelocityY(-250);
      player2.setVelocityX(250);
      player2.anims.play('left', true);

  } else if (this.keys.A.isDown) {
      player2.setVelocityX(-250);

      player2.anims.play('left', true);
  }
  else if (this.keys.D.isDown) {
      player2.setVelocityX(250);

      player2.anims.play('right', true);

  } else if (this.keys.W.isDown) {
      player2.setVelocityY(-250);
      player2.anims.play('right', true);

  } else if (this.keys.S.isDown) {
      player2.setVelocityY(250);
      player2.anims.play('left', true);
  } else {
      player2.setVelocityX(0);
      player2.setVelocityY(0);

      player2.anims.play('turn');
  }
  if(this.keys.E.isDown){
    this.bomba=bombas.create(player2.x,player2.y,'bomba');
    this.bomba.setBounce(1);
    this.bomba.setCollideWorldBounds(true);
    this.bomba.setVelocity(Phaser.Math.Between(-200, 0), 20);
  }
  if(this.keys.L.isDown){
      this.bomba=bombas.create(player1.x,player1.y,'bomba');
      this.bomba.setBounce(1);
      this.bomba.setCollideWorldBounds(true);
      this.bomba.setVelocity(Phaser.Math.Between(0, 200), 20);
  }
  }

}