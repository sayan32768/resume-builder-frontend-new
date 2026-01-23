import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login.schema";
import { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
// import { getData } from "@/contexts/UserContext";
import api from "@/api/axios";
import { forgetPassword } from "@/schemas/forgot.schema";
import axios from "axios";
import { Check } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const ChangePassword = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const email = params.get("email");

  const [showPassword, setShowPassword] = useState(false);

  const [verified, setVerified] = useState(false);

  const passwordRef = useRef(null);

  const changeVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgetPassword),
    defaultValues: forgetPassword.parse({}),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log(data);
    console.log(token);
    console.log(email);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/reset-password",
        {
          email: email,
          token: token,
          password: data.password,
          password_confirmation: data.confirmPassword,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setVerified(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again.",
      );
    }
  };

  return verified ? (
    <div className="m-10 flex flex-col items-center gap-y-6 rounded-2xl border border-slate-300 bg-[#E6F0EC] p-10 text-center text-slate-800">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183D3D] text-white">
        <Check />
      </div>

      <h1 className="text-lg font-medium">
        Your password has been changed successfully.
      </h1>

      <a
        href="/login"
        className="text-emerald-700 underline hover:text-emerald-800"
      >
        Click here to login
      </a>
    </div>
  ) : (
    <div className="flex min-h-svh w-full items-center justify-center bg-[#F3F7F5] p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="border border-slate-300 bg-[#E6F0EC]">
            <CardHeader>
              <CardTitle className="text-slate-900">Change Password</CardTitle>
              <CardDescription className="text-slate-600">
                Enter your new password
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.id === "password") {
                    e.preventDefault();
                    passwordRef.current?.focus();
                  }
                  if (e.key === "Enter" && e.target.id === "confirmPassword") {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                  }
                }}
              >
                <FieldGroup>
                  {/* PASSWORD */}
                  <Field>
                    <FieldLabel
                      htmlFor="password"
                      className={"text-sm font-medium text-slate-600"}
                    >
                      Password
                    </FieldLabel>

                    <div className="relative">
                      <Input
                        id="password"
                        type={!showPassword ? "password" : "text"}
                        {...register("password")}
                        ref={(e) => {
                          register("password").ref(e);
                        }}
                        className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                      />

                      <Button
                        tabIndex={-1}
                        onClick={(e) => {
                          e.preventDefault();
                          changeVisibility(e);
                        }}
                        className="absolute top-0 right-0 h-full bg-transparent px-3 text-slate-600 hover:bg-transparent"
                      >
                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </Button>
                    </div>

                    {errors.password && (
                      <p className="mt-0 pb-0 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </Field>

                  {/* CONFIRM PASSWORD */}
                  <Field>
                    <FieldLabel
                      htmlFor="confirmPassword"
                      className={"text-sm font-medium text-slate-600"}
                    >
                      Confirm Password
                    </FieldLabel>

                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                        ref={(e) => {
                          register("confirmPassword").ref(e);
                          passwordRef.current = e;
                        }}
                        className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                      />
                    </div>

                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </Field>

                  {/* SUBMIT */}
                  <Field>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-[#183D3D] text-white hover:cursor-pointer hover:bg-[#145252]"
                    >
                      {isSubmitting ? "Working..." : "Update Password"}
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
