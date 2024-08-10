import Header from "@/components/Header/";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen flex flex-col items-center">
      <Header />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
