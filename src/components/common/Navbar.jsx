import React, { useState } from "react";
import { Button } from "../ui/button";
import { AtSign, LogOut, Settings2, User2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ user, handleLogout, loggingOut }) => {
  const [isDropdownShowing, setIsDropdownShowing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goToProfile = () => {
    if (location.pathname !== "/profile") {
      navigate("/profile");
    }
  };

  return (
    <header className="relative z-50 w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
        {/* LOGO */}
        <a
          href="/home"
          className="text-xl font-semibold text-[#183D3D] md:text-2xl"
        >
          Resume.
        </a>

        {/* RIGHT SIDE */}
        {user ? (
          <div className="relative">
            {/* AVATAR */}
            <button
              onClick={() => setIsDropdownShowing((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#183D3D] text-white transition hover:opacity-90 md:h-12 md:w-12"
            >
              <span className="text-lg font-bold">
                {user.fullName.charAt(0).toUpperCase()}
              </span>
            </button>

            {/* DROPDOWN */}
            {isDropdownShowing && (
              <>
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex items-center gap-3 text-slate-700">
                      <User2 className="h-4 w-4 text-[#183D3D]" />
                      <span className="truncate font-medium">
                        {user.fullName}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600">
                      <AtSign className="h-4 w-4 text-[#183D3D]" />
                      <span className="truncate">{user.email}</span>
                    </div>

                    <div className="h-px bg-slate-200" />

                    <button
                      onClick={goToProfile}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-[#183D3D] transition hover:cursor-pointer hover:bg-[#183D3D]/8"
                    >
                      <Settings2 className="h-4 w-4" />
                      <span className="text-sm font-medium">Edit Profile</span>
                    </button>

                    {/* <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-red-600 transition hover:cursor-pointer hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </button> */}
                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-red-600 transition hover:cursor-pointer hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loggingOut ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                          <span className="text-sm font-medium">
                            Logging out...
                          </span>
                        </>
                      ) : (
                        <>
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm font-medium">Logout</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* BACKDROP */}
                <div
                  onClick={() => setIsDropdownShowing(false)}
                  className="fixed inset-0 z-[-1]"
                />
              </>
            )}
          </div>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="border-[#183D3D] text-[#183D3D] hover:bg-[#183D3D] hover:text-white"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
