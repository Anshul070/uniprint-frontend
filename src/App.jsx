// App.js
import React, { useState } from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router";
import ShopContext from "./context/shopContext";
import Payments from "./components/Payments/Payments";
import { FiHome } from "react-icons/fi";
import { FaRegFilePdf } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

import Pdfs from "./components/Pdfs/Pdfs";

function App() {
  const [path, setPath] = useState([
    {
      title: "Dashboard",
      selected: true,
      Icon: FiHome,
      path: "/",
    },
    {
      title: "Pdfs",
      selected: false,
      Icon: FaRegFilePdf,
      path: "/pdfs",
    },
    {
      title: "Payments",
      selected: false,
      Icon: MdCurrencyRupee,
      path: "/payments",
    },
  ]);
  const handlePathSelection = (link) => {
    const newPath = path.map((item) =>
      item.path === link
        ? { ...item, selected: true }
        : { ...item, selected: false }
    );
    setPath(newPath);
  };
  return (
    <ShopContext>
      <main className="p-4">
        <Routes>
          <Route element={<Sidebar path={path} />} path="/">
            <Route
              element={<Dashboard handlePathSelection={handlePathSelection} />}
              path="/"
            />
            <Route
              element={<Payments handlePathSelection={handlePathSelection} />}
              path="/payments"
            />
            <Route
              element={<Pdfs handlePathSelection={handlePathSelection} />}
              path="/pdfs"
            />
          </Route>
        </Routes>
      </main>
    </ShopContext>
  );
}

export default App;
