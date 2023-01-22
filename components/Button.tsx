import React, { ReactNode, useState } from "react";

type buttonProps = {
  variant?: "primary" | "danger" | "outline";
  children?: ReactNode;
  onClick?: () => void;
};

type buttonStyle = {
  variant?: "primary" | "danger" | "outline";
};

export default function Button({
  variant = "primary",
  children = "Button",
  onClick,
}: buttonProps) {
  const btnVariant = {
    primary: "bg-[#01959F] font-bold text-white",
    danger: "bg-[#E11428] font-bold text-white",
    outline:
      "outline outline-1 outline-[#E0E0E0] bg-white font-bold text-black",
  };

  return (
    <button
      onClick={onClick}
      className={`p-[4px_16px_4px_16px] rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.12)] ${btnVariant[variant]}`}
    >
      {children}
    </button>
  );
}
