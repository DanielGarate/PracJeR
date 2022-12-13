export class Explosives extends Phaser.GameObjects.Sprite{
    constructor(scene, lanzador){

        super(scene, lanzador.x, lanzador.y, "bomba");

        this.tiempoBum = 0;

        scene.add.existing(this);
        

        scene.physics.world.enableBody(this);

        scene.poolBombas.add(this);

    }

    update()
    {
        this.tiempoBum = 1;
        if(this.tiempoBum<=0)
        {
            console.log("Explotido")
            
            this.destroy();
        }
    }
    
}