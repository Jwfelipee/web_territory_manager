import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import { AlertCircle, Eye, EyeOff as NotEye } from "react-feather";

/* eslint-disable */
export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  customHeight?: boolean;
  errorMessage?: string;
  ref?: any;
}

export const Input: React.FC<IInput> = ({
  label,
  type,
  customHeight = false,
  errorMessage,
  className,
  ...rest
}) => {
  const [currentType, setCurrentType] = useState(type);

  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label className="2xl:text-lg xl:text-sm lg:text-xs">
          {label}
          {rest.required ? <span className="text-red-500"> *</span> : ""}
        </label>
      )}
      <div className="flex relative text-xs">
        <input
          className={clsx(
						'px-2 py-1 rounded-lg w-full transition-all ease-in-out duration-300 hover:border-blue-600 focus:border-blue-600 focus:outline-none',
						{"2xl:h-12 xl:h-10 lg:h-9": customHeight},
						{"border-red-500": errorMessage },
						{"bg-white brightness-75 cursor-not-allowed" : rest.disabled},
						className
            )}
          type={currentType}
          ref={rest.ref}
          {...rest}
        />
        {type === "password" && (
          <Password setCurrentType={setCurrentType} currentType={currentType} />
        )}
        {errorMessage && type !== "password" && <ErrorIcon />}
      </div>
      {errorMessage && (
        <span className="text-red-500 text-sm pt-2">{errorMessage}</span>
      )}
    </div>
  );
};

const Password = ({
  setCurrentType,
  currentType,
}: {
  setCurrentType: Dispatch<SetStateAction<IInput["type"]>>;
  currentType: IInput["type"];
}) => (
  <button
    type="button"
    className="text-slate-500 text-sm font-semibold absolute right-2 top-1/4"
    onClick={() => {
      setCurrentType(currentType === "password" ? "text" : "password");
    }}
  >
    {currentType === "password" ? <Eye size={16} /> : <NotEye size={16} />}
  </button>
);

const ErrorIcon = () => (
  <div className="flex items-center gap-1 text-red-500 text-sm font-semibold absolute right-1 2xl:top-4 lg:top-3">
    <AlertCircle />
  </div>
);
