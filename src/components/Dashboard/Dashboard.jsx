import React, { useEffect } from "react";
import { TopBar } from "../TopBar";
import { Grid } from "./Grid";

export const Dashboard = ({handlePathSelection}) => {
  useEffect(() => handlePathSelection("/"),[]);
  return (
    <div className="bg-white rounded-lg pb-4 shadow w-">
      <TopBar />
      <Grid />
    </div>
  );
};
