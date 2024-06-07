import { NavLink, useNavigate } from "react-router-dom";
import icons from "../utils/icons";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import EditUserDetail from "./EditUserDetail";
import { logout } from "../store/user/userSlice";
import Divider from "./Divider";
import SearchUser from "./SearchUser";

const sideBar = () => {
  let user = useSelector((state) => state.user?.current);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [openSearchUser, setOpenSearchUser] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const { IoChatbox, HiUserAdd, LuLogOut, FiArrowUpLeft } = icons;
  return (
    <div className=" w-full h-screen flex">
      <div className="bg-slate-200 w-12 min-h-screen rounded-tr-md rounded-br-md py-4 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded text-slate-600 ${
                isActive && "bg-slate-300"
              }`
            }
            title="chat"
          >
            <IoChatbox size={25} />
          </NavLink>

          <div
            onClick={() => {
              setOpenSearchUser(true);
            }}
            title="add friend"
            className="w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded text-slate-600"
          >
            <HiUserAdd size={25} />
          </div>
        </div>
        <div className="mb-20">
          <button
            title={user.name}
            onClick={() => {
              setEditUserOpen(true);
            }}
          >
            <Avatar imageUrl={user?.profile_pic} />
          </button>
          <button
            title="log out"
            onClick={handleLogout}
            className="w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded text-slate-600"
          >
            <span className="">
              <LuLogOut size={25} />
            </span>
          </button>
        </div>
      </div>

      <div className=" h-16 w-full">
        <div className="flex items-center">
          <h2 className="text-lg font-bold p-4 text-slate-800 h-16 ">
            Message
          </h2>
        </div>
        <Divider />
        <div className=" h-[calc(100vh-10px)] overflow-x-hidden overflow-y-scroll">
          {allUsers.length == 0 && (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                All Users in Here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* User Edit Detail */}
      {editUserOpen && (
        <EditUserDetail
          onClose={() => {
            setEditUserOpen(false);
          }}
          data={user}
        />
      )}

      {/* Search User */}
      {openSearchUser && (
        <SearchUser
          onClose={() => {
            setOpenSearchUser(false);
          }}
          // data={user}
        />
      )}
    </div>
  );
};

export default sideBar;
