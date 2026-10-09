import { Graphics } from 'pixi.js';

export class Vertex extends Graphics {
  constructor(x = 0, y = 0) {
    super(); // Obbligatorio quando si estende una classe

    // Posizione nello stage
    this.x = x;
    this.y = y;
    this.drag = false;
    
    // Disegno grafico (Sintassi PixiJS v8)
    const radius = 5;
    const color = "yellow";
    this.circle(0, 0, radius).fill(color);
    this.eventMode = 'static';
    this.cursor = 'pointer';
  }
  
  refresh () {
      this.on('pointerover', () => {
          this.scale.set(1.5, 1.5);
      });
  
      this.on('pointerout', () => {
          this.scale.set(1, 1);
      });
  }
}
