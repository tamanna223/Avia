import React from "react";
import MainLayout from "./MainLayout";
const Wrapper = ({ children }) => {
  return (
    <>
      <MainLayout />
      {children}
    </>
  );
};

export default Wrapper;
