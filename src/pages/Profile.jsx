import api from "@/api/axios";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getData } from "@/contexts/UserContext";
import { profileSchema } from "@/schemas/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { email, set } from "zod";
import { useQueryClient } from "@tanstack/react-query";

const Profile = () => {
  const { user, setUser } = getData();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
    },
    mode: "onChange",
    shouldUnregister: false,
    resolver: zodResolver(profileSchema),
  });

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    try {
      const res = await api.post("/api/auth/logout");
      if (res.data.success) {
        // 🔥 clear all TanStack caches (including persisted ones)
        queryClient.clear();
        localStorage.clear();
        navigate("/");
        setUser(null);
        toast.success("Logged out successfully");
      }
    } catch {
      toast.error("Could not log out");
    } finally {
      setLoggingOut(false);
    }
  };

  // ONSUBMIT FUNCTION TO UPDATE PROFILE DETAILS CAN BE ADDED HERE IN FUTURE
  const onSubmit = async (data) => {
    setButtonLoading(true);
    console.log("Updated profile data:", data);
    try {
      // API call to update profile details can be made here
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await api.put("/api/auth/update-profile", {
        ...data,
        password_confirmation: data.confirmPassword,
      });

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        reset({
          ...getValues(),
          password: "",
          confirmPassword: "",
        });
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Could not update profile");
    } finally {
      setButtonLoading(false);
    }
  };

  const [buttonLoading, setButtonLoading] = useState(false);
  const [profileErrors, setProfileErrors] = useState(false);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/resume/stats");
        // const res = {};
        setStats(res.data);
      } catch (err) {
        setProfileErrors(true);
        console.log(err);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const passwordValue = watch("password");

  useEffect(() => {
    if (!passwordValue) {
      // password cleared → confirm no longer required
      reset({
        ...getValues(),
        password: "",
        confirmPassword: "",
      });
      clearErrors("confirmPassword");
    } else {
      // password typed → revalidate confirm field
      trigger("confirmPassword");
    }
  }, [passwordValue, clearErrors, trigger, reset, getValues]);

  if (statsLoading) {
    return (
      <div className="mx-auto mt-10 w-full max-w-xl rounded-2xl bg-white/70 p-4 shadow-sm backdrop-blur">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#E6F0EC]">
          <div className="animate-loading absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-[#CFE5DC] via-[#183D3D] to-[#CFE5DC]" />
        </div>

        <p className="mt-3 text-center text-sm text-slate-500">
          Loading profile details…
        </p>
      </div>
    );
  }

  if (profileErrors) {
    return (
      <div className="mx-auto mt-12 max-w-lg rounded-3xl border border-red-200 bg-red-50/70 p-8 text-center shadow-sm backdrop-blur">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <X className="h-6 w-6" />
        </div>

        <h2 className="text-lg font-semibold text-red-700">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-red-600">
          We couldn’t load your profile details. Please try again or refresh the
          page.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#F3F7F5]">
        <Navbar
          user={user}
          handleLogout={handleLogout}
          loggingOut={loggingOut}
        />

        {/* ================= GLOBAL BACKGROUND ================= */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Big circles */}
          <div className="absolute -top-10 -left-32 h-96 w-96 rounded-full bg-[#CFE5DC]" />
          <div className="absolute top-24 -right-24 h-72 w-72 rounded-full bg-[#F4EEDF]" />
          <div className="absolute bottom-32 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#DCEDEA]" />

          {/* Dot grid */}
          <div className="absolute right-20 bottom-40 opacity-30">
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[#183D3D]/40"
                />
              ))}
            </div>
          </div>

          {/* Organic blob */}
          <div className="absolute top-10 left-1/3 h-48 w-48 rounded-[40%] bg-[#F4EEDF] opacity-70" />

          {/* Wavy line */}
          <svg
            className="absolute bottom-24 left-10 h-40 w-80 opacity-20"
            viewBox="0 0 300 120"
            fill="none"
          >
            <path
              d="M0 60 C60 10, 120 110, 180 60 C220 30, 260 80, 300 60"
              stroke="#183D3D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* White frosted overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-white/30 backdrop-blur-xl" />

        {/* ================= PAGE CONTENT ================= */}
        <div className="relative z-10">
          {/* <div className="mx-auto mt-9 max-w-7xl px-12">
            <h2 className="text-xl font-bold text-[#183D3D]">
              Welcome back, {user.fullName}
            </h2>
            <p className="mb-8 text-[#183D3D]/70">
              You have {pastResumes.length} resumes active in your account.
            </p>
          </div> */}

          <div className="mx-auto mt-9 max-w-7xl px-12">
            <>
              <h2 className="text-xl font-bold text-[#183D3D]">
                Edit your profile, {user.fullName}
              </h2>
              <p className="mb-8 text-[#183D3D]/70">
                This is where you can edit your profile details and manage your
                account settings.
              </p>
            </>
          </div>

          {/* ================= Go back to home button ================= */}
          <div className="mx-auto max-w-7xl px-12">
            <Button
              variant="outline"
              onClick={() => navigate("/home")}
              className="rounded-xl border border-slate-300 bg-[#F3F7F5] text-[#183D3D] shadow-none transition-all duration-200 hover:border-[#183D3D]/60 hover:bg-[#183D3D]/10 hover:text-[#183D3D] focus-visible:ring-2 focus-visible:ring-[#183D3D]/30"
            >
              &larr; Back to Home
            </Button>
          </div>

          <div className="mx-auto mt-10 mb-20 max-w-7xl px-12">
            <div className="flex gap-6 max-md:flex-col md:flex-row">
              <div className="flex-1">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      e.target.name !== "confirmPassword"
                    ) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="rounded-2xl bg-white/60 p-3 shadow-sm md:p-6">
                    <div className="flex w-full flex-col bg-transparent">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-3 rounded-xl bg-[#e9fff0]/30 p-4">
                          <div className="mt-0 mb-3 flex flex-1 flex-col gap-3">
                            <Label
                              className={"text-sm font-medium text-slate-600"}
                              htmlFor="name"
                            >
                              Full Name
                            </Label>

                            <div className="flex flex-col gap-y-1">
                              <Input
                                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                                placeholder="Change your name"
                                {...register("fullName", {})}
                              />

                              {errors.fullName && (
                                <p className="mt-2 pb-2 text-sm text-red-600">
                                  {errors.fullName.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mb-3 flex flex-1 flex-col gap-3">
                            <Label
                              className={"text-sm font-medium text-slate-600"}
                              htmlFor="email"
                            >
                              Email
                            </Label>

                            <div className="flex flex-col gap-y-1">
                              <Input
                                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                                placeholder="Change your email"
                                {...register("email", {})}
                              />

                              {errors.email && (
                                <p className="mt-2 pb-2 text-sm text-red-600">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* PASSWORD SECTION - can be used to update password in future */}
                          <div className="mb-3 flex flex-1 flex-col gap-3">
                            <Label
                              className={"text-sm font-medium text-slate-600"}
                              htmlFor="password"
                            >
                              Password
                            </Label>

                            <div className="flex flex-col gap-y-1">
                              <div className="relative">
                                <Input
                                  autoComplete="new-password"
                                  type={!showPassword ? "password" : "text"}
                                  className="rounded-xl border-slate-300 bg-[#F3F7F5] pr-12 focus:ring-2 focus:ring-[#183D3D]/30"
                                  placeholder="Change your password (leave blank if you don't want to change)"
                                  {...register("password")}
                                />
                                <Button
                                  type="button"
                                  tabIndex={-1}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShowPassword((prev) => !prev);
                                  }}
                                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-transparent px-2 text-slate-600 hover:bg-transparent"
                                >
                                  {showPassword ? (
                                    <FaRegEye />
                                  ) : (
                                    <FaRegEyeSlash />
                                  )}
                                </Button>
                              </div>

                              {errors.password && (
                                <p className="mt-2 pb-2 text-sm text-red-600">
                                  {errors.password.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* CONFIRM PASSWORD SECTION - can be used to update password in future */}
                          <div className="mb-0 flex flex-1 flex-col gap-3">
                            <Label
                              className={"text-sm font-medium text-slate-600"}
                              htmlFor="confirmPassword"
                            >
                              Confirm Password
                            </Label>

                            <div className="flex flex-col gap-y-1">
                              <Input
                                name="confirmPassword"
                                type="password"
                                disabled={!watch("password")}
                                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                                placeholder="Confirm password"
                                {...register("confirmPassword", {})}
                              />

                              {errors.confirmPassword && (
                                <p className="mt-2 pb-2 text-sm text-red-600">
                                  {errors.confirmPassword.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    variant="outline"
                    className="mt-4 flex-1 rounded-xl border border-slate-300 bg-[#F3F7F5] text-[#183D3D] shadow-none transition-all duration-200 hover:border-[#183D3D]/60 hover:bg-[#183D3D]/10 hover:text-[#183D3D] focus-visible:ring-2 focus-visible:ring-[#183D3D]/30"
                    disabled={buttonLoading}
                  >
                    {buttonLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </div>

              <div className="flex-1 space-y-6">
                {/* ================= LAST RESUME CARD ================= */}
                <div className="rounded-2xl bg-white/60 p-6 shadow-sm">
                  <h3 className="p-2 text-lg font-semibold text-[#183D3D]">
                    Continue your last resume
                  </h3>

                  {!stats?.lastResume ? (
                    <p className="mt-2 ml-2 text-sm text-[#183D3D]/70">
                      You haven’t created a resume yet.
                    </p>
                  ) : (
                    <div className="rounded-xl bg-[#e9fff0]/30 p-3">
                      <div className="mt-3 space-y-3">
                        <p className="font-medium text-[#183D3D]">
                          {stats?.lastResume?.title?.trim() || "Untitled"}
                        </p>

                        <p className="text-xs text-[#183D3D]/60">
                          Last edited{" "}
                          {new Date(
                            stats.lastResume.updatedAt,
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      {/* completion bar */}
                      <div className="mt-3">
                        <div className="w-full rounded-full bg-[#DCEDEA]">
                          <div
                            className="h-2 rounded-full bg-[#183D3D]"
                            style={{ width: `${stats.lastResume.completion}%` }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-[#183D3D]/70">
                          {stats.lastResume.completion}% complete
                        </p>
                      </div>

                      {/* continue button */}
                      <Button
                        onClick={() => navigate(`/edit/${stats.lastResume.id}`)}
                        className="mt-6 w-full rounded-xl bg-[#183D3D] text-white hover:bg-[#0f2a2a]"
                      >
                        Continue Editing
                      </Button>
                    </div>
                  )}
                </div>

                {/* ================= QUICK STATS CARD ================= */}
                <div className="rounded-2xl bg-white/60 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#183D3D]">
                    Your stats
                  </h3>

                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-xl font-semibold text-[#183D3D]">
                        {stats?.totalResumes ?? 0}
                      </p>
                      <p className="text-xs text-[#183D3D]/60">Resumes</p>
                    </div>

                    <div>
                      <p className="text-xl font-semibold text-[#183D3D]">
                        {stats?.completedResumes ?? 0}
                      </p>
                      <p className="text-xs text-[#183D3D]/60">Completed</p>
                    </div>

                    <div>
                      <p className="text-xl font-semibold text-[#183D3D]">
                        {stats?.averageCompletion ?? 0}%
                      </p>
                      <p className="text-xs text-[#183D3D]/60">
                        Avg. Completion
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
