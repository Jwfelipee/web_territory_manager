import { ElementType } from "react";

interface ButtonIconProps extends React.HTMLAttributes<SVGElement> {
   size?: number;
   icon: ElementType;
}

export function ButtonIcon({ icon: Icon, size = 18, ...rest }: ButtonIconProps) {
   return (
      <Icon size={size} {...rest} />
   )
}