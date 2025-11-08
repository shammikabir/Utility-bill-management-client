import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";

import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router";

const Register = () => {
  const [passError, setpassError] = useState("");
  const [error, seterror] = useState("");
  const [show, setShow] = useState(false);

  const { createuser, setloading, signInWithEmailFunc, setUser } =
    useContext(AuthContext);

  //google signin

  const handleGoogleSignin = () => {
    signInWithEmailFunc()
      .then((res) => {
        setloading(false);
        setUser(res.user);
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You are successfully Registered!",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          //   navigate(from);
        });
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: e.message,
        });
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!/(?=.*[A-Z])/.test(password)) {
      setpassError("Password must contain at least one uppercase letter");
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setpassError("Password must contain at least one lowercase letter");
      return;
    } else if (password.length < 6) {
      setpassError("Password must be at least 6 characters long");
      return;
    }

    createuser(email, password)
      .then((result) => {
        const user = result.user;
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

        seterror(message);
      });

    //google signin
  };

  return (
    <div className="min-h-screen bg-[#FFF9F3] flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* Left Image Section */}
        {/* <div className="hidden md:block">
          <img
            src={registerImg}
            alt="Register Visual"
            className="w-full h-full object-cover"
          />
        </div> */}

        {/* Right Form Section */}
        <div className="flex flex-col justify-center px-6 py-8">
          <h1 className="text-2xl font-semibold text-center text-[#333] libre-baskerville-bold mb-4">
            Create Your Account ✨
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#588D72] outline-none text-sm"
                required
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Photo URL
              </label>
              <input
                name="photo"
                type="text"
                placeholder="Enter your photo URL"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#588D72] outline-none text-sm"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#588D72] outline-none text-sm"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Password
              </label>
              <input
                name="password"
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#588D72] outline-none text-sm"
                required
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>

            {/* Error Messages */}
            {passError && !error && (
              <p className="text-xs text-red-500">{passError}</p>
            )}
            {error && <p className="text-xs text-red-500">{error}</p>}

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-[#588D72] hover:bg-[#b24d34] text-white py-2 rounded-md text-sm font-medium transition-colors"
            >
              Register
            </button>

            {/* Divider */}
            <div className="flex items-center my-2">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-2 text-gray-500 text-xs">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignin}
              className="flex items-center justify-center gap-2 border border-gray-300 bg-[#FFF9F3] text-gray-800 px-4 py-2 rounded-md w-full text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-4 h-4"
              />
              Continue with Google
            </button>

            {/* Login Link */}
            <p className="text-center text-xs text-gray-700 mt-3">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-[#b24d34] font-medium hover:underline"
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
