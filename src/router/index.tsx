import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { commonRoutes } from "./commonRoutes";
import { mainRoutes } from "./mainRoutes";
import LazyImportComponent from "@/components/LazyImportComponent";

export const combineRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/admin/home" />,
  },
  ...commonRoutes,
  ...mainRoutes,
  {
    path: "*",
    element: (
      <LazyImportComponent
        lazyChildren={lazy(() => import("@/pages/notFound"))}
      />
    ),
  },
];
