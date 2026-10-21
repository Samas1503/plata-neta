import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { BTN_PRIMARY, PANEL } from "@/components/ds";

export { BTN_PRIMARY };

export function AuthShell({
  kicker,
  title,
  description,
  alt,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  alt: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-background to-background text-foreground">
      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-separator bg-background/80 px-8 py-4 backdrop-blur">
        <Link href="/" className="text-lg font-bold tracking-tight">
          plata<span className="text-emerald-600">-neta</span>
        </Link>
        {alt}
      </nav>
      <main className="flex items-center justify-center px-4 py-16">
        <Reveal className="w-full max-w-md">
          <div className={`${PANEL} px-8 py-10`}>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              {kicker}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-muted">{description}</p>
            <div className="mt-8 flex flex-col gap-4">{children}</div>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
