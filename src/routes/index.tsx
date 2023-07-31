import { DefaultLayout } from "@/components/ui";
import { Home, Login, Territory } from "@/modules/misc";
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
      path: "/territorios",
      element: <DefaultLayout />,
      children: [{ path: "", element: <Home /> }],
    },
    {
      path: "/territorio/:accessToken",
      element: <DefaultLayout haveParams />,
      children: [{ path: "", element: <Territory /> }],
    },
  ];
  const element = useRoutes([...commonRoutes]);
  return <>{element}</>;
};
