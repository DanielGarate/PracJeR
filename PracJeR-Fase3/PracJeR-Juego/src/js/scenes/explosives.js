export class Explosives extends Phaser.Physics.Arcade.Sprite/*Phaser.GameObjects.Sprite*/{
    constructor(scene, lanzador){

        super(scene, lanzador.x, lanzador.y, "bomba");
        this.trayectoria = lanzador.direcionMira;
        this.tiempoBum = 0;
        this.idLanzador = lanzador.id;


        this.scene.add.existing(this);
        //this.scene.physics.world.enableBody(this);
        this.scene.physics.add.existing(this);
        this.setBounce(1, 1);
        this.setCollideWorldBounds(true);
        this.lanza(this.trayectoria);
        /*this.timer = scene.time.create(false);
        timer.loop(5000, explota, scene);*/
        this.tiempoExp = this.scene.time
        scene.poolBombas.add(this);

    }

    lanza(trayectoria)
    {
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(-100);

        switch (trayectoria) {
            case 'DownLeft':
                this.setVelocity(-600, 600);
                break;
            case 'Left':
                this.setVelocity(-600, 0);
                break;
            case 'UpLeft':
                this.setVelocity(-600, -600);
                break;
            case 'UpRight':
                this.setVelocity(600, -600);
                break;
            case 'Right':
                this.setVelocity(600, 0);
                break;
            case 'DownRight':
                this.setVelocity(600, 600);
                break;
        }

        this.setDamping(true);
        this.setDrag(0.98);
    }

    Update(time, delta)
    {
        this.tiempoBum += 1;
        if(this.tiempoBum>=500)
        {
            this.explota();
        }
        
    }

    explota()
    {
        //console.log("Explotido tras " + tiempoBum)
        //this.scene.play("boom");
        this.scene.bum.play();
        //this.scene.animExplosion.play('boom');
        this.destroy();
    }

    
}