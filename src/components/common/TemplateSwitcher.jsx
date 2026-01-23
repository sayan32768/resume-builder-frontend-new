import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const TemplateSwitcher = ({ templates, activeTemplate, onChange, color }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 🔹 Find active template object by id
  const active = templates.find((t) => t.name === activeTemplate);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-[#183D3D] hover:bg-[#183D3D]/5"
      >
        <span>{active?.name || "Switch Template"}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute -left-[240px] z-50 mt-2 w-[420px] rounded-2xl border border-slate-200 bg-white shadow-xl">
          <ul className="space-y-1 p-2">
            {templates.map((template) => {
              const Preview = template.Preview;

              return (
                <li key={template.name}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(template.name);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-[#183D3D]/5 ${
                      activeTemplate === template.name ? "bg-[#183D3D]/10" : ""
                    }`}
                  >
                    {/* JSX Thumbnail */}
                    <div className="flex h-[90px] w-[128px] items-center justify-center overflow-hidden rounded-md bg-[#183D3D]/20">
                      <div
                        className="pointer-events-none"
                        style={{
                          width: 450,
                          height: 318,
                          transform: "scale(0.28)",
                          transformOrigin: "center",
                        }}
                      >
                        <Preview variant="thumbnail" color={color} />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-800">
                        {template.name}
                      </span>
                      {template.description && (
                        <span className="text-xs text-slate-500">
                          {template.description}
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TemplateSwitcher;
