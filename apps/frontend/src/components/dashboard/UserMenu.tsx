import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { MockUser } from "@/lib/mockData";
import { successToast } from "@/hooks/useToast";

interface UserMenuProps {
  user: MockUser;
  getInitials: (user: MockUser) => string;
}

export function UserMenu({ user, getInitials }: UserMenuProps) {
  const handleLogout = () => {
    successToast("Sesión cerrada correctamente");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <div
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5",
            "transition-all duration-200",
            "hover:bg-white/10"
          )}
        >
          <Avatar size="sm">
            <AvatarFallback className="bg-green-500/20 text-green-400 text-xs">
              {getInitials(user)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-white/50">{user.role}</p>
          </div>
          <User className="size-4 text-white/50" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 glass-card border-white/20"
      >
        <DropdownMenuItem asChild>
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-2 text-white/80 hover:text-white"
          >
            Mi Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-400 focus:text-red-400 focus:bg-red-500/10"
        >
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
