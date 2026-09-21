import Link from "next/link";
import { NavLink } from "./_components/NavLink";

function PawIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <ellipse cx="12" cy="15" rx="6" ry="5" />
      <ellipse cx="5" cy="8" rx="2.2" ry="3" />
      <ellipse cx="10.5" cy="5.5" rx="2.2" ry="3" />
      <ellipse cx="15.5" cy="5.5" rx="2.2" ry="3" />
      <ellipse cx="19" cy="8" rx="2.2" ry="3" />
    </svg>
  );
}

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-pine flex flex-col py-6 px-3 shrink-0">
        <div className="flex items-center gap-2 text-paper px-2 mb-8">
          <PawIcon />
          <span className="font-display text-lg">Vetta</span>
        </div>

        <nav className="flex flex-col gap-1">
          <NavLink href="/painel">Pendentes</NavLink>
          <NavLink href="/painel/historico">Histórico</NavLink>
        </nav>

        <Link
          href="/"
          className="mt-auto px-4 py-2 text-xs text-paper/40 hover:text-paper/70"
        >
          ← Página inicial
        </Link>
      </aside>

      <div className="flex-1 bg-paper">{children}</div>
    </div>
  );
}
