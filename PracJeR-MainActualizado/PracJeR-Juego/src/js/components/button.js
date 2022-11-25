export class button{
    constructor(scene,indentNextScene,posX,posY,sprite){
        this.actualScene = scene;
        this.nextScene = indentNextScene;
        this.x = posX;
        this.y = posY;
        this.spriteDir = sprite;
    }
    preload(){
        this.actualScene.load.spritesheet('button', this.spriteDir,
        { frameWidth: 1092/2, frameHeight: 77 }
        ); //le asocia el sprite
    }
    create(){
        this.startButton = this.actualScene.add.sprite(this.x,this.y,'button').setInteractive(); //añade a la escena actual el sprite y lo vuelve interactivo
        this.startButton.on('pointerover',()=>{
            this.startButton.setFrame(1);
        })
        this.startButton.on('pointerout',()=>{
            this.startButton.setFrame(0);
        })
        this.startButton.on('pointerdown',()=>{
            this.actualScene.scene.start(this.nextScene);
        })
        
    }
}