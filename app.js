// Configuración
const TELEFONO = "51910318539";
const MENSAJE = "¡Hola! Leí las páginas iluminadas y acepto la invitación al Circuito Mágico del Agua ⛲✨ ¿Qué hora cuadramos?";

const datosPaginas = [
  { foto: "foto1.jpg", pie: "Fig. 1 — Túnel de las Sorpresas" },
  { foto: "foto2.jpg", pie: "Fig. 2 — Fuente de la Fantasía" },
  { foto: "foto3.jpg", pie: "Fig. 3 — Laberinto del Ensueño" },
  { foto: "foto4.jpg", pie: "Fig. 4 — Una noche para recordar" }
];

let indiceActual = 1;
const totalCapitulos = 4;

const fotoCapitulo = document.getElementById('fotoCapitulo');
const pieFoto = document.getElementById('pieFoto');
const paginacionTexto = document.getElementById('paginacionTexto');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const btnSi = document.getElementById('btnSi');
const btnNo = document.getElementById('btnNo');
const textoAlerta = document.getElementById('textoAlerta');
const cajaPregunta = document.getElementById('cajaPregunta');
const cajaExito = document.getElementById('cajaExito');
const btnWsp = document.getElementById('btnWsp');

btnWsp.href = `https://wa.me/${TELEFONO}?text=${encodeURIComponent(MENSAJE)}`;

function actualizarVista() {
  for (let i = 1; i <= totalCapitulos; i++) {
    const cap = document.getElementById(`cap-${i}`);
    if (cap) cap.classList.toggle('activo', i === indiceActual);
  }

  const dato = datosPaginas[indiceActual - 1];
  fotoCapitulo.src = dato.foto;
  pieFoto.textContent = dato.pie;

  paginacionTexto.textContent = `Pág. ${indiceActual} de ${totalCapitulos}`;

  btnPrev.style.visibility = (indiceActual === 1) ? 'hidden' : 'visible';
  btnNext.style.visibility = (indiceActual === totalCapitulos) ? 'hidden' : 'visible';
}

function cambiarHoja(delta) {
  const nuevoIndice = indiceActual + delta;
  if (nuevoIndice >= 1 && nuevoIndice <= totalCapitulos) {
    indiceActual = nuevoIndice;
    actualizarVista();
  }
}

// Botón escurridizo
let escalaSi = 1;
let intentos = 0;
const advertencias = [
  "¡Uy, casi! El chorro de agua fue más rápido 😜",
  "Esta página brilla demasiado para rechazarla ✨",
  "Ese botón no tiene batería... 😂",
  "El botón azul iluminado es la clave 👆"
];

function escaparBoton(e) {
  if (e) e.preventDefault();

  textoAlerta.textContent = advertencias[intentos % advertencias.length];
  intentos++;

  escalaSi += 0.12;
  btnSi.style.transform = `scale(${escalaSi})`;

  btnNo.style.position = 'fixed';
  const padding = 25;
  const maxX = window.innerWidth - btnNo.offsetWidth - padding;
  const maxY = window.innerHeight - btnNo.offsetHeight - padding;

  const randX = Math.max(padding, Math.floor(Math.random() * maxX));
  const randY = Math.max(padding, Math.floor(Math.random() * maxY));

  btnNo.style.left = `${randX}px`;
  btnNo.style.top = `${randY}px`;
}

function aceptarInvitacion() {
  btnNo.style.display = 'none';
  cajaPregunta.style.display = 'none';
  cajaExito.style.display = 'block';

  confetti({
    particleCount: 140,
    spread: 85,
    colors: ['#38bdf8', '#fbbf24', '#ffffff', '#0284c7'],
    origin: { y: 0.6 }
  });
}

// --- LIENZO NOCTURNO: ESTRELLAS Y GOTAS BIOLUMINISCENTES ---
const canvas = document.getElementById('canvas-luces');
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
    this.radio = Math.random() * 1.8 + 0.4;
    this.vy = -(Math.random() * 0.6 + 0.2);
    this.brillo = Math.random();
    this.color = Math.random() > 0.3 ? '#38bdf8' : '#fbbf24';
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
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.globalAlpha = this.brillo;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

const destellos = Array.from({ length: 55 }, () => new DestelloNoche());

function animarLuces() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  destellos.forEach(d => {
    d.actualizar();
    d.dibujar();
  });
  requestAnimationFrame(animarLuces);
}
animarLuces();

actualizarVista();