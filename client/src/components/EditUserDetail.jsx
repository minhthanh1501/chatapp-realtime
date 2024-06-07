import React, { useRef, useState } from "react";
import Avatar from "./Avatar";
import uploadFile from "../utils/uploadFile";
import Divider from "./Divider";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login, updateUser } from "../store/user/userSlice";

const EditUserDetail = ({ onClose, data }) => {
  const [userData, setUserData] = useState({
    name: data?.name,
    profile_pic: data?.profile_pic,
  });
  const [uploadPhoto, setUploadPhoto] = useState("");
  const dispatch = useDispatch();

  const uploadPhotoRef = useRef();
  const token = useSelector((state) => state.user.token);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);
    // console.log(uploadPhoto);
    setUploadPhoto(file);

    setUserData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const handleOpenUploadPhoto = () => {
    uploadPhotoRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const URL = "http://localhost:5000/api/user/update";
      const response = await axios({
        url: URL,
        method: "put",
        data: userData,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.data.success) {
        dispatch(
          updateUser({
            name: response.data.updatedUser.name,
            profile_pic: response.data.updatedUser.profile_pic,
          })
        );
        onClose();
      }
      console.log(response);
      toast.success(response.data.success ? "success" : "failed");
    } catch (error) {
      toast.error(error.response.mes);
    }
  };

  const onSubmit = () => {};

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-600 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details</p>

        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full py-1 px-2 focus:outline-primary border-0.5"
            />
          </div>

          <div>
            <div>Photo:</div>
            <label htmlFor="profile_pic">
              <div className="my-1 flex  items-center gap-3 ">
                <Avatar
                  width={40}
                  height={40}
                  imageUrl={userData?.profile_pic}
                  name={userData?.name}
                />
                <span className="font-semibold" onClick={handleOpenUploadPhoto}>
                  Change Photo
                </span>
                <input
                  type="file"
                  id="profile_pic"
                  className="hidden"
                  onChange={handleUploadPhoto}
                  ref={uploadPhotoRef}
                />
              </div>
            </label>
          </div>
          <Divider />
          <div className="flex gap-2 w-fit ml-auto mt-3">
            <button
              onClick={onClose}
              className="border-primary border px-4 py-1 rounded hover:bg-primary hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetail;
