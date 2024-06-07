import { Route, Routes } from "react-router-dom";
import "./App.css";
import path from "./utils/path";
import { Home, Login, Register, Public } from "./pages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
axios.defaults.withCredentials = true;
function App() {
  return (
    <div>
      <div className="min-h-screen">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.REGISTER} element={<Register />} />
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
