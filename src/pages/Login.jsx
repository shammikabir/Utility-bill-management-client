import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const { loginuser, setUser, setloading, signInWithEmailFunc } =
    useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginuser(email, password)
      .then((result) => {
        setUser(result.user);
        setloading(false);
        alert("Login Successful!");
        navigate("/");
      })
      .catch((err) => {
        setError("Invalid email or password. Please try again.");
      });
  };
  //google sign in
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

  const handleForgetPassword = () => {
    if (!formData.email) {
      toast.error("Please enter your email first");
      return;
    }
    navigate("/auth/forgot-password", { state: { email: formData.email } });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        darkMode
          ? "bg-linear-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-gray-100"
          : "bg-linear-to-br from-[#E8F1FF] via-[#F7FAFF] to-[#DDEBFF] text-gray-900"
      }`}
    >
      <div
        className={`max-w-5xl w-full rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 ${
          darkMode ? "bg-[#1B262C]" : "bg-[#F8FAFF]"
        }`}
      >
        {/* Left Curved Image Section */}
        <div className="hidden md:flex relative items-center justify-center">
          <div
            className={`absolute inset-0 ${
              darkMode
                ? "bg-linear-to-br from-[#D2E3FF] to-[#A9C9FF]"
                : "bg-linear-to-br from-[#D2E3FF] to-[#A9C9FF]"
            }`}
            style={{
              borderBottomRightRadius: "150px",
            }}
          ></div>
          <img
            src={loginimg}
            alt="Login Visual"
            className="relative w-[85%] object-contain drop-shadow-lg"
          />
        </div>

        {/* Right Form Section */}
        <div
          className={`flex flex-col justify-center px-12 py-10 ${
            darkMode ? "bg-[#1B262C]" : "bg-[#F8FAFF]"
          }`}
        >
          <h1
            className={`text-3xl text-center mb-6 libre-baskerville-bold ${
              darkMode ? "text-[#FFB347]" : "text-[#004AAD]"
            }`}
          >
            Welcome Back 👋
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className={`w-full rounded-lg px-3 py-2 border focus:ring-2 outline-none text-sm ${
                  darkMode
                    ? "bg-[#2C394B] border-gray-600 text-gray-100 focus:ring-[#FFB347]"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-[#004AAD]"
                }`}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                name="password"
                type={show ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                className={`w-full rounded-lg px-3 py-2 border focus:ring-2 outline-none text-sm ${
                  darkMode
                    ? "bg-[#2C394B] border-gray-600 text-gray-100 focus:ring-[#FFB347]"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-[#004AAD]"
                }`}
                required
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-9 cursor-pointer text-gray-400"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>

            {/* Error Message */}
            {error && <p className="text-xs text-red-500">{error}</p>}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgetPassword}
                className={`text-sm text-[#b24d34] hover:underline ${
                  darkMode ? "text-white" : "text-orange-600"
                }`}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full py-2 rounded-lg text-white font-medium text-sm transition-transform transform hover:scale-105 shadow-md ${
                darkMode
                  ? "bg-linear-to-r from-[#e93d11] to-[#FFB347] hover:opacity-90"
                  : "bg-linear-to-r from-[#004AAD] to-[#007BFF] hover:opacity-90"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleSignin}
              className="flex items-center justify-center gap-3 border border-gray-300 bg-[#FFF9F3] text-gray-800 px-5 py-2 rounded-md w-full font-semibold hover:bg-gray-100 transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-grow h-px bg-gray-400"></div>
              <span className="px-2 text-gray-500 text-xs">OR</span>
              <div className="flex-grow h-px bg-gray-400"></div>
            </div>

            {/* Register Link */}
            <p className="text-center text-xs">
              Don’t have an account?{" "}
              <Link
                to="/auth/register"
                className={`font-medium underline ${
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
