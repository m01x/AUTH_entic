# PROJECT_CONTEXT.md - AUTH_entic

**Generado**: Abril 22, 2026  
**Proyecto**: AUTH_entic - Sistema de Autenticación  
**Versión**: 1.0.0

---

## 1. Visión General

### Nombre y Descripción

**Proyecto**: AUTH_entic  
**Descripción**: Sistema de autenticación y gestión de usuarios diseñado como plataforma modular y escalable.  
**Propósito**: Proveer un backend robusto para autenticación de usuarios con capacidad de extensión a frontend y servicios compartidos.

### Arquitectura

**Tipo**: Monorepo basado en pnpm workspaces  
**Estructura**:

- **Backend**: NestJS + TypeORM + PostgreSQL (activo)
- **Frontend**: Planeado en `apps/frontend/` (no implementado aún)
- **Packages compartidos**: Planeados en `packages/` (no implementado aún)

### Stack Tecnológico Principal

| Componente            | Versión                     | Propósito                            |
| --------------------- | --------------------------- | ------------------------------------ |
| **Runtime**           | Node.js ≥18.x               | Ejecución de la aplicación           |
| **Package Manager**   | pnpm ≥8.x (actual: 10.30.1) | Gestión de dependencias del monorepo |
| **Framework**         | NestJS ^11.0.1              | Framework principal del backend      |
| **ORM**               | TypeORM ^0.3.28             | Mapeo objeto-relacional              |
| **Base de Datos**     | PostgreSQL 16-alpine        | Base de datos relacional             |
| **Validación**        | class-validator ^0.15.1     | Validación de DTOs                   |
| **Encriptación**      | bcrypt ^6.0.0               | Hash seguro de contraseñas           |
| **Documentación API** | Swagger ^11.2.6             | OpenAPI/Swagger                      |
| **Lenguaje**          | TypeScript ^5.9.3           | Lenguaje principal                   |
| **Testing**           | Jest ^30.0.0                | Framework de testing                 |

---

## 2. Estructura del Monorepo

### Árbol de Directorios Significativo

```
AUTH_entic/                          # Raíz del monorepo
├── ADR/
│   ├── backend/
│   │   └── ADR_001.md              # Decisiones sobre compilación y PNPM
│   ├── common/                      # Vacío - reservado para decisiones comunes
│   └── frontend/                    # Vacío - reservado para decisiones frontend
│
├── apps/
│   ├── backend/                     # Aplicación NestJS activa
│   │   ├── src/
│   │   │   ├── main.ts             # Entry point de la aplicación
│   │   │   ├── app.module.ts       # Módulo raíz
│   │   │   └── users/              # Módulo de usuarios (Users domain)
│   │   │       ├── controllers/
│   │   │       ├── services/
│   │   │       ├── entities/
│   │   │       ├── dto/
│   │   │       └── users.module.ts
│   │   ├── test/                    # Tests E2E
│   │   ├── dist/                    # Artefactos compilados (no en git)
│   │   ├── node_modules/            # Symlinks a dependencias globales
│   │   ├── docker-compose.yml       # Configuración de servicios Docker
│   │   ├── tsconfig.json            # TypeScript - archivos de prueba incluidos
│   │   ├── tsconfig.build.json      # TypeScript build - excluye pruebas
│   │   ├── nest-cli.json            # Configuración del CLI de NestJS
│   │   ├── eslint.config.mjs        # Configuración ESLint + Prettier
│   │   ├── .prettierrc              # Configuración de Prettier
│   │   ├── .env                     # Variables de entorno (git-ignored)
│   │   └── package.json
│   └── frontend/                    # Definido en workspace pero no implementado
│
├── packages/                        # Espacio reservado para paquetes compartidos
│
├── package.json                     # Package.json raíz del monorepo
├── pnpm-workspace.yaml              # Configuración de workspaces
├── pnpm-lock.yaml                   # Archivo de lock verificado
├── README.md                         # Documentación del proyecto
└── .gitignore                        # Archivos ignorados por git

```

### Rol de Cada Carpeta

| Carpeta            | Rol                 | Descripción                                                     |
| ------------------ | ------------------- | --------------------------------------------------------------- |
| **ADR/**           | Decisiones técnicas | Documentación de decisiones arquitectónicas por dominio         |
| **apps/backend/**  | Aplicación activa   | NestJS backend principal con lógica de usuarios y autenticación |
| **apps/frontend/** | Futuro              | Reservado para aplicación frontend (React, Vue, etc.)           |
| **packages/**      | Futuro              | Reservado para librerías compartidas entre apps                 |

### Herramienta de Gestión del Monorepo

**Gestor**: pnpm 10.30.1  
**Configuración**: `pnpm-workspace.yaml`

```yaml
packages:
  - apps/* # Todas las aplicaciones bajo apps/
  - packages/* # Todas las librerías compartidas bajo packages/

onlyBuiltDependencies: # Dependencias que se construyen siempre
  - "@nestjs/core"
  - "@scarf/scarf"
  - bcrypt
  - unrs-resolver
```

**Implicaciones**:

- Las dependencias se instalan una sola vez en la raíz (`node_modules/`), mientras que `apps/*/node_modules` contiene symlinks
- Ejecutar `pnpm install` o `pnpm add` desde subdirectorios causará problemas; siempre desde la raíz

---

## 3. Aplicaciones y Paquetes

### 3.1 Backend (`apps/backend/`)

#### Propósito

Servidor NestJS que expone API REST para autenticación y gestión de usuarios. Es la única aplicación activa en el proyecto.

#### Dependencias Principales

```json
{
  "@nestjs/common": "^11.0.1",
  "@nestjs/core": "^11.0.1",
  "@nestjs/platform-express": "^11.0.1",
  "@nestjs/config": "^4.0.3",
  "@nestjs/typeorm": "^11.0.1",
  "@nestjs/swagger": "^11.2.6",
  "typeorm": "^0.3.28",
  "pg": "^8.20.0",
  "bcrypt": "^6.0.0",
  "class-validator": "^0.15.1",
  "class-transformer": "^0.5.1",
  "rxjs": "^7.8.1",
  "swagger-ui-express": "^5.0.1",
  "reflect-metadata": "^0.2.2"
}
```

#### DevDependencies Relevantes

```json
{
  "typescript": "^5.9.3",
  "@nestjs/cli": "^11.0.0",
  "@nestjs/schematics": "^11.0.0",
  "jest": "^30.0.0",
  "ts-jest": "^29.2.5",
  "@types/node": "^24.0.0",
  "eslint": "^9.18.0",
  "prettier": "^3.4.2",
  "supertest": "^7.0.0"
}
```

#### Scripts Disponibles

| Script        | Comando                                       | Descripción                                            |
| ------------- | --------------------------------------------- | ------------------------------------------------------ |
| `build`       | `nest build`                                  | Compila TypeScript a JavaScript en `dist/`             |
| `start`       | `nest start`                                  | Inicia el servidor en modo producción                  |
| `start:dev`   | `nest start --watch`                          | Inicia en modo desarrollo con recompilación automática |
| `start:debug` | `nest start --debug --watch`                  | Inicia con debugger y hot-reload                       |
| `start:prod`  | `node dist/main`                              | Ejecuta el artefacto compilado                         |
| `format`      | `prettier --write`                            | Formatea código TypeScript                             |
| `lint`        | `eslint "{src,apps,libs,test}/**/*.ts" --fix` | Lint + auto-fix de errores                             |
| `test`        | `jest`                                        | Ejecuta pruebas unitarias                              |
| `test:watch`  | `jest --watch`                                | Pruebas unitarias en modo watch                        |
| `test:cov`    | `jest --coverage`                             | Pruebas con reporte de cobertura                       |
| `test:debug`  | Node debugger + jest                          | Debugging interactivo de pruebas                       |
| `test:e2e`    | `jest --config ./test/jest-e2e.json`          | Pruebas end-to-end                                     |

#### Puerto y Punto de Entrada

- **Puerto**: 3000 (configurable vía `process.env.PORT`)
- **Entry point**: `src/main.ts`
- **Documentación Swagger**: `http://localhost:3000/api/docs`
- **Variable de entorno**: `PORT` (default: 3000)

#### Configuración de Jest

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "src",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": { "^.+\\.(t|j)s$": "ts-jest" },
  "collectCoverageFrom": ["**/*.(t|j)s"],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node"
}
```

### 3.2 Frontend (`apps/frontend/`)

**Estado**: No implementado aún  
**Observaciones**: Definido en `pnpm-workspace.yaml` pero el directorio no existe en `apps/frontend/`.

### 3.3 Packages Compartidos (`packages/`)

**Estado**: No implementado aún  
**Observaciones**: Definido en `pnpm-workspace.yaml` pero el directorio no existe.  
**Propósito previsto**: Alojar librerías compartidas entre backend y frontend (tipos TypeScript, validadores, utilidades, etc.).

---

## 4. Arquitectura de la Aplicación Backend

### 4.1 Framework y Versión

- **Framework**: NestJS ^11.0.1
- **Patrón**: Basado en módulos, controladores, servicios y decoradores de TypeScript
- **Características utilizadas**: Dependency Injection, Guards, Pipelines, Exception Filters

### 4.2 Módulos NestJS Existentes

#### AppModule (`src/app.module.ts`)

**Responsabilidad**: Módulo raíz que configura la aplicación  
**Imports**:

- `ConfigModule` - Gestión de variables de entorno
- `TypeOrmModule` con configuración asincrónica
- `UsersModule` - Módulo de usuarios

**Configuración Detallada TypeORM**:

```typescript
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: "postgres",
    host: configService.get<string>("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    username: configService.get<string>("DB_USER"),
    password: configService.get<string>("DB_PASSWORD"),
    database: configService.get<string>("DB_NAME"),
    autoLoadEntities: true, // Carga entidades automáticamente
    synchronize: true, // Sincroniza schema en cada inicio
  }),
});
```

#### UsersModule (`src/users/users.module.ts`)

**Responsabilidad**: Gestión completa del dominio de usuarios  
**Providers**:

- `UsersService` - Lógica de negocio
  **Controllers**:
- `UsersController` - Rutas HTTP
  **Imports**:
- `TypeOrmModule.forFeature([User])` - Registra la entidad User

### 4.3 Entidades de Base de Datos

#### User (`src/users/entities/user.entity.ts`)

```sql
-- Tabla generada por TypeORM
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firstName VARCHAR NOT NULL,
  lastName VARCHAR NOT NULL,
  birthDate DATE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  passwordHash VARCHAR NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

| Campo          | Tipo                  | Restricciones                | Descripción                               |
| -------------- | --------------------- | ---------------------------- | ----------------------------------------- |
| `id`           | UUID                  | PK, generado automáticamente | Identificador único del usuario           |
| `firstName`    | VARCHAR               | NOT NULL                     | Nombre del usuario                        |
| `lastName`     | VARCHAR               | NOT NULL                     | Apellido del usuario                      |
| `birthDate`    | DATE                  | NOT NULL                     | Fecha de nacimiento                       |
| `email`        | VARCHAR               | NOT NULL, UNIQUE             | Correo electrónico único                  |
| `passwordHash` | VARCHAR               | NOT NULL                     | Hash seguro de la contraseña (bcrypt)     |
| `role`         | ENUM('admin', 'user') | DEFAULT 'user'               | Rol del usuario (admin o usuario regular) |
| `isActive`     | BOOLEAN               | DEFAULT true                 | Indica si el usuario está activo          |
| `createdAt`    | TIMESTAMP             | DEFAULT CURRENT_TIMESTAMP    | Fecha de creación                         |
| `updatedAt`    | TIMESTAMP             | DEFAULT CURRENT_TIMESTAMP    | Fecha de última actualización             |

**Enum UserRole** (definido en la entidad):

```typescript
enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
```

### 4.4 Controladores

#### UsersController (`src/users/users.controller.ts`)

| Método HTTP | Ruta     | DTO Entrada     | Descripción                           |
| ----------- | -------- | --------------- | ------------------------------------- |
| POST        | `/users` | `CreateUserDto` | Crear un nuevo usuario con validación |

**Decoradores**:

- `@ApiTags('Auth/Users')` - Agrupa rutas en Swagger bajo "Auth/Users"
- `@Controller('users')` - Prefijo de ruta base

**Respuesta esperada** (exitosa):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "firstName": "Juan",
  "lastName": "Pérez",
  "birthDate": "1990-01-01",
  "email": "dev@tutor.com",
  "role": "user",
  "isActive": true,
  "createdAt": "2026-04-22T10:30:00Z",
  "updatedAt": "2026-04-22T10:30:00Z"
}
```

_Nota_: El campo `passwordHash` NO se retorna por razones de seguridad.

### 4.5 Servicios

#### UsersService (`src/users/users.service.ts`)

**Métodos implementados**:

##### `create(createUserDto: CreateUserDto)`

**Lógica**:

1. Extrae password del DTO y valida si el email ya existe
2. Hash seguro de la contraseña con bcrypt (10 salt rounds - estándar seguro)
3. Crea instancia de User con los datos + passwordHash
4. Guarda en base de datos
5. Retorna usuario SIN el hash por seguridad

**Excepciones lanzadas**:

- `BadRequestException` - Si el email ya existe ("El correo ya está registrado")

**Dependencias inyectadas**:

- `@InjectRepository(User)` - Acceso al repositorio TypeORM

### 4.6 DTOs (Data Transfer Objects)

#### CreateUserDto (`src/users/dto/create-user.dto.ts`)

| Campo       | Tipo            | Validaciones                   | Descripción                    | Ejemplo              |
| ----------- | --------------- | ------------------------------ | ------------------------------ | -------------------- |
| `firstName` | string          | @IsString, @IsNotEmpty         | Nombre del usuario             | "Juan"               |
| `lastName`  | string          | @IsString, @IsNotEmpty         | Apellido del usuario           | "Pérez"              |
| `birthDate` | string          | @IsDateString                  | Fecha ISO 8601                 | "1990-01-01"         |
| `email`     | string          | @IsEmail, @IsNotEmpty          | Correo válido (validación RFC) | "dev@tutor.com"      |
| `password`  | string          | @IsNotEmpty, @MinLength(6)     | Mín. 6 caracteres              | "MiSuperPassword123" |
| `role`      | UserRole (enum) | @IsEnum(UserRole), @IsOptional | Rol del usuario                | "user" o "admin"     |

**Errores de validación personalizados**:

- Email inválido: "Debe ser un correo válido"
- Contraseña corta: "La contraseña debe tener al menos 6 caracteres"

#### UpdateUserDto (`src/users/dto/update-user.dto.ts`)

```typescript
export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

**Características**:

- Extiende `CreateUserDto` usando `@nestjs/mapped-types`
- Todos los campos son opcionales (PartialType)
- Mantiene las mismas validaciones que CreateUserDto cuando se proporciona un valor

**Nota**: No hay endpoint PATCH/PUT implementado aún, pero el DTO está listo para su uso futuro.

### 4.7 Configuración de Base de Datos

#### Tipo de Base de Datos

- **Sistema**: PostgreSQL 16 (Alpine Linux)
- **Imagen Docker**: `postgres:16-alpine`
- **Contenedor**: `auth_entic_postgres`

#### Sincronización de Schema

- **`synchronize: true`** en `AppModule` - Sincroniza automáticamente el schema en cada inicio
- **Entidades cargadas automáticamente**: `autoLoadEntities: true`
- **Implicación**: Cambios en las entidades TypeORM se reflejarán automáticamente en la BD

#### Migraciones

**Estado**: No hay migraciones TypeORM configuradas aún  
**Observación**: El proyecto usa `synchronize: true` que es válido para desarrollo pero **no recomendado para producción**.

### 4.8 Variables de Entorno

#### Archivo `.env` (presente en `apps/backend/.env`)

```env
DB_USER=admin
DB_PASSWORD=supersecretpassword
DB_NAME=auth_entic_db
DB_PORT=5433
DB_HOST=localhost
PORT=3000  # Opcional, default está en main.ts
```

#### Descripción de Variables

| Variable      | Tipo   | Requerida | Default               | Descripción                               |
| ------------- | ------ | --------- | --------------------- | ----------------------------------------- |
| `DB_HOST`     | string | Sí        | `localhost`           | Host del servidor PostgreSQL              |
| `DB_PORT`     | number | Sí        | `5433`                | Puerto del servidor PostgreSQL            |
| `DB_USER`     | string | Sí        | `admin`               | Usuario de PostgreSQL                     |
| `DB_PASSWORD` | string | Sí        | `supersecretpassword` | Contraseña de PostgreSQL                  |
| `DB_NAME`     | string | Sí        | `auth_entic_db`       | Nombre de la base de datos                |
| `PORT`        | number | No        | `3000`                | Puerto donde escucha la aplicación NestJS |

#### Archivo `.env.example`

**Estado**: No existe aún  
**Es necesario crear para documentar variables requeridas**.

---

## 5. Decisiones Técnicas Registradas (ADR)

### ADR_001: Configuración de Compilación y Gestión de Dependencias en Monorepo (PNPM + NestJS)

**Archivo**: `ADR/backend/ADR_001.md`  
**Fecha**: No especificada en el documento

#### Problema

- Los monorepos con NestJS y workspaces pueden sufrir fallos silenciosos en resolución de módulos
- TypeScript puede compilar exitosamente pero fallar en runtime si las configuraciones no son explícitas
- Los symlinks en `node_modules` pueden romperse si se ejecutan comandos desde subdirectorios

#### Solución Adoptada

**Regla crítica**: Nunca ejecutar `npm install`, `pnpm install`, o `pnpm add` desde `apps/backend/` u otros subdirectorios. **Siempre desde la raíz del monorepo**.

**Configuración requerida**:

1. **tsconfig.json**: Debe incluir `src/**/*` en `include`
2. **tsconfig.build.json**: Debe heredar de tsconfig.json y excluir test/dist/spec.ts
3. **nest-cli.json**: Debe especificar `sourceRoot: src` y `compilerOptions.tsConfigPath: tsconfig.build.json`
4. **Opciones estrictas en tsconfig**: `preserveSymlinks: true`, `skipLibCheck: true`

#### Alternativas Descartadas

- No se descarta usar npm/yarn en lugar de pnpm, pero pnpm es más eficiente para monorepos
- No se descarta usar migraciones TypeORM explícitas, pero se usa `synchronize: true` para desarrollo

#### Guía de Troubleshooting Incluida

Si `dist/` no se genera:

1. Verifica que `nest build` se ejecuta desde la raíz o `apps/backend/`
2. Reconstruye symlinks: `pnpm install` desde la raíz
3. Limpia caché: `rm -rf node_modules/.pnpm-state.json dist tsconfig.tsbuildinfo`
4. Verifica permisos de archivo si estás en WSL2

### ADR Vacíos (Reservados)

- **ADR/common/**: Vacío - reservado para decisiones arquitectónicas comunes
- **ADR/frontend/**: Vacío - reservado para decisiones del frontend

---

## 6. Configuraciones Clave

### 6.1 TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2021",
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "incremental": true,
    "tsBuildInfoFile": "./dist/tsconfig.build.tsbuildinfo",
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "preserveSymlinks": true
  },
  "include": ["src/**/*"]
}
```

**Opciones críticas**:

- `emitDecoratorMetadata: true` - Requiere para que los decoradores de NestJS funcionen
- `experimentalDecorators: true` - Habilita decoradores
- `target: es2021` - Compatible con Node.js 14+
- `preserveSymlinks: true` - Crítico en monorepos con pnpm
- `skipLibCheck: true` - Acelera compilación ignorando errores en node_modules
- `strictNullChecks: false` - Deshabilitado (menos estricto, más permisivo)

### 6.2 TypeScript Build (`tsconfig.build.json`)

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}
```

**Propósito**: Usada solo durante compilación (no incluye pruebas)

### 6.3 NestJS CLI (`nest-cli.json`)

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "tsConfigPath": "tsconfig.build.json"
  }
}
```

**Configuración**:

- `sourceRoot: "src"` - Directorio de código fuente
- `deleteOutDir: true` - Elimina `dist/` antes de recompilar
- `tsConfigPath: "tsconfig.build.json"` - Usa build config para compilación

### 6.4 Docker Compose (`docker-compose.yml`)

```yaml
services:
  db_auth:
    image: postgres:16-alpine
    container_name: auth_entic_postgres
    restart: always
    env_file:
      - .env
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - "5433:5432"
    volumes:
      - auth_entic_data:/var/lib/postgresql/data

volumes:
  auth_entic_data:
```

**Servicios definidos**:

- **db_auth**: PostgreSQL 16 Alpine
  - Puerto host: 5433 → Puerto contenedor: 5432
  - Variables de entorno desde `.env`
  - Volumen persistente: `auth_entic_data`
  - Restart policy: always

### 6.5 ESLint (`eslint.config.mjs`)

```javascript
// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["eslint.config.mjs"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: "commonjs",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
);
```

**Configuración**:

- Combinación de ESLint + Prettier
- Usa `typescript-eslint` para análisis TypeScript
- Reglas custom:
  - `@typescript-eslint/no-explicit-any`: OFF (permite `any`)
  - `no-floating-promises`: WARN (advierte Promises no esperadas)
  - `prettier/prettier`: ERROR (enforces Prettier format)

### 6.6 Prettier (`.prettierrc`)

```json
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

**Configuración**:

- Usar comillas simples (`'`) en lugar de dobles
- Agregar comas finales en arrays/objetos multilínea

---

## 7. Estado Actual del Proyecto

### 7.1 Funcionalidades Implementadas

#### ✅ Módulo de Usuarios

- **Crear usuario**: Endpoint POST `/users` completamente funcional
  - Validación de email siendo único
  - Hash seguro de contraseña con bcrypt (10 salt rounds)
  - Validaciones en DTO (email, contraseña mínimo 6 caracteres, etc.)
  - Retorna usuario creado sin exponer el hash de contraseña

#### ✅ Infraestructura Base

- Módulo `AppModule` con configuración global
- Conexión a PostgreSQL via TypeORM
- Documentación Swagger/OpenAPI automática en `/api/docs`
- CORS habilitado
- Global ValidationPipe para validación de DTOs
- ConfigModule para gestión de variables de entorno

#### ✅ Base de Datos

- Entidad `User` con campos completos (id, email, firstName, lastName, birthDate, passwordHash, role, etc.)
- Tabla sincronizada automáticamente en PostgreSQL

### 7.2 Funcionalidades Faltantes o Incompletas

#### ❌ No Implementado

| Funcionalidad                  | Evidencia                                     | Impacto                                                   |
| ------------------------------ | --------------------------------------------- | --------------------------------------------------------- |
| Autenticación (Login)          | No hay endpoint POST `/auth/login`            | Usuarios creatorios no pueden iniciar sesión              |
| JWT/Tokens                     | No hay módulo de autenticación/autorización   | Sin manejo de sesiones o autorización                     |
| Obtener usuario (GET)          | No hay endpoint GET `/users/:id`              | No se pueden consultar usuarios                           |
| Actualizar usuario (PATCH/PUT) | DTO existe pero no controlador                | No se pueden modificar usuarios                           |
| Eliminar usuario (DELETE)      | No hay lógica de eliminación                  | No se pueden borrar usuarios                              |
| Roles/Autorización             | Enum UserRole existe pero no se usa en guards | Rol es solo informativo, no restrictivo                   |
| Recuperación de contraseña     | No implementado                               | Usuarios no pueden recuperar acceso si olvidan contraseña |
| Email verificación             | No hay validación de emails                   | Usuarios pueden registrarse con emails ficticios          |
| Rate limiting                  | No implementado                               | API vulnerable a fuerza bruta                             |
| Logging centralizado           | No hay logger configurado                     | Difícil rastrear errores en producción                    |
| Tests unitarios                | No hay archivos `.spec.ts`                    | Sin cobertura de testing                                  |
| Tests E2E                      | Config existe pero sin casos                  | Sin validación end-to-end                                 |
| Frontend                       | No existe                                     | Cliente web no disponible                                 |
| Documentación de API           | Swagger disponible pero incompleto            | Clientes pueden confundirse                               |

#### ⚠️ Deuda Técnica Visible

1. **`synchronize: true` en producción**: Riesgoso, debe reemplazarse con migraciones
2. **Validaciones débiles**: Contraseña mínimo 6 caracteres es muy bajo para seguridad
3. **Sin manejo de errores global**: Solo ValidationPipe, falta ExceptionFilter personalizado
4. **Sin logging**: No hay ConfigService para logging estructurado
5. **Typo en mensaje de error**: "El correo ya está registradoz" (z al final)
6. **Documentación Swagger incompleta**: No hay descripciones detalladas de respuestas
7. **Variables de entorno en `.env`**: Contraseña en plain text en repositorio (aunque debería estar en .gitignore)
8. **Sin paquetes compartidos**: Frontend tendría que reimplementar DTOs/lógica

### 7.3 Estado de Directorios

| Directorio       | Estado                | Observaciones                              |
| ---------------- | --------------------- | ------------------------------------------ |
| `ADR/common/`    | Vacío                 | Reservado pero sin contenido               |
| `ADR/frontend/`  | Vacío                 | Reservado pero sin contenido               |
| `apps/frontend/` | No existe             | Definido en workspace pero no creado       |
| `packages/`      | No existe             | Definido en workspace pero no creado       |
| `src/users/`     | Parcialmente completo | Solo CREATE, faltan READ/UPDATE/DELETE     |
| `test/`          | Vacío                 | Configurado en package.json pero sin tests |

---

## 8. Guía de Inicio Rápido

### 8.1 Prerrequisitos

```bash
# Verificar versiones instaladas
node --version        # Debe ser ≥18.x
pnpm --version        # Debe ser ≥8.x
npm list -g pnpm      # Verificar instalación global

# Requisitos opcionales
docker --version      # Recomendado para PostgreSQL
docker-compose --version
```

### 8.2 Instalación Inicial

```bash
# 1. Clonar repositorio
git clone <url-del-repo>
cd AUTH_entic

# 2. Instalar dependencias (DESDE LA RAÍZ, nunca desde apps/backend/)
pnpm install

# 3. Verificar que los symlinks en apps/backend/node_modules/ apuntan correctamente
ls -la apps/backend/node_modules/@nestjs/core

# 4. Copiar variables de entorno
cd apps/backend
cp .env.example .env  # Si existe, sino crear manualmente

# 5. Compilar TypeScript
pnpm run build

# 6. Verificar que dist/ fue generado
ls -la dist/main.js
```

### 8.3 Levantar el Proyecto Desde Cero

#### Opción A: Con Docker (Recomendado)

```bash
# Desde apps/backend/
cd apps/backend

# 1. Iniciar PostgreSQL en Docker
docker-compose up -d

# Verificar que el contenedor está corriendo
docker-compose ps
# Output esperado:
# NAME                   SERVICE   STATUS
# auth_entic_postgres    db_auth   Up

# 2. Levantar la aplicación NestJS
pnpm run start:dev

# Output esperado:
# [Nest] 1234  - 04/22/2026, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
# [Nest] 1234  - 04/22/2026, 10:30:00 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +50ms
# [Nest] 1234  - 04/22/2026, 10:30:00 AM     LOG [RoutesResolver] UsersController {/users}:
# [Nest] 1234  - 04/22/2026, 10:30:00 AM     LOG [RouterExplorer] Mapped {/users, POST} route
# [Nest] 1234  - 04/22/2026, 10:30:01 AM     LOG [NestApplication] Nest application successfully started +150ms
```

#### Opción B: PostgreSQL Local

```bash
# 1. Instalar PostgreSQL localmente (macOS)
brew install postgresql@16

# 2. Iniciar servicio
brew services start postgresql@16

# 3. Crear base de datos
createdb -U postgres auth_entic_db

# 4. Actualizar .env
cat > apps/backend/.env << EOF
DB_USER=postgres
DB_PASSWORD=
DB_NAME=auth_entic_db
DB_PORT=5432
DB_HOST=localhost
EOF

# 5. Levantar aplicación
cd apps/backend
pnpm run start:dev
```

### 8.4 Validar que Todo Funciona

```bash
# 1. Acceder a Swagger
# Abrir en navegador: http://localhost:3000/api/docs

# 2. Probar endpoint de crear usuario vía curl
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "birthDate": "1990-01-01",
    "email": "test@example.com",
    "password": "TestPassword123"
  }'

# Respuesta esperada (200 OK):
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "firstName": "Test",
  "lastName": "User",
  "birthDate": "1990-01-01",
  "email": "test@example.com",
  "role": "user",
  "isActive": true,
  "createdAt": "2026-04-22T10:30:00.000Z",
  "updatedAt": "2026-04-22T10:30:00.000Z"
}

# 3. Verificar logs en terminal (sin errores)
```

### 8.5 Comandos Más Usados en el Día a Día

```bash
# Desarrollo
pnpm run start:dev                # Hot-reload durante desarrollo
pnpm run lint                     # Verificar y auto-fix linting
pnpm run format                   # Formatear código

# Testing
pnpm run test                     # Ejecutar pruebas unitarias
pnpm run test:watch               # Pruebas en modo watch
pnpm run test:cov                 # Cobertura de testing

# Compilación/Producción
pnpm run build                    # Compilar a dist/
pnpm run start:prod               # Ejecutar versión compilada

# Database
docker-compose up -d              # Iniciar PostgreSQL
docker-compose down               # Detener PostgreSQL
docker-compose logs -f            # Ver logs del contenedor

# Debugging
pnpm run start:debug              # Inicia con debugger (puerto 9229)
# Luego abrir Chrome DevTools: chrome://inspect
```

### 8.6 Troubleshooting Común

#### Problema: "Cannot find module '@nestjs/core'"

```bash
# Causa: node_modules/symlinks rotos
# Solución:
pnpm install                      # Desde la raíz del monorepo
rm -rf apps/backend/dist
pnpm run build
```

#### Problema: "Port 5433 already in use"

```bash
# Solución 1: Usar otro puerto
# En .env: DB_PORT=5434
# En docker-compose.yml: ports: - '5434:5432'

# Solución 2: Detener el contenedor existente
docker-compose down
docker rm auth_entic_postgres 2>/dev/null
docker-compose up -d
```

#### Problema: "EACCES: permission denied, open '.env'"

```bash
# En WSL2/Linux: Verificar permisos
chmod 644 .env
chmod 755 apps/backend
```

#### Problema: "Connection refused to localhost:5432"

```bash
# PostgreSQL no está corriendo
docker-compose up -d              # O iniciar PostgreSQL local
sleep 2                           # Esperar a que PostgreSQL inicie
pnpm run start:dev
```

---

## 9. Resumen Ejecutivo

### Estado Actual

AUTH_entic es un **monorepo pnpm con un backend NestJS funcional en fase inicial**. Solo está implementada la creación de usuarios con validaciones y hash de contraseñas. La infraestructura base (TypeORM, PostgreSQL, Swagger, validación) está en su lugar.

### Próximos Pasos Recomendados

1. Implementar autenticación JWT (login, logout, refresh tokens)
2. Agregar endpoints CRUD completos para usuarios
3. Configurar tests unitarios y E2E
4. Crear guards de autorización basados en roles
5. Agregar frontend (React/Vue)
6. Configurar migraciones TypeORM para producción
7. Implementar logging centralizado

### Riesgos Actuales

- ⚠️ Contraseñas débiles (mínimo 6 caracteres)
- ⚠️ Sin autenticación implementada
- ⚠️ `synchronize: true` riesgoso en BD
- ⚠️ Variables de entorno sin encriptación

### Oportunidades

- ✅ Stack moderno y bien estructurado
- ✅ Monorepo preparado para escalabilidad
- ✅ Documentación Swagger automática
- ✅ TypeScript completo con configuración estricta

---

## Anexos

### A. Mapa de Archivos Críticos

| Archivo                           | Propósito                          | Estado                |
| --------------------------------- | ---------------------------------- | --------------------- |
| `apps/backend/src/main.ts`        | Entry point, configuración Swagger | Completo              |
| `apps/backend/src/app.module.ts`  | Módulo raíz, config DB             | Completo              |
| `apps/backend/src/users/*`        | Módulo de dominio completo         | Parcial (solo CREATE) |
| `apps/backend/package.json`       | Scripts y dependencias             | Completo              |
| `ADR/backend/ADR_001.md`          | Decisiones técnicas críticas       | Completo              |
| `apps/backend/docker-compose.yml` | Infraestructura local              | Completo              |
| `.env`                            | Secretos de desarrollo             | Presente              |
| `.env.example`                    | Template de variables              | ❌ Falta              |
| `apps/backend/README.md`          | Documentación app                  | Presente              |

### B. Versiones Exactas (del pnpm-lock.yaml)

```
@nestjs/common: 11.1.18
@nestjs/core: 11.1.18
@nestjs/platform-express: 11.1.18
@nestjs/swagger: 11.2.6
@nestjs/typeorm: 11.0.1
@nestjs/config: 4.0.3
@nestjs/cli: 11.0.0
typeorm: 0.3.28
pg: 8.20.0
bcrypt: 6.0.0
class-validator: 0.15.1
class-transformer: 0.5.1
rxjs: 7.8.2
typescript: 5.9.3
jest: 30.0.0
postgresql (docker): 16-alpine
```

### C. Relaciones Entre Módulos

```
AppModule
├── ConfigModule (Global)
├── TypeOrmModule (conecta con PostgreSQL)
│   └── User entity
└── UsersModule
    ├── UsersController (POST /users)
    ├── UsersService (create logic)
    └── User entity (via TypeOrmModule.forFeature)
```

---

**Documento generado automáticamente**  
**Autorizado para compartir con otros asistentes de IA**  
**Actualizar cuando haya cambios significativos en la arquitectura**
