import React from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

const SlidingSidebar = ({ show, onClose, step, setStep }) => {
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

  const { trigger } = useFormContext();

  return (
    <>
      {/* Overlay */}
      {show && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 transform transition-transform duration-300 ${show ? "translate-x-0" : "-translate-x-full"} bg-[#F3F7F5] shadow-xl`}
      >
        <div className="flex h-full flex-col p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#183D3D]">
              Resume Sections
            </h2>
            <p className="text-sm text-slate-500">Jump between sections</p>
          </div>

          {/* Steps */}
          <ul className="flex flex-col gap-2">
            {stepNames.map((s, index) => {
              const isActive = step === s.id;
              const isCompleted = step > s.id;

              return (
                <li
                  key={s.id}
                  onClick={async (e) => {
                    e.preventDefault();

                    if (s.id <= step) {
                      setStep(s.id);
                      onClose();
                      return;
                    }

                    let id = s.id - 1;

                    for (let i = 0; i < s.id; i++) {
                      const isValid = await trigger(stepKeys[i]);
                      if (!isValid) {
                        toast.error("Please fill in all the necessary details");
                        id = i;
                        break;
                      }
                    }

                    setStep(id + 1);
                    onClose();
                  }}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2 transition-all hover:cursor-pointer ${
                    isActive
                      ? "bg-[#183D3D] text-white shadow-sm"
                      : "hover:bg-[#E6F0EC]"
                  } `}
                >
                  {/* Indicator */}
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      isActive
                        ? "bg-white text-[#183D3D]"
                        : isCompleted
                          ? "bg-[#CFE5DC] text-[#183D3D]"
                          : "bg-[#E6F0EC] text-slate-500"
                    } `}
                  >
                    {s.id}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-sm font-medium ${
                      isActive
                        ? "text-white"
                        : "text-slate-700 group-hover:text-slate-900"
                    } `}
                  >
                    {s.title}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SlidingSidebar;
