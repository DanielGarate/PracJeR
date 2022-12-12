import {button} from '../components/button.js'
export class Credits extends Phaser.Scene {
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