export class Terrenos extends Phaser.Physics.Arcade.Sprite/*Phaser.GameObjects.Sprite*/{
    constructor(scene, posX, posY){
        super(scene, posX, posY, "muro");
        this.vida = 3;
        this.setScale(0.8, 0.75);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        //this.setCollideWorldBounds(true);
        //this.setBounce(0, 0);
        this.setImmovable();
        scene.poolMuros.add(this);
    }

    destruido()
    {
        this.destroy();
    }
    
    quiebra()
    {
        this.vida--;
        if(this.vida == 2){
            this.setTexture("muroDMG1");
        }
        else if(this.vida == 1){
            this.setTexture("muroDMG2");
        }
    }

    Update(time, delta)
    {
        if(this.vida == 0){
            this.destruido();
        }
        
    }
}