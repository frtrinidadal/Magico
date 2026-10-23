// Crear el canvas de fondo dinámicamente si no existe
let canvas = document.getElementById('canvas-fondo');
if (!canvas) {
  canvas = document.createElement('canvas');
  canvas.id = 'canvas-fondo';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  document.body.prepend(canvas);
}

const ctx = canvas.getContext('2d');

function redimensionar() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', redimensionar);
redimensionar();

class DestelloNoche {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radio = Math.random() * 2 + 0.6;
    this.vy = -(Math.random() * 0.6 + 0.2);
    this.brillo = Math.random();
    this.color = Math.random() > 0.35 ? '#38bdf8' : '#fbbf24';
  }
  actualizar() {
    this.y += this.vy;
    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }
  dibujar() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;
    ctx.globalAlpha = this.brillo;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

const destellos = Array.from({ length: 65 }, () => new DestelloNoche());

function animarLuces() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  destellos.forEach(d => {
    d.actualizar();
    d.dibujar();
  });
  requestAnimationFrame(animarLuces);
}
animarLuces();