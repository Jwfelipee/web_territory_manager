import { ConfirmEmail, Login } from "@/modules/misc";
import { useRoutes, RouteObject } from "react-router-dom";

export const AppRoutes = () => {
  const commonRoutes: RouteObject[] = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/confirmar-email",
      element: <ConfirmEmail />,
    },
  ];
  const element = useRoutes([...commonRoutes]);
  return <>{element}</>;
};
