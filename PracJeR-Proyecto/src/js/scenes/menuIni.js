import {button} from '../components/button.js'
export class menuIni extends Phaser.Scene {
    constructor() {
        super({ key: 'menuInicial' });
        this.button = new button(this,'game',400,400);
      }
      preload(){
        this.load.image("campo", "../../resources/img/campo.png");
        this.button.preload();
      }
      create(){
        this.add.image(400, 300, "campo");  //Añade un nuevo elemento del juego 
        this.button.create();
    }
    }