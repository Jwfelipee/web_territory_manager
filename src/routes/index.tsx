import { DefaultLayout } from "@/components/ui";
import { Block, Home, Login, StreetData, Territory } from "@/modules/misc";
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
      path: "/territorio/:signature_id",
      element: <DefaultLayout haveParams />,
      children: [{ path: "", element: <Territory /> }],
    },
    {
      path: "/quadra/:signature_id",
      element: <DefaultLayout haveParams />,
      children: [
        { path: "", element: <Block /> },
        { path: "rua", element: <StreetData /> },
      ],
    },
  ];
  const element = useRoutes([...commonRoutes]);
  return <>{element}</>;
};
