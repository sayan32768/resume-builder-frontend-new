import api from "@/api/axios";
import { RESUME_TEMPLATES } from "@/components/previews/helpers/templates";
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_URL;

function ResumeCreator() {
  const navigate = useNavigate();
  const effectRan = useRef(false);

  const [searchParams] = useSearchParams();
  const resumeType = searchParams.get("type");

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

    const createDraft = async () => {
      console.log(resumeType);

      try {
        const res = await api.post(`api/resume/create`, {
          resumeType: resumeType,
          resumeTitle: "",
          accentColor: "#183D3D",
          isDraft: true,
        });
        if (res.data.success) {
          navigate(`/edit/${res.data.data._id}`, { replace: true });
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong, please try again.",
        );
      }

      //   await new Promise((resolve) => setTimeout(resolve, 3000));
    };

    createDraft();
  }, [navigate, resumeType]);

  if (!RESUME_TEMPLATES.some((t) => t.name === resumeType)) {
    return (
      <div className="mx-auto mt-12 max-w-lg rounded-3xl border border-red-200 bg-red-50/70 p-8 text-center shadow-sm backdrop-blur">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <X className="h-6 w-6" />
        </div>

        <h2 className="text-lg font-semibold text-red-700">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-red-600">
          We couldn’t create your resume Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-xl rounded-2xl bg-white/70 p-4 shadow-sm backdrop-blur">
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#E6F0EC]">
        <div className="animate-loading absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-[#CFE5DC] via-[#183D3D] to-[#CFE5DC]" />
      </div>

      <p className="mt-3 text-center text-sm text-slate-500">
        Creating your resume…
      </p>
    </div>
  );
}

export default ResumeCreator;
