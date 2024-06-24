import { lazy } from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import LazyImportComponent from "@/components/LazyImportComponent";

export const articleRoutes: RouteObject[] = [
  {
    path: "/admin/article",
    meta: { title: "文章管理" },
    element: <Outlet />,
    children: [
      {
        path: "/admin/article",
        element: <Navigate to="/admin/article/add" />,
      },
      {
        path: "/admin/article/add",
        meta: { title: "添加文章" },
        element: (
          <LazyImportComponent
            lazyChildren={lazy(() => import("@/pages/admin/article/add"))}
          />
        ),
      },
      {
        path: "/admin/article/edit",
        meta: { title: "编辑文章", hide: true },
        element: (
          <LazyImportComponent
            lazyChildren={lazy(() => import("@/pages/admin/article/edit"))}
          />
        ),
      },
    ],
  },
];
