import React from "react";
import { useLocation } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/authContext";
import { MdOutlineResetTv } from "react-icons/md";
import { toast } from "react-toastify";

const ForgotPass = () => {
  const { sendPassResetEmailFunc } = useContext(AuthContext);
  const location = useLocation();
  const preEmail = location.state?.email || "";
  const [email, setEmail] = useState(preEmail);

  const handleReset = () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    sendPassResetEmailFunc(email)
      .then(() => {
        toast.success("Check your Gmail to reset password", {
          autoClose: 3000, // toast 3 sec thakbe
          onClose: () => {
            window.open("https://mail.google.com", "_blank");
          },
        });
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div>
      {" "}
      <div className="w-4/12 mx-auto mt-20 card bg-[#F5F4F2] p-20 shadow">
        <h2 className="text-2xl mb-4 libre-baskerville-bold">Reset Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="input mb-4 w-full"
        />
        <button
          onClick={handleReset}
          className="btn bg-[#b24d34] text-white libre-baskerville-regular"
        >
          <MdOutlineResetTv />
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgotPass;
