/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { SelectHTMLAttributes } from "react";

export interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  list: any[];
  className?: string;
  value: any;
  onChange?: any;
  onBlur?: any;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  errorStatus?: boolean;
  addNewField?: { label: string; value: number };
  onClick?: any;
  customHeight?: SelectHTMLAttributes<HTMLSelectElement>["className"];
}

export const InputSelect = ({
  label,
  list,
  className = "",
  value,
  onChange,
  onBlur,
  name,
  disabled,
  placeholder,
  required,
  errorStatus,
  errorMessage,
  addNewField,
  customHeight,
  ...rest
}: ISelect) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="font-normal 2xl:text-lg xl:text-sm lg:text-xs  text-slate-800">
          {label}
          {required ? <span className="text-red-500"> *</span> : ""}
        </label>
      )}
      <select
        name={name}
        defaultValue={value}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`
					${customHeight ? customHeight : "h-7 xl:h-12"}
					transition-all ease-in-out duration-300 hover:border-blue-500 focus:border-r-blue-500 focus:outline-none font-normal mt-1 px-2 py-1 border border-slate-400 shadow-sm rounded-md bg-white ${
            disabled
              ? "bg-white filter brightness-75 cursor-not-allowed"
              : " cursor-pointer"
          } text-sm`}
        {...rest}
      >
        {list?.length ? (
          list?.map((item: any, index: number) => {
            return (
              <option
                key={item.id}
                value={Number(item?.id) || item?.value || item?.id}
                disabled={item?.disabled || false}
                title={item?.title}
                className={item?.disabled && "bg-gray-300"}
              >
                {item?.name || item?.label}
              </option>
            );
          })
        ) : (
          <option disabled>sem opções</option>
        )}
        {addNewField && (
          <option
            value={addNewField?.value}
            className="bg-primary-theme new-field"
          >
            + {addNewField?.label}
          </option>
        )}
      </select>
      {errorStatus && <span className={`errorStatus`}>{errorMessage}</span>}
    </div>
  );
};
