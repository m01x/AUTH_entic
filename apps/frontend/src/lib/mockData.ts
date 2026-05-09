export type UserRole = "admin" | "user";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string | null;
}

export interface MockPost {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: Date;
}

export const mockUser: MockUser = {
  id: "1",
  name: "Juan Pérez",
  email: "juan.perez@auth_entic.com",
  role: "admin",
  avatar: null,
};

export const mockPosts: MockPost[] = [
  {
    id: "1",
    title: "Bienvenido al sistema AUTH_entic",
    description: "Este es el primer post de bienvenida al sistema de autenticación.",
    author: "Administrador",
    createdAt: new Date("2026-05-01T10:30:00"),
  },
  {
    id: "2",
    title: "Nuevas funcionalidades implementadas",
    description: "Se han agregado nuevas funcionalidades al dashboard.",
    author: "Administrador",
    createdAt: new Date("2026-05-03T14:45:00"),
  },
  {
    id: "3",
    title: "Mantenimiento programado",
    description: "El sistema tendrá un mantenimiento programada el próximo domingo.",
    author: "Administrador",
    createdAt: new Date("2026-05-07T09:00:00"),
  },
  {
    id: "4",
    title: "Mejoras de seguridad",
    description: "Se han implementado mejoras de seguridad en el sistema.",
    author: "Administrador",
    createdAt: new Date("2026-05-08T11:20:00"),
  },
  {
    id: "5",
    title: "Actualización de políticas de privacidad",
    description: "Hemos actualizado nuestras políticas de privacidad. Por favor revísalas.",
    author: "Administrador",
    createdAt: new Date("2026-05-09T08:15:00"),
  },
];

export const getUserInitials = (user: MockUser): string => {
  const parts = user.name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return user.name.substring(0, 2).toUpperCase();
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
