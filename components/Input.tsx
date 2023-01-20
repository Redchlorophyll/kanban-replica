import React from "react";

type inputProps = {
  onChange?: (event: string) => void;
  value?: string;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  label?: string;
};

export default function Input({
  onChange,
  value = "",
  placeholder = "Input Text Here...",
  isError = false,
  errorMessage = "Error Message Here...",
  isDisabled = false,
  label = "",
}: inputProps) {
  const inputId = label.toLowerCase().split(" ").join("-");
  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (!onChange || isDisabled) return;
    const { value } = event.target as HTMLInputElement;

    onChange(value);
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
      <div
        className={[
          "w-full rounded-[8px] border-[0.5px] border-solid",
          "px-[8px] py-[6px]",
          "outline-none",
          "disabled-within:bg-black-200 disabled-within:text-black-700",
          "disabled-within:border-black-600 border",
          value.length !== 0
            ? "focus-within:border-[#01959F]"
            : "focus-within:border-[rgba(1,149,159,0.2)]",
        ].join(" ")}
      >
        <input
          id={inputId}
          aria-label="input"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onInputChange(event)}
          disabled={isDisabled}
          type="text"
          className={[
            "focus:outline-0 p-0 w-full border-l-2",
            value.length !== 0 ? "border-l-2 border-[#01959F] pl-1" : "",
          ].join(" ")}
        />
      </div>
      {isError ? (
        <span className="text-sm text-red-800">{errorMessage}</span>
      ) : (
        ""
      )}
    </div>
  );
}
