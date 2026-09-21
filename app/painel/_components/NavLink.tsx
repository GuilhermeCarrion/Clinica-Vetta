"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const ativo = pathname === href;

  return (
    <Link
      href={href}
      className={`block px-4 py-2 border-l-2 text-sm transition-colors ${
        ativo
          ? "border-honey text-paper bg-ink/20"
          : "border-transparent text-paper/60 hover:text-paper hover:border-paper/30"
      }`}
    >
      {children}
    </Link>
  );
}
