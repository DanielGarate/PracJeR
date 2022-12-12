import {button} from '../components/button.js'
export class pantallaFin extends Phaser.Scene {
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