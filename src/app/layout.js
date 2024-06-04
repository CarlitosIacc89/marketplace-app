import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Marketplace",
  description:
    "Marketplace intuitivo y fácil de usar, diseñado para la compra y venta de artículos categorizados en electrónica, autos, propiedades y ropa. Los usuarios pueden autenticarse de manera segura mediante Google y aprovechar la API de localización de Google Maps para ubicaciones precisas. La aplicación es completamente responsiva, asegurando una experiencia óptima en cualquier dispositivo, y está construida con las últimas tecnologías: ReactJS, NextJS, TailwindCSS y MongoDB. Además, a través de este proyecto, he tenido la oportunidad de conocer y trabajar con server actions, mejorando mi comprensión y habilidades en el desarrollo backend",
  author: "Carlos Soria",
  keywords: "articulos, electronica, autos, propiedades",
  openGraph: {
    title: "Marketplace",
    description: "Encuentra y ofrece el articulo que quieras",
    images: [
      {
        url: "https://res.cloudinary.com/dtlchh1km/image/upload/v1717539068/marketplace/Captura_de_pantalla_2024-06-04_185305_nephwt.png",
        width: 600,
        height: 400,
      },
    ],
    site_name: "Marketplace-app",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header {...{ session }} />
        {children}
      </body>
    </html>
  );
}
