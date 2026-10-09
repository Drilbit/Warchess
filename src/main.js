import { Application, Graphics, Text, TextStyle } from 'pixi.js';

(async () => {
  // 1. Inizializza l'applicazione PixiJS
  const app = new Application();

  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x1e1e2e,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  // Aggiungi il canvas HTML al div #app
  document.getElementById('app').appendChild(app.canvas);

  // --- STATO DEL GIOCO ---
  let score = 0;
  const speed = 5;
  const keys = {};

  // --- 2. ELEMENTI GRAFICI ---

  // Testo del Punteggio
  const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fontWeight: 'bold',
    fill: '#ffffff',
  });
  const scoreText = new Text({ text: `Punteggio: ${score}`, style });
  scoreText.x = 20;
  scoreText.y = 20;
  app.stage.addChild(scoreText);

  // Giocatore (Cerchio Blu)
  const player = new Graphics();
  player.circle(0, 0, 20).fill(0x3b82f6);
  player.x = 400;
  player.y = 300;
  app.stage.addChild(player);

  // Moneta da raccogliere (Cerchio Dorato)
  const coin = new Graphics();
  coin.circle(0, 0, 12).fill(0xf59e0b);
  
  function respawnCoin() {
    coin.x = Math.random() * (app.screen.width - 80) + 40;
    coin.y = Math.random() * (app.screen.height - 80) + 40;
  }
  respawnCoin();
  app.stage.addChild(coin);

  // --- 3. GESTIONE INPUT TASTIERA ---
  window.addEventListener('keydown', (e) => { keys[e.key] = true; });
  window.addEventListener('keyup', (e) => { keys[e.key] = false; });

  const polygon = new Graphics();

// Definizione dei vertici del poligono (es. una stella/rombo a 4 punte)
const vertici = [
  200, 50,   // Punto 1 (x, y)
  250, 150,  // Punto 2
  350, 200,  // Punto 3
  250, 250,  // Punto 4
  200, 350,  // Punto 5
  150, 250,  // Punto 6
  50,  200,  // Punto 7
  150, 150   // Punto 8
];

polygon
  .poly(vertici)
  .fill({ color: 0x8b5cf6 })              // Colore interno (Viola)
  .stroke({ width: 4, color: 0xffffff }); // Bordo bianco

app.stage.addChild(polygon);

  // --- 4. GAME LOOP (Aggiornato a ogni frame) ---
  app.ticker.add(() => {
    // Movimento del Giocatore (WASD o Frecce)
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
      player.y = Math.max(20, player.y - speed);
    }
    if (keys['ArrowDown'] || keys['s'] || keys['S']) {
      player.y = Math.min(app.screen.height - 20, player.y + speed);
    }
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
      player.x = Math.max(20, player.x - speed);
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
      player.x = Math.min(app.screen.width - 20, player.x + speed);
    }

    // Controllo delle Collisioni (Distanza tra centri)
    const dx = player.x - coin.x;
    const dy = player.y - coin.y;
    const distance = Math.hypot(dx, dy);

    // Se i due cerchi si toccano (somma dei raggi: 20 + 12 = 32)
    if (distance < 32) {
      score += 10;
      scoreText.text = `Punteggio: ${score}`;
      respawnCoin();
    }
  });
})();