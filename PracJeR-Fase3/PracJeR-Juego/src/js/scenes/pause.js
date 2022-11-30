export class Pause extends Phaser.Scene {
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