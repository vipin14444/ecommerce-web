import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./Edit";
import MainGrid from "./MainGrid";
import New from "./New";

const Content = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new" element={<New />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/" element={<MainGrid />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Content;
