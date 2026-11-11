import { LinkButton } from "@/components/ui/button";
import { LogoMark } from "@/components/shared/logo";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-x flex flex-1 flex-col items-center justify-center py-32 text-center">
      <LogoMark className="h-14 w-14 rounded-2xl text-2xl" />
      <p className="mt-8 font-display text-7xl font-semibold italic tracking-tight text-gold-500/80 sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl tracking-tight text-ink-950 sm:text-4xl dark:text-sand-50">
        This suite doesn't exist
      </h1>
      <p className="mt-3 max-w-md text-base text-ink-500 dark:text-ink-300">
        The page you're after has been moved, renamed, or never checked in.
        Let's get you back to the collection.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <LinkButton href="/" variant="gold" icon={<Home className="h-4 w-4" />}>
          Back home
        </LinkButton>
        <LinkButton href="/hotels" variant="outline" icon={<Compass className="h-4 w-4" />}>
          Browse stays
        </LinkButton>
      </div>
    </div>
  );
}
