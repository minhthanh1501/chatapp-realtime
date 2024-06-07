import { Outlet } from "react-router-dom";
import { Header } from "../../components";

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
