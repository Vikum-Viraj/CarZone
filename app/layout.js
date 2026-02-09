import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Header from "@/components/header";
import { Toast } from "radix-ui";
import { Toaster } from "sonner";


const geistSans = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "CarZone",
  description: "Find your car",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} antialiased`}
        >
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
          <footer className="bg-blue-500 py-12">
            <div className="container mx-auto text-center px-4 text-gray-600">
              <p>Made by Gavin</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
