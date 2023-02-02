export class button{
    constructor(scene,indentNextScene,posX,posY,sprite){
        this.actualScene = scene;
        this.nextScene = indentNextScene;
        this.x = posX;
        this.y = posY;
        this.spriteKey = sprite;
    }
    preload(){
			this.load.image("pantallaInicial", "../../resources/img/PANTALLAINIC.png",
        { frameWidth: 896/2, frameHeight: 79 }
        ); 
        this.actualScene.load.spritesheet('buttonPl', '../../../resources/img/spritePlay.png',
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
    
    
