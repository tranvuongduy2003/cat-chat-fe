import { GraphQLProvider } from "@/contexts/apollo-context";
import { AuthProvider } from "@/contexts/auth-context";
import { MainProtectedRoute } from "@/HOC/main-protected-route";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Mini Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <GraphQLProvider>
          <AuthProvider>
            <MainProtectedRoute>{children}</MainProtectedRoute>
          </AuthProvider>
        </GraphQLProvider>
        <Toaster />
      </body>
    </html>
  );
}
