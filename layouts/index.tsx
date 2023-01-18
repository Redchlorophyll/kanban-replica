import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";

type defaultLayout = {
  children: ReactNode;
};

export default function defaultLayout({ children }: defaultLayout) {
  return (
    <div className="w-full h-[100vh] bg-white">
      <Navbar />
      {children}
    </div>
  );
}
