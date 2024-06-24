import LazyImportComponent from "@/components/LazyImportComponent";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

export const commonRoutes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <LazyImportComponent lazyChildren={lazy(() => import("@/pages/login"))} />
    ),
  },
  {
    path: "/404",
    element: (
      <LazyImportComponent
        lazyChildren={lazy(() => import("@/pages/notFound"))}
      />
    ),
  },
];
