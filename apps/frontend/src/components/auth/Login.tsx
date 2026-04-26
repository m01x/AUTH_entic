


import { LoginCard } from "./LoginCard";



export const Login = () => {
    return (
        <main
            className="relative flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 sm:px-6"
            style={{
                backgroundImage: `url('/login-background.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay para mejorar contraste sobre el fondo */}
            <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"
            />
            <div className="relative z-10 w-full">
                <div className="mx-auto flex w-full justify-center">
                    <LoginCard />
                </div>
            </div>
        </main>
    )
}
