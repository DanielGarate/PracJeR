import { Game } from './scenes/game.js';

var config = {     //Contiene un json
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "container",
  type: Phaser.AUTO,
  scene: [Game],
  physics: {    //Se agrega el sistema de fisicas arcade a la configuración
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false
      }
  }
};

var game = new Phaser.Game(config);