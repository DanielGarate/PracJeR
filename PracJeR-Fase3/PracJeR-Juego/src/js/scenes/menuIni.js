import {button} from '../components/button.js'
export class menuIni extends Phaser.Scene {
    constructor() {
        super({ key: 'menuInicial' });
        this.button = new button(this,'game',230,410,'buttonPl');
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