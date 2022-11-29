
//rama Alex 2

//INTENTO DE MARCADOR
var score1 = 0;
var score2 = 0;
var scoreBoard1, scoreBoard2;
var player1, player2, muros, limites, bombas, spawnBombas1, spawnBombas2, text; //se sacan las variables fuera de la clase
var t1 = 1000;
var t2 = 1000;
var explosion;
var timedEvent;
var posExplosionX, posExplosionY;

//intento clase jugador 
class Jugador {
    constructor(vida) {
        this.vida = vida;
        this.municion = false;
    }
    get getVida() {
        return this.vida;
    }
    set setVida(value) {
        this.vida = value;
    }
}


class Muro {
    constructor(x, y) {
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
            "../../resources/img/personaje.png",
            { frameWidth: 32, frameHeight: 48 }
        );
          this.load.spritesheet("Explosion",
            "../../resources/img/ExplosionAnimacion.png",
            { frameWidth: 96, frameHeight: 96 }
            
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

        explosion = this.physics.add.staticGroup(); //Se crea una grupo explosion que se encargara de las hitbox de las explosiones

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

        player1 = this.physics.add.sprite(100, 450, 'dude').setScale(1.25, 1.25).refreshBody(); //Fisica dinamica (dinamic group) por defecto
        player1.direcionMira = 'Down';
        player2 = this.physics.add.sprite(700, 450, 'dude').setScale(1.25, 1.25).refreshBody(); //Fisica dinamica (dinamic group) por defecto
        player2.direcionMira = 'Down';
        //Posicion del personaje
        player1.setCollideWorldBounds(true);
        player2.setCollideWorldBounds(true);


        // Spawn de bombas
        spawnBombas1 = this.physics.add.sprite(100, 100, 'dude').setScale(0.75, 0.75).refreshBody();
        spawnBombas1.setTint(0xff0000);

        spawnBombas2 = this.physics.add.sprite(700, 100, 'dude').setScale(0.75, 0.75).refreshBody();
        spawnBombas2.setTint(0xff0000);

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

          this.anims.create({
            key: 'boom',
            frames: this.anims.generateFrameNumbers('Explosion', { start: 0,end:11}),
            frameRate: 20,
           repeat: 0,
           killOnComplete: true,
        });



        this.cursors = this.input.keyboard.createCursorKeys();  //Crea el objeto cursors (con 4 propiedades: up, down, left, right)
        this.keys = this.input.keyboard.addKeys('A,W,S,D,E,L'); //Se añaden las distintas teclas que se van a utilizar

        this.physics.add.collider(player1, muros);  //Se añaden las colisiones con los muros y los limites del 
        this.physics.add.collider(player2, muros);
        this.physics.add.collider(player1, limites);
        this.physics.add.collider(player2, limites);

        //Se crea el grupo bombas que se va a utilizar
        bombas = this.physics.add.group();


        //MARCADOR 
        scoreBoard2 = this.add.text(440, 40, "P2: 0", { fontSize: '32px', fill: '#fff' });
        scoreBoard1 = this.add.text(240, 40, "P1: 0", { fontSize: '32px', fill: '#fff' });

        //Superposición con spawn
        this.physics.add.overlap(player1, spawnBombas1, refill, null, this);
        this.physics.add.overlap(player2, spawnBombas2, refill, null, this);


        function refill(jugador1, spawn){
            jugador1.setTint(0x09D802);
            jugador1.municion = true;
        }

        function refill(jugador2, spawn){
            jugador2.setTint(0x09D802);
            jugador2.municion = true;
        }


         //COLISIONES MUROS

        this.physics.add.collider(muros, bombas, hitBomb1, null, this);

        //Detección colisiones muro-bomba
        function hitBomb1(muro, bomba) {

            var temp;
            for (var i = 0; i < coberturas.length; i++) {
                if (muro.x == coberturas[i].x && muro.y == coberturas[i].y) {
                    coberturas[i].vida--;
                    temp = i;
                    muro.anims.play('roto', true);
                }
            }

            if (coberturas[temp].vida == 0) {
                muro.destroy();
            }

            posExplosionX = bomba.x; //Se guarda la ultima posicion de la bomba 
            posExplosionY = bomba.y;
            explosion.create(posExplosionX, posExplosionY, 'bomba').setScale(3, 3).refreshBody(); //Se genera un sprite invisible de mayor tamaño que la bomba para posteriormente realizar la colision de la explosion
            explosion.setVisible(false);
            this.animExplosion = this.add.sprite(posExplosionX, posExplosionY, 'boom');//Se crea e inicia la animacion de la explosion en la ultima posicion de la bomba
            this.animExplosion.anims.play('boom');
            bomba.destroy(); //Se destruye la bomba 
        }

        this.physics.add.collider(muros, explosion, hitExplosion, null, this); //Se crea una colision que elimina la explosion para que no se quede flotando
        function hitExplosion(muro, explosion) {         
            explosion.destroy();
        }
        

         //Deteccion colisione jugador1-bombas
        this.physics.add.collider(player1, bombas, hitBomb, null, this);
        function hitBomb(player1, bomba) { //Colision que se encarga del impacto directo del jugador con la bomba
            score2++;     
            marcador();
            player1.setPosition(100, Phaser.Math.Between(0, 600));
            posExplosionX = bomba.x;
            posExplosionY = bomba.y;
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

        //Colisiones jugador2-bombas
          this.physics.add.collider(player2, bombas, hitBomb2, null, this);

        function hitBomb2(player2, bomba) {
            score1++;
            marcador();
            player2.setPosition(700, Phaser.Math.Between(0, 600));
             posExplosionX = bomba.x;
            posExplosionY = bomba.y;
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

        text = this.add.text(32, 32, 'Time left: ' + this.timer);
        timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });

        function onEvent() //cada vez que pase un segundo se ejecutará onEvent(), poner aqui creacion de bombas y 
        {
            this.timer -= 1; // One second
            text.setText('Time left: ' + this.timer);
            //pequeña función que hace que cuando se acabe el tiempo cambie a la pantalla final
            if (this.timer == 0) {
                this.scene.start('pantallaFinal');
            }
        }

    }

    update(time, delta) //Delta se usa para que en todos los navegadores el movimiento sea el mismo
    {

        //Jugador 2
        if (this.cursors.down.isDown && this.cursors.left.isDown) {
            player2.setVelocityY(250);
            player2.setVelocityX(-250);
            player2.anims.play('left', true);
            player2.direcionMira = 'DownLeft';
        } else if (this.cursors.down.isDown && this.cursors.right.isDown) {
            player2.setVelocityY(250);
            player2.setVelocityX(250);
            player2.anims.play('left', true);
            player2.direcionMira = 'DownRight';
        } else if (this.cursors.up.isDown && this.cursors.left.isDown) {
            player2.setVelocityY(-250);
            player2.setVelocityX(-250);
            player2.anims.play('left', true);
            player2.direcionMira = 'UpLeft';
        } else if (this.cursors.up.isDown && this.cursors.right.isDown) {
            player2.setVelocityY(-250);
            player2.setVelocityX(250);
            player2.anims.play('left', true);
            player2.direcionMira = 'UpRight';
        } else if (this.cursors.left.isDown) {
            player2.setVelocityX(-250);
            player2.setVelocityY(0);
            player2.anims.play('left', true);
            player2.direcionMira = 'Left';
        } else if (this.cursors.right.isDown) {
            player2.setVelocityX(250);
            player2.setVelocityY(0);
            player2.anims.play('right', true);
            player2.direcionMira = 'Right';
        } else if (this.cursors.up.isDown) {
            player2.setVelocityY(-250);
            player2.setVelocityX(0);
            player2.anims.play('right', true);
            player2.direcionMira = 'Up';
        } else if (this.cursors.down.isDown) {
            player2.setVelocityY(250);
            player2.setVelocityX(0);
            player2.anims.play('left', true);
            player2.direcionMira = 'Down';
        } else {
            player2.setVelocityX(0);
            player2.setVelocityY(0);
            player2.anims.play('turn');
        }
        //Jugador 1
        if (this.keys.S.isDown && this.keys.A.isDown) {
            player1.setVelocityY(250);
            player1.setVelocityX(-250);
            player1.anims.play('left', true);
            player1.direcionMira = 'DownLeft';
        } else if (this.keys.S.isDown && this.keys.D.isDown) {
            player1.setVelocityY(250);
            player1.setVelocityX(250);
            player1.anims.play('left', true);
            player1.direcionMira = 'DownRight';

        } else if (this.keys.W.isDown && this.keys.A.isDown) {
            player1.setVelocityY(-250);
            player1.setVelocityX(-250);
            player1.anims.play('left', true);
            player1.direcionMira = 'UpLeft';
        } else if (this.keys.W.isDown && this.keys.D.isDown) {
            player1.setVelocityY(-250);
            player1.setVelocityX(250);
            player1.anims.play('left', true);
            player1.direcionMira = 'UpRight';

        } else if (this.keys.A.isDown) {
            player1.setVelocityX(-250);
            player1.setVelocityY(0);
            player1.anims.play('left', true);
            player1.direcionMira = 'Left';
        } else if (this.keys.D.isDown) {
            player1.setVelocityX(250);
            player1.setVelocityY(0);
            player1.anims.play('right', true);
            player1.direcionMira = 'Right';

        } else if (this.keys.W.isDown) {
            player1.setVelocityY(-250);
            player1.setVelocityX(0);
            player1.anims.play('right', true);
            player1.direcionMira = 'Up';

        } else if (this.keys.S.isDown) {
            player1.setVelocityY(250);
            player1.setVelocityX(0);
            player1.anims.play('left', true);
            player1.direcionMira = 'Down';
        } else {
            player1.setVelocityX(0);
            player1.setVelocityY(0);
            player1.anims.play('turn');
        }
        if (this.keys.E.isDown) {
            if (player1.municion) {
                this.bomba = bombas.create(player1.x + 40, player1.y, 'bomba').setAlpha(1);
           this.bomba.setBounce(1);
                this.bomba.setCollideWorldBounds(true);
                this.bomba.setDragX(50); //https://phaser.discourse.group/t/friction-not-working/5721/11
                this.bomba.setDragY(50);
                this.tweens.add({          //Tweens.add se encarga de la animacion que hace desaparecer lentamente las bombas
                targets: this.bomba,
                alpha: 0.05,
                duration: 2000,
                });
               
                this.bomba.setVelocity(Phaser.Math.Between(-200, 0), 20);
                t1 = time;
      


                switch (player1.direcionMira) {
                    case 'UpRight':
                        this.bomba.setVelocity(300, -300);
                        break;
                    case 'Right':
                        this.bomba.setVelocity(300, 0);
                        break;
                    case 'DownRight':
                        this.bomba.setVelocity(300, 300);
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
                this.bomba.setDragX(50);
                this.bomba.setDragY(50);
                this.tweens.add({   //Tweens.add se encarga de la animacion que hace desaparecer lentamente las bombas
                targets: this.bomba,
                alpha: 0.05,
                duration: 2000,
                });
                switch (player2.direcionMira) {
                    case 'DownLeft':
                        this.bomba.setVelocity(-300, 300);
                        break;
                    case 'Left':
                        this.bomba.setVelocity(-300, 0);
                        break;
                    case 'UpLeft':
                        this.bomba.setVelocity(-300, -300);
                        break;
                }

                player2.municion = false;
                player2.tint = 0xffffff;
            }


        }


    }
}