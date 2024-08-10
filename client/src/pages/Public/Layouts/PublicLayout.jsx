import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      PublicLayout
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
