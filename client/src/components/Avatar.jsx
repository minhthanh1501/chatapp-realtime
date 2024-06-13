import React from "react";
import { useSelector } from "react-redux";

const Avatar = ({ userID, name, imageUrl, width, height }) => {

  const onlineUser = useSelector((state) => state?.user?.onlineUser)
  // console.log(onlineUser);
  let avatarName = "";
  if (name) {
    const splitname = name?.split(" ");

    if (splitname.length > 1) {
      avatarName = splitname[0][0] + splitname[1][0];
    } else {
      avatarName = splitname[0][0];
    }
  }

  // const bgColor = [
  //   "bg-slate-200",
  //   "bg-teal-200",
  //   "bg-red-200",
  //   "bg-green-200",
  //   "bg-yellow-200",
  // ];

  // const randomNumber = Math.floor(Math.random() * 50);
  const isOnline = onlineUser.includes(userID)
  return (
    <div
      className={`text-slate-800  rounded-full shadow border font-bold  relative`}
    >
      {imageUrl ? (
        <img src={imageUrl} width={width} height={height} alt={name} className="overflow-hidden rounded-full"/>
      ) : name ? (
        <div
          className="overflow-hidden rounded-full"
          style={{ width: width + "px", height: height + "px" }}
        >
          {avatarName}
        </div>
      ) : (
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
          alt="not found"
          style={{ width: width + "px", height: height + "px" }}
          className="overflow-hidden rounded-full"
        />
      )}

      {isOnline && (
        <div className="bg-green-500 p-1 absolute -right-0  z-10 rounded-full">
        </div>
      )}
    </div>
  );
};

export default Avatar;
