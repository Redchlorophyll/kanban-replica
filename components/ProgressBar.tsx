import React, { useEffect, useState } from "react";
import Image from "next/image";
import icChecklist from "assets/ic_checklist.svg";

type ProgressBarType = {
  precentage: number;
};

export default function ProgressBar({ precentage = 0 }: ProgressBarType) {
  const [fixedPercent, setFixedPercent] = useState(0);
  useEffect(() => {
    if (precentage >= 100) setFixedPercent(110);

    setFixedPercent(Math.trunc(precentage / 10) * 10 + 10);
  }, [precentage]);
  return (
    <div className="w-full flex relative pt-2">
      <div className="w-[90%] h-4 rounded-full overflow-hidden bg-[#EDEDED]">
        <div
          style={{ width: `${fixedPercent}%` }}
          className={[
            "h-4",
            fixedPercent >= 110 ? "bg-[#43936C]" : "bg-[#01959F]",
          ].join(" ")}
        />
      </div>
      {precentage <= 99 ? (
        <div className="-translate-y-[5px] translate-x-2 text-[#757575]">
          {precentage} %
        </div>
      ) : (
        <div className="translate-x-2">
          <Image src={icChecklist} alt="100 percent progress" />
        </div>
      )}
    </div>
  );
}
