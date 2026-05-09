import { Home, ShieldCheck } from "lucide-react";

export const DashboardComponent = () => {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 sm:px-6"
      style={{
        backgroundImage: `url('/login-background3.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay oscuro con difuminado */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />

      <div className="relative z-10 w-full">
        <div className="mx-auto flex w-full max-w-[420px] flex-col items-center gap-6">
          {/* Card verde */}
          <div
            className="w-full rounded-2xl p-6 sm:p-8 text-white"
            style={{
              background: "color-mix(in oklab, rgb(34 197 94) 12%, transparent)",
              backdropFilter: "blur(24px) saturate(140%)",
              WebkitBackdropFilter: "blur(24px) saturate(140%)",
              border: "1px solid color-mix(in oklab, rgb(34 197 94) 35%, transparent)",
              boxShadow:
                "0 20px 60px -20px rgba(0, 0, 0, 0.55), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-green-500/20">
                <Home className="size-5 text-green-300" />
              </div>
              <span className="text-lg font-semibold">Bienvenido usuario.</span>
            </div>
          </div>

          {/* Card roja */}
          <div
            className="w-full rounded-2xl p-6 sm:p-8 text-white"
            style={{
              background: "color-mix(in oklab, rgb(239 68 68) 12%, transparent)",
              backdropFilter: "blur(24px) saturate(140%)",
              WebkitBackdropFilter: "blur(24px) saturate(140%)",
              border: "1px solid color-mix(in oklab, rgb(239 68 68) 35%, transparent)",
              boxShadow:
                "0 20px 60px -20px rgba(0, 0, 0, 0.55), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-red-500/20">
                <ShieldCheck className="size-5 text-red-300" />
              </div>
              <span className="text-lg font-semibold">Admin enabled</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
