import * as React from "react";
import { tv, VariantProps } from 'tailwind-variants';

import { Spinner } from "@/components/ui";
import { ButtonLoading } from "./button-loading";
import { ButtonIcon } from "./button-icon";

const button = tv({
  base: 'flex items-center disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 gap-2',
  variants: {
    variant: {
      primary: "bg-primary text-gray-700",
      secondary: "bg-secondary text-gray-700",
      inverse: "bg-white text-primary",
      danger: "bg-red-600 text-white",
      success: "bg-green-600 text-white",
      dark: "bg-gray-800 text-white",
      ghost: "bg-transparent text-gray-700",
    },
    size: {
      sm: "py-2 px-4 text-sm",
      md: "py-2 px-6 text-md",
      lg: "py-3 px-8 text-lg",
    },
    positionX: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    positionX: "center",
  },
})


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className = "",
      variant,
      size,
      positionX,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={button({ variant, size, positionX, className })}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

ButtonRoot.displayName = "Button";

export const Button = {
  Root: ButtonRoot,
  Loading: ButtonLoading,
  Icon: ButtonIcon,
}
