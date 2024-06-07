import { useState } from "react";
import icons from "../../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/user/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = "http://localhost:5000/api/user/login";

    try {
      const response = await axios(URL, { method: "post", data });
      console.log(response);
      toast.success(response.data.mes);
      if (response.data.status) {
        setData({
          email: "",
          password: "",
        });

        dispatch(
          login({
            isLoggedIn: true,
            current: response.data.result,
            token: response.data.token,
          })
        );

        setTimeout(() => {
          navigate("/");
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
            <button className="bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
              Login
            </button>
          </div>
        </form>

        <p className="my-3 text-center">
          Already have account ?{" "}
          <Link to={"/register"} className="hover:text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
