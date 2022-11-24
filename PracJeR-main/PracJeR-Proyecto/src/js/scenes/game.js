
//rama Alex 2

//INTENTO DE MARCADOR
var score1 = 0;
var score2 = 0;
var scoreBoard1,scoreBoard2;
var player1, player2, muros, limites, bombas,x,y, t1, t2, textoFinPartida; //se sacan las variables fuera de la clase
var t1 = 1000;
var t2 = 1000;
//intento clase jugador 
class Jugador{
  constructor(vida){
    this.vida=vida;
  }
  get getVida(){
    return this.vida;
  }
  set setVida(value){
    this.vida = value;
  }
}


class Muro{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.vida = 2;
  }
}


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

    this.load.spritesheet("animacionMuro",
        "../../resources/img/animacionMuro.png",
        { frameWidth: 32, frameHeight: 400 }
    );

    this.load.image("muroRoto", "../../resources/img/muroRoto.png");
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

    var coberturas = new Array(); //Array que contiene los muros

    //Muros lado izquierdo
    muros.create(250, 408, "muro").setScale(0.7, 0.25).refreshBody();  //refresh body es necesario ya que se ha escalado un cuerpo estático
    coberturas[0] = new Muro(250, 408);
    muros.create(250, 208, "muro").setScale(0.7, 0.25).refreshBody();
    coberturas[1] = new Muro(250, 208);
    muros.create(150, 308, "muro").setScale(0.7, 0.25).refreshBody();
    coberturas[2] = new Muro(150, 308);

    //Muros lado derecho
    muros.create(550, 408, "muro").setScale(0.7, 0.25).refreshBody();  //refresh body es necesario ya que se ha escalado un cuerpo estático
    coberturas[3] = new Muro(550, 408);
    muros.create(550, 208, "muro").setScale(0.7, 0.25).refreshBody();
    coberturas[4] = new Muro(550, 208);
    muros.create(650, 308, "muro").setScale(0.7, 0.25).refreshBody();
    coberturas[5] = new Muro(650, 308);

    limites.create(400, 300, "separacion");

    //Personaje
    player1 = this.physics.add.sprite(100, 450, 'dude'); //Fisica dinamica (dinamic group) por defecto
    player2 = this.physics.add.sprite(500, 450, 'dude'); //Fisica dinamica (dinamic group) por defecto

    //INSTANCIACION JUGADOR 1
    const playerC1 = new Jugador(10);
    const playerC2 = new Jugador(10);

    //Posicion del personaje
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);

    //creación de animaciones personaje
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

    this.anims.create({
      key: 'entero',
      frames: [{ key: 'animacionMuro', frame: 0 }],
      frameRate: 20
  });

    //ANIMACIONES MUROS
    this.anims.create({
      key: 'roto',
      frames: this.anims.generateFrameNumbers('animacionMuro', { start: 0, end: 1 }),
      frameRate: 32,
  });


    
    this.cursors = this.input.keyboard.createCursorKeys();  //Crea el objeto cursors (con 4 propiedades: up, down, left, right)
    this.keys = this.input.keyboard.addKeys('A,W,S,D,E,L');

    this.physics.add.collider(player1, muros);
    this.physics.add.collider(player2, muros);
    this.physics.add.collider(player1, limites);
    this.physics.add.collider(player2, limites);

    bombas = this.physics.add.group();
    this.physics.add.collider(player1, bombas, hitBomb, null, this);
   
    //INTENTO DE MARCADOR 2
    scoreBoard2 = this.add.text(440, 40, "P2: 0", {fontSize: '32px', fill: '#fff'});
    scoreBoard1 = this.add.text(240, 40, "P1: 0", {fontSize: '32px', fill: '#fff'});

    //algoritmo que detecta bomba contra jugador detiene la partida
    //HAY ALGUN PROBLEMA CON LA DETECCION DE JUGADOR UN Y 2 TODO
    function hitBomb (player1, bomba)
   {
    playerC1.setVida = 0;
    console.log("hola2");
    marcador();
    player1.setActive(false);
    bomba.destroy();
    this.physics.pause();
    player1.anims.play('turn');

    textoFinPartida = this.add.text(200, 200, 'Fin de partida \n Jugador 1 gana', 
    { fontSize: '50px', fill: '#000' });
   }
   
   this.physics.add.collider(muros, bombas, hitBomb1, null, this);

   //Detección colisión muro-bomba
   function hitBomb1 (muro, bomba)
   {

    var temp;
    for(var i=0; i<coberturas.length; i++){
      if(muro.x == coberturas[i].x && muro.y == coberturas[i].y){
          coberturas[i].vida--;
          temp = i;
          muro.anims.play('roto', true);
        }
    }

    if(coberturas[temp].vida == 0){
    muro.destroy();
    }
    bomba.destroy();
   }


    this.physics.add.collider(player2, bombas, hitBomb, null, this);

   function hitBomb (player2, bomba)
   {
    console.log("hola1");
    playerC2.setVida = 0;
    marcador();
    player2.setActive(false);
    bomba.destroy();
    this.physics.pause();
    player2.anims.play('turn');
    player1.anims.play('turn');
    textoFinPartida = this.add.text(200, 200, 'Fin de partida \n Jugador 2 gana', 
    { fontSize: '50px', fill: '#000' });
   }

    //INTENTO DE MARCADOR 3
    function marcador(){
      if(playerC1.getVida == 0){
        score1 += 1;
        scoreBoard1.setText('P1: ' + score1);
        console.log("hola");
      }
      else if(playerC2.getVida== 0){
        score2 += 5;
        scoreBoard2.setText('P2: ' + score2);
      }
      
    }
}





  update(time, delta) //Delta se usa para que en todos los navegadores el movimiento sea el mismo
  {

  //Jugador 1
      if (this.cursors.down.isDown && this.cursors.left.isDown) {
        player1.setVelocityY(250);
        player1.setVelocityX(-250);
        player1.anims.play('left', true);
            
      }  else if (this.cursors.down.isDown && this.cursors.right.isDown) {
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
    if(this.keys.E.isDown)
    {
      if(t1 < time - 1000){
      this.bomba=bombas.create(player2.x-2,player2.y,'bomba');
      this.bomba.setBounce(1);
      this.bomba.setCollideWorldBounds(true);
      this.bomba.setVelocity(Phaser.Math.Between(-200, 0), 20);
      t1 = time;
      }
    }
    if(this.keys.L.isDown)
    {
      if(t2 < time - 1000)
      {
        this.bomba=bombas.create(player1.x+2,player1.y,'bomba');
        this.bomba.setBounce(1);
        this.bomba.setCollideWorldBounds(true);
        this.bomba.setVelocity(Phaser.Math.Between(0, 200), 20);
        t2 = time;
      }
    }
    

  }
}