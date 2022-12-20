import {Explosives} from './explosives.js';
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

class Muro {            //Clase muro para poder destruir cuerpos
    constructor(x, y) { //Constructor con las posiciones
        this.x = x;     //Posicion en x
        this.y = y;     //Posicion en y
        this.vida = 3;  //Vida del muro (numero de explosiones necesarias para destruirlo)
    }
}


export class Game extends Phaser.Scene {
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
        player1.id = 1;
        player2 = this.physics.add.sprite(700, 450, 'realDude').setScale(0.7, 0.7).refreshBody();; //Fisica dinamica (dinamic group) por defecto
        player2.direcionMira = 'Left';
        player2.id = 2;


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
        this.keys = this.input.keyboard.addKeys('A,W,S,D,E,L,P'); //Se añaden w,a,s,d para el  J2



        //GRUPOS DINAMICOS
        bombas = this.physics.add.group();

        //Grupo de las bombas
        this.poolBombas = this.add.group();
        
        //COLIDERS
        this.physics.add.collider(player1, muros);
        this.physics.add.collider(player2, muros);
        this.physics.add.collider(player1, limites);
        this.physics.add.collider(player2, limites);

        //this.physics.add.collider(this.poolBombas, muros);
        //this.physics.add.collider(player2, limites);




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
        // Detección de la colision de bombas con los muros
        this.physics.add.collider(muros, this.poolBombas, colMuroBomba, null, this);
        function colMuroBomba(muros, explosivo)
        {
            for (var i = 0; i < coberturas.length; i++) {
                if (muros.x == coberturas[i].x && muros.y == coberturas[i].y) {
                    coberturas[i].vida--;
                    temp = i;

                    if (coberturas[i].vida == 2) {
                        muros.anims.play('roto1', true);
                    } else if (coberturas[i].vida == 1) {
                        muros.anims.play('roto2', true);
                    }
                }
            }
            if (coberturas[temp].vida == 0) {
                muros.destroy();
                explosion1.create(posExplosionX, posExplosionY, 'bomba').setScale(3, 3).refreshBody();
                explosion1.setVisible(false);
            }
            

            posExplosionX = explosivo.x;
            posExplosionY = explosivo.y;
            //this.bum.play();
            this.animExplosion = this.add.sprite(posExplosionX, posExplosionY, 'boom');
            this.animExplosion.anims.play('boom')

            explosivo.explota(); //Se destruye la bomba 
            var temp;
            
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
        this.physics.add.collider(player1, this.poolBombas, colJ1Bomba, null, this);
        function colJ1Bomba(player1, explosivo) { //Colision que se encarga del impacto directo del jugador con la bomba
            if(player1.id != explosivo.idLanzador){
            score2++;
            marcador();
            player1.setPosition(100, Phaser.Math.Between(0, 600));
            posExplosionX = explosivo.x;
            posExplosionY = explosivo.y;
            this.bum.play();
            this.animExplosion = this.add.sprite(posExplosionX, posExplosionY, 'boom');
            this.animExplosion.anims.play('boom');
            explosivo.explota();
            }
        }

        this.physics.add.collider(player1, explosion, hitExplosion1, null, this);
        function hitExplosion1(player1, explosion) { //Colision con la explosion simulada 
            score2++;
            marcador();
            player1.setPosition(100, Phaser.Math.Between(0, 600));
            explosion.destroy(); //Destruye la explosion para que no puedas volver a chocar
        }

        //Colisiones J2-bombas
        this.physics.add.collider(player2, this.poolBombas, colJ2Bomba, null, this);

        function colJ2Bomba(player2, explosivo) {
            if(player2.id != explosivo.idLanzador){
            score1++;
            marcador();
            player2.setPosition(700, Phaser.Math.Between(0, 600));
            posExplosionX = explosivo.x;
            posExplosionY = explosivo.y;
            this.bum.play();
            this.animExplosion = this.add.sprite(posExplosionX, posExplosionY, 'boom');
            this.animExplosion.anims.play('boom');
            explosivo.destroy();
            }
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

        
    }

    update(time, delta) //Delta se usa para que en todos los navegadores el movimiento sea el mismo
    {
        for(var i = 0; i < this.poolBombas.getChildren().length; i++){
            var revienta = this.poolBombas.getChildren()[i];
            revienta.update();
          }

        //Jugador 1
        if (this.keys.S.isDown && this.keys.A.isDown) {
            player1.setVelocityY(250);
            player1.setVelocityX(-250);
            player1.anims.play('left1', true);
            player1.direcionMira = 'DownRight';
        } else if (this.keys.S.isDown && this.keys.D.isDown) {
            player1.setVelocityY(250);
            player1.setVelocityX(250);
            player1.anims.play('right1', true);
            player1.direcionMira = 'DownRight';

        } else if (this.keys.W.isDown && this.keys.A.isDown) {
            player1.setVelocityY(-250);
            player1.setVelocityX(-250);
            player1.anims.play('left1', true);
            player1.direcionMira = 'UpRight';
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
            player1.direcionMira = 'UpRight';

        } else if (this.keys.S.isDown) {
            player1.setVelocityY(250);
            player1.setVelocityX(0);
            player1.anims.play('down1', true);
            player1.direcionMira = 'DownRight';
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
            player2.direcionMira = 'DownLeft';
        } else if (this.cursors.up.isDown && this.cursors.left.isDown) {
            player2.setVelocityY(-250);
            player2.setVelocityX(-250);
            player2.anims.play('left1', true);
            player2.direcionMira = 'UpLeft';
        } else if (this.cursors.up.isDown && this.cursors.right.isDown) {
            player2.setVelocityY(-250);
            player2.setVelocityX(250);
            player2.anims.play('right1', true);
            player2.direcionMira = 'UpLeft';
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
            player2.direcionMira = 'UpLeft';
        } else if (this.cursors.down.isDown) {
            player2.setVelocityY(250);
            player2.setVelocityX(0);
            player2.anims.play('down1', true);
            player2.direcionMira = 'DownLeft';
        } else {
            player2.setVelocityX(0);
            player2.setVelocityY(0);
            player2.anims.play('turn1');
        }

        if (this.keys.E.isDown) {
            if (player1.municion) {
                // Crea la bomba que se va a lanzar
                // La trayectoria y la velocidad se calculan en el constructor de explosive
                var lanzado = new Explosives(this, player1);
                player1.municion = false;
                player1.tint = 0xffffff;
            }
        }
        if (this.keys.L.isDown) {
            if (player2.municion)
            {
                // Crea la bomba que se va a lanzar
                // La trayectoria y la velocidad se calculan en el constructor de explosive
                var lanzado = new Explosives(this, player2);
                player2.municion = false;
                player2.tint = 0xffffff;
            }
        }
    }
}