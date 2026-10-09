// Confete em canvas, sem biblioteca: dois "canhões" nos cantos de baixo atirando para o centro.
// O canvas é criado na hora e removido quando o último pedaço sai da tela.

const COLORS = ['#8b7cf6', '#f472b6', '#22d3ee', '#fbbf24', '#4ade80'];
const GRAVITY = 0.28;
const DRAG = 0.985;
const MAX_DURATION_MS = 5000;

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle: number;
  spin: number;
  round: boolean;
}

export function burstConfetti(count = 180) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '1200',
  });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const { innerWidth: w, innerHeight: h } = window;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  document.body.append(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const pieces: Piece[] = Array.from({ length: count }, (_, i) => {
    const fromLeft = i % 2 === 0;
    // Ângulo entre ~50° e ~80° acima da horizontal, apontando para dentro da tela
    const angle = (Math.PI / 180) * (50 + Math.random() * 30);
    const speed = 14 + Math.random() * 10;
    return {
      x: fromLeft ? 0 : w,
      y: h,
      vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
      vy: -Math.sin(angle) * speed,
      size: 6 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      round: Math.random() < 0.3,
    };
  });

  const start = performance.now();

  const frame = (now: number) => {
    ctx.clearRect(0, 0, w, h);
    let alive = 0;

    for (const p of pieces) {
      p.vx *= DRAG;
      p.vy = p.vy * DRAG + GRAVITY;
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;
      if (p.y > h + 20) continue;
      alive++;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Achatado no eixo y para parecer um papel girando
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      ctx.restore();
    }

    if (alive > 0 && now - start < MAX_DURATION_MS) requestAnimationFrame(frame);
    else canvas.remove();
  };

  requestAnimationFrame(frame);
}
