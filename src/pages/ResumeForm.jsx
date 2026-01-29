import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import PersonalForm from "../components/forms/PersonalForm";
import EducationDetailsForm from "../components/forms/EducationDetailsForm";
import { resumeSchema } from "@/schemas/resume.schema";
import { Button } from "../components/ui/button";
import { SkillsForm } from "../components/forms/SkillsForm";
import ProfessionalExperienceForm from "../components/forms/ProfessionalExperienceForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import OtherExperienceForm from "../components/forms/OtherExperienceForm";
import CertificationForm from "../components/forms/CertificationForm";
import { useReactToPrint } from "react-to-print";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, MenuIcon, X } from "lucide-react";
import SlidingSidebar from "@/components/common/SlidingSidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { getData } from "@/contexts/UserContext";
import { v4 as uuidv4 } from "uuid";
import api from "@/api/axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AccentColorSwitcher from "@/components/common/AccentColorSwitcher";
import { renderResumePDF } from "@/components/previews/helpers/RenderResumePDF";
import { renderResumePreview } from "@/components/previews/helpers/RenderResumePreview";
import { RESUME_TEMPLATES } from "@/components/previews/helpers/templates";
import TemplateSwitcher from "@/components/common/TemplateSwitcher";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const ResumeForm = () => {
  const [backdrop, setBackdrop] = useState(false);

  const stepNames = [
    { id: 1, title: "Personal" },
    { id: 2, title: "Education" },
    { id: 3, title: "Skills" },
    { id: 4, title: "Experience" },
    { id: 5, title: "Projects" },
    { id: 6, title: "Other Exp" },
    { id: 7, title: "Certifications" },
  ];

  const stepKeys = [
    "personalDetails",
    "educationDetails",
    "skills",
    "professionalExperience",
    "projects",
    "otherExperience",
    "certifications",
  ];
  const colors = [
    {
      name: "Forest",
      value: "#183D3D", // core brand, best for classic/editorial templates
    },
    {
      name: "Charcoal",
      value: "#334155", // executive, neutral, ATS-safe
    },
    {
      name: "Midnight Navy",
      value: "#1E293B", // modern-classic, serious alternative to blue
    },
    {
      name: "Burgundy",
      value: "#7C2D3A", // premium, academic, MBA-style resumes
    },
    {
      name: "Teal",
      value: "#1F6F8B", // modern template only
    },
    {
      name: "Emerald",
      value: "#2F7F6A", // modern template only
    },
    {
      name: "Royal Blue",
      value: "#2563EB", // modern / tech template only
    },
  ];

  const { user } = getData();

  const [step, setStep] = useState(1);

  const { resumeId } = useParams();

  const navigate = useNavigate();

  const resumeRef = useRef(null);

  // const [type, setType] = useState("Modern");

  const [showSidebar, setShowSidebar] = useState(false);

  const [editingTitle, setEditingTitle] = useState(false);

  const [titleBackup, setTitleBackup] = useState("");

  const openModal = () => {
    setShowSidebar(!showSidebar);
  };
  const reactToPrintFn = useReactToPrint({
    contentRef: resumeRef,
  });

  const [downloading, setDownloadLoading] = useState(false);

  const downloadPDF = async (htmlContent) => {
    setDownloadLoading(true);
    try {
      // const res = await axios.put(
      //   `${API_BASE_URL}/resume/${resumeId}`,
      //   methods.getValues(),
      //   {
      //     withCredentials: true,
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // if (res.status !== 200) {
      //   setDownloadLoading(false);
      //   toast.error("Error generating PDF");
      //   return;
      // }

      const response = await fetch(`${API_BASE_URL}/resume/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ htmlContent }),
        credentials: "include",
      });

      if (response.status !== 200) {
        setDownloadLoading(false);
        toast.error("Error generating PDF");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${user.fullName
        .replace(/\s+/g, "")
        .toLowerCase()}-resume-${uuidv4()}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      // setIsEditing(false);
    } catch (error) {
      setDownloadLoading(false);
      toast.error("Error generating PDF");
    } finally {
      setDownloadLoading(false);
    }
  };

  const methods = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      ...resumeSchema.parse({}),
    },
    mode: "onChange",
    shouldUnregister: false,
  });

  const accentColor = methods.watch("accentColor");

  const setAccentColor = (color) => {
    methods.setValue("accentColor", color, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  //   useForm({
  //   resolver: zodResolver(resumeSchema),
  //   defaultValues: {
  //     educationDetails: [{}],
  //   },
  // });

  const [isEditing, setIsEditing] = useState(false);

  // const handleFirstKey = () => {
  //   if (!isEditing) setIsEditing(true);
  // };

  const {
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (isDirty && !isEditing) {
      setIsEditing(true);
    }

    if (!isDirty && isEditing) {
      setIsEditing(false);
    }
  }, [isDirty]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const resumeType = useWatch({
    control: methods.control,
    name: "resumeType",
  });

  const switchResumeType = (type) => {
    methods.setValue("resumeType", type, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    const fetchResume = async () => {
      setLoading(true);

      try {
        const res = await api.get(`api/resume/${resumeId}`);
        if (res.data.success) {
          setLoading(false);

          const isValidTemplate = RESUME_TEMPLATES.some(
            (t) => t.name === res.data.data.resumeType,
          );

          if (!isValidTemplate) {
            setErrors(true);
            return;
          }
          // setType(res.data.data.resumeType);

          const parsed = res.data.data;

          if (
            parsed.professionalExperience &&
            Array.isArray(parsed.professionalExperience)
          ) {
            parsed.professionalExperience.forEach((exp) => {
              if (exp.dates?.startDate) {
                exp.dates.startDate = new Date(exp.dates.startDate);
              }
              if (exp.dates?.endDate) {
                exp.dates.endDate = new Date(exp.dates.endDate);
              }
            });
          }

          if (parsed.otherExperience && Array.isArray(parsed.otherExperience)) {
            parsed.otherExperience.forEach((exp) => {
              if (exp.dates?.startDate) {
                exp.dates.startDate = new Date(exp.dates.startDate);
              }
              if (exp.dates?.endDate) {
                exp.dates.endDate = new Date(exp.dates.endDate);
              }
            });
          }

          if (
            parsed.educationDetails &&
            Array.isArray(parsed.educationDetails)
          ) {
            parsed.educationDetails.forEach((edu) => {
              if (edu.dates?.startDate) {
                edu.dates.startDate = new Date(edu.dates.startDate);
              }
              if (edu.dates?.endDate) {
                edu.dates.endDate = new Date(edu.dates.endDate);
              }
            });
          }

          if (parsed.certifications && Array.isArray(parsed.certifications)) {
            parsed.certifications.forEach((cert) => {
              if (cert.issueDate) {
                cert.issueDate = new Date(cert.issueDate);
              }
            });
          }

          methods.reset(parsed);
        } else {
          setLoading(false);
          setErrors(true);
          toast.error("Failed to fetch resume");
        }
      } catch (err) {
        setLoading(false);
        setErrors(true);
        toast.error("Failed to fetch resume");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  const formData = useWatch({
    control: methods.control,
  });

  const [modal, showModal] = useState(false);
  const [draftModal, showDraftModal] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data, isDraft) => {
    let allValid = true;
    setIsSubmitting(true);

    for (const key of stepKeys) {
      const isValid = await methods.trigger(key);
      if (!isValid) {
        allValid = false;
      }
    }

    if (!allValid) {
      setIsSubmitting(false);
      toast.error("Errors exist in your form, please recheck all the errors");
      return;
    }

    if (!(await methods.trigger("resumeTitle"))) {
      setIsSubmitting(false);
      return;
    }

    const finalData = {
      ...data,
      isDraft: isDraft,
    };

    console.log("Final Resume Data", finalData);

    var res;

    // await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      res = await api.put(`api/resume/${resumeId}`, finalData);
      if (res.data.success) {
        toast.success("Changes saved successfully");
        setIsEditing(false);
      } else {
        toast.error("Some error occurrred, try again");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again.",
      );
    } finally {
      methods.reset(methods.getValues());
      setIsSubmitting(false);
    }
  };

  const onSubmitTitle = async (data) => {
    setIsSubmitting(true);

    if (!(await methods.trigger("resumeTitle")) || data["resumeTitle"] === "") {
      setIsSubmitting(false);
      toast.error("Please enter a valid title");
      return;
    }

    var res;

    // await new Promise((resolve) => setTimeout(resolve, 3000));

    try {
      res = await api.put(`api/resume/${resumeId}`, data);
      if (res.data.success) {
        toast.success("Title chnaged successfully");
        setIsEditing(false);
      } else {
        toast.error("Some error occurrred, try again");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong, please try again.",
      );
    } finally {
      methods.reset(methods.getValues());
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto mt-10 w-full max-w-xl rounded-2xl bg-white/70 p-4 shadow-sm backdrop-blur">
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#E6F0EC]">
          <div className="animate-loading absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-[#CFE5DC] via-[#183D3D] to-[#CFE5DC]" />
        </div>

        <p className="mt-3 text-center text-sm text-slate-500">
          Loading your resume…
        </p>
      </div>
    );
  }

  if (errors) {
    return (
      <div className="mx-auto mt-12 max-w-lg rounded-3xl border border-red-200 bg-red-50/70 p-8 text-center shadow-sm backdrop-blur">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <X className="h-6 w-6" />
        </div>

        <h2 className="text-lg font-semibold text-red-700">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-red-600">
          We couldn’t load your resume details. Please try again or refresh the
          page.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F7F5]">
      <FormProvider {...methods}>
        <SlidingSidebar
          setStep={setStep}
          step={step}
          show={showSidebar}
          onClose={() => setShowSidebar(false)}
        />

        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          {modal && (
            <div
              onClick={() => {
                methods.setValue("resumeTitle", titleBackup, {
                  shouldDirty: false,
                });
                showModal(false);
              }}
              className="fixed inset-0 z-20 flex items-center justify-center bg-[#183D3D]/40 backdrop-blur-sm"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="mx-4 w-full max-w-lg rounded-3xl bg-white/90 p-8 shadow-xl"
              >
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-[#183D3D]">
                    Name your resume
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    This will help you identify it later
                  </p>
                </div>

                {/* Input */}
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-slate-600">
                    Resume Title
                  </Label>

                  <Input
                    autoFocus
                    defaultValue={methods.getValues("resumeTitle")}
                    placeholder="e.g. Software Engineer Resume"
                    className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                    onChange={(e) => {
                      methods.setValue("resumeTitle", e.target.value, {
                        shouldDirty: true,
                      });
                    }}
                    onKeyDown={async (e) => {
                      e.stopPropagation();

                      if (e.key === "Enter") {
                        e.preventDefault();

                        const cleaned = methods
                          .getValues("resumeTitle")
                          .trim()
                          .replace(/\s+/g, " ");

                        if (!cleaned) {
                          toast.error("Please enter a valid title");
                          return;
                        }

                        methods.setValue("resumeTitle", cleaned, {
                          shouldDirty: true,
                        });

                        await onSubmit(methods.getValues(), false);

                        showModal(false);
                      }

                      if (e.key === "Escape") {
                        e.preventDefault();
                        methods.setValue("resumeTitle", titleBackup, {
                          shouldDirty: false,
                        });
                        showModal(false);
                      }
                    }}
                  />

                  {methods.formState.errors.resumeTitle && (
                    <p className="text-sm text-red-600">
                      {methods.formState.errors.resumeTitle.message}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-8 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-xl border-slate-300 hover:cursor-pointer hover:bg-slate-100"
                    onClick={() => {
                      methods.setValue("resumeTitle", titleBackup, {
                        shouldDirty: false,
                      });
                      showModal(false);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    disabled={submitting}
                    className="flex-1 rounded-xl bg-[#183D3D] text-white hover:cursor-pointer hover:bg-[#122f2f]"
                    onClick={async (e) => {
                      e.preventDefault();
                      const cleaned = methods
                        .getValues("resumeTitle")
                        .trim()
                        .replace(/\s+/g, " ");

                      if (!cleaned) {
                        toast.error("Please enter a valid title");
                        return;
                      }

                      methods.setValue("resumeTitle", cleaned, {
                        shouldDirty: true,
                      });

                      await onSubmit(methods.getValues(), false);

                      showModal(false);
                    }}
                  >
                    {/* {submitting && !modal ? "Saving..." : "Save Resume"} */}
                    Save Resume
                  </Button>
                </div>
              </div>
            </div>
          )}

          {draftModal && (
            <div
              onClick={() => {
                methods.setValue("resumeTitle", titleBackup, {
                  shouldDirty: false,
                });
                showDraftModal(false);
              }}
              className="fixed inset-0 z-20 flex items-center justify-center bg-[#183D3D]/40 backdrop-blur-sm"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="mx-4 w-full max-w-lg rounded-3xl bg-white/90 p-8 shadow-xl"
              >
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-[#183D3D]">
                    Name your resume
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    This will help you identify it later
                  </p>
                </div>

                {/* Input */}
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-slate-600">
                    Resume Title
                  </Label>

                  <Input
                    autoFocus
                    defaultValue={methods.getValues("resumeTitle")}
                    placeholder="e.g. Software Engineer Resume"
                    className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                    onChange={(e) => {
                      methods.setValue("resumeTitle", e.target.value, {
                        shouldDirty: true,
                      });
                    }}
                    onKeyDown={async (e) => {
                      e.stopPropagation();

                      if (e.key === "Enter") {
                        e.preventDefault();

                        const cleaned = methods
                          .getValues("resumeTitle")
                          .trim()
                          .replace(/\s+/g, " ");

                        if (!cleaned) {
                          toast.error("Please enter a valid title");
                          return;
                        }

                        methods.setValue("resumeTitle", cleaned, {
                          shouldDirty: true,
                        });

                        await onSubmit(methods.getValues(), true);

                        showDraftModal(false);
                      }

                      if (e.key === "Escape") {
                        e.preventDefault();
                        methods.setValue("resumeTitle", titleBackup, {
                          shouldDirty: false,
                        });
                        showDraftModal(false);
                      }
                    }}
                  />

                  {methods.formState.errors.resumeTitle && (
                    <p className="text-sm text-red-600">
                      {methods.formState.errors.resumeTitle.message}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-8 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-xl border-slate-300 hover:cursor-pointer hover:bg-slate-100"
                    onClick={() => {
                      methods.setValue("resumeTitle", titleBackup, {
                        shouldDirty: false,
                      });
                      showDraftModal(false);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    disabled={submitting}
                    className="flex-1 rounded-xl bg-[#183D3D] text-white hover:cursor-pointer hover:bg-[#122f2f]"
                    onClick={async (e) => {
                      e.preventDefault();
                      const cleaned = methods
                        .getValues("resumeTitle")
                        .trim()
                        .replace(/\s+/g, " ");

                      if (!cleaned) {
                        toast.error("Please enter a valid title");
                        return;
                      }

                      methods.setValue("resumeTitle", cleaned, {
                        shouldDirty: true,
                      });

                      await onSubmit(methods.getValues(), true);

                      showDraftModal(false);
                    }}
                  >
                    {/* {submitting ? "Saving..." : "Save as Draft"} */}
                    Save as Draft
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Track */}
          <div className="absolute top-[18px] left-[calc(50%/7)] z-20 h-[2px] w-[calc(100%-50%/7*2)] bg-transparent md:hidden">
            <div
              className="h-[2px] bg-[#183D3D] transition-all duration-300"
              style={{
                width: `${
                  stepNames.length > 1
                    ? ((step - 1) / (stepNames.length - 1)) * 100
                    : 0
                }%`,
              }}
            />
          </div>

          <div className="min-h-screen">
            <div className="relative mx-auto px-6 py-10">
              {/* DECORATIONS */}

              <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#CFE5DC]" />
              <div className="absolute top-0 -right-0 h-72 w-72 rounded-full bg-[#F4EEDF]" />

              <div className="absolute bottom-0 -left-32 h-72 w-72 rounded-[33%] bg-[#F4EEDF]" />

              <div className="absolute top-[45%] left-[45%] h-48 w-48 rounded-[40%] bg-[#CFE5DC] opacity-70" />
              <svg
                className="absolute bottom-0 left-10 h-40 w-80 opacity-20"
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

              <svg
                className="absolute top-[50%] right-20 h-64 w-64 opacity-10"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="#183D3D"
                  strokeWidth="1"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  stroke="#183D3D"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>

              {/* GLASS OVERLAY */}
              <div className="g-white/30 absolute inset-0 z-10 h-full backdrop-blur-md" />

              {/* MAIN CONTENT */}
              <div className="relative z-10 flex w-full flex-col items-center pt-10 max-md:hidden">
                <div className="relative flex w-full max-w-4xl justify-between">
                  {stepNames.map((s, index) => {
                    const isCompleted = s.id < step;
                    const isActive = s.id === step;

                    return (
                      <div
                        key={s.id}
                        onClick={async (e) => {
                          e.preventDefault();

                          if (s.id <= step) {
                            setStep(s.id);
                            return;
                          }

                          let id = s.id - 1;

                          for (let i = 0; i < s.id; i++) {
                            const isValid = await methods.trigger(stepKeys[i]);
                            if (!isValid) {
                              toast.error(
                                "Please fill in all the necessary details",
                              );
                              id = i;
                              break;
                            }
                          }

                          setStep(id + 1);
                        }}
                        className="group flex flex-1 flex-col items-center hover:cursor-pointer"
                      >
                        {/* Circle */}
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-[#183D3D] text-white shadow-md"
                              : isCompleted
                                ? "bg-[#CFE5DC] text-[#183D3D]"
                                : "bg-[#E6F0EC] text-slate-500"
                          }`}
                        >
                          {s.id}
                        </div>

                        {/* Label */}
                        <span
                          className={`mt-3 text-sm font-medium transition-colors ${
                            isActive
                              ? "text-[#183D3D]"
                              : "text-slate-500 group-hover:text-slate-700"
                          }`}
                        >
                          {s.title}
                        </span>
                      </div>
                    );
                  })}

                  {/* Track */}
                  <div className="absolute top-[18px] left-0 -z-10 h-[2px] w-full bg-[#E6F0EC]">
                    <div
                      className="h-[2px] bg-[#183D3D] transition-all duration-300"
                      style={{
                        width: `${(step / stepNames.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-10 mb-8 flex items-center justify-center max-lg:flex-col max-lg:gap-y-6 max-lg:pt-8 lg:flex-row lg:items-start lg:gap-x-8 lg:px-14 lg:pt-14">
                <div className="max-md:w-full md:w-[90%] lg:max-w-[594px]">
                  <div
                    onClick={() => navigate("/home")}
                    className="flex w-fit flex-row pb-8 hover:cursor-pointer hover:text-slate-600"
                  >
                    <div className="flex flex-row gap-x-3 text-[#183D3D]">
                      <ArrowLeft />
                      <div className="text-[#183D3D]">Go back to home</div>
                    </div>
                  </div>
                  {/* TITLE SECTION */}
                  {!(modal || draftModal) && (
                    <div className="mb-6 ml-3 flex flex-col gap-1">
                      {!editingTitle ? (
                        <div
                          onClick={() => {
                            setTitleBackup(
                              methods.getValues("resumeTitle") || "",
                            );
                            setEditingTitle(true);
                          }}
                          className="group cursor-text"
                        >
                          <h1
                            className={`text-2xl font-semibold transition ${
                              methods.getValues()?.resumeTitle
                                ? "text-slate-900"
                                : "text-slate-500 italic"
                            } group-hover:text-[#183D3D]`}
                            title="Click to edit title"
                          >
                            {methods.getValues()?.resumeTitle || "Untitled"}
                          </h1>

                          <p className="text-sm text-slate-500 group-hover:text-slate-600">
                            {methods.getValues()?.resumeTitle
                              ? "Click to edit title"
                              : "No title set"}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <input
                            autoFocus
                            defaultValue={methods
                              .getValues("resumeTitle")
                              .trim()
                              .replace(/\s+/g, " ")}
                            className="w-full rounded-xl border border-[#CFE5DC] bg-[#F3F7F5] px-3 py-2 text-lg font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-[#183D3D]/30"
                            placeholder="Enter resume title"
                            onChange={(e) => {
                              methods.setValue("resumeTitle", e.target.value, {
                                shouldDirty: true,
                              });
                            }}
                            onBlur={() => {
                              const cleaned = methods
                                .getValues("resumeTitle")
                                .trim()
                                .replace(/\s+/g, " ");

                              if (!cleaned) {
                                methods.setValue("resumeTitle", titleBackup, {
                                  shouldDirty: false,
                                });
                              } else {
                                methods.setValue("resumeTitle", cleaned, {
                                  shouldDirty: true,
                                });
                              }

                              setEditingTitle(false);
                            }}
                            onKeyDown={async (e) => {
                              e.stopPropagation();

                              if (e.key === "Enter") {
                                e.preventDefault();

                                const cleaned = e.target.value
                                  .trim()
                                  .replace(/\s+/g, " ");

                                if (!cleaned) {
                                  methods.setValue("resumeTitle", titleBackup, {
                                    shouldDirty: false,
                                  });
                                  toast.error("Please enter a valid title");
                                  setEditingTitle(false);
                                  return;
                                }

                                methods.setValue("resumeTitle", cleaned, {
                                  shouldDirty: true,
                                });

                                const res = await onSubmitTitle({
                                  resumeTitle: cleaned,
                                  resumeType: methods.getValues().resumeType,
                                });

                                if (res) showModal(false);
                                setEditingTitle(false);
                              }

                              if (e.key === "Escape") {
                                e.preventDefault();
                                methods.setValue("resumeTitle", titleBackup, {
                                  shouldDirty: false,
                                });
                                setEditingTitle(false);
                              }
                            }}
                          />

                          <p className="text-xs text-slate-500">
                            Press <kbd>Enter</kbd> to save · <kbd>Esc</kbd> to
                            cancel
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Unsaved Section */}
                  {isEditing && !modal && (
                    <div className="mb-6">
                      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-red-100 bg-red-50 p-4 shadow-2xs">
                        {/* Left content */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                            <span className="text-sm font-bold text-red-600">
                              !
                            </span>
                          </div>

                          <div className="flex flex-col">
                            <p className="text-sm font-medium text-red-700">
                              Unsaved changes
                            </p>
                            <p className="text-xs text-red-600/80">
                              Remember to save before leaving this page
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          {/* Save as Draft */}
                          <Button
                            variant="outline"
                            disabled={submitting}
                            onClick={async (e) => {
                              e.preventDefault();
                              const values = methods.getValues();
                              if (!values.resumeTitle) {
                                showDraftModal(true);
                              } else {
                                await onSubmit(values, true);
                              }
                            }}
                            className="rounded-xl border-red-300 text-red-600 hover:cursor-pointer hover:bg-red-100"
                          >
                            {/* {submitting ? "Saving…" : "Save as Draft"} */}
                            Save as Draft
                          </Button>

                          {/* Save & Publish */}
                          <Button
                            disabled={submitting}
                            onClick={async (e) => {
                              e.preventDefault();
                              const values = methods.getValues();
                              if (!values.resumeTitle) {
                                showModal(true);
                              } else {
                                await onSubmit(values, false);
                              }
                            }}
                            className="rounded-xl bg-red-600 px-6 text-white hover:cursor-pointer hover:bg-red-700"
                          >
                            {/* {submitting && !modal ? "Saving…" : "Save Resume"} */}
                            Save Resume
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="flex flex-row justify-between">
                      <div
                        onClick={openModal}
                        className="relative mb-6 h-12 w-12 rounded-xl border-2 border-[#91afaf] hover:cursor-pointer md:hidden"
                      >
                        <MenuIcon className="absolute mx-[22%] my-[22%] text-[#245a5a]" />
                      </div>

                      <div className="flex flex-row gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-xl border-[#183D3D] text-[#183D3D] hover:cursor-pointer hover:bg-[#183D3D] hover:text-white md:hidden"
                          onClick={(e) => {
                            e.preventDefault();
                            setBackdrop(true);
                          }}
                        >
                          Show Preview
                        </Button>
                      </div>
                    </div>

                    <div className="mb-6 flex flex-row gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 rounded-xl border-[#183D3D] text-[#183D3D] hover:cursor-pointer hover:bg-[#183D3D] hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          reactToPrintFn();
                        }}
                      >
                        Print
                      </Button>
                      <div className="flex flex-1 flex-col gap-y-3">
                        {/* <Button
                          disabled={downloading}
                          type="button"
                          variant="outline"
                          className="rounded-xl border-[#183D3D] text-[#183D3D] hover:cursor-pointer hover:bg-[#183D3D] hover:text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            // generatePDF(resumeRef, { filename: "page.pdf" });
                            const code =
                              document.getElementById("resume-preview");
                            downloadPDF(code.innerHTML);
                          }}
                        >
                          {downloading ? "Working..." : "Download as PDF"}
                        </Button> */}

                        {/*REACT PDF INTERGATION NOT WORKING*/}
                        <PDFDownloadLink
                          key={Math.random()}
                          document={renderResumePDF(
                            resumeType,
                            accentColor,
                            formData,
                          )}
                          fileName={`sayan-resume-${uuidv4()}.pdf`}
                        >
                          {({ loading }) => (
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full flex-1 rounded-xl border-[#183D3D] text-[#183D3D] hover:cursor-pointer hover:bg-[#183D3D] hover:text-white"
                              disabled={loading}
                            >
                              Download as PDF
                            </Button>
                          )}
                        </PDFDownloadLink>
                      </div>
                    </div>
                  </div>
                  {step === 1 && <PersonalForm />}
                  {step === 2 && <EducationDetailsForm />}
                  {step === 3 && <SkillsForm />}
                  {step === 4 && <ProfessionalExperienceForm />}
                  {step === 5 && <ProjectsForm />}
                  {step === 6 && <OtherExperienceForm />}
                  {step === 7 && <CertificationForm />}
                  <div className="flex justify-between gap-x-3 pt-4">
                    {step > 1 && (
                      <Button
                        className={
                          "flex-1 rounded-xl border-[#183D3D] bg-[#183D3D] text-white hover:cursor-pointer"
                        }
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                      >
                        Back
                      </Button>
                    )}
                    {step < 7 ? (
                      <Button
                        type="button"
                        className="flex-1 rounded-xl border-[#183D3D] bg-[#183D3D] text-white hover:cursor-pointer"
                        onClick={async (e) => {
                          e.preventDefault();
                          const valid = await methods.trigger(
                            stepKeys[step - 1],
                          );
                          if (valid) {
                            setStep((s) => s + 1);
                          } else {
                            toast.error("Please check all the errors");
                          }
                        }}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        onClick={async (e) => {
                          e.preventDefault();
                          const res = await methods.trigger(stepKeys[step - 1]);

                          if (!res) return;

                          setTitleBackup(
                            methods.getValues("resumeTitle") || "",
                          );

                          showModal(true);
                        }}
                        className="flex-1 rounded-xl border-[#183D3D] bg-[#183D3D] text-white hover:cursor-pointer"
                      >
                        Save to Cloud
                      </Button>
                    )}
                  </div>
                </div>

                {backdrop && (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      setBackdrop(false);
                    }}
                    className="fixed inset-0 bg-white text-center md:hidden"
                  >
                    {/* <div className="relative mt-7">Click anywhere to close</div> */}
                  </div>
                )}

                <div
                  className={`top-0 z-5 max-md:absolute max-md:${
                    backdrop ? "block" : "hidden"
                  }`}
                >
                  <div className="relative my-8 w-full text-center md:hidden">
                    This is what your resume will look like
                  </div>

                  <div className="mb-4 flex flex-row justify-between max-md:hidden">
                    <AccentColorSwitcher
                      colors={colors}
                      activeColor={accentColor}
                      changeColor={setAccentColor}
                    />
                    <TemplateSwitcher
                      templates={RESUME_TEMPLATES}
                      activeTemplate={resumeType}
                      onChange={(name) => switchResumeType(name)}
                      color={methods.getValues().accentColor}
                    />
                  </div>

                  <div className="max-md:h-[calc(297mm*0.44)] max-md:w-[calc(210mm*0.44)] md:h-[calc(297mm*0.7)] md:w-[calc(210mm*0.7)]">
                    <div className="h-[297mm] w-[210mm] origin-top-left outline-1 max-md:scale-[0.44] md:scale-[0.7]">
                      <div id="resume-preview" ref={resumeRef}>
                        {renderResumePreview(resumeType, accentColor)}
                      </div>
                    </div>
                  </div>
                  <div className="relative flex flex-col px-10 md:hidden">
                    <Button
                      type="button"
                      variant="outline"
                      className="my-8 rounded-xl border-[#183D3D] text-[#183D3D] hover:cursor-pointer hover:bg-[#183D3D] hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setBackdrop(false);
                      }}
                    >
                      Close Preview
                    </Button>
                  </div>
                </div>
              </div>
              {methods.formState.errors?.root && <div>Some error occurred</div>}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ResumeForm;
