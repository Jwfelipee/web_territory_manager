import clsx from "clsx";
import * as React from "react";

import { Spinner } from "@/components/ui";
import { Link } from "react-router-dom";

const variants = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-gray-700",
  inverse: "bg-white text-primary",
  danger: "bg-red-600 text-white",
};

const sizes = {
  sm: "py-2 px-4 text-sm",
  md: "py-2 px-6 text-md",
  lg: "py-3 px-8 text-lg",
};

const positionsX = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  positionX?: "start" | "end" | "center";
  disabled?: boolean;
} & IconProps;

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      to,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      startIcon,
      endIcon,
      positionX = "center",
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        to={to}
        ref={ref}
        className={clsx(
          "flex items-center rounded-md shadow-sm font-medium focus:outline-none hover:brightness-110 transition-all duration-200 ease-in-out",
          variants[variant],
          sizes[size],
          positionsX[positionX],
          disabled && "opacity-70 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && startIcon}
        <span className="mx-2">{props.children}</span> {!isLoading && endIcon}
      </Link>
    );
  }
);

LinkButton.displayName = "LinkButton";

export default LinkButton;
