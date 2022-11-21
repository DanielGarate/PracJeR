import { startButton } from "startButton.js";

export class menu extends Phaser.Scene {
    constructor() {
      super({ key: 'menuPrincipal' });
      this.startButton = new startButton(this);
    }
    preload() {
        this.restartButton.preload();
        this.load.image("campo", "../../resources/img/campo.png");
      }
      
      create() {
        this.add.image(400, 300, "campo"); 
        this.restartButton.create();
      }
    }
