import {button} from '../components/button.js'
export class menuIni extends Phaser.Scene {
    constructor() {
        super({ key: 'menuInicial' });
        this.button = new button(this,'game',415,225,"../../resources/img/spritePlay.png");
      }
      preload(){
        this.load.image("pantallaInicial", "../../resources/img/PANTALLAINIC.png");
        this.button.preload();
      }
      create(){
        this.add.image(400, 300, "pantallaInicial");  //Añade un nuevo elemento del juego 
        this.button.create();
    }
    }