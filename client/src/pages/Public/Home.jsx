import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message, Sidebar } from "../../components";
import io from "socket.io-client";
import { setOnlineUser } from "../../store/user/userSlice";

const Home = () => {
  const URL = "http://localhost:5000/api/user/current";
  let token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  // console.log(token);

  /*Socket connection */
  useEffect(() => {
    const socketConnection = io("http://localhost:5000", {
      auth: {
        token: token,
      },
    });

    socketConnection.on("onlineUser", (data) => {
      // console.log(data);
      dispatch(setOnlineUser(data));
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <div className="flex gap-3  items-center w-full max-h-full">
      <div className="w-[25%] bg-white h-full">
        <Sidebar />
      </div>
      <div className="w-[75%] h-full">
        <Message />
      </div>
    </div>
  );
};

export default Home;
