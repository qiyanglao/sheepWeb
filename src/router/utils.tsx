import MenuItem from "antd/es/menu/MenuItem";
import { MenuProps } from "antd";
import { RouteObject } from "react-router-dom";
import { combineRoutes } from "./index";
import lodash from "lodash";

type MenuItem = Required<MenuProps>["items"][number];

const getMenuTreeData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menus: Array<RouteObject | any>
): MenuItem[] => {
  if (!menus.length) return [];
  return menus
    .filter((el) => !el.meta?.hide)
    .map((item) => {
      if (item.children?.length) {
        item.children = getMenuTreeData(item.children);
      }
      return {
        label: item.meta?.title,
        key: item.path,
        icon: item.meta?.icon,
        children: item.children,
      };
    })
    .filter((item) => item.label);
};

const adminRoutes = lodash
  .cloneDeep(combineRoutes)
  .filter((item) => item.path === "/admin")[0]
  ?.children?.filter((el) => el.meta);

export default {
  menuRoutes: getMenuTreeData(adminRoutes!),
};
