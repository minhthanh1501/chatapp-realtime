import Header from "@/components/Header";
import SideBar from "@/components/Sidebar";
import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <SideBar />
      <div>{children}</div>
    </div>
  );
};

export default HomeLayout;
