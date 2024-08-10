import Header from "@/components/Header";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
