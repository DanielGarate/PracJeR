
var player1Name = '';

class LogInButton{
    constructor(scene,indentNextScene,posX,posY,sprite){
        this.actualScene = scene;
        this.nextScene = indentNextScene;
        this.x = posX;
        this.y = posY;
        this.spriteKey = sprite;
    }
    preload(){
        this.actualScene.load.spritesheet('buttonPl', '../../../resources/img/spritePlay.png',
        { frameWidth: 896/2, frameHeight: 79 }
        ); //le asocia el sprite
        
    }
    create(){
        this.startButton = this.actualScene.add.sprite(this.x,this.y,this.spriteKey).setInteractive(); //añade a la escena actual el sprite y lo vuelve interactivo
        this.startButton.on('pointerover',()=>{
            this.startButton.setFrame(1);
        })
        this.startButton.on('pointerout',()=>{
            this.startButton.setFrame(0);
        })
        this.startButton.on('pointerdown',()=>{
			

        	var user = {
            	name: player1Name,
            	password: ' ',
        	}
        	console.log(player1Name);
        
       
        loadUsers(function (users) {
			 
		var existe = false;
			 
        //When users are loaded from server
        for (var i = 0; i < users.length; i++) {
            if(users[i].name == player1Name && users[i].password != ' '){
            	console.log("Usuario repetido");
            	existe = true;
			}else if(users[i].name == player1Name && users[i].password == ' '){
            	console.log("Bienvenido " + player1Name);
            	existe = true;
			}
        }
        	if(!existe){
                createUser(user, function (userWithId) {
            //When user with id is returned from server        
            showUser(userWithId);
            console.log("Usuario  " + player1Name + " creado correctamente");
        });
        }

        
    });
        })
    
    }
   
    }

class button{
    constructor(scene,indentNextScene,posX,posY,sprite){
        this.actualScene = scene;
        this.nextScene = indentNextScene;
        this.x = posX;
        this.y = posY;
        this.spriteKey = sprite;
    }
    preload(){
        this.actualScene.load.spritesheet('buttonPl', '../../../resources/img/spritePlay.png',
        { frameWidth: 896/2, frameHeight: 79 }
        ); //le asocia el sprite
        this.actualScene.load.spritesheet('buttonGo', '../../../resources/img/spritePlay.png',
        { frameWidth: 896/2, frameHeight: 79 }
        ); //le asocia el sprite
        this.actualScene.load.spritesheet('buttonOp', '../../resources/img/spriteOpciones.png',
        { frameWidth: 896/2, frameHeight: 79 }
        ); //le asocia el sprite
        this.actualScene.load.spritesheet('buttonCr', '../../resources/img/spriteCredits.png',
        { frameWidth: 893/2, frameHeight: 79 }
        ); //le asocia el sprite
        this.actualScene.load.spritesheet('buttonBa', '../../resources/img/SPRITESHEETBACK.png',
        { frameWidth: 340/2, frameHeight: 72 }
        ); //le asocia el sprite
        this.actualScene.load.spritesheet('buttonPA', '../../resources/img/spritePlayAgain.png',
        { frameWidth: 896/2, frameHeight: 79 }
        ); //le asocia el sprite
        this.actualScene.load.spritesheet('buttonMM', '../../resources/img/spriteMainMenu.png',
        { frameWidth: 896/2, frameHeight: 79 }
        ); //le asocia el sprite
        
    }
    create(){
        this.startButton = this.actualScene.add.sprite(this.x,this.y,this.spriteKey).setInteractive(); //añade a la escena actual el sprite y lo vuelve interactivo
        this.startButton.on('pointerover',()=>{
            this.startButton.setFrame(1);
        })
        this.startButton.on('pointerout',()=>{
            this.startButton.setFrame(0);
        })
        this.startButton.on('pointerdown',()=>{
            this.actualScene.sound.stopAll();
            this.actualScene.scene.start(this.nextScene);  
        })
    
    }
   
    }
    
    

class Credits extends Phaser.Scene {
    constructor() {
        super({ key: 'creditos' });
        this.buttonBack = new button(this,'menuInicial',100,50,'buttonBa');
      }
      preload(){
        this.buttonBack.preload();
        this.load.image("fondo", "../../resources/img/pantallacreditos.png");

      }
      create(){
        
        this.add.image(400, 300, "fondo");  //Añade un nuevo elemento del juego 
        this.buttonBack.create();
    }
    }



class SignIn extends Phaser.Scene {
  constructor() {
    super({ key: 'signIn' });
    this.button = new button(this,'game',230,460,'buttonGo');
    this.logInButton = new LogInButton(this,'game',230,540,'buttonGo');

  }

  preload() {

    this.load.image("pantallaSignIn", "../../resources/img/PANTALLAINIC.png");
    this.button.preload();
    this.logInButton.preload();
    this.logInButton.preload();
    }
 

  create() {
	this.add.image(400, 300, "pantallaSignIn");  //Añade un nuevo elemento del juego 
    this.add.text(80, 350, 'Enter your name', { font: '32px Courier', fill: '#ffffff' });
    this.button.create();
    this.logInButton.create();
	


	//https://phaser.io/examples/v3/view/input/keyboard/text-entry
    var textEntry = this.add.text(80, 390, '', { font: '32px Courier', fill: '#ffff00' });

    this.input.keyboard.on('keydown', function (event) {
		
		if(event.keyCode != 8 && event.keyCode != 13 &&
		event.keyCode != 16 && event.keyCode != 32 &&
		event.keyCode != 59){
			player1Name += event.key;
		}		

        if (event.keyCode === 8 && textEntry.text.length > 0)
        {
            textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
            player1Name--;
        }
        else if (event.keyCode >= 48 && event.keyCode < 90)
        {
            textEntry.text += event.key;
        }



    });
    
    console.log(player1Name);

	

    
  }


}




var score1 = 0;  //Puntuacion jugador 1
var score2 = 0;  //Puntuacion jugador 2
var scoreBoard1, scoreBoard2; //Para imprimir las puntuaciones de J1 y J2
var player1, player2; //Para referenciar a los jugadores
var muros, limites, bombas;  //Representan grupos
var spawnBombas1, spawnBombas2; //Lugares donde apareceran las bombas
var text, textoFinPartida; //Para poder mostrar texto
var explosion, explosion1;  //Para el cuerpo de las explosiones
var timedEvent;  //Necesario para el timer
var posExplosionX, posExplosionY;  //Posicion de las explosiones
var timedEvent1;
var c1 = 0; //...
var c2 = 0; //Para el control de spawns
var name1, name2;


class Muro {            //Clase muro para poder destruir cuerpos
    constructor(x, y) { //Constructor con las posiciones
        this.x = x;     //Posicion en x
        this.y = y;     //Posicion en y
        this.vida = 3;  //Vida del muro (numero de explosiones necesarias para destruirlo)
    }
}


class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }
    preload() {
        //SE INCLUYEN LAS ANIMACIONES NECESARIAS
        this.load.spritesheet("dude",
            "../../resources/img/personaje.png",
            { frameWidth: 32, frameHeight: 48 }
        );  //Animacion personaje 1

        this.load.spritesheet("realDude",
            "../../resources/img/realDude.png",
            { frameWidth: 60, frameHeight: 81 }
        ); //Animacion personaje 2

        this.load.spritesheet("animacionMuro",
            "../../resources/img/animacionMuro.png",
            { frameWidth: 38, frameHeight: 156 }
        );  //Animacion de degradacion de muros

        this.load.spritesheet("Explosion",
            "../../resources/img/ExplosionAnimacion.png",
            { frameWidth: 83, frameHeight: 73 }
        );  //Animacion de la explosion

        //SE INCLUYEN LAS IMAGENES NECESARIAS
        this.load.image("campo", "../../resources/img/campo.png");  //Imagen del campo
        this.load.image("muro", "../../resources/img/muro.png");  //Imagen muros
        this.load.image("separacion", "../../resources/img/separacion.png");  //Limite central
        this.load.image("bomba", "../../resources/img/bomb.png");  //Imagen bombas
        this.load.image("sombraMuro", "../../resources/img/sombraMuro.png");  //Imagen sombra de muro
    
        //SE INCLUYE EL AUDIO NECESARIO
        this.load.audio("bum", "../../resources/sound/sonidoExplosion.mp3");
        this.load.audio('temaBatalla', '../../../resources/audio/vulcano.ogg');

        //
        this.load.spritesheet('buttonPause', '../../resources/img/spritePause.png',
        { frameWidth: 208/2, frameHeight: 34 }
        );
        this.load.spritesheet('buttonContinue', '../../../resources/img/buttonContinue.png',
        { frameWidth: 91, frameHeight: 91 }
        );
    }

    create() {
        this.battleTheme = this.sound.add('temaBatalla');
        this.battleTheme.play();

        //SE AÑADEN LAS IMAGENES INCLUIDAS EN EL PRELOAD
        this.add.image(400, 300, "campo");
        this.add.image(400, 300, "separacion");


        //SE AÑADE EL AUDIO INCLUIDO EN EL PRELOAD
        //Se añaden los archivos de audio y se preparan para cuando se les llame
        this.bum = this.sound.add("bum");


        //MARCADOR
        scoreBoard2 = this.add.text(440, 40, "P2: 0", { fontSize: '45px', fill: '#005713' }); //Con puntuacion inicial 0
        scoreBoard1 = this.add.text(240, 40, "P1: 0", { fontSize: '45px', fill: '#005713' });

        //GRUPOS ESTATICOS
        muros = this.physics.add.staticGroup();
        limites = this.physics.add.staticGroup();
        explosion = this.physics.add.staticGroup();
        explosion1 = this.physics.add.staticGroup();

        //ARRAY QUE GUARDARA LOS OBJETOS DE LA CLASE MURO CREADOS
        var coberturas = new Array();


        //SE CREAN LOS MUROS POR PARTES
        //Muros lado izquierdo
        muros.create(250, 408, "muro").setScale(0.8, 0.75).refreshBody();  //refresh body es necesario ya que se ha escalado un cuerpo estático
        coberturas[0] = new Muro(250, 408);
        muros.create(250, 208, "muro").setScale(0.8, 0.75).refreshBody();
        coberturas[1] = new Muro(250, 208);
        muros.create(150, 308, "muro").setScale(0.8, 0.75).refreshBody();
        coberturas[2] = new Muro(150, 308);

        //Muros lado derecho
        muros.create(550, 408, "muro").setScale(0.8, 0.75).refreshBody();  //refresh body es necesario ya que se ha escalado un cuerpo estático
        coberturas[3] = new Muro(550, 408);
        muros.create(550, 208, "muro").setScale(0.8, 0.75).refreshBody();
        coberturas[4] = new Muro(550, 208);
        muros.create(650, 308, "muro").setScale(0.8, 0.75).refreshBody();
        coberturas[5] = new Muro(650, 308);

        //Limite central
        limites.create(400, 300, "separacion");

        //Se crean los personajes, apuntando hacia adelante por defecto
        player1 = this.physics.add.sprite(100, 450, 'realDude').setScale(0.7, 0.7).refreshBody(); //Fisica dinamica (dinamic group) por defecto
        player1.direcionMira = 'Right';
        player2 = this.physics.add.sprite(700, 450, 'realDude').setScale(0.7, 0.7).refreshBody();; //Fisica dinamica (dinamic group) por defecto
        player2.direcionMira = 'Left';


        //Los personajes no se pueden salir del mapa
        player1.setCollideWorldBounds(true);
        player2.setCollideWorldBounds(true);


        //Spawn de bombas
        //S2
        spawnBombas1 = this.physics.add.sprite(100, 100, 'bomba');
        spawnBombas1.localizacion = 0;
        spawnBombas1.setTint(0xff0000); //Se pinta de rojo para diferenciar
        //S1
        spawnBombas2 = this.physics.add.sprite(700, 100, 'bomba');
        spawnBombas2.localizacion = 0;
        spawnBombas2.setTint(0xff0000);


        //ANIMACIONES
        //Personaje
        this.anims.create({
            key: 'left1',
            frames: this.anims.generateFrameNumbers('realDude', { start: 0, end: 2 }), //Usa los fottogramas 0, 1, 2 y 3
            frameRate: 10,
            repeat: -1  //La animacion debe volver a empezar cuando termine
        });

        this.anims.create({
            key: 'turn1',
            frames: [{ key: 'realDude', frame: 9 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'up1',
            frames: this.anims.generateFrameNumbers('realDude', { start: 4, end: 6 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'down1',
            frames: this.anims.generateFrameNumbers('realDude', { start: 7, end: 9 }),
            frameRate: 10
        });


        this.anims.create({
            key: 'right1',
            frames: this.anims.generateFrameNumbers('realDude', { start: 10, end: 12 }),
            frameRate: 10,
            repeat: -1
        });

        //Muros
        this.anims.create({
            key: 'roto1',
            frames: this.anims.generateFrameNumbers('animacionMuro', { start: 0, end: 1 }),
            frameRate: 32,
        });
        this.anims.create({
            key: 'roto2',
            frames: this.anims.generateFrameNumbers('animacionMuro', { start: 1, end: 2 }),
            frameRate: 32,
        });


        //Explosion
        this.anims.create({
            key: 'boom',
            frames: this.anims.generateFrameNumbers('Explosion', { start: 0, end: 12 }),
            frameRate: 20,
            repeat: 0,
            killOnComplete: true,
        });

        //OBJETO CURSORS PARA MOVERSE
        this.cursors = this.input.keyboard.createCursorKeys();  //Crea el objeto cursors (con 4 propiedades: up, down, left, right)
        this.keys = this.input.keyboard.addKeys('A,W,S,D,E,L'); //Se añaden w,a,s,d para el  J2



        //GRUPOS DINAMICOS
        bombas = this.physics.add.group();
        
        //COLIDERS
        this.physics.add.collider(player1, muros);
        this.physics.add.collider(player2, muros);
        this.physics.add.collider(player1, limites);
        this.physics.add.collider(player2, limites);




        //SUPERPOSICION SPAWNS
        //spawnBombas1
        this.physics.add.overlap(player1, spawnBombas1, refill1, null, this);

        function refill1(jugador, spawn) {
            if (!jugador.municion) {
                jugador.setTint(0x09D802);
                jugador.municion = true;
                let newLoc = Phaser.Math.Between(0, 4);
                spawn.localizacion = newLoc;
                cambiaPosicion1(spawn);
            }
        }

        function cambiaPosicion1(spawn) {

            switch (spawn.localizacion) {
                case 0:
                    spawn.setPosition(100, 500);
                    //spawn.localizacion++;
                    break;

                case 1:
                    spawn.setPosition(225, 200);
                    //spawn.localizacion++;
                    break;

                case 2:
                    spawn.setPosition(225, 400);
                    //spawn.localizacion++;
                    break;

                case 3:
                    spawn.setPosition(350, 300);
                    //spawn.localizacion++;
                    break;

                case 4:
                    spawn.setPosition(100, 100);
                    //spawn.localizacion = 0;
                    break;
            }
        }



        //spawnBombas2
        this.physics.add.overlap(player2, spawnBombas2, refill2, null, this);
        function refill2(jugador, spawn) {
            if (!jugador.municion) {
                jugador.setTint(0x09D802);
                jugador.municion = true;
                let newLoc = Phaser.Math.Between(0, 4);
                spawn.localizacion = newLoc;
                cambiaPosicion2(spawn);
            }
        }

        function cambiaPosicion2(spawn) {

            switch (spawn.localizacion) {
                case 0:
                    spawn.setPosition(700, 500);
                    //spawn.localizacion++;
                    break;

                case 1:
                    spawn.setPosition(575, 200);
                    //spawn.localizacion++;
                    break;

                case 2:
                    spawn.setPosition(575, 400);
                    //spawn.localizacion++;
                    break;

                case 3:
                    spawn.setPosition(450, 300);
                    //spawn.localizacion++;
                    break;

                case 4:
                    spawn.setPosition(700, 100);
                    //spawn.localizacion = 0;
                    break;
            }
        }


        //SE AÑADE UNA COLISION DE MUROS CON BOMBAS
        this.physics.add.collider(muros, bombas, hitBomb1, null, this);

        //Detección colisión muro-bomba
        function hitBomb1(muro, bomba) {

            var temp;
            for (var i = 0; i < coberturas.length; i++) {
                if (muro.x == coberturas[i].x && muro.y == coberturas[i].y) {
                    coberturas[i].vida--;
                    temp = i;

                    if (coberturas[i].vida == 2) {
                        muro.anims.play('roto1', true);
                    } else if (coberturas[i].vida == 1) {
                        muro.anims.play('roto2', true);
                    }
                }
            }

            if (coberturas[temp].vida == 0) {
                muro.destroy();
                explosion1.create(posExplosionX, posExplosionY, 'bomba').setScale(3, 3).refreshBody();
                explosion1.setVisible(false);
            }

            posExplosionX = bomba.x; //Se guarda la ultima posicion de la bomba 
            posExplosionY = bomba.y;
            explosion.create(posExplosionX, posExplosionY, 'bomba').setScale(3, 3).refreshBody(); //Se genera un sprite invisible de mayor tamaño que la bomba para posteriormente realizar la colision de la explosion
            explosion.setVisible(false);
            this.bum.play();
            this.animExplosion = this.add.sprite(posExplosionX, posExplosionY, 'boom');//Se crea e inicia la animacion de la explosion en la ultima posicion de la bomba
            this.animExplosion.anims.play('boom');
            bomba.destroy(); //Se destruye la bomba 
        }

        //FUNCION PARA EXPLOSION
        this.physics.add.collider(muros, explosion, hitExplosion, null, this); //Se crea una colision que elimina la explosion para que no se quede flotando
        function hitExplosion(muro, explosion) {
            this.timer1 = 1;
            timedEvent1 = this.time.addEvent({ delay: 1000, callback: onEvent1, callbackScope: this, loop: true });
            function onEvent1() //cada vez que pase un segundo se ejecutará onEvent(), poner aqui creacion de bombas y 
            {
                this.timer1 -= 1; // One second
                if (this.timer1 <= 0) {
                    explosion.destroy();
                }
            }

        }

        this.physics.add.collider(explosion1, explosion, hitExplosion3, null, this); //Se crea una colision que elimina la explosion para que no se quede flotando
        function hitExplosion3(explosion1, explosion) {
        this.timer1=1
        timedEvent1 = this.time.addEvent({ delay: 1000, callback: onEvent1,callbackScope: this, loop: true});
         function onEvent1() //cada vez que pase un segundo se ejecutará onEvent(), poner aqui creacion de bombas y 
        {
            this.timer1 -= 1; // One second
            if (this.timer1 <= 0) {
              explosion.destroy();
            }
        }

        }


        //Deteccion colisione J1-bombas
        this.physics.add.collider(player1, bombas, hitBomb, null, this);
        function hitBomb(player1, bomba) { //Colision que se encarga del impacto directo del jugador con la bomba
            score2++;
            marcador();
            player1.setPosition(100, Phaser.Math.Between(0, 600));
            posExplosionX = bomba.x;
            posExplosionY = bomba.y;
            this.bum.play();
            this.animExplosion = this.add.sprite(posExplosionX, posExplosionY, 'boom');
            this.animExplosion.anims.play('boom');
            bomba.destroy();
        }

        this.physics.add.collider(player1, explosion, hitExplosion1, null, this);
        function hitExplosion1(player1, explosion) { //Colision con la explosion simulada 
            score2++;
            marcador();
            player1.setPosition(100, Phaser.Math.Between(0, 600));
            explosion.destroy(); //Destruye la explosion para que no puedas volver a chocar
        }

        //Colisiones J2-bombas
        this.physics.add.collider(player2, bombas, hitBomb2, null, this);

        function hitBomb2(player2, bomba) {
            score1++;
            marcador();
            player2.setPosition(700, Phaser.Math.Between(0, 600));
            posExplosionX = bomba.x;
            posExplosionY = bomba.y;
            this.bum.play();
            this.animExplosion = this.add.sprite(posExplosionX, posExplosionY, 'boom');
            this.animExplosion.anims.play('boom');
            bomba.destroy();
        }

        this.physics.add.collider(player2, explosion, hitExplosion2, null, this);

        function hitExplosion2(player2, explosion) {//Colision con la explosion simulada 
            score1++;
            marcador();
            player2.setPosition(700, Phaser.Math.Between(0, 600));

            explosion.destroy();//Destruye la explosion para que no puedas volver a chocar
        }

        //Colision bomba-bomba que permite eliminar las minas en el mapa

        this.physics.add.collider(bombas, bombas, ColisionBombas, null, this);
        function ColisionBombas(bomba, bomba1) {
            posExplosionX = bomba.x;
            posExplosionY = bomba.y;
            this.bum.play();
            bomba.destroy();
            bomba1.destroy();
            this.animExplosion = this.add.sprite(posExplosionX, posExplosionY, 'boom');
            this.animExplosion.anims.play('boom')
        }



        //Marcador
        function marcador() {
            scoreBoard2.setText('P2: ' + score2);
            scoreBoard1.setText('P1: ' + score1);
        }
        ///////////////////////////////////////////
        //TIMER
        ///////////////////////////////////////////
        this.timer = 60; //tiempo en segundos restantes

        text = this.add.text(12, 30, 'Time left: ' + this.timer, { fontSize: '25px', fill: '#ffff' });
        timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });

        function onEvent() //cada vez que pase un segundo se ejecutará onEvent(), poner aqui creacion de bombas y 
        {
            this.timer -= 1; // One second
            text.setText('Time left: ' + this.timer);
            //pequeña función que hace que cuando se acabe el tiempo cambie a la pantalla final
            if (this.timer == 0) {
                this.sound.stopAll();
                if(score1>score2){
                this.scene.start('pantallaFinal');
                score2 = 0;
                score1 = 0;
            }else{
                this.scene.start('pantallaFinalJugador2');
                score1 = 0;
                score2 = 0;
            }
        }
    }


    ///PAUSE
    this.pauseButton = this.add.sprite(720,50,'buttonPause').setInteractive(); //añade a la escena actual el sprite y lo vuelve interactivo
        this.pauseButton.on('pointerover',()=>{
            this.pauseButton.setFrame(1);
        })
        this.pauseButton.on('pointerout',()=>{
            this.pauseButton.setFrame(0);
        })
        this.pauseButton.on('pointerdown',()=>{
            //this.sound.pauseAll();
            this.scene.pause();
            this.scene.launch('pause');//.................----
        })
       
       //TAGS
        name1 = this.add.text(player1.x, player1.y, player1Name);
        name2 = this.add.text(player2.x, player2.y, 'Player2');
                 
    }

    update(time, delta) //Delta se usa para que en todos los navegadores el movimiento sea el mismo
    {

        //Jugador 1
        if (this.keys.S.isDown && this.keys.A.isDown) {
            player1.setVelocityY(250);
            player1.setVelocityX(-250);
            player1.anims.play('left1', true);
        } else if (this.keys.S.isDown && this.keys.D.isDown) {
            player1.setVelocityY(250);
            player1.setVelocityX(250);
            player1.anims.play('right1', true);
            player1.direcionMira = 'DownRight';

        } else if (this.keys.W.isDown && this.keys.A.isDown) {
            player1.setVelocityY(-250);
            player1.setVelocityX(-250);
            player1.anims.play('left1', true);
        } else if (this.keys.W.isDown && this.keys.D.isDown) {
            player1.setVelocityY(-250);
            player1.setVelocityX(250);
            player1.anims.play('right1', true);
            player1.direcionMira = 'UpRight';

        } else if (this.keys.A.isDown) {
            player1.setVelocityX(-250);
            player1.setVelocityY(0);
            player1.anims.play('left1', true);
        } else if (this.keys.D.isDown) {
            player1.setVelocityX(250);
            player1.setVelocityY(0);
            player1.anims.play('right1', true);
            player1.direcionMira = 'Right';

        } else if (this.keys.W.isDown) {
            player1.setVelocityY(-250);
            player1.setVelocityX(0);
            player1.anims.play('up1', true);

        } else if (this.keys.S.isDown) {
            player1.setVelocityY(250);
            player1.setVelocityX(0);
            player1.anims.play('down1', true);
        } else {
            player1.setVelocityX(0);
            player1.setVelocityY(0);
            player1.anims.play('turn1');
        }

        //Jugador 2
        if (this.cursors.down.isDown && this.cursors.left.isDown) {
            player2.setVelocityY(250);
            player2.setVelocityX(-250);
            player2.anims.play('left1', true);
            player2.direcionMira = 'DownLeft';
        } else if (this.cursors.down.isDown && this.cursors.right.isDown) {
            player2.setVelocityY(250);
            player2.setVelocityX(250);
            player2.anims.play('right1', true);
        } else if (this.cursors.up.isDown && this.cursors.left.isDown) {
            player2.setVelocityY(-250);
            player2.setVelocityX(-250);
            player2.anims.play('left1', true);
            player2.direcionMira = 'UpLeft';
        } else if (this.cursors.up.isDown && this.cursors.right.isDown) {
            player2.setVelocityY(-250);
            player2.setVelocityX(250);
            player2.anims.play('right1', true);
        } else if (this.cursors.left.isDown) {
            player2.setVelocityX(-250);
            player2.setVelocityY(0);
            player2.anims.play('left1', true);
            player2.direcionMira = 'Left';
        } else if (this.cursors.right.isDown) {
            player2.setVelocityX(250);
            player2.setVelocityY(0);
            player2.anims.play('right1', true);
        } else if (this.cursors.up.isDown) {
            player2.setVelocityY(-250);
            player2.setVelocityX(0);
            player2.anims.play('up1', true);
        } else if (this.cursors.down.isDown) {
            player2.setVelocityY(250);
            player2.setVelocityX(0);
            player2.anims.play('down1', true);
        } else {
            player2.setVelocityX(0);
            player2.setVelocityY(0);
            player2.anims.play('turn1');
        }

        if (this.keys.E.isDown) {
            if (player1.municion) {
                this.bomba = bombas.create(player1.x + 30, player1.y, 'bomba');
                this.bomba.setBounce(1);
                this.bomba.setCollideWorldBounds(true);
                this.bomba.setDragX(500); //https://phaser.discourse.group/t/friction-not-working/5721/11
                this.bomba.setDragY(500);
                this.tweens.add({   //Tweens.add se encarga de la animacion que hace desaparecer lentamente las bombas
                    targets: this.bomba,
                    alpha: 0.05,
                    duration: 2000,
                });

                switch (player1.direcionMira) {
                    case 'UpRight':
                        this.bomba.setVelocity(600, -600);
                        break;
                    case 'Right':
                        this.bomba.setVelocity(600, 0);
                        break;
                    case 'DownRight':
                        this.bomba.setVelocity(600, 600);
                        break;
                }
                player1.municion = false;
                player1.tint = 0xffffff;

            }
        }
        if (this.keys.L.isDown) {
            if (player2.municion) {
                this.bomba = bombas.create(player2.x - 40, player2.y, 'bomba');  //+40 provisional para que el juagdor
                this.bomba.setBounce(1);                                         //no se mate a si mismo
                this.bomba.setCollideWorldBounds(true);
                this.bomba.setDragX(500);
                this.bomba.setDragY(500);
                this.tweens.add({          //Tweens.add se encarga de la animacion que hace desaparecer lentamente las bombas
                    targets: this.bomba,
                    alpha: 0.05,
                    duration: 2000,
                });

                switch (player2.direcionMira) {
                    case 'DownLeft':
                        this.bomba.setVelocity(-600, 600);
                        break;
                    case 'Left':
                        this.bomba.setVelocity(-600, 0);
                        break;
                    case 'UpLeft':
                        this.bomba.setVelocity(-600, -600);
                        break;
                }

                player2.municion = false;
                player2.tint = 0xffffff;
            }


        }


        //PLAYER TAGS
   		 name1.x = player1.x - 25;
   		 name1.y = player1.y - 45;
   		 
   		 name2.x = player2.x - 25;
   		 name2.y = player2.y - 45;
    }
    


}


class menuIni extends Phaser.Scene {
    constructor() {
        super({ key: 'menuInicial' });
        this.button = new button(this,'signIn',230,410,'buttonPl');
        this.buttonCr = new button(this,'creditos',230,520,'buttonCr');

      }
      preload(){
        this.load.image("pantallaInicial", "../../resources/img/PANTALLAINIC.png");
        
        this.load.audio('temaPrincipal', '../../../resources/audio/mainthemep.ogg');
        
        this.button.preload();
        this.buttonCr.preload();

      }
      create(){
        this.add.image(400, 300, "pantallaInicial");  //Añade un nuevo elemento del juego 

        this.mainTheme = this.sound.add('temaPrincipal');
        this.mainTheme.play();
        this.button.create();
        this.buttonCr.create();

    }

     
    
    }


class pantallaFin extends Phaser.Scene {
    constructor() {
        super({ key: 'pantallaFinal' });
        this.buttonPA = new button(this,'game',400,440,'buttonPA');
        this.buttonMM = new button(this,'menuInicial',400,530,'buttonMM');

      }
      preload(){
        this.load.image("pantallaFinal", "../../resources/img/PANTALLAFINAL.png");
        this.load.image("jugador1", "../../resources/img/jugador1Ganado.png");
        this.load.image("jugador2", "../../resources/img/jugador2Ganado.png");

        this.load.spritesheet('personaje', '../../resources/img/realDude.png',
        { frameWidth: 60, frameHeight: 81 }
        );

        this.buttonPA.preload();
        this.buttonMM.preload();

      }
      create(){
        this.add.image(400, 300, "pantallaFinal");  //Añade un nuevo elemento del juego 
        this.add.image(400, 140, "jugador1");  //Añade un nuevo elemento del juego 
        this.personajeMostrar = this.add.sprite(400,300,'personaje').setScale(2,2);
        this.personajeMostrar2 = this.add.sprite(300,300,'personaje').setScale(2,2);
        this.personajeMostrar3 = this.add.sprite(500,300,'personaje').setScale(2,2);
        this.personajeMostrar.setFrame(9);
        this.personajeMostrar2.setFrame(2);
        this.personajeMostrar3.setFrame(10);
        this.buttonPA.create();
        this.buttonMM.create();

    }
    }



class pantallaFinJugador extends Phaser.Scene {
    constructor() {
        super({ key: 'pantallaFinalJugador2' });
        this.buttonPAJ = new button(this,'game',400,440,'buttonPA');
        this.buttonMMJ = new button(this,'menuInicial',400,530,'buttonMM');

      }
      preload(){
        this.load.image("pantallaFinalJ", "../../../resources/img/PANTALLAFINAL.png");
        this.load.image("jugJ", "../../resources/img/jugador2Ganado.png");

        this.load.spritesheet('personajeJ', '../../resources/img/realDude.png',
        { frameWidth: 60, frameHeight: 81 }
        );

        this.buttonPAJ.preload();
        this.buttonMMJ.preload();

      }
      create(){
        this.add.image(400, 300, "pantallaFinalJ");  //Añade un nuevo elemento del juego 
        this.add.image(400, 140, "jugJ");  //Añade un nuevo elemento del juego 
        this.personajeMostrarJ = this.add.sprite(400,300,'personajeJ').setScale(2,2);
        this.personajeMostrarJ2 = this.add.sprite(300,300,'personajeJ').setScale(2,2);
        this.personajeMostrarJ3 = this.add.sprite(500,300,'personajeJ').setScale(2,2);

        this.personajeMostrarJ.setFrame(9);
        this.personajeMostrarJ2.setFrame(2);
        this.personajeMostrarJ3.setFrame(10);
        this.buttonPAJ.create();
        this.buttonMMJ.create();

    }
    }


class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'pause' });
      }
      preload(){
        this.load.image("pantallaPausa", "../../../resources/img/pantallaPausa.png");
        this.load.spritesheet('buttonContinue', '../../../resources/img/buttonContinue.png',
        { frameWidth: 182/2, frameHeight: 92 }
        );
        this.load.spritesheet('mainMenu', '../../resources/img/spriteMainMenuPause.png',
        { frameWidth: 896/2, frameHeight: 79 }
        );

      }
      create(){
        this.add.image(400, 300, "pantallaPausa");  //Añade un nuevo elemento del juego 
        this.buttonCont = this.add.sprite(400,400,'buttonContinue').setInteractive(); //añade a la escena actual el sprite y lo vuelve interactivo
        this.buttonCont.on('pointerover',()=>{
            this.buttonCont.setFrame(1);
        })
        this.buttonCont.on('pointerout',()=>{
            this.buttonCont.setFrame(0);
        })
        this.buttonCont.on('pointerdown',()=>{
            this.scene.resume('game');  
            this.scene.stop();
        })

        this.buttonMainMenu = this.add.sprite(400,500,'mainMenu').setInteractive(); //añade a la escena actual el sprite y lo vuelve interactivo
        this.buttonMainMenu.on('pointerover',()=>{
            this.buttonMainMenu.setFrame(1);
        })
        this.buttonMainMenu.on('pointerout',()=>{
            this.buttonMainMenu.setFrame(0);
        })
        this.buttonMainMenu.on('pointerdown',()=>{
            this.scene.start('menuInicial');  
            this.scene.stop('game');
            this.scene.stop();
        })
        

    }
    }





var config = {     //Contiene un json
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "container",
  type: Phaser.AUTO,
  scene: [menuIni, SignIn, Game,pantallaFin,Credits,pantallaFinJugador,Pause],
  physics: {    //Se agrega el sistema de fisicas arcade a la configuración
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false
      }
  }
};



var game = new Phaser.Game(config);