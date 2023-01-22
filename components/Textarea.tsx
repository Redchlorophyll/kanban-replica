import React, { CSSProperties, useState, useEffect } from "react";

type textareaProps = {
  onChange?: (event: string) => void;
  value?: string;
  placeholder?: string;
  limit?: number;
  isDisabled?: boolean;
  label?: string;
  style?: CSSProperties;
};

export default function Textarea({
  placeholder = "Input Text Here...",
  value,
  onChange,
  limit,
  isDisabled = false,
  style,
  label = "",
}: textareaProps) {
  const inputId = label.toLowerCase().split(" ").join("-");
  const [sumCharacters, setSumCharacters] = useState<number>(0);
  const [textboxVal, setTextBoxVal] = useState<string>("");

  useEffect(() => {
    if (limit && value) {
      let inputLength = 0;
      if (value.length < limit) {
        inputLength = value.length;
        setTextBoxVal(value);
      } else {
        const trimmedVal = value.substring(0, limit);
        inputLength = trimmedVal.length;
        setTextBoxVal(trimmedVal);
      }
      setSumCharacters(inputLength);
    } else if (value ?? value === "") setTextBoxVal(value);
  }, [value, limit]);

  const onChangeTextarea = (event: string) => {
    if (!onChange) return;

    if (!limit) {
      onChange(event);
      return;
    }
    if (!(sumCharacters === 0 || event.length <= limit)) return;
    setSumCharacters(textboxVal.length);

    onChange(event.substring(0, limit));
  };

  return (
    <div className="flex flex-col items-start">
      {label ? (
        <label className="pb-[5px]" htmlFor={inputId}>
          {label}
        </label>
      ) : (
        ""
      )}
      <textarea
        id={inputId}
        style={style}
        value={textboxVal}
        disabled={isDisabled}
        placeholder={placeholder}
        onChange={(event) => onChangeTextarea(event.target.value)}
        className={[
          "w-full h-[170px] outline-none border-[0.5px] border-solid",
          "border-[#464646] rounded-[7px] px-[13px] py-[8px] resize-none",
          "disabled:bg-black-200 disabled:text-black-700",
          "disabled:border-black-600 dark:disabled:bg-black-500 box-border",
        ].join(" ")}
      />
      {limit ? (
        <span className="text-black-700 text-sm p-1">
          {sumCharacters}/{limit} Characters
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
