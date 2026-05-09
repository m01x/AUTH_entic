import { Construction } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComingSoonProps {
  title?: string;
  description?: string;
  className?: string;
}

export function ComingSoon({
  title = "En Construcción",
  description = "Esta sección estará disponible pronto.",
  className,
}: ComingSoonProps) {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="glass-card w-full max-w-md rounded-2xl p-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className={cn(
              "flex size-16 items-center justify-center rounded-full",
              "bg-yellow-500/10 ring-2 ring-yellow-500/20"
            )}
          >
            <Construction className="size-8 text-yellow-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-white/60">{description}</p>
          <svg
            className="text-white/5"
            fill="currentColor"
            height="48"
            viewBox="0 0 24 24"
            width="48"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
