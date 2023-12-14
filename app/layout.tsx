import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { ModalProvider } from "@/providers/modal-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ToastProvider } from "@/providers/toast-provider";
import { ConvexClientProvider } from "@/providers/convex-client-provider";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoppingify App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <ConvexClientProvider>
          <ToastProvider />
          <ModalProvider />
          {children}
          <SpeedInsights />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
