import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex  justify-center items-center">
      <h1 className="text-3xl font-bold text-orange-500">Loading </h1>
      <span className="loading loading-spinner loading-xl text-blue-500 text-3xl"></span>
    </div>
  );
};

export default Loading;
