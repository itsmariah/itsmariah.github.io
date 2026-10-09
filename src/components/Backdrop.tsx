// Fundo decorativo fixo atrás da página: três manchas de aurora e uma camada de granulação.
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <span className="aurora-blob" />
      <span className="aurora-blob" />
      <span className="aurora-blob" />
      <div className="backdrop-grain" />
    </div>
  );
}
