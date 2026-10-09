import { Application, Graphics, Text, TextStyle } from 'pixi.js';
import { Vertex } from './vertex.js';
import { Tile } from './tile.js';


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

  // Disabilita il menu contestuale del tasto destro del browser sul canvas
  app.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  // Rende interattivo l'intero stage per tracciare il mouse ovunque
  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;

  const infoText = new Text({
    text: 'Muovi il mouse... ',
    style: { fontFamily: 'Arial', fontSize: 18, fill: '#ffffff' },
  });
  infoText.x = 20;
  infoText.y = 20;
  app.stage.addChild(infoText);

  // --- OGGETTO INTERATTIVO (Cerchio) ---
  const target = new Graphics();
  target.circle(0, 0, 40).fill(0x3b82f6);
  target.x = 400;
  target.y = 300;

  // ABILITA INTERATTIVITÀ SULL'OGGETTO
  target.eventMode = 'static';
  target.cursor = 'pointer';
  app.stage.addChild(target);

  let isDragging = false;

  // --- 1. RILEVAMENTO POSIZIONE MOUSE ---
  app.stage.on('pointermove', (event) => {
    const mouseX = Math.round(event.global.x);
    const mouseY = Math.round(event.global.y);

    infoText.text = `Posizione Mouse: X: ${mouseX}, Y: ${mouseY}\n` +
                    `Stato Drag: ${isDragging ? 'In corso...' : 'Inattivo'}`;

    // Se stiamo trascinando l'oggetto, aggiorna la sua posizione con il mouse
    if (isDragging) {
      target.x = mouseX;
      target.y = mouseY;
    }
    tile.refresh(mouseX, mouseY);
  });

  // --- 2. PRESSIONE TASTI MOUSE SULL'OGGETTO ---
  target.on('pointerdown', (event) => {
    // Tasto Sinistro (0) -> Inizia il drag
    if (event.button === 0) {
      isDragging = true;
    } 
    // Tasto Destro (2) -> Esegui un'azione (es. cambia colore)
    else if (event.button === 2) {
      const coloreCasuale = Math.floor(Math.random() * 0xffffff);
      target.clear().circle(0, 0, 40).fill(coloreCasuale);
    }
  });

  // --- 3. RILASCIO DEL TASTO (In qualsiasi punto dello schermo) ---
  window.addEventListener('pointerup', () => {
    isDragging = false;
  });

  // --- 4. EVENTI MOUSE HOVER (Passaggio sopra) ---
  target.on('pointerover', () => {
    target.clear().circle(0, 0, 40).fill("red");
    target.circle(0, 0, 30).fill(0x3b82f6);
  });

  target.on('pointerout', () => {
    target.clear().circle(0, 0, 40).fill(0x3b82f6);
  });

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
  scoreText.x = 300;
  scoreText.y = 20;
  app.stage.addChild(scoreText);

  // Giocatore (Cerchio Blu)
  const player = new Graphics();
  player.circle(0, 0, 20).fill(0x3b82f6);
  player.x = 400;
  player.y = 300;
  app.stage.addChild(player);

  const vert1 = new Vertex(500, 200, 5);
  const vert2 = new Vertex(550, 200, 5);
  const vert3 = new Vertex(550, 250, 5);
  const vert4 = new Vertex(500, 250, 5);

  app.stage.addChild(vert1);
  app.stage.addChild(vert2);
  app.stage.addChild(vert3);
  app.stage.addChild(vert4);

  const vertices = [vert1, vert2, vert3, vert4];

  const tile = new Tile(vertices, Tile.Biome.SPIAGGIA);
  app.stage.addChild(tile);
  tile.refresh();

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