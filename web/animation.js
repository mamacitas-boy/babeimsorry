const prefersLessMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function heartPoint(angle, scale) {
  return {
    x: 16 * Math.sin(angle) ** 3 * scale,
    y: -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * scale
  };
}

export function playHeart(canvas) {
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const bounds = canvas.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.round(bounds.width * pixelRatio));
  canvas.height = Math.max(1, Math.round(bounds.height * pixelRatio));
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width * .5;
  const centerY = height * .47;
  const scale = Math.min(width / 39, height / 34) * .78;
  const particles = Array.from({ length: 1150 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const point = heartPoint(angle, scale * (.88 + Math.random() * .12));
    const rayLength = scale * (.05 + Math.random() * .23);
    const direction = angle + (Math.random() - .5) * .55;
    return {
      x: centerX + point.x,
      y: centerY + point.y,
      x2: centerX + point.x + Math.cos(direction) * rayLength,
      y2: centerY + point.y + Math.sin(direction) * rayLength,
      alpha: .28 + Math.random() * .62,
      width: (.45 + Math.random() * .8) * pixelRatio,
      hue: Math.random() > .78 ? 7 : 350
    };
  });

  const draw = (progress) => {
    context.clearRect(0, 0, width, height);
    const count = Math.ceil(particles.length * progress);
    for (let index = 0; index < count; index += 1) {
      const particle = particles[index];
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.lineTo(particle.x2, particle.y2);
      context.lineWidth = particle.width;
      context.strokeStyle = `hsla(${particle.hue}, 55%, 46%, ${particle.alpha})`;
      context.stroke();
    }
  };

  if (prefersLessMotion.matches) {
    draw(1);
    return;
  }

  const duration = 4300;
  const started = performance.now();
  const frame = (now) => {
    const progress = Math.min(1, (now - started) / duration);
    draw(progress);
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
