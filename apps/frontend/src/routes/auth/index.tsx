import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
    component: RouteComponent,
})

const authenticated = true;

function RouteComponent() {
    if (authenticated) {
        return <Navigate to='/dashboard' replace />
    } else {
        return <Navigate to='/auth/login' replace />
    }
}


/**
 * REDIRECT DE /auth SEGÚN ESTADO DE AUTENTICACIÓN
 *
 * TODO (backend): Reemplazar variable mock por contexto de auth real.
 *   Pasos sugeridos para integración:
 *     1. Elegir librería de auth (recomendado: @tanstack/react-auth o Zustand + JWT)
 *     2. Crear AuthProvider en app root
 *     3. Leer token del storage (localStorage / cookies httpOnly)
 *     4. Reemplazar `authenticated` mock por:
 *        - authContext.isAuthenticated ?? false
 *        - O validar token JWT y derivados de /me
 *   Archivos involucrados:
 *     - src/routes/auth/index.tsx (este archivo — redirect)
 *     - src/routes/auth/login.tsx (login real)
 *     - src/routes/auth/register.tsx (registro real)
 */