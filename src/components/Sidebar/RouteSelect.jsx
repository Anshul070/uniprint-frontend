import React, { useState } from "react";
import { Link } from "react-router";

export const RouteSelect = ({path}) => {
  
  return (
    <div className="space-y-1">
      {
        path.map((route, index) => (
          <Route
            key={index}
            {...route}
          />
        ))
      }
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  path
}) => {
  return (
    <Link to={path}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </Link>
  );
};
