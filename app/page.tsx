import Link from "next/link";

function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <ellipse cx="12" cy="15" rx="6" ry="5" />
      <ellipse cx="5" cy="8" rx="2.2" ry="3" />
      <ellipse cx="10.5" cy="5.5" rx="2.2" ry="3" />
      <ellipse cx="15.5" cy="5.5" rx="2.2" ry="3" />
      <ellipse cx="19" cy="8" rx="2.2" ry="3" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" />
      <path d="M8 10h8M8 13.5h8M8 17h5" />
    </svg>
  );
}

export default function Landing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="flex items-center gap-3 mb-2 text-pine">
        <PawIcon />
        <h1 className="font-display text-4xl">Clínica Vetta</h1>
      </div>
      <p className="text-ink/60 mb-12 text-center max-w-xs">
        Agendamento e acompanhamento do atendimento do seu pet
      </p>

      <div className="grid sm:grid-cols-2 gap-4 w-full max-w-xl">
        <Link
          href="/chat"
          className="group border border-moss/40 rounded-md p-6 hover:border-moss transition-colors bg-paper"
        >
          <div className="text-moss mb-4">
            <PawIcon />
          </div>
          <h2 className="font-display text-xl text-ink mb-1">Sou cliente</h2>
          <p className="text-sm text-ink/60">
            Fale com a clínica e agende uma consulta pro seu pet
          </p>
        </Link>

        <Link
          href="/painel"
          className="group border border-pine/30 rounded-md p-6 hover:border-pine transition-colors bg-paper"
        >
          <div className="text-pine mb-4">
            <ClipboardIcon />
          </div>
          <h2 className="font-display text-xl text-ink mb-1">Área da equipe</h2>
          <p className="text-sm text-ink/60">
            Acompanhe agendamentos pendentes e o histórico completo
          </p>
        </Link>
      </div>
    </main>
  );
}
