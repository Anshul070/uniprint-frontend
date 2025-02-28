import React, { useContext } from "react";
import { StatCards } from "./StatCards";
import { PdfGraph } from "./PdfGraph";
import { UsageRadar } from "./UsageRadar";
import { RecentTransactions } from "./RecentTransactions";
import { shopData } from "../../context/shopContext";
export const Grid = () => {
  const {fetchData} = useContext(shopData);
    const data = fetchData;
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatCards data={data}/>
      <PdfGraph data={data}/>
      <RecentTransactions data={data} />
    </div>
  );
};
