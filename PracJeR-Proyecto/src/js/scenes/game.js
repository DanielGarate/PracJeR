// Estos son los objetos que vamos ausar en el juego
var player1, player2, muros,limites,bombas,x,y; //se sacan las variables fuera de la clase

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

   // Elementos que definen el campo
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
    var playerExp = {
      figura: this.physics.add.sprite(300, 450, 'dude')
    }
    player1 = this.physics.add.sprite(100, 450, 'dude'); //Fisica dinamica (dinamic group) por defecto
    player1.direcionMira = 'Down';
    player2 = this.physics.add.sprite(500, 450, 'dude'); //Fisica dinamica (dinamic group) por defecto
    player2.direcionMira = 'Down';
    //Posicion del personaje
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);
    //creación de animaciones
    // Al pulsar la flecha izquierda se usa el loop de animación de movimiento izquierda
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }), //Usa los fottogramas 0, 1, 2 y 3
        frameRate: 10,
        repeat: -1  //La animación debe volver a empezar cuando termine
    });
    // Al pulsar la flecha arriba se usa el loop de animación de movimiento hacia arriba
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    // Al pulsar la flecha abajo se usa el loop de animación de movimiento hacia abajo
    /*this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });*/

    // Al pulsar la flecha derecha se usa el loop de animación de movimiento derecha
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.cursors = this.input.keyboard.createCursorKeys();  //Crea el objeto cursors (con 4 propiedades: up, down, left, right)
    this.keys = this.input.keyboard.addKeys('A,W,S,D,E,L');

    //////////////////////////////////////////////////////////////////////////
    /*COLISIONES Y SUS EVENTOS*/
    //////////////////////////////////////////////////////////////////////////

    // Añade la propiedad de colisionado a los objetos que la requieran
    this.physics.add.collider(player1, muros);
    this.physics.add.collider(player2, muros);
    this.physics.add.collider(player1, limites);
    this.physics.add.collider(player2, limites);

    bombas = this.physics.add.group();

    // Evento bomba choca con personaje 1
    this.physics.add.collider(player1, bombas, hitBomb, null, this);
    function hitBomb (player1, bomba)
    {
    // En esta versión vuelve invisible al personaje 1
    //DESACTIVADO PARA DEBUG
    //player1.setActive(false).setVisible(false);
    // Y la bomba se destruye
    //bomba.destroy();
    }
   
   // Evento bomba choca con muro
   this.physics.add.collider(muros, bombas, hitBomb1, null, this);
   function hitBomb1 (muros, bomba)
   {
    // Destruye el muro y la bomba al impacto
    muros.destroy();
    bomba.destroy();
   }

    this.physics.add.collider(player2, bombas, hitBomb, null, this);
   function hitBomb (player2, bomba)
   {
    //DESACTIVADO PARA DEBUG
    //player2.setActive(false).setVisible(false);
    //bomba.destroy();
   }

}

update(time, delta) //Delta se usa para que en todos los navegadores el movimiento sea el mismo
{
  //////////////////////////////////////////////////////////////////////////
  /*MOVIMIENTO DE LOS PERSONAJES*/
  //////////////////////////////////////////////////////////////////////////
//Jugador 1
// Se mueve con la flechas

// Abajo-Izquierda
    if (this.cursors.down.isDown && this.cursors.left.isDown) {
      player1.setVelocityY(250);
      player1.setVelocityX(-250);
      player1.anims.play('left', true);
      player1.direcionMira = 'DownLeft';
// Abajo-Derecha
    }   else if (this.cursors.down.isDown && this.cursors.right.isDown) {
      player1.setVelocityY(250);
      player1.setVelocityX(250);
      player1.anims.play('left', true);
      player1.direcionMira = 'DownRight';
// Arriba-Izquierda
    } else if (this.cursors.up.isDown && this.cursors.left.isDown) {
      player1.setVelocityY(-250);
      player1.setVelocityX(-250);
      player1.anims.play('left', true);
      player1.direcionMira = 'UpLeft';
// Arriba-Derecha
    } else if (this.cursors.up.isDown && this.cursors.right.isDown) {
      player1.setVelocityY(-250);
        player1.setVelocityX(250);
        player1.anims.play('left', true);
        player1.direcionMira = 'UpRight';
// Izquierda
    } else if (this.cursors.left.isDown) {
      player1.setVelocityX(-250);
      player1.anims.play('left', true);
      player1.direcionMira = 'Left';
      console.log(player1.direcionMira);
    }
// Derecha
    else if (this.cursors.right.isDown) {
      player1.setVelocityX(250);
      player1.anims.play('right', true);
      
      player1.direcionMira = 'Right';
      console.log(player1.direcionMira);
    }
// Arriba
    else if (this.cursors.up.isDown) {
      player1.setVelocityY(-250);
      player1.anims.play('right', true);
      player1.direcionMira = 'Up';
      console.log(player1.direcionMira);
    }
// Abajo    
    else if (this.cursors.down.isDown) {
      player1.setVelocityY(250);
      player1.anims.play('left', true);
      player1.direcionMira = 'Down';
      console.log(player1.direcionMira);
    }
// Quieto
    else {
      player1.setVelocityX(0);
      player1.setVelocityY(0);
      player1.anims.play('turn');
    }
    //Jugador 2
    // Se mueve con WASD
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

  //////////////////////////////////////////////////////////////////////////
  /*Disparos DE LOS PERSONAJES*/
  //////////////////////////////////////////////////////////////////////////

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
      //this.bomba.setVelocity(Phaser.Math.Between(0, 200), 20);
      switch (player1.direcionMira){
        case 'Up':
          this.bomba.setVelocity(0, -100);
          console.log(player1.direcionMira);
          break;
        case 'UpRight':
          this.bomba.setVelocity(100, -100);
          console.log(player1.direcionMira);
          break;
        case 'Right':
          this.bomba.setVelocity(100, 0);
          console.log(player1.direcionMira);
          break;
        case 'DownRight':
          this.bomba.setVelocity(100, 100);
          console.log(player1.direcionMira);
          break;
        case 'Down':
          this.bomba.setVelocity(0, 100);
          break;
        case 'DownLeft':
          this.bomba.setVelocity(-100, 100);
          console.log(player1.direcionMira);
          break;
        case 'Left':
          this.bomba.setVelocity(-100, 0);
          console.log(player1.direcionMira);
          break;
        case 'UpLeft':
          this.bomba.setVelocity(-100, -100);
          console.log(player1.direcionMira);
        break;
      }
  }
  }

}