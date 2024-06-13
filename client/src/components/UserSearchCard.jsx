import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const UserSearchCard = ({ user, onClose }) => {
  // console.log(user);
  return (
    <Link
      to={"/" + user?._id}
      onClick={onClose}
      className="flex items-center gap-3 p-2 border-transparent border cursor-pointer rounded hover:bg-slate-300 lg:p-4 hover:border hover:border-primary"
    >
      <div>
        <Avatar width={50} height={50} imageUrl={user?.profile_pic} userID={user._id}/>
      </div>
      <div>
        <div className="font-semibold">{user?.name}</div>
        <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
      </div>
    </Link>
  );
};

export default UserSearchCard;
