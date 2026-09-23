const PASOS = [
  {
    numero: "01",
    titulo: "Elegí o armá",
    texto: "Elegí un equipo del catálogo, o armá tu PC pieza por pieza en el armador.",
  },
  {
    numero: "02",
    titulo: "Sumá al pedido",
    texto: "Agregá todo lo que quieras — hasta varias PCs armadas — a un mismo pedido.",
  },
  {
    numero: "03",
    titulo: "Contacto por WhatsApp",
    texto: "Se abre WhatsApp con tu pedido ya escrito y detallado. Solo tenés que enviarlo.",
  },
  {
    numero: "04",
    titulo: "Entrega o retiro",
    texto: "Coordinamos pago, armado y entrega. Envíos a todo el país.",
  },
];

export function ComoFunciona() {
  return (
    <section className="border-t border-borde bg-superficie/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-tenue">Simple y rápido</p>
          <h2 className="titulo-display mt-2 text-3xl sm:text-4xl">Cómo comprar</h2>
        </div>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((paso) => (
            <li key={paso.numero} className="text-center">
              <div className="titulo-display mx-auto text-4xl text-acento/70">{paso.numero}</div>
              <h3 className="mt-3 text-sm font-bold uppercase tracking-wide">{paso.titulo}</h3>
              <p className="mx-auto mt-3 max-w-[15rem] text-sm leading-relaxed text-tenue">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
