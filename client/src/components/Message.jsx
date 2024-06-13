import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Message = () => {
  const params = useParams()
  const socketConnection = useSelector((state) => state?.user?.socketConnection)
  useEffect(() => {
    if(socketConnection){
      socketConnection.emit('message-page',params.userID)
    }
  },[socketConnection])
  console.log(params.userID);
  return <div>Message</div>;
};

export default Message;
