import React from "react";
import Button from "./Button";

export default function navbar() {
  return (
    <div className="top-0 w-full h-[60px] flex border-b-2 border-b-[#F5F5F5]">
      <div className="translate-y-[15px] flex h-[30px] translate-x-4">
        <h1 className="text-xl font-bold mr-[10px]">Product Roadmap</h1>
        <Button>+ Add New Group</Button>
      </div>
    </div>
  );
}
