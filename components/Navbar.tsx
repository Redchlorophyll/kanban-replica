import React from "react";
import Button from "./Button";

type navbarProps = {
  onClick?: () => void;
};

export default function navbar({ onClick }: navbarProps) {
  const onClickCreateBtn = () => {
    if (!onClick) return;
    onClick();
  };
  return (
    <div className="top-0 w-full h-[60px] flex border-b-2 border-b-[#F5F5F5]">
      <div className="translate-y-[15px] flex h-[30px] translate-x-4">
        <h1 className="text-xl font-bold mr-[10px]">Product Roadmap</h1>
        <Button onClick={onClickCreateBtn}>+ Add New Group</Button>
      </div>
    </div>
  );
}
