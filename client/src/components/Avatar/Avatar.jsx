import React from "react";
import { useSelector } from "react-redux";

const Avatar = ({ userID, name, imageUrl, width, height }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);

  const isOnline = onlineUser.includes(userID);
  return (
    <div
      className={`text-slate-800  rounded-full shadow border font-bold  relative`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className="overflow-hidden rounded-full"
        />
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
        <div className="bg-green-500 p-1 absolute -right-0  z-10 rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;
