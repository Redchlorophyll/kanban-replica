import React, { ReactNode } from "react";

type cardType = {
  variant?: "primary" | "alert" | "danger" | "success" | "mute";
  children?: ReactNode;
};

export default function Card({ variant = "primary", children }: cardType) {
  const cardVariants = {
    primary: "outline-[#4DB5BC] bg-[#F7FEFF]",
    alert: "outline-[#FEEABC] bg-[#FFFCF5]",
    danger: "outline-[#F5B1B7] bg-[#FFFAFA]",
    success: "outline-[#B8DBCA] bg-[#F8FBF9]",
    mute: "outline-[#E0E0E0] bg-[#FAFAFA]",
  };
  return (
    <div
      className={`w-full rounded-[4px] min-h-[30px] p-4 outline outline-1 ${cardVariants[variant]}`}
    >
      {children}
    </div>
  );
}
