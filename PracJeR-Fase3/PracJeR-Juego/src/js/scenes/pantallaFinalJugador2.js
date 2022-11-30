import {button} from '../components/button.js'
export class pantallaFinJugador extends Phaser.Scene {
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