import React from "react";

const Avatar = ({ userID, name, imageUrl, width, height }) => {
  let avatarName = "";
  if (name) {
    const splitname = name?.split(" ");

    if (splitname.length > 1) {
      avatarName = splitname[0][0] + splitname[1][0];
    } else {
      avatarName = splitname[0][0];
    }
  }

  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
  ];

  const randomNumber = Math.floor(Math.random() * 50);
  return (
    <div
      className={`text-slate-800 overflow-hidden rounded-full shadow border font-bold `}
    >
      {imageUrl ? (
        <img src={imageUrl} width={width} height={height} alt={name} />
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
        />
      )}
    </div>
  );
};

export default Avatar;
