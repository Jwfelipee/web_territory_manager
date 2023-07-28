import React, { useEffect, useState } from "react";
import { LinkButton } from "../../link";
import clsx from "clsx";
import { isMobileWidthSize } from "@/utils/is-mobile";
import { Menu } from "react-feather";

export function Sidebar() {
  const [statusSidebar, setStatusSidebar] = useState<
    "open" | "open-mobile" | "close" | "close-mobile"
  >(isMobileWidthSize() ? "close-mobile" : "open");

  useEffect(() => {
    if (statusSidebar === "open-mobile") {
      document.body.style.overflowX = "hidden";
    } else {
      document.body.style.overflowX = "auto";
    }
  }, [statusSidebar]);

  const changeStatusSidebar = () => {
    const isMobile = isMobileWidthSize();
    setStatusSidebar((statusSidebar) => {
      if (statusSidebar.includes("open")) {
        return isMobile ? "close-mobile" : "close";
      } else {
        return isMobile ? "open-mobile" : "open";
      }
    });
  };

  const changePage = () => {
    if (isMobileWidthSize()) {
      setStatusSidebar("close-mobile");
    }
  };

  return (
    <>
      <div
        className={clsx(
          {
            "relative w-[320px]": statusSidebar === "open",
            "absolute top-20 w-64 h-[calc(100vh-80px)]":
              statusSidebar === "open-mobile",
            "min-h-full": statusSidebar !== "open-mobile",
            "relative w-20": statusSidebar === "close",
            "relative w-0 p-0 -ml-8": statusSidebar === "close-mobile",
          },
          "transition-all duration-500 drop-shadow-2xl shadow-2xl border-r-2 flex flex-col gap-3 p-4"
        )}
      >
        <LinkButton
          onClick={changePage}
          className={clsx(
            "text-slate-700",
            {
              hidden: statusSidebar === "close-mobile",
            },
            "hover:bg-green-200"
          )}
          variant="inverse"
          positionX="start"
          to="/"
        >
          Painel
        </LinkButton>
        <LinkButton
          onClick={changePage}
          disabled
          className={clsx(
            "text-slate-700",
            {
              hidden: statusSidebar === "close-mobile",
            },
            "hover:bg-green-200"
          )}
          variant="inverse"
          positionX="start"
          to="/"
        >
          Uploads
        </LinkButton>
        <LinkButton
          onClick={changePage}
          className={clsx(
            "text-slate-700",
            {
              hidden: statusSidebar === "close-mobile",
            },
            "hover:bg-green-200"
          )}
          variant="inverse"
          positionX="start"
          to="/usuarios"
        >
          Usuários
        </LinkButton>
        <div
          className="min-h-full absolute top-0 -right-1 hover:border-2 hover:outline-4 hover:outline-blue-100 hover:border-blue-200 w-1.5 hover:bg-blue-300 cursor-ew-resize transition-all duration-500"
          onClick={changeStatusSidebar}
        ></div>
      </div>
      {statusSidebar.includes("mobile") && (
        <div
          className="absolute top-14 left-4 z-40 cursor-pointer"
          onClick={changeStatusSidebar}
        >
          <Menu color="white" />
        </div>
      )}
    </>
  );
}
