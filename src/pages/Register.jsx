import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "../ThemeContext/ThemeContext";
import { toast } from "react-toastify";

const Register = () => {
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { createuser, setloading, signInWithEmailFunc, setUser, updateUser } =
    useContext(AuthContext);

  const handleGoogleSignin = () => {
    signInWithEmailFunc()
      .then((res) => {
        setloading(false);
        setUser(res.user);
        alert("Registration Successful!");
      })
      .catch((e) => alert(e.message));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!/(?=.*[A-Z])/.test(password)) {
      setPassError("Password must contain at least one uppercase letter");
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setPassError("Password must contain at least one lowercase letter");
      return;
    } else if (password.length < 6) {
      setPassError("Password must be at least 6 characters long");
      return;
    }

    createuser(email, password)
      .then((result) => {
        setUser(result.user);
        const user = result.user;

        updateUser({ displayName: name, photoURL: photo }).then(() => {
          setUser({ ...user, displayName: name, photoURL: photo });
          form.reset();
          navigate("/auth/login");
          toast.success(
            "Successfully Registered! Please Log In to your Account"
          );
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        let message = "";
        switch (errorCode) {
          case "auth/email-already-in-use":
            message = "This email is already registered. Please log in.";
            break;
          case "auth/invalid-email":
            message = "Invalid email address.";
            break;
          case "auth/weak-password":
            message = "Password should be at least 6 characters.";
            break;
          default:
            message = "Registration failed. Please try again.";
        }
        setError(message);
      });
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
        className={`max-w-5xl w-full rounded-3xl shadow-2xl overflow-hidden grid my-20 md:grid-cols-2 ${
          darkMode ? "bg-[#1B262C]" : "bg-[#F8FAFF]"
        }`}
      >
        {/* Left Curved Image Section */}
        <div className="hidden md:flex relative items-center justify-center">
          <div
            className={`absolute inset-0 ${
              darkMode
                ? "bg-linear-to-br from-[#ff9a44] via-[#ff7842] to-[#ff6b6b]"
                : "bg-linear-to-br from-[#004AAD] via-[#007BFF] to-[#4FC3F7]"
            }`}
            style={{
              borderBottomRightRadius: "150px",
            }}
          ></div>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/application-login-4438907-3726717.png"
            alt="Register Visual"
            className="relative w-[85%] object-contain drop-shadow-lg"
          />
        </div>

        {/* Right Form Section */}
        <div
          className={`flex flex-col justify-center px-15 py-10 ${
            darkMode ? "bg-[#1B262C]" : "bg-[#F8FAFF]"
          }`}
        >
          <h1
            className={`text-3xl text-center mb-6 libre-baskerville-bold ${
              darkMode ? "text-[#FFB347]" : "text-[#004AAD]"
            }`}
          >
            Create Your Account ✨
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className={`w-full rounded-lg px-3 py-2 border focus:ring-2 outline-none text-sm ${
                  darkMode
                    ? "bg-[#2C394B] border-gray-600 text-gray-100 focus:ring-[#FFB347]"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-[#004AAD]"
                }`}
                required
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Photo URL
              </label>
              <input
                name="photo"
                type="text"
                placeholder="Enter your photo URL"
                className={`w-full rounded-lg px-3 py-2 border focus:ring-2 outline-none text-sm ${
                  darkMode
                    ? "bg-[#2C394B] border-gray-600 text-gray-100 focus:ring-[#FFB347]"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-[#004AAD]"
                }`}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
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

            {/* Errors */}
            {passError && !error && (
              <p className="text-xs text-red-500">{passError}</p>
            )}
            {error && <p className="text-xs text-red-500">{error}</p>}

            {/* Register Button */}
            <button
              type="submit"
              className={`w-full py-2 rounded-lg text-white font-medium text-sm libre-baskerville-bold transition-transform transform hover:scale-105 shadow-md ${
                darkMode
                  ? "bg-linear-to-r from-[#ef5129] to-[#FFB347] hover:opacity-90"
                  : "bg-linear-to-r from-[#004AAD] to-[#007BFF] hover:opacity-90"
              }`}
            >
              Register
            </button>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignin}
              className={`flex items-center  justify-center gap-2 w-full py-2 rounded-lg border text-sm font-semibold transition-transform transform hover:scale-105 ${
                darkMode
                  ? "bg-[#2C394B] border-gray-600 text-gray-200 hover:bg-[#33475E]"
                  : "bg-[#FFF9F3] border-gray-300 text-gray-900 hover:bg-gray-100"
              }`}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-4 h-4"
              />
              Continue with Google
            </button>

            {/* Login Link */}
            <p className="text-center text-xs mt-2">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className={`font-medium underline ${
                  darkMode ? "text-[#FFB347]" : "text-[#004AAD]"
                }`}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
