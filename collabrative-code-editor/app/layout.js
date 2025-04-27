import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/context/SocketContext";
import AuthProvider from "@/context/AuthProvider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "My Next.js App",
  description: "A collaborative code editor with WebSockets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`antialiased`}>
          <Navbar />
          <SocketProvider>{children}</SocketProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
