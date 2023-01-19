import React, { ReactNode } from "react";

type LabelType = {
  variant?: "primary" | "alert" | "danger" | "success";
  children: ReactNode;
};

export default function Tag({ variant = "primary", children }: LabelType) {
  const labelVariants = {
    primary: "outline-[#4DB5BC] text-[#4DB5BC] bg-[#F7FEFF]",
    alert: "outline-[#FEEABC] text-[#FA9810] bg-[#FFFCF5]",
    danger: "outline-[#F5B1B7] text-[#E11428] bg-[#FFFAFA]",
    success: "outline-[#B8DBCA] text-[#43936C] bg-[#F8FBF9]",
  };

  return (
    <label
      className={`p-[2px_8px] bg-red-100 rounded-[4px] outline outline-1 ${labelVariants[variant]}`}
    >
      {children}
    </label>
  );
}
