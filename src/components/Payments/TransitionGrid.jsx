import React, { useContext } from "react";
import { shopData } from "../../context/shopContext";
import { StatPaymentCards } from "./StatPaymentCards";
import { Transactions } from "./Transactions";
export const TransitionGrid = () => {
  const { fetchData } = useContext(shopData);
  const data = fetchData;
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatPaymentCards data={data} />
      <Transactions data={data} />
    </div>
  );
};
