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
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/signup.schema";
import { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { getData } from "@/contexts/UserContext";
import api from "@/api/axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export function SignupForm({ className, ...props }) {
  const { user, setUser } = getData();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const changeVisibilityPassword = (e) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  const changeVisibilityConfirmPassword = (e) => {
    e.preventDefault();
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: signupSchema.parse({}),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setUser(null);
    console.log(data);
    try {
      const res = await api.post(`/api/auth/register`, data);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/verify");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again.",
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className={"border-slate-200 bg-[#E6F0EC]"}>
        <CardHeader>
          <CardTitle className={"text-slate-900"}>Create an account</CardTitle>
          <CardDescription className={"text-slate-600"}>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.id === "fullName") {
                e.preventDefault();
                document.getElementById("email")?.focus();
              }

              if (e.key === "Enter" && e.target.id === "email") {
                e.preventDefault();
                passwordRef.current?.focus();
              }
              if (e.key === "Enter" && e.target.id === "password") {
                e.preventDefault();
                confirmPasswordRef.current?.focus();
              }
              if (e.key === "Enter" && e.target.id === "confirmPassword") {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel
                  className={"text-sm font-medium text-slate-600"}
                  htmlFor="fullName"
                >
                  Full Name
                </FieldLabel>
                <Input
                  className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                  {...register("fullName")}
                  onKeyDown={(e) => {
                    const regex = /^[a-zA-Z\s]*$/;
                    if (!regex.test(e.key) && e.key.length === 1) {
                      e.preventDefault();
                    }
                  }}
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-0 pb-0 text-sm text-red-600">
                    {errors.fullName?.message}
                  </p>
                )}
              </Field>
              {/* <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  className={"bg-[#F3F7F5] border border-slate-300 focus:border-emerald-600 focus:ring-emerald-600"}
                  {...register("username")}
                  onKeyDown={(e) => {
                    const regex = /^[a-zA-Z0-9]*$/;
                    if (!regex.test(e.key) && e.key.length === 1) {
                      e.preventDefault();
                    }
                  }}
                  id="username"
                  type="text"
                  placeholder="JohnDoe"
                />
                {errors.username && (
                  <p className="text-red-900 text-sm">
                    {errors.username?.message}
                  </p>
                )}
              </Field> */}
              <Field>
                <FieldLabel
                  className={"text-sm font-medium text-slate-600"}
                  htmlFor="email"
                >
                  Email
                </FieldLabel>
                <Input
                  className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
                {errors.email && (
                  <p className="mt-0 pb-0 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
                <FieldDescription className={"text-slate-700"}>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel
                  className={"text-sm font-medium text-slate-600"}
                  htmlFor="password"
                >
                  Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={!isPasswordVisible ? "password" : "text"}
                    className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                    {...register("password")}
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        e.preventDefault();
                      }
                    }}
                    ref={(e) => {
                      register("password").ref(e);
                      passwordRef.current = e;
                    }}
                  />
                  <Button
                    tabIndex={-1}
                    onClick={changeVisibilityPassword}
                    className={
                      "absolute top-0 right-0 h-full bg-transparent px-3 py-2 text-slate-600 hover:bg-transparent"
                    }
                  >
                    {isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel
                  className={"text-sm font-medium text-slate-600"}
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={!isConfirmPasswordVisible ? "password" : "text"}
                    className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                    {...register("confirmPassword")}
                    ref={(e) => {
                      register("confirmPassword").ref(e);
                      confirmPasswordRef.current = e;
                    }}
                  />
                  {/* <Button
                    onClick={changeVisibilityConfirmPassword}
                    className={
                      "absolute right-0 top-0 h-full px-3 py-2 bg-transparent text-slate-600 hover:bg-transparent"
                    }
                  >
                    {isConfirmPasswordVisible ? (
                      <FaRegEye />
                    ) : (
                      <FaRegEyeSlash />
                    )}
                  </Button> */}
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>

              {/* <Field>
                <FieldLabel className={"text-slate-700"} htmlFor="role">
                  Signup As
                </FieldLabel>
                <select
                  id="role"
                  {...register("role")}
                  className="rounded-md border border-slate-300 bg-[#F3F7F5] p-2 focus:border-emerald-600 focus:ring-emerald-600"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>

                {errors.role && (
                  <p className="text-sm text-red-900">{errors.role.message}</p>
                )}
              </Field> */}

              <Field>
                <Button
                  className={
                    "rounded-xl bg-[#183D3D] text-white hover:cursor-pointer hover:bg-[#145252]"
                  }
                  variant={"outline"}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Working..." : "Create Account"}
                </Button>
                <FieldDescription className="px-6 text-center text-slate-700">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-emerald-700 hover:underline"
                  >
                    {" "}
                    Sign in{" "}
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
