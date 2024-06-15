import Navbar from "@/components/shared/navbar/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Loader } from "lucide-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import AuthProvider from "./auth/AuthProvider";
import "./globals.css";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Next.js 14 app for managing issues.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <QueryClientProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Suspense fallback={<Loader className="animate-spin" />}>
                <Navbar />
                <main className="ml-8 mt-7">{children}</main>
                <Toaster />
              </Suspense>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
