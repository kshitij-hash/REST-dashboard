import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rocket Education of Science and Technology",
  description: "Rocket Education of Science and Technology is an institution that provides education in Physics, Chemistry, Mathematics, and Biology for the students of class 9 to 12.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html >
  );
}
