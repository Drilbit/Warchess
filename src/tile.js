import { Graphics } from 'pixi.js';

export class Tile extends Graphics {
    static Biome = Object.freeze({
        PIANURA: {fill: "lime", border: "black"},
        SAVANA: {fill: "orange", border: "black"},
        MONTAGNA: {fill: "gray", border: "black"},
        BOSCO: {fill: "darkgreen", border: "black"},
        SPIAGGIA: {fill: "sandybrown", border: "black"},
    });
    constructor(vertices, biome = Tile.Biome.PIANURA) {
        super(); // Obbligatorio quando si estende una classe
        this.vertices = vertices;
        this.biome = biome;
        this.draw();
    }

    draw() {
        const verticiPiatto = this.vertices.flatMap((v) => [v.x, v.y]);
        this.clear();
        this.poly(verticiPiatto)
            .fill({ color: this.biome.fill })              // Colore interno (Viola)
            .stroke({ width: 3, color: this.biome.border }); // Bordo bianco
    }

    refresh(mouseX = null, mouseY = null) {
        for (const vertex of this.vertices) {
            vertex.refresh(mouseX, mouseY);
        }
        this.draw();

        /*this.on('pointerover', () => {
            this.scale.set(1.5, 1.5);
        });
    
        this.on('pointerout', () => {
            this.scale.set(1, 1);
        });

        // --- PRESSIONE TASTI MOUSE SULL'OGGETTO ---
        this.on('pointerdown', (event) => {
            // Tasto Sinistro (0) -> Inizia il drag
            if (event.button === 0) {
            this.drag = true;
            } 
        });

        if (this.drag) {
            this.x = mouseX;
            this.y = mouseY;
        }

        window.addEventListener('pointerup', () => {
            this.drag = false;
        });
        */
    }
}