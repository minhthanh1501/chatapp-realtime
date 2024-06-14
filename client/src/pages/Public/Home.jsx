import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message, Sidebar } from "../../components";
import io from "socket.io-client";
import { setOnlineUser, setSocketConnection } from "../../store/user/userSlice";

const Home = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const socketConnection = io("http://localhost:5000", {
    auth: {
      token: token,
    },
  });
  /*Socket connection */
  useEffect(() => {
    socketConnection.on("onlineUser", (data) => {
      console.log(data);
      dispatch(setOnlineUser(data));
      dispatch(setSocketConnection(socketConnection));
    });
    console.log(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, [token, dispatch, socketConnection]);

  return (
    <div className="flex w-full max-h-full">
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
