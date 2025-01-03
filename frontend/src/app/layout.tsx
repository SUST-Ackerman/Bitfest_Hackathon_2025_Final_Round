import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <header className="bg-primary text-primary-foreground py-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Banglish to Bangla</h1>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/chatbot" className="hover:underline">Chatbot</a></li>
              <li><a href="/analytics" className="hover:underline">Analytics</a></li>
              <li><a href="/contribute" className="hover:underline">Contribute</a></li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto py-8">
          <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}
