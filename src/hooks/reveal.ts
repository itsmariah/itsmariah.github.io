// Um único IntersectionObserver para todos os elementos com a classe .reveal.
// Uso: <div className="reveal" ref={reveal} /> — o React 19 chama a limpeza retornada ao desmontar.
let observer: IntersectionObserver | null = null;

function getObserver() {
  observer ??= new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer?.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  return observer;
}

export function reveal(el: Element | null) {
  if (!el) return;
  const obs = getObserver();
  obs.observe(el);
  return () => obs.unobserve(el);
}
