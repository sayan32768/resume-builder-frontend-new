import React, { useEffect, useRef, useState } from "react";
import { Download, MoreVertical, Plus, Trash } from "lucide-react";
import { getData } from "@/contexts/UserContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import api from "@/api/axios";
import { AnimatePresence, motion } from "framer-motion";
import { renderTemplatePreviewCard } from "@/components/previews/helpers/RenderTemplatePreviewCard";
import { RESUME_TEMPLATES } from "@/components/previews/helpers/templates";

const Home = () => {
  const { user, setUser } = getData();
  const navigate = useNavigate();

  const [pastResumes, setPastResumes] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [open, setOpen] = useState(0);
  const [activeTab, setActiveTab] = useState("resumes");

  const tabRefs = {
    resumes: useRef(null),
    drafts: useRef(null),
    templates: useRef(null),
  };

  useEffect(() => {
    const getResumeData = async () => {
      setDataLoading(true);
      try {
        // await new Promise((res) => setTimeout(res, 5000));
        const res = await api.get(`/api/resume/all`);
        if (res.data.success) {
          console.log(res.data.data);
          setPastResumes(res.data.data.filter((doc) => doc.isDraft === false));
          setDrafts(res.data.data.filter((doc) => doc.isDraft === true));
        }
      } finally {
        setDataLoading(false);
      }
    };
    getResumeData();
  }, []);

  useEffect(() => {
    const close = () => setOpen(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const el = tabRefs[activeTab]?.current;
    if (!el) return;

    setIndicatorStyle({
      width: el.offsetWidth,
      transform: `translateX(${el.offsetLeft}px)`,
    });
  }, [activeTab, pastResumes.length, drafts.length]);

  const handleLogout = async () => {
    try {
      const res = await api.post("/api/auth/logout");
      if (res.data.success) {
        localStorage.clear();
        navigate("/");
        setUser(null);
        toast.success("Logged out successfully");
      }
    } catch {
      toast.error("Could not log out");
    }
  };

  const deleteResume = async (id, isDraft) => {
    try {
      const res = await api.delete(`api/resume/${id}`);
      if (res.data.success) {
        if (!isDraft) {
          setPastResumes((prev) => prev.filter((r) => r._id !== id));
        } else {
          setDrafts((prev) => prev.filter((r) => r._id !== id));
        }

        toast.success("Resume deleted");
      }
    } catch {
      toast.error("Could not delete resume");
    }
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#F3F7F5]">
        <Navbar user={user} handleLogout={handleLogout} />

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
            {dataLoading ? (
              <div className="animate-pulse space-y-3">
                {/* Title skeleton */}
                <div className="h-6 w-64 rounded-md bg-[#183D3D]/20" />

                {/* Subtitle skeleton */}
                <div className="h-4 w-96 rounded-md bg-[#183D3D]/15" />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-[#183D3D]">
                  Welcome back, {user.fullName}
                </h2>
                <p className="mb-8 text-[#183D3D]/70">
                  You have {pastResumes.length} resumes active in your account.
                </p>
              </>
            )}
          </div>

          {/* Tabs */}
          <div className="relative mx-auto mt-9 max-w-7xl border-b border-slate-200 px-12">
            <div className="relative flex gap-8">
              {["resumes", "drafts", "templates"].map((tab) => {
                const count =
                  tab === "resumes"
                    ? pastResumes.length
                    : tab === "drafts"
                      ? drafts.length
                      : 0;

                return (
                  <button
                    key={tab}
                    ref={tabRefs[tab]}
                    onClick={() => setActiveTab(tab)}
                    className={`relative py-3 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "text-[#183D3D]"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>
                        {tab === "resumes"
                          ? "Resumes"
                          : tab === "drafts"
                            ? "Drafts"
                            : "Templates"}
                      </span>

                      {/* Badge — hidden for templates & zero counts */}
                      {tab !== "templates" && count > 0 && (
                        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#183D3D]/20 px-1.5 text-xs font-semibold text-[#183D3D]">
                          {count}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* animated underline */}
              <span
                className="absolute bottom-0 h-[2px] bg-[#183D3D] transition-all duration-300"
                style={{
                  indicatorStyle,
                  width: tabRefs[activeTab]?.current?.offsetWidth ?? 0,
                  transform: `translateX(${
                    tabRefs[activeTab]?.current?.offsetLeft ?? 0
                  }px)`,
                }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "resumes" && (
              <motion.div
                key="resumes"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <>
                  {/* ================= CREATE SECTION ================= */}
                  <section className="relative overflow-hidden bg-white/30 backdrop-blur-md">
                    <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
                      <div className="relative z-10 mx-auto max-w-7xl px-6 py-0">
                        <p className="mb-4 text-xl font-bold text-[#183D3D]">
                          Your Resumes{" "}
                        </p>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {/* CREATE RESUME CARD */}
                          <div
                            onClick={() => navigate("/create?type=Classic")}
                            className="group flex h-[380px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CFE5DC] bg-[#EEF5F1] transition hover:-translate-y-1 hover:cursor-pointer hover:border-[#183D3D] hover:shadow-lg"
                          >
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F0EC] text-[#183D3D] transition group-hover:bg-[#183D3D] group-hover:text-white">
                              <Plus className="h-7 w-7" />
                            </div>

                            <p className="mt-4 text-base font-semibold text-slate-800">
                              Create Resume
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              Classic template
                            </p>
                          </div>

                          {dataLoading ? (
                            [1, 2, 3].map((_, idx) => (
                              <div
                                key={idx}
                                className="overflow-hidden rounded-2xl bg-[#E6F0EC]"
                              >
                                <Skeleton className="h-56 w-full bg-[#CFE5DC]" />
                                <div className="space-y-2 p-4">
                                  <Skeleton className="h-4 w-3/4 bg-[#CFE5DC]" />
                                  <Skeleton className="h-3 w-1/2 bg-[#c9e1d8]" />
                                </div>
                              </div>
                            ))
                          ) : pastResumes.length === 0 ? (
                            // <div className="col-span-full py-12 text-center text-slate-500">
                            //   No past resumes found
                            // </div>
                            <></>
                          ) : (
                            pastResumes.map((doc) => (
                              <div
                                key={doc._id}
                                onClick={() => navigate(`/edit/${doc._id}`)}
                                className="group relative flex h-[380px] flex-col overflow-hidden rounded-2xl bg-[#EEF5F1] transition hover:cursor-pointer hover:shadow-lg"
                              >
                                {/* PREVIEW IMAGE */}
                                <div className="relative flex-1 overflow-hidden">
                                  {renderTemplatePreviewCard(
                                    doc.resumeType,
                                    doc.color,
                                  )}
                                </div>

                                {/* COMPLETION BAR */}
                                <div className="absolute right-0 bottom-0 left-0 h-1 bg-slate-200">
                                  <div
                                    className="h-full transition-all duration-300"
                                    style={{
                                      width: `${doc.completion || 0}%`,
                                      backgroundColor:
                                        doc.completion >= 80
                                          ? "#16a34a" // green
                                          : doc.completion >= 40
                                            ? "#f59e0b" // amber
                                            : "#dc2626", // red
                                    }}
                                  />
                                </div>

                                {/* Menu */}
                                <div className="absolute top-3 right-3">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpen(
                                        open === doc._id ? null : doc._id,
                                      );
                                    }}
                                    className="rounded-lg bg-white/90 p-2 shadow hover:bg-slate-100"
                                  >
                                    <MoreVertical size={16} />
                                  </button>

                                  {open === doc._id && (
                                    <div
                                      onClick={(e) => e.stopPropagation()}
                                      className="absolute right-0 mt-2 w-32 rounded-xl border-0 bg-white shadow-lg"
                                    >
                                      <button
                                        onClick={() =>
                                          deleteResume(doc._id, false)
                                        }
                                        className="flex w-full gap-2 rounded-xl px-4 py-2 text-sm text-red-600 hover:cursor-pointer hover:bg-red-50"
                                      >
                                        <Trash size={14} />
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>

                                {/* BOTTOM INFO */}
                                <div className="border-t border-slate-200 p-4">
                                  <div className="mb-2 flex items-start justify-between gap-2">
                                    <h5
                                      className="max-w-[160px] truncate font-semibold text-slate-800"
                                      title={doc.resumeTitle || "Untitled"}
                                    >
                                      {doc.resumeTitle || "Untitled"}
                                    </h5>

                                    <span className="shrink-0 rounded-full bg-[#E6F0EC] px-3 py-1 text-xs font-medium text-[#183D3D]">
                                      {doc.resumeType || "Type"}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-xs tracking-wide text-slate-500 uppercase">
                                        Modified
                                      </p>
                                      <p className="text-sm text-slate-700">
                                        {new Date(
                                          doc.updatedAt,
                                        ).toLocaleDateString("en-IN", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </p>
                                    </div>

                                    {/* DOWNLOAD */}
                                    {/* <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // intentionally empty
                                      }}
                                      className="rounded-lg bg-[#F3F7F5] p-2 text-slate-600 transition hover:cursor-pointer hover:bg-emerald-100 hover:text-emerald-700"
                                    >
                                      <Download className="h-4 w-4" />
                                    </button> */}
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              </motion.div>
            )}

            {activeTab === "drafts" && (
              <motion.div
                key="drafts"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <>
                  <section className="relative overflow-hidden bg-white/30 backdrop-blur-md">
                    <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
                      <div className="relative z-10 mx-auto max-w-7xl px-6 py-0">
                        <p className="mb-4 text-xl font-bold text-[#183D3D]">
                          Your Resume Drafts{" "}
                        </p>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {dataLoading ? (
                            [1, 2, 3].map((_, idx) => (
                              <div
                                key={idx}
                                className="overflow-hidden rounded-2xl bg-[#E6F0EC]"
                              >
                                <Skeleton className="h-56 w-full bg-[#CFE5DC]" />
                                <div className="space-y-2 p-4">
                                  <Skeleton className="h-4 w-3/4 bg-[#CFE5DC]" />
                                  <Skeleton className="h-3 w-1/2 bg-[#c9e1d8]" />
                                </div>
                              </div>
                            ))
                          ) : drafts.length === 0 ? (
                            <div className="group rounded-2xlborder-[#CFE5DC] col-span-full flex h-[380px] flex-col items-center justify-center">
                              <p className="mt-4 text-base font-semibold text-slate-800">
                                Drafts Empty
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                No Drafts Found.
                              </p>
                            </div>
                          ) : (
                            drafts.map((doc) => (
                              <div
                                key={doc._id}
                                onClick={() => navigate(`/edit/${doc._id}`)}
                                className="group relative flex h-[380px] flex-col overflow-hidden rounded-2xl bg-[#EEF5F1] transition hover:cursor-pointer hover:shadow-lg"
                              >
                                {/* PREVIEW IMAGE */}
                                <div className="relative flex-1 overflow-hidden">
                                  {renderTemplatePreviewCard(
                                    doc.resumeType,
                                    doc.color,
                                  )}
                                </div>

                                {/* COMPLETION BAR */}
                                <div
                                  className={`${doc.completion === 100 ? "hidden" : "block"} absolute right-0 bottom-0 left-0 h-1 bg-slate-200`}
                                >
                                  <div
                                    className="h-full transition-all duration-300"
                                    style={{
                                      width: `${doc.completion || 0}%`,
                                      backgroundColor:
                                        doc.completion >= 80
                                          ? "#16a34a" // green
                                          : doc.completion >= 40
                                            ? "#f59e0b" // amber
                                            : "#dc2626", // red
                                    }}
                                  />
                                </div>

                                {/* Menu */}
                                <div className="absolute top-3 right-3">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpen(
                                        open === doc._id ? null : doc._id,
                                      );
                                    }}
                                    className="rounded-lg bg-white/90 p-2 shadow hover:bg-slate-100"
                                  >
                                    <MoreVertical size={16} />
                                  </button>

                                  {open === doc._id && (
                                    <div
                                      onClick={(e) => e.stopPropagation()}
                                      className="absolute right-0 mt-2 w-32 rounded-xl border-0 bg-white shadow-lg"
                                    >
                                      <button
                                        onClick={() =>
                                          deleteResume(doc._id, true)
                                        }
                                        className="flex w-full gap-2 rounded-xl px-4 py-2 text-sm text-red-600 hover:cursor-pointer hover:bg-red-50"
                                      >
                                        <Trash size={14} />
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>

                                {/* BOTTOM INFO */}
                                <div className="border-t border-slate-200 p-4">
                                  <div className="mb-2 flex items-start justify-between gap-2">
                                    <h5
                                      className="max-w-[160px] truncate font-semibold text-slate-800"
                                      title={doc.resumeTitle || "Untitled"}
                                    >
                                      {doc.resumeTitle || "Untitled"}
                                    </h5>

                                    <span className="shrink-0 rounded-full bg-[#E6F0EC] px-3 py-1 text-xs font-medium text-[#183D3D]">
                                      {doc.resumeType || "Type"}
                                    </span>
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-xs tracking-wide text-slate-500 uppercase">
                                        Modified
                                      </p>
                                      <p className="text-sm text-slate-700">
                                        {new Date(
                                          doc.updatedAt,
                                        ).toLocaleDateString("en-IN", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              </motion.div>
            )}

            {activeTab === "templates" && (
              <motion.div
                key="templates"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <>
                  {/* ================= TEMPLATES SECTION ================= */}
                  <section className="bg-white/30 backdrop-blur-md">
                    <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
                      <div className="relative z-10 mx-auto max-w-7xl px-6 py-0">
                        <p className="mb-4 text-xl font-bold text-[#183D3D]">
                          Create a New Resume from Existing Templates{" "}
                        </p>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {/* CREATE RESUME CARD */}
                          {RESUME_TEMPLATES.map((tpl) => (
                            <div
                              key={tpl.id}
                              onClick={() =>
                                navigate(`/create?type=${tpl.name}`)
                              }
                              className="group relative flex h-[380px] flex-col overflow-hidden rounded-2xl bg-[#EEF5F1] transition hover:cursor-pointer hover:shadow-lg"
                            >
                              {/* PREVIEW IMAGE (SAME AS RESUME CARD) */}
                              <div className="relative flex-1 overflow-hidden">
                                {renderTemplatePreviewCard(tpl.name, "#183D3D")}
                              </div>

                              {/* BOTTOM INFO (SAME STRUCTURE) */}
                              <div className="border-t border-slate-200 p-4">
                                <div className="mb-2 flex items-start justify-between gap-2">
                                  <h5 className="font-semibold text-slate-800">
                                    {tpl.name}
                                  </h5>

                                  <span className="rounded-full bg-[#E6F0EC] px-3 py-1 text-xs font-medium text-[#183D3D]">
                                    Template
                                  </span>
                                </div>

                                <div>
                                  <p className="text-xs tracking-wide text-slate-500 uppercase">
                                    Start from
                                  </p>
                                  <p className="text-sm text-slate-700">
                                    Blank resume
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================= FOOTER ================= */}
          <div className="mt-18">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
