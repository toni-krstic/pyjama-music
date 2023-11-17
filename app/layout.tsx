import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "./providers";
import { MusicPlayer, Searchbar, Sidebar, TopPlay } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pyjama Music",
  description: "Music streaming app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="relative flex">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#3b2983]">
              <Searchbar />
              <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                <div className="flex-1 h-fit pb-40">{children}</div>
                <div className="xl:sticky relative top-0 h-fit">
                  <TopPlay />
                </div>
              </div>
            </div>
            <MusicPlayer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
