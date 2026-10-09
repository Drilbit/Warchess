import { Graphics, Text } from 'pixi.js';

export class Vertex extends Graphics {
    constructor(x = 0, y = 0) {
        super(); // Obbligatorio quando si estende una classe

        // Posizione nello stage
        this.x = x;
        this.y = y;
        this.drag = false;
        this.draw();
    }

    draw() {
        // Disegno grafico (Sintassi PixiJS v8)
        const radius = 5;
        const color = "yellow";
        this.circle(0, 0, radius).fill(color);
        this.eventMode = 'static';
        this.cursor = 'pointer';
    }
    refresh (mouseX = this.x, mouseY = this.y) {
        this.on('pointerover', () => {
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
    }
}
