import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import AuthProvider from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "baliprofit",
  description: "Find the Best Properties in Bali For Sale",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppRouterCacheProvider>
            <Header />
            <main id="main-content" suppressHydrationWarning>
              {children}
            </main>
            <Footer />
            <ToastContainer
              closeButton={false}
              position="bottom-right"
              closeOnClick
              pauseOnHover
              autoClose={3000}
              hideProgressBar
              limit={3}
            />
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
