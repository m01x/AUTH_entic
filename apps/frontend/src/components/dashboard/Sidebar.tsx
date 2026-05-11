import { Home, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { mockUser, getUserInitials } from "@/lib/mockData";
import { UserMenu } from "./UserMenu";

const navItems = [
  { label: "Home", icon: Home, to: "/dashboard" as const },
  { label: "Users", icon: Users, to: "/dashboard/users" as const },
];

export function Sidebar() {
  return (
    <aside
      className={cn(
        "fixed left-3 top-3 z-40 flex w-60 flex-col rounded-2xl h-[calc(100vh-1.5rem)]",
        "glass-card border-white/20"
      )}
    >
      <div className="flex h-16 items-center justify-center border-b border-white/10 px-4">
        <img
          src="/authentic-logo.png"
          alt="Authentic Logo"
          className="h-10 w-auto object-contain"
        />
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeProps={{
              className: "bg-white/15 text-white",
            }}
            activeOptions={{ exact: true }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            <item.icon className="size-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <UserMenu user={mockUser} getInitials={getUserInitials} />
      </div>
    </aside>
  );
}
