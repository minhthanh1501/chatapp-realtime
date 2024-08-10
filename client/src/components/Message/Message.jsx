import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaImages } from "react-icons/fa6";
import { IoIosVideocam } from "react-icons/io";
import Avatar from "../Avatar";
const Message = () => {
  const params = useParams();
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const user = useSelector((state) => state?.user);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });

  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload((prev) => !prev);
  };

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userID);

      socketConnection.on("message-user", (data) => {
        // console.log("user details",data);
        setDataUser(data);
      });
    }
  }, [socketConnection, params?.userID, user]);
  return (
    <div>
      <div className="sticky top-0 h-[68px] bg-white">
        <div className="flex items-center gap-4">
          <div className="max-w-[50px]">
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser.profile_pic}
              userID={dataUser._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0">{dataUser?.name}</h3>
            <p className="-my-2">
              {dataUser.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Show all message */}
      <div className="h-[calc(100vh-68px)] overflow-y-scroll no-scrollbar">
        all message
      </div>

      {/* send message */}
      <div className="h-[68px] bg-white flex items-center px-4">
        <div className=" relative ">
          <button
            className="flex justify-center items-center w-14 h-14 rounded-full hover:bg-primary hover:text-white"
            onClick={handleUploadImageVideoOpen}
          >
            <FaPlus size={20} />
          </button>

          {/* video and image */}
          {openImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 left-0 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-primary">
                    <FaImages size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-purple-500">
                    <IoIosVideocam size={18} />
                  </div>
                  <p>Video</p>
                </label>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
