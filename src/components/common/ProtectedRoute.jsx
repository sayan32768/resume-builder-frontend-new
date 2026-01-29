import { getData } from "@/contexts/UserContext";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = getData();
  //   console.log("------------------------------------------", user);
  if (loading)
    return (
      // <div className="relative h-1 w-full overflow-hidden rounded bg-gray-200">
      //   <div className="absolute top-0 left-0 h-1 w-1/3 animate-[loading_1.5s_linear_infinite] bg-black"></div>
      //   <style>
      //     {`
      //   @keyframes loading {
      //     0% { transform: translateX(-100%); }
      //     100% { transform: translateX(100%); }
      //   }
      // `}
      //   </style>
      // </div>
      <div className="mx-auto mt-10 w-full max-w-xl rounded-2xl bg-white/70 p-4 shadow-sm backdrop-blur">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#E6F0EC]">
          <div className="animate-loading absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-[#CFE5DC] via-[#183D3D] to-[#CFE5DC]" />
        </div>

        <p className="mt-3 text-center text-sm text-slate-500">Loading...</p>
      </div>
    );
  return <>{user ? children : <Navigate to={"/login"} replace={true} />}</>;
};

export default ProtectedRoute;
