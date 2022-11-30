import { Game } from './scenes/game.js';
import{menuIni} from './scenes/menuIni.js';
import{pantallaFin} from './scenes/pantallaFinal.js';
import{pantallaFinJugador} from './scenes/pantallaFinalJugador2.js';
import {Credits} from './scenes/credits.js';
import {Pause} from './scenes/pause.js';

var config = {     //Contiene un json
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "container",
  type: Phaser.AUTO,
  scene: [menuIni,Game,pantallaFin,Credits,pantallaFinJugador,Pause],
  physics: {    //Se agrega el sistema de fisicas arcade a la configuración
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: false
      }
  }
};



var game = new Phaser.Game(config);