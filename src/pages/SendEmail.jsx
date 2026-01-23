import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { VerifiedIcon, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SendEmail = () => {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data) => {
    setStatus("Sending Email...");

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/forgot-password`,
        { email: data.email },
        { headers: { Accept: "application/json" } },
      );

      toast.success(res.data.message);
      setStatus("Email Sent Successfully");

      // setTimeout(() => {
      //   navigate("/login", { replace: true });
      // }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send email");
      setStatus("");
    }
  };

  return status === "" ? (
    <div className="flex min-h-svh w-full items-center justify-center bg-[#F3F7F5] p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="border border-slate-300 bg-[#E6F0EC]">
          <CardHeader>
            <CardTitle className="text-slate-900">Enter your email</CardTitle>
            <CardDescription className="text-slate-600">
              Enter your email below to reset your password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
                className="border border-slate-300 bg-[#F3F7F5] focus:border-emerald-600 focus:ring-emerald-600"
              />

              <Button
                type="submit"
                disabled={formState.isSubmitting}
                className="bg-[#183D3D] text-white hover:bg-[#145252]"
              >
                {formState.isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  ) : (
    <div className="m-10 flex flex-col items-center gap-y-6 rounded-2xl border border-slate-300 bg-[#E6F0EC] p-10 text-center text-slate-800">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183D3D] text-white">
        {status === "Email Sent Successfully" ? <VerifiedIcon /> : <X />}
      </div>

      <p className="text-slate-700">{status}</p>

      <a
        href="/login"
        className="text-emerald-700 underline hover:text-emerald-800"
      >
        Click here to login again.
      </a>
    </div>
  );
};

export default SendEmail;
