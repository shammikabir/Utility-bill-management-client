import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F3] flex items-center justify-center px-5">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side Image */}
        {/* <div className="hidden md:block">
          <img
            src={loginImg}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div> */}

        {/* Right Side Form */}
        <div className="flex flex-col justify-center px-8 py-12">
          <h1 className="text-3xl font-semibold text-center text-[#333] libre-baskerville-bold mb-6">
            Welcome Back 👋
          </h1>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#588D72] outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#588D72] outline-none"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-sm text-[#b24d34] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#588D72] hover:bg-[#b24d34] text-white py-2 rounded-md font-medium transition-colors"
            >
              Login
            </button>

            <div className="flex items-center my-3">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-2 text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google Sign-in */}
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

            <p className="text-center text-sm text-gray-700 mt-4">
              Don’t have an account?{" "}
              <Link
                to="/auth/register"
                className="text-[#b24d34] font-medium hover:underline"
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
