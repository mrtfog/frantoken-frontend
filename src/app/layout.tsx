import type { Metadata } from "next";
import { SessionProvider } from "@/core/hooks/SessionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "FranToken — Franquicias, pensadas en conjunto",
  description:
    "Conocé el modelo propuesto de FranToken para evaluar, estructurar y operar proyectos de franquicia con información clara en cada etapa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
