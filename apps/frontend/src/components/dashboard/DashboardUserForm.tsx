import { Calendar, Lock, Mail, Shield, UserPen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const DashboardUserForm = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div
        className={cn(
          "glass-card w-full max-w-[520px] rounded-2xl px-7 py-8 sm:px-9 sm:py-10",
          "animate-in fade-in zoom-in-95 duration-500",
        )}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Nuevo Usuario
          </h1>
          <p className="mt-1 text-sm text-white/70">
            Completa los datos del usuario
          </p>
        </div>

        <form className="mt-7 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white/85">
              Nombre(s)
            </Label>
            <div className="relative">
              <UserPen
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/60"
                aria-hidden
              />
              <Input
                id="firstName"
                type="text"
                placeholder="Juan"
                className="glass-input h-11 rounded-lg pl-9 pr-3 text-sm shadow-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white/85">
              Apellido(s)
            </Label>
            <div className="relative">
              <UserPen
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/60"
                aria-hidden
              />
              <Input
                id="lastName"
                type="text"
                placeholder="Pérez"
                className="glass-input h-11 rounded-lg pl-9 pr-3 text-sm shadow-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-white/85">
              Fecha de nacimiento
            </Label>
            <div className="relative">
              <Calendar
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/60"
                aria-hidden
              />
              <Input
                id="birthDate"
                type="date"
                className="glass-input h-11 rounded-lg pl-9 pr-3 text-sm shadow-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/85">
              Correo electrónico
            </Label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/60"
                aria-hidden
              />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="dev@tutor.com"
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
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="glass-input h-11 rounded-lg pl-9 pr-3 text-sm shadow-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-white/85">
              Rol
            </Label>
            <div className="relative">
              <Shield
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/60 z-10"
                aria-hidden
              />
              <Select>
                <SelectTrigger
                  id="role"
                  size="default"
                  className="glass-input h-11 rounded-lg pl-9 pr-3 text-sm shadow-none w-full"
                >
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">Usuario</SelectItem>
                  <SelectItem value="ADMIN">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="glass-button h-11 w-full rounded-lg text-sm font-semibold tracking-wide shadow-none"
          >
            Crear Usuario
          </Button>
        </form>
      </div>
    </div>
  );
};
