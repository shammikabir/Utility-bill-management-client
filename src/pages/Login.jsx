import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import ThemeContext from "../ThemeContext/ThemeContext";
import loginimg from "../assets/illustration-cartoon-female-user-entering-login_241107-682-removebg-preview.png";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { darkMode } = useContext(ThemeContext);
  const { signIn, setUser, setloading, signInWithEmailFunc } =
    useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    signIn(email, password)
      .then((result) => {
        setUser(result.user);
        setloading(false);
        toast.success("Login Successful 🎉");
        navigate("/");
      })
      .catch(() => {
        setError("Invalid email or password. Please try again.");
      });
  };

  const handleGoogleSignin = () => {
    signInWithEmailFunc()
      .then((res) => {
        setloading(false);
        setUser(res.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You are logged in successfully!",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          navigate(from);
        });
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: e.message,
        });
      });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        darkMode
          ? "bg-linear-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-gray-100"
          : "bg-linear-to-br from-[#e0ecff] via-[#f7faff] to-[#cfdcff] text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2 transition-all duration-500 ${
          darkMode ? "bg-[#1B262C]" : "bg-white"
        }`}
      >
        {/* Left Image Section */}
        <div className="hidden md:flex items-center justify-center relative overflow-hidden">
          <div
            className={`absolute inset-0 ${
              darkMode
                ? "bg-linear-to-br from-[#ff9a44] via-[#ff7842] to-[#ff6b6b]"
                : "bg-linear-to-br from-[#004AAD] via-[#007BFF] to-[#4FC3F7]"
            } opacity-90`}
            style={{ borderBottomRightRadius: "150px" }}
          ></div>
          <img
            src={loginimg}
            alt="Login Visual"
            className="relative w-full drop-shadow-2xl animate-float"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex flex-col justify-center px-10 md:px-12 py-12">
          <h1
            className={`text-4xl font-bold text-center mb-6 ${
              darkMode ? "text-[#FFB347]" : "text-[#004AAD]"
            }`}
          >
            Welcome Back 👋
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className={`w-full rounded-xl px-4 py-3 border focus:ring-2 outline-none text-sm transition-all duration-300 ${
                  darkMode
                    ? "bg-[#2C394B] border-gray-600 text-gray-100 focus:ring-[#FFB347]"
                    : "bg-white border-gray-300 focus:ring-[#004AAD]"
                }`}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1 text-sm font-semibold">
                Password
              </label>
              <input
                name="password"
                type={show ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                className={`w-full rounded-xl px-4 py-3 border focus:ring-2 outline-none text-sm transition-all duration-300 ${
                  darkMode
                    ? "bg-[#2C394B] border-gray-600 text-gray-100 focus:ring-[#FFB347]"
                    : "bg-white border-gray-300 focus:ring-[#004AAD]"
                }`}
                required
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-4 top-10 cursor-pointer text-gray-400 hover:text-gray-600"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-xs text-red-500 text-center">{error}</p>
            )}

            <div className="text-right">
              <button
                type="button"
                className={`text-sm hover:underline ${
                  darkMode ? "text-orange-300" : "text-[#004AAD]"
                }`}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full py-2 rounded-xl libre-baskerville-bold  text-white  shadow-md transform transition-all hover:scale-105 ${
                darkMode
                  ? "bg-linear-to-r from-[#e93d11] to-[#FFB347]"
                  : "bg-linear-to-r from-[#004AAD] to-[#007BFF]"
              }`}
            >
              Login
            </button>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleSignin}
              className="flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 px-5 py-2 rounded-xl w-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            {/* Register Link */}
            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <Link
                to="/auth/register"
                className={`font-semibold hover:underline ${
                  darkMode ? "text-[#FFB347]" : "text-[#004AAD]"
                }`}
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
