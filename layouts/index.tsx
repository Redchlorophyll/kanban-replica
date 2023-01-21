import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";

type defaultLayout = {
  children: ReactNode;
  onClick?: () => void;
};

export default function defaultLayout({ children, onClick }: defaultLayout) {
  return (
    <div className="w-full h-[100vh] bg-white">
      <Navbar onClick={onClick} />
      {children}
    </div>
  );
}
