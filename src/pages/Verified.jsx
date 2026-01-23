import { Check } from "lucide-react";

export default function Verified() {
  return (
    <div className="m-10 flex flex-col items-center gap-y-6 rounded-2xl border border-slate-300 bg-[#E6F0EC] p-10 text-center text-slate-800">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183D3D] text-white">
        <Check />
      </div>

      <h1 className="text-lg font-medium">
        Your account has been successfully verified.
      </h1>

      <a
        href="/login"
        className="text-emerald-700 underline hover:text-emerald-800"
      >
        Click here to login
      </a>
    </div>
  );
}
