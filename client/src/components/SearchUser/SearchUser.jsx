import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import LoadingCircle from "../commons/LoadingCircle/LoadingCircle";
import UserSearchCard from "../UserSearchCard";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const SearchUser = ({ onClose }) => {
  const { MdPersonSearch, IoMdCloseCircleOutline } = icons;
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const token = useSelector((state) => state.user.token);

  const handleSearchUser = async () => {
    try {
      setLoading(true);
      const URL = "http://localhost:5000/api/user/search";
      const response = await axios({
        url: URL,
        method: "post",
        data: { search },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setLoading(false);
      setSearchUser(response.data.mes);
      // console.log(response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleSearchUser();
  }, [search]);

  return (
    <div
      className="fixed top-16 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-30"
      onClick={onClose}
    >
      <div className="w-full max-w-md mx-auto mt-24 ">
        {/* Input search user */}
        <div className="bg-white h-14 rounded flex items-center">
          <input
            type="text"
            placeholder="Search User by name, email...."
            className="w-full outline-none py-1 h-full px-2 rounded"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button>
            <MdPersonSearch size={30} />
          </button>
        </div>

        {/* Display User */}
        <div className="bg-white mt-2 w-full p-4 rounded h-[400px] overflow-y-scroll overflow-x-hidden no-scrollbar">
          {searchUser.length == 0 && !loading && (
            <p className="text-center text-slate-500">No user Found</p>
          )}
          {loading && (
            <p>
              <LoadingCircle />
            </p>
          )}
          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => {
              return (
                <UserSearchCard key={user._id} user={user} onClose={onClose} />
              );
            })}
        </div>
      </div>
      <div
        className="absolute top-20 right-[32%] text-lg p-2 text-white hover:text-primary"
        onClick={onClose}
      >
        <button>
          <IoMdCloseCircleOutline size={25} />
        </button>
      </div>
    </div>
  );
};

export default SearchUser;
