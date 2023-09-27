"use client";
import "../globals.css";

import { Providers } from "@/components/providers";
import LeftBar from "@/components/layouts/left-bar";
import RightBar from "@/components/layouts/right-bar";
import Feed from "@/components/layouts/feed";
import Navbar from "@/components/layouts/navbar";
import { Nunito } from "next/font/google";

const roboto = Nunito({ weight: "500", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <Navbar />
          <div className=" grid grid-cols-12 h-screen">
            <LeftBar className=" col-span-3 hidden md:block " />
            <Feed className=" col-span-6 bg-gray-100">{children}</Feed>
            <RightBar className="col-span-3 hidden md:block relative " />
          </div>
        </Providers>
      </body>
    </html>
  );
}
