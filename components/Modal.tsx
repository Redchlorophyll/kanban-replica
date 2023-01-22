import React, { CSSProperties, ReactNode, useEffect } from "react";
import icClose from "assets/ic_close.svg";
import Image from "next/image";

type modalProps = {
  children?: ReactNode;
  title?: string;
  style?: CSSProperties;
  closeBtn?: () => void;
};

export default function Modal({
  children,
  title,
  style,
  closeBtn,
}: modalProps) {
  useEffect(() => {
    document.querySelector("body")?.classList.add("overflow-hidden");

    return () => {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <>
      <div className="w-full h-[100vh] fixed top-0 left-0 z-30 bg-black opacity-25" />
      <div
        className={[
          "w-full h-[100vh] absolute z-30",
          "flex justify-center align-baseline top-0 left-0",
        ].join(" ")}
      >
        <div
          style={style}
          className={[
            "w-[616px] min-h-[503px] bg-white",
            "top-1/2 fixed -translate-y-1/2",
            "p-[25px_30px] rounded-[10px] text",
            "shadow-[0_4px_8px_rgba(0,0,0,0.1)]",
          ].join(" ")}
        >
          <div className="h-[50px]">
            {title ? (
              <div className="pb-5">
                <span className="text-base font-bold">{title}</span>
              </div>
            ) : (
              ""
            )}
            {closeBtn ? (
              <button
                onClick={closeBtn}
                className="absolute right-[30px] top-[25px]"
              >
                <Image src={icClose} alt="close icon" />
              </button>
            ) : (
              ""
            )}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
