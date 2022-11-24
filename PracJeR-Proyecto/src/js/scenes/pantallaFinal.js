import {button} from '../components/button.js'
export class pantallaFin extends Phaser.Scene {
    constructor() {
        super({ key: 'pantallaFinal' });
        this.button = new button(this,'menuInicial',400,400);
      }
      preload(){
        this.button.preload();
      }
      create(){
        this.button.create();
        this.add.text(300, 300, 'EL JUGADOR X HA GANADO');
    }
    }