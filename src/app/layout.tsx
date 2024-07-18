import type { Metadata, Viewport } from "next";
import "./globals.css";
import LeftSideBar from "@/components/bars/LeftSideBar";
import RightSideBar from "@/components/bars/RightSideBar";
import BottomBar from "@/components/bars/BottomBar";
import Navbar from "@/components/bars/Navbar";
import AuthProvider from "@/context/AuthProvider";
import { auth } from "@/lib/auth";
import { ThemeProviders } from "../context/ThemeProviders";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "SastaGram",
  description:
    "This is a simple App Like Instagram Built Using Next JS, MongoDB and Cloudinary",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex w-full justify-center bg-white dark:bg-slate-800">
        <ThemeProviders>
          <AuthProvider session={session}>
            <div className="flex md:p-2 h-screen gap-3 max-w-7xl w-full">
              <div className="w-[25%] hidden md:block">
                <LeftSideBar />
              </div>
              <div className="w-[50%] flex flex-col md:justify-between flex-1">
                <Navbar />
                {children}
                <div className="md:hidden">
                  <BottomBar />
                </div>
              </div>
              <div className="w-[25%] hidden lg:block">
                <RightSideBar />
              </div>
            </div>
          </AuthProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
