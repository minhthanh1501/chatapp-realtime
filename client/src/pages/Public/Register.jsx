import { useState } from "react";
import icons from "../../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/uploadFile";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");
  const navigate = useNavigate();

  const { IoIosClose } = icons;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);
    console.log(uploadPhoto);
    setUploadPhoto(file);

    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = "http://localhost:5000/api/user/register";

    try {
      const response = await axios(URL, { method: "post", data });
      console.log(response);

      if (response.data.status) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });
        toast.success(response.data.mes);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.mes);
      console.log(error);
    }

    console.log(data);
  };

  return (
    <div className="mt-5 flex justify-center ">
      <div className="bg-white w-main-sm rounded overflow-hidden p-4 mx-2">
        <h3>Welcome to chatapp</h3>

        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              className="bg-slate-100 px-2 py-1 rounded-sm focus:outline-primary"
              value={data.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter email"
              className="bg-slate-100 px-2 py-1 rounded-sm focus:outline-primary"
              value={data.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter password"
              className="bg-slate-100 px-2 py-1 rounded-sm focus:outline-primary"
              value={data.password}
              onChange={handleOnChange}
            />
          </div>
          <div className=" gap-1 flex flex-col">
            <span className="mb-1">Profile Picture</span>
            <label
              htmlFor="profile_pic"
              className="rounded bg-green-500 px-2 py-1 text-center flex justify-center items-center"
            >
              {uploadPhoto.name ? uploadPhoto.name : "Upload"}
              {uploadPhoto.name && (
                <button
                  className="hover:text-red-500"
                  onChange={handleClearUploadPhoto}
                >
                  <IoIosClose size={30} />
                </button>
              )}
            </label>
            <input
              type="file"
              name="profile_pic"
              id="profile_pic"
              className="bg-slate-100 px-2 py-1 rounded-sm focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
            <button className="bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
              Register
            </button>
          </div>
        </form>

        <p className="my-3 text-center">
          Already have account ?{" "}
          <Link to={"/login"} className="hover:text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
