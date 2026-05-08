# AUTH_entic - Contexto de Proyecto para Claude

> **Proposito**: Documento de contexto tecnico para asistentes de IA. Incluye arquitectura, stack, decisiones tecnicas y estado actual del proyecto.
> **Fecha de actualizacion**: Mayo 2026
> **Version**: 1.1.0

---

## 1. Resumen Ejecutivo

**AUTH_entic** es un monorepo que contiene un sistema de autenticacion y gestion de usuarios. Consta de:

- **Backend**: API REST en NestJS con TypeORM y PostgreSQL (funcional, en desarrollo activo).
- **Frontend**: Aplicacion React con Vite, Tailwind CSS v4 y shadcn/ui (en desarrollo temprano, solo pantalla de login).
- **Infraestructura**: PostgreSQL 16 via Docker Compose.
- **Planificación y gestión**: Existen las carpetas .opencode y ADR para la planificación, arquitectura, justificaciones de desiciones tecnicas y recursos utilizados por los agentes
  IA , estas carpetas son la fuente de la verdad, para opencode , Copilot, Gemini, Antigravity.
  El objetivo es una plataforma modular y escalable de autenticacion, con capacidad de extenderse a multiples aplicaciones frontend y paquetes compartidos.

---

## 2. Arquitectura General

### Tipo de repositorio

Monorepo gestionado con **pnpm workspaces**.

```
AUTH_entic/
├── apps/
│   ├── backend/          # NestJS - API de autenticacion
│   └── frontend/         # React + Vite - Interfaz de usuario
├── ADR/                  # Registro de Decisiones de Arquitectura
│   ├── backend/
│   ├── frontend/
│   └── common/
├── package.json          # Raiz del monorepo
├── pnpm-workspace.yaml   # Configuracion de workspaces
└── pnpm-lock.yaml
```

### Reglas criticas del monorepo

- **SIEMPRE** ejecutar `pnpm install` desde la raiz del proyecto. Nunca desde subdirectorios (`apps/backend/`, etc.).
- Las dependencias se instalan una sola vez en `node_modules/` raiz; los `apps/*/node_modules` son symlinks.
- Ejecutar `pnpm add` o `pnpm install` desde subdirectorios rompe los symlinks y causa fallos silenciosos de resolucion de modulos.

---

## 3. Backend (`apps/backend/`)

### Stack tecnico

| Componente        | Tecnologia / Version      | Proposito                                |
| ----------------- | ------------------------- | ---------------------------------------- |
| Framework         | NestJS ^11.0.1            | Backend Node.js con arquitectura modular |
| Lenguaje          | TypeScript ^5.9.3         | Tipado estatico                          |
| ORM               | TypeORM ^0.3.28           | Mapeo objeto-relacional                  |
| Base de datos     | PostgreSQL 16 (Alpine)    | Persistencia relacional                  |
| Driver PG         | pg ^8.20.0                | Driver PostgreSQL para Node.js           |
| Validacion        | class-validator ^0.15.1   | Validacion de DTOs                       |
| Hash de passwords | bcrypt ^6.0.0             | Seguridad de contrasenas                 |
| Documentacion API | Swagger / OpenAPI ^11.2.6 | Documentacion interactiva de endpoints   |
| Testing           | Jest ^30.0.0 + ts-jest    | Tests unitarios y E2E                    |
| Lint/Format       | ESLint ^9 + Prettier ^3   | Calidad de codigo                        |

### Estructura del backend

```
apps/backend/src/
├── main.ts                 # Entry point. Configura Swagger, ValidationPipe global, CORS, prefijo /api
├── app.module.ts           # Modulo raiz. Configura ConfigModule, TypeOrmModule, UsersModule
└── users/                  # Dominio de Usuarios (modulo completo)
    ├── users.module.ts
    ├── users.controller.ts # Rutas HTTP
    ├── users.service.ts    # Logica de negocio
    ├── entities/
    │   └── user.entity.ts  # Entidad TypeORM
    └── dto/
        ├── create-user.dto.ts
        └── update-user.dto.ts
```

### Configuracion clave

**`main.ts`**:

- Prefijo global `/api` en todos los endpoints.
- `ValidationPipe` global con `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`.
- Swagger en `/api/docs` con soporte para BearerAuth (preparado para JWT futuro).
- CORS habilitado para comunicacion con el frontend.
- Puerto: `process.env.PORT ?? 3000`.

**`app.module.ts`**:

- `ConfigModule.forRoot({ isGlobal: true })` para variables de entorno.
- `TypeOrmModule.forRootAsync()` con configuracion asincrona desde `ConfigService`.
- Opciones TypeORM: `autoLoadEntities: true`, `synchronize: true` (**solo desarrollo**).

### Entidad User

```typescript
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid") id: string;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ type: "date" }) birthDate: Date;
  @Column({ unique: true }) email: string;
  @Column() passwordHash: string;
  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;
  @Column({ default: true }) isActive: boolean;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
```

Enum `UserRole`: `ADMIN`, `USER`.

### Endpoints actuales (UsersController)

| Metodo | Ruta         | Estado          | Descripcion                        |
| ------ | ------------ | --------------- | ---------------------------------- |
| POST   | `/users`     | Implementado    | Crear usuario con validaciones     |
| GET    | `/users`     | Implementado    | Listar usuarios (sin passwordHash) |
| GET    | `/users/:id` | No implementado | Devuelve `NotImplementedException` |
| PATCH  | `/users/:id` | No implementado | Devuelve `NotImplementedException` |
| DELETE | `/users/:id` | No implementado | Devuelve `NotImplementedException` |

### Logica de creacion de usuario (UsersService)

1. Extrae `password` del DTO.
2. Valida unicidad de email (lanza `BadRequestException` si existe).
3. Hashea la contrasena con bcrypt (10 salt rounds).
4. Crea y guarda la entidad User.
5. Retorna el usuario **sin** el campo `passwordHash`.

### DTOs y validaciones

**CreateUserDto**:

- `firstName`: `@IsString`, `@IsNotEmpty`
- `lastName`: `@IsString`, `@IsNotEmpty`
- `birthDate`: `@IsDateString` (formato ISO 8601)
- `email`: `@IsEmail`, `@IsNotEmpty`
- `password`: `@IsNotEmpty`, `@MinLength(6)`
- `role`: `@IsEnum(UserRole)`, `@IsOptional` (default: `user`)

**UpdateUserDto**: Extiende `PartialType(CreateUserDto)` de `@nestjs/mapped-types`.

### TypeScript configuracion critica

Opciones clave en `tsconfig.json`:

- `experimentalDecorators: true`
- `emitDecoratorMetadata: true`
- `preserveSymlinks: true` (critico para pnpm workspaces)
- `skipLibCheck: true`
- `target: es2021`

`tsconfig.build.json` extiende el anterior y excluye `test`, `dist`, `**/*spec.ts`.

`nest-cli.json`:

- `sourceRoot: "src"`
- `deleteOutDir: true`
- `tsConfigPath: "tsconfig.build.json"`

---

## 4. Frontend (`apps/frontend/`)

### Stack tecnico

| Componente           | Tecnologia / Version   | Proposito                            |
| -------------------- | ---------------------- | ------------------------------------ |
| Framework            | React ^19.2.5          | UI declarativa                       |
| Bundler              | Vite ^8.0.10           | Build tool rapido con HMR            |
| Estilos              | Tailwind CSS ^4.2.4    | Utility-first CSS                    |
| Componentes UI       | shadcn/ui (radix-nova) | Biblioteca de componentes accesibles |
| Iconos               | Lucide React ^1.11.0   | Iconos SVG                           |
| Toast/Notificaciones | Sonner ^2.0.7          | Notificaciones tipo toast            |
| Temas                | next-themes ^0.4.6     | Soporte de temas claro/oscuro        |
| Tipografia           | Geist (variable)       | Fuente principal                     |

### Estructura del frontend

```
apps/frontend/src/
├── main.tsx                 # Entry point React (StrictMode)
├── App.tsx                  # Componente raiz (renderiza <Login />)
├── index.css                # Tailwind v4 + design system + utilidades glassmorphism
├── lib/
│   └── utils.ts             # Funcion `cn()` para mergear clases (clsx + tailwind-merge)
└── components/
    ├── auth/
    │   ├── Login.tsx        # Layout de pantalla completa con fondo
    │   └── LoginCard.tsx    # Formulario de login funcional (mock)
    └── ui/
        ├── button.tsx
        ├── checkbox.tsx
        ├── input.tsx
        ├── label.tsx
        ├── lock-spinner.tsx
        └── sonner.tsx
```

### Caracteristicas del frontend actual

- **Pantalla de login** con diseno glassmorphism (fondo translucido con blur).
- Fondo de pantalla completa con imagen (`/login-background.jpg`) y overlay de gradiente.
- Formulario funcional (client-side only, sin conexion a API aun):
  - Campos: usuario, contrasena, recordarme.
  - Toggle para mostrar/ocultar contrasena.
  - Estado de carga simulado (spinner) durante 3 segundos.
  - Toast de exito con `sonner`.
- Indicador de estado de API hardcodeado a `false` (rojo) en la parte inferior.

### Sistema de diseno (CSS/Tailwind)

- **Tailwind CSS v4** con sintaxis nueva (`@import "tailwindcss"`, `@theme inline`).
- Design system con variables CSS semanticas (`--color-primary`, `--color-background`, etc.) en formato `oklch`.
- Soporte para modo oscuro via clase `.dark`.
- Utilidades custom glassmorphism:
  - `.glass-card`: fondo translucido, blur, borde sutil.
  - `.glass-input`: input con fondo translucido y estados hover/focus.
  - `.glass-button`: boton con efecto glass y escala al click.

### Configuracion de shadcn/ui

- Estilo: `radix-nova`
- `rsc: false` (no usa React Server Components)
- `tsx: true`
- Alias base: `@/components`, `@/lib/utils`
- Icon library: `lucide`

---

## 5. Infraestructura y DevOps

### Docker Compose (`apps/backend/docker-compose.yml`)

Servicio: `db_auth`

- Imagen: `postgres:16-alpine`
- Contenedor: `auth_entic_postgres`
- Puerto host: `5433` → contenedor: `5432`
- Variables desde archivo `.env` del backend.
- Volumen persistente: `auth_entic_data`

### Variables de entorno (backend)

Archivo: `apps/backend/.env`

```env
DB_USER=admin
DB_PASSWORD=supersecretpassword
DB_NAME=auth_entic_db
DB_PORT=5433
DB_HOST=localhost
PORT=3000
```

| Variable      | Requerida | Default               | Descripcion                    |
| ------------- | --------- | --------------------- | ------------------------------ |
| `DB_HOST`     | Si        | `localhost`           | Host de PostgreSQL             |
| `DB_PORT`     | Si        | `5433`                | Puerto de PostgreSQL           |
| `DB_USER`     | Si        | `admin`               | Usuario de BD                  |
| `DB_PASSWORD` | Si        | `supersecretpassword` | Contrasena de BD               |
| `DB_NAME`     | Si        | `auth_entic_db`       | Nombre de la base de datos     |
| `PORT`        | No        | `3000`                | Puerto de la aplicacion NestJS |

> **Nota de seguridad**: El archivo `.env` actual contiene credenciales en texto plano. En produccion debe usarse un gestor de secretos.

---

## 6. Decisiones Tecnicas Clave

### 6.1. Monorepo con pnpm workspaces

- **Decision**: Usar pnpm workspaces en lugar de npm/yarn.
- **Razon**: Mayor eficiencia en espacio, symlinks robustos y mejor manejo de dependencias compartidas.
- **Implicacion**: Requiere disciplina de ejecutar comandos de paquetes siempre desde la raiz.

### 6.2. NestJS + TypeORM

- **Decision**: Framework NestJS con TypeORM como ORM.
- **Razon**: NestJS proporciona arquitectura modular, inyeccion de dependencias y ecosistema maduro. TypeORM se integra nativamente con el modulo `@nestjs/typeorm`.
- **Implicacion**: El backend sigue patrones de arquitectura limpia (modulos, controladores, servicios, entidades).

### 6.3. `synchronize: true` en TypeORM

- **Decision**: Habilitar sincronizacion automatica del schema.
- **Razon**: Agilidad en desarrollo; los cambios en entidades se reflejan inmediatamente.
- **Riesgo**: **NO debe usarse en produccion**. Se debe migrar a migraciones TypeORM antes de desplegar.

### 6.4. React + Vite + Tailwind v4 (frontend)

- **Decision**: Usar Vite como bundler y Tailwind CSS v4 para estilos.
- **Razon**: Vite ofrece HMR rapido y configuracion minima. Tailwind v4 introduce la nueva sintaxis `@theme inline` y mejores performances.
- **Implicacion**: El frontend usa la ultima generacion de herramientas, pero requiere familiaridad con las nuevas APIs de Tailwind v4.

### 6.5. shadcn/ui para componentes base

- **Decision**: Instalar componentes de shadcn/ui en lugar de una libreria de componentes tradicional.
- **Razon**: Los componentes se copian directamente al proyecto (propiedad total), son altamente personalizables y construidos sobre Radix UI (accesibilidad).
- **Implicacion**: No hay dependencia de una libreria de UI opaca; cada componente puede modificarse libremente.

### 6.6. Glassmorphism para la interfaz de login

- **Decision**: Diseno visual basado en glassmorphism (transparencia + blur).
- **Razon**: Estetica moderna y adaptable a cualquier fondo de imagen.
- **Implementacion**: Utilidades CSS custom (`glass-card`, `glass-input`, `glass-button`) usando `color-mix(in oklab, ...)` y `backdrop-filter`.

---

## 7. Estado Actual vs. Roadmap

### Funcionalidades implementadas

- [x] Backend NestJS con conexion a PostgreSQL.
- [x] Entidad `User` con campos completos y roles.
- [x] Endpoint `POST /api/users` (crear usuario con validacion y hash de contrasena).
- [x] Endpoint `GET /api/users` (listar usuarios, excluyendo passwordHash).
- [x] Documentacion Swagger en `/api/docs`.
- [x] Docker Compose para PostgreSQL.
- [x] Frontend React con pantalla de login (mock, sin conexion a API).
- [x] Sistema de diseno con Tailwind v4 y glassmorphism.

### Funcionalidades pendientes / en construccion

- [ ] Autenticacion real (login con JWT/refresh tokens).
- [ ] Guards de autorizacion basados en roles (`@nestjs/passport`, JWT).
- [ ] Endpoints CRUD completos de usuario (GET by id, PATCH, DELETE) - controladores definidos, servicios no implementados.
- [ ] Conexion frontend-backend (llamadas a la API desde el login).
- [ ] Registro de nuevos usuarios desde el frontend.
- [ ] Manejo de errores global (ExceptionFilter).
- [ ] Logging estructurado.
- [ ] Rate limiting.
- [ ] Tests unitarios y E2E.
- [ ] Migraciones TypeORM (reemplazar `synchronize: true`).
- [ ] Creacion de `packages/` para tipos y utilidades compartidas.
- [ ] Variables de entorno documentadas (`.env.example`).

---

## 8. Convenciones y Estándares

### Backend

- Modulos NestJS por dominio (ej. `users/`).
- DTOs en carpeta `dto/`, entidades en `entities/`.
- Validacion de entrada via `class-validator`.
- Nunca retornar `passwordHash` en respuestas JSON.
- Prefijo de API: `/api`.

### Frontend

- Componentes en `src/components/`, utilidades en `src/lib/`.
- Alias `@/` apunta a `src/`.
- Usar `cn()` para combinar clases de Tailwind condicionalmente.
- shadcn/ui components en `src/components/ui/`.
- Estilos custom (glassmorphism) definidos en `index.css` bajo `@layer components`.

### General

- TypeScript en todo el proyecto (backend y frontend).
- Formateo con Prettier (`singleQuote: true`, `trailingComma: "all"`).
- Linting con ESLint + typescript-eslint.

---

## 9. Como extender el proyecto

### Agregar un nuevo modulo al backend

1. Generar resource NestJS: `nest g resource <nombre>` dentro de `apps/backend/src/`.
2. Crear entidad TypeORM en `entities/`.
3. Registrar en el modulo correspondiente con `TypeOrmModule.forFeature([Entidad])`.
4. Agregar el modulo a `AppModule`.
5. Documentar DTOs con `@ApiProperty` para Swagger.

### Agregar un nuevo componente UI al frontend

1. Usar CLI de shadcn: `npx shadcn add <componente>` (desde `apps/frontend/`).
2. Importar y usar desde `@/components/ui/<componente>`.
3. Aplicar clases de utilidad de Tailwind y `cn()` para variaciones.

### Agregar un paquete compartido

1. Crear carpeta en `packages/<nombre>/`.
2. Inicializar con su propio `package.json` y `tsconfig.json`.
3. Exportar tipos/interfaces/utilidades.
4. Referenciar desde `apps/backend` y `apps/frontend` via workspace protocol (`workspace:*`).

---

## 10. Notas para el asistente de IA

- Si el usuario pregunta sobre **autenticacion JWT**: aun no esta implementada. Swagger ya tiene `addBearerAuth()` preparado.
- Si el usuario pregunta sobre **migraciones TypeORM**: actualmente se usa `synchronize: true`. Recomendar configurar migraciones antes de produccion.
- Si el usuario pregunta sobre **el frontend**: la unica pantalla funcional es el login, y no se comunica con el backend todavia.
- Si el usuario reporta errores de **modulos no encontrados** (`Cannot find module`): casi siempre es porque `pnpm install` se ejecuto desde un subdirectorio. La solucion es borrar `node_modules` y reinstalar desde la raiz.
- Si el usuario quiere **cambiar el puerto de PostgreSQL**: modificar `DB_PORT` en `.env` y el mapeo de puertos en `docker-compose.yml`.
- Los **tests** (unitarios y E2E) estan configurados en `package.json` pero no hay archivos `.spec.ts` ni casos de prueba escritos.

# CARPETA CENTRAL DE AGENTES IA.

Todo lo que corresponda a lineamientos especificos de la IA , deberán establecerse en la carpeta .opencode y las desiciones y bitacora tecnica, en ADR.
Todos los agentes de Ia deberán utilizar esta carpeta y crear una subcarpeta .<nombre_IA> si requieren un sub contexto propio.
