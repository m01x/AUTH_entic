import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockSpinner } from "@/components/ui/lock-spinner";
import { cn } from "@/lib/utils";


export function LoginCard() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    //TODO: hardcode del estado de la API
    const apiState = false;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username.trim() || !password) {
            toast.error("Completa usuario y contraseña");
            return;
        }
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            toast.success("Inicio de sesión exitoso", {
                description: `Bienvenido, ${username}.`,
            });
        }, 3000);
    };

    return (
        <div
            className={cn(
                "glass-card w-full max-w-[420px] rounded-2xl px-7 py-8 sm:px-9 sm:py-10",
                "animate-in fade-in zoom-in-95 duration-500",
            )}
        >
            <div className="flex flex-col items-center">
                <img
                    src='/authentic-logo.png'
                    alt="Authentic"
                    className="h-12 w-auto select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                    draggable={false}
                />
                <h1 className="mt-5 text-xl font-semibold tracking-tight text-white">Bienvenido</h1>
                <p className="mt-1 text-sm text-white/70">Inicia sesión para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
                <div className="space-y-2">
                    <Label htmlFor="username" className="text-white/85">
                        Usuario
                    </Label>
                    <div className="relative">
                        <User
                            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/60"
                            aria-hidden
                        />
                        <Input
                            id="username"
                            type="text"
                            autoComplete="username"
                            placeholder="tu.usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="glass-input h-11 rounded-lg pl-9 pr-3 text-sm shadow-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/85">
                        Contraseña
                    </Label>
                    <div className="relative">
                        <Lock
                            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/60"
                            aria-hidden
                        />
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="glass-input h-11 rounded-lg pl-9 pr-10 text-sm shadow-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        >
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex cursor-pointer select-none items-center gap-2 text-white/80">
                        <Checkbox
                            checked={remember}
                            onCheckedChange={(v) => setRemember(v === true)}
                            className="border-white/40 bg-white/10 data-[state=checked]:bg-white data-[state=checked]:text-slate-900"
                        />
                        Recordarme
                    </label>
                    <button
                        type="button"
                        onClick={() =>
                            toast("Recuperación de contraseña", {
                                description: "Te enviaremos instrucciones a tu correo.",
                            })
                        }
                        className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>

                <Button
                    type="submit"
                    disabled={submitting}
                    className="glass-button h-11 w-full rounded-lg text-sm font-semibold tracking-wide shadow-none"
                >
                    {submitting ? <LockSpinner /> : "Iniciar sesión"}
                </Button>
            </form>

            <div className="mt-7 border-t border-white/15 pt-3 text-center text-xs text-white/60">
                Sandbox version 0.1 - API {(apiState) ? '🟢' : '🔴'}
            </div>
        </div>
    );
}