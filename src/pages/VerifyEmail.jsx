import { Mail } from "lucide-react";
import React from "react";

const VerifyEmail = () => {
  return (
    <div className="m-10 flex flex-col items-center gap-y-6 rounded-2xl border border-slate-300 bg-[#E6F0EC] p-10 text-center text-slate-800">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183D3D] text-white">
        <Mail />
      </div>

      <p className="max-w-sm text-slate-700">
        Please check your email. We’ve sent you a message to verify your
        account.
      </p>
    </div>
  );
};

export default VerifyEmail;
