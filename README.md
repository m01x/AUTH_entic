# AUTH_entic

Este es un repositorio monorepo basado en [pnpm workspaces](https://pnpm.io/workspaces).

## Arquitectura

El proyecto está dividido en distintas aplicaciones y posibles paquetes compartidos (dentro de un futuro directorio `packages/`).

Actualmente cuenta con las siguientes aplicaciones dentro del directorio `apps/`:

- **backend**: Aplicación backend construida sobre [NestJS](https://nestjs.com/).

## Requisitos previos

- Node.js (versión recomendada: >= 18.x)
- pnpm (versión recomendada: >= 8.x o superior)

Si no tienes `pnpm` instalado, puedes instalarlo de manera global mediante:

```bash
npm install -g pnpm
```

## Instalación

En la raíz del proyecto (donde se encuentra este archivo `README.md`), ejecuta:

```bash
pnpm install
```

Este comando instalará las dependencias necesarias para todas las aplicaciones y paquetes definidos en este monorepositorio, optimizando el espacio al compartir dependencias en común.

## Scripts principales

Desde la raíz puedes ejecutar varios comandos útiles o puedes dirigirte directamente al directorio de la app específica.

### Backend

Para trabajar específicamente en el backend:

1. Ingresa al directorio de la app:
```bash
cd apps/backend
```

2. Y utiliza los scripts correspondientes, por ejemplo:
```bash
# Iniciar en modo desarrollo
pnpm run start:dev

# Ejecutar tests
pnpm run test

# Construir para producción
pnpm run build
```

## Estructura del proyecto

```text
AUTH_entic/
├── apps/
│   └── backend/         # API en NestJS
├── node_modules/        # Módulos descargados globales y enlanzes simbólicos para las apps
├── pnpm-lock.yaml       # Archivo de bloqueo (lock) general
├── pnpm-workspace.yaml  # Configuración del entorno del monorepositorio
└── package.json         # Dependencias globales y scripts a nivel de proyecto
```
