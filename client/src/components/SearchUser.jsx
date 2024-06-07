import React, { useState } from "react";
import icons from "../utils/icons";
import LoadingCircle from "./LoadingCircle";
import UserSearchCard from "./UserSearchCard";

const SearchUser = ({ onClose, data }) => {
  const { MdPersonSearch } = icons;
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2">
      <div className="w-full max-w-md mx-auto mt-24 ">
        {/* Input search user */}
        <div className="bg-white h-14 rounded flex items-center">
          <input
            type="text"
            placeholder="Search User by name, email...."
            className="w-full outline-none py-1 h-full px-2 rounded"
          />
          <button>
            <MdPersonSearch size={30} />
          </button>
        </div>

        {/* Display User */}
        <div className="bg-white mt-2 w-full p-4 rounded">
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
              return <UserSearchCard key={user._id} user={user} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
