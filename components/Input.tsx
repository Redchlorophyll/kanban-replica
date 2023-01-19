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
      <input
        id={inputId}
        aria-label="input"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onInputChange(event)}
        disabled={isDisabled}
        className={[
          "w-full h-[34px] rounded-[7px] border-[0.5px] border-solid",
          "px-[17px] py-[6px] dark:text-black-900",
          "focus:dark:drop-shadow-[0px_1px_17px_#406FCB] outline-none",
          "disabled:bg-black-200 disabled:text-black-700",
          "disabled:border-black-600 dark:disabled:bg-black-500",
          isError
            ? "border-red-800"
            : "border-[#E0E0E0] focus:border-[#01959F]",
        ].join(" ")}
        type="text"
      />
      {isError ? (
        <span className="text-sm text-red-800">{errorMessage}</span>
      ) : (
        ""
      )}
    </div>
  );
}
