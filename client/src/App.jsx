import { Route, Routes } from "react-router-dom";
import "./App.css";
import path from "./utils/path";
import { Home, Login, Register, Public } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./layouts/AuthLayout";
import HomeLayout from "./layouts/HomeLayout";
import PublicLayout from "./pages/Public/Layouts/PublicLayout";

function App() {
  return (
    <div>
      <div className="min-h-screen">
        <Routes>
          <Route
            path={path.LOGIN}
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path={path.REGISTER}
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
          <Route
            path={path.PUBLIC}
            element={
              <HomeLayout>
                <PublicLayout />
              </HomeLayout>
            }
          >
            <Route path={path.HOME} element={<Home />} />
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
