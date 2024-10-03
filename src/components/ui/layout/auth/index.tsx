import { FormEvent, HtmlHTMLAttributes, ReactNode } from "react";
import TpeDigitalCircle from "../../../../assets/tpe-digital-circle.svg";
import RectangleGreen from "../../../../assets/rectangle-green.svg";
import RectangleLightGreen from "../../../../assets/rectangle-light-green.svg";
import MackbookTpeLogin from "../../../../assets/mackbook-iphone-login.png";

interface AuthLayoutProps extends HtmlHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => any;
}

export const AuthLayout = ({
  children,
  onSubmit,
  className = "",
  ...rest
}: AuthLayoutProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`
         md:h-screen sm:h-[96vh] h-[90vh] w-full flex flex-col md:flex-row items-center justify-center p-0
         ${className}
      `}
      {...rest}
    >
      <div className="h-2/6 relative flex justify-center items-center md:w-1/2 md:h-full">
        <img src={TpeDigitalCircle} alt="TPE Digital" className="md:hidden" />
        <div className="z-50 flex flex-col items-start">
          <div className="hidden md:block z-40 mt-12 ml-16 text-gray-50 font-semibold text-3xl justify-end uppercase">
            Território Digital
          </div>
          <img
            src={MackbookTpeLogin}
            alt="Mackbook TPE"
            className="hidden md:block z-30 p-8"
          />
        </div>
        <img
          src={RectangleGreen}
          alt="Rectangle Blue"
          className="hidden md:block absolute w-[100%] h-full z-20 left-0 top-0"
        />
        <img
          src={RectangleLightGreen}
          alt="Rectangle Gray"
          // aumentar brilho da imagem
          className="hidden  md:block absolute w-[100%] h-full z-10 left-0 top-0 brightness-[0.98]"
        />
      </div>
      <>{children}</>
    </form>
  );
};
