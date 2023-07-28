import { DefaultLayout } from "@/components/ui";
import { Home, Login } from "@/modules/misc";
import { useRoutes, RouteObject } from "react-router-dom";

export const AppRoutes = () => {
  const commonRoutes: RouteObject[] = [
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        { path: "/", element: <Login /> },
        { path: "/home", element: <Home /> },
      ],
    },
  ];
  const element = useRoutes([...commonRoutes]);
  return <>{element}</>;
};
