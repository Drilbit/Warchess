import { Graphics } from 'pixi.js';

export class Tile extends Graphics {
  constructor(vertices) {
    super(); // Obbligatorio quando si estende una classe
    this.vertices = vertices;
    const verticiPiatto = this.vertices.flatMap((v) => [v.x, v.y]);
    this.poly(verticiPiatto)
        .fill({ color: 0x8b5cf6 })              // Colore interno (Viola)
        .stroke({ width: 4, color: 0xffffff }); // Bordo bianco
    }
    refresh() {
        for (const vertex of this.vertices) {
            vertex.refresh();
        }
    }
}