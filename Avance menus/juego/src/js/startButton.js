export class startButton {
  constructor(scene) {
    this.relatedScene = scene;
  }
  preload() {
      this.relatedScene.load.spritesheet('playbutton', "../../resources/img/playbutton.png",
      { frameWidth: 32*2, frameHeight: 48 });
  }
  create() {
      //crea el boton en la escena
      this.startButton = this.relatedScene.add.sprite(400, 230, 'button').setInteractive();
      //el sprite cambia si el raton esta encima
      this.startButton.on('pointerover', () => {
          this.startButton.setFrame(1);
        });
      //el sprite cambia si el raton no esta encima
      this.startButton.on('pointerout', () => {
          this.startButton.setFrame(0);
       });
      //cuando se pulsa el raton se cambia a la escena Game
      this.startButton.on('pointerdown', () => {
          this.relatedScene.scene.start('game');
        });
  }
  // otros métodos de la clase
}
