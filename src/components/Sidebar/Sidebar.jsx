import React from "react";
import { AccountToggle } from "./AccountToggle";
import { RouteSelect } from "./RouteSelect";
import { Outlet } from "react-router";
import { Plan } from "./Plan";

export const Sidebar = ({path}) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="sticky top-4 h-[calc(100vh-32px)] w-96 shrink-0  border-r-2 pr-2">
        <AccountToggle />
        <RouteSelect path={path} />
        <Plan />
      </div>
      <div className="w-full overflow-x-auto">
      <Outlet />
      </div>

    </div>
  );
};
