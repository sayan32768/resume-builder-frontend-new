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
import { loginSchema } from "@/schemas/login.schema";
import { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { getData } from "@/contexts/UserContext";
import api from "@/api/axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export function LoginForm({ className, ...props }) {
  const { user, setUser } = getData();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const passwordRef = useRef(null);

  const changeVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: loginSchema.parse({}),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setUser(null);
    try {
      const res = await api.post(`/api/auth/login`, data);

      if (res.data.success && res.data.is_admin) {
        window.location.href = `${
          import.meta.env.VITE_API_URL
        }/auth/bridge?token=${res.data.access_token}`;
      } else if (res.data.success) {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);

        setUser(res.data.data);
        toast.success(res.data.message);
        navigate("/home", { replace: true });
      }
    } catch (error) {
      setUser(null);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again.",
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border border-slate-200 bg-[#E6F0EC]">
        <CardHeader>
          <CardTitle className="text-slate-900">
            Login to your account
          </CardTitle>
          <CardDescription className="text-slate-600">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.id === "password") {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          >
            <FieldGroup>
              {/* EMAIL */}
              <Field>
                <FieldLabel htmlFor="email" className="text-slate-700">
                  Email
                </FieldLabel>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="border border-slate-300 bg-[#F3F7F5] focus:border-emerald-600 focus:ring-emerald-600"
                />
                {errors.email && (
                  <p className="text-sm text-red-900">{errors.email.message}</p>
                )}
              </Field>

              {/* PASSWORD */}
              <Field>
                <FieldLabel htmlFor="password" className="text-slate-700">
                  Password
                </FieldLabel>

                <div className="relative">
                  <Input
                    id="password"
                    type={!showPassword ? "password" : "text"}
                    {...register("password")}
                    ref={(e) => {
                      register("password").ref(e);
                      passwordRef.current = e;
                    }}
                    className="border border-slate-300 bg-[#F3F7F5] focus:border-emerald-600 focus:ring-emerald-600"
                  />

                  <Button
                    tabIndex={-1}
                    onClick={changeVisibility}
                    className="absolute top-0 right-0 h-full bg-transparent px-3 text-slate-600 hover:bg-transparent"
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </Button>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-900">
                    {errors.password.message}
                  </p>
                )}

                <FieldDescription className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-emerald-700 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </FieldDescription>
              </Field>

              {/* SUBMIT */}
              <Field>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#183D3D] text-white hover:cursor-pointer hover:bg-[#145252]"
                >
                  {isSubmitting ? "Working..." : "Login"}
                </Button>

                <FieldDescription className="text-center text-slate-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-emerald-700 hover:underline"
                  >
                    Sign up
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
