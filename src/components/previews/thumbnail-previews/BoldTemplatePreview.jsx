import React from "react";

const BoldTemplatePreview = ({ color = "#f14d34", variant = "card" }) => {
  const size =
    variant === "thumbnail"
      ? { width: 455, height: 320 }
      : { width: "100%", height: "100%" };

  return (
    <div className="relative overflow-hidden rounded-t-xl" style={size}>
      {/* Soft tinted background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: color,
          opacity: 0.12,
        }}
      />

      {/* Floating resume frame */}
      <div className="absolute inset-x-5 top-5 bottom-5 overflow-hidden rounded-md bg-white shadow-lg">
        <div className="flex h-full">
          {/* LEFT ACCENT STRIP */}
          <div className="w-[40px]" style={{ backgroundColor: color }} />

          {/* MAIN CONTENT */}
          <div className="flex-1 p-4">
            {/* Name */}
            <div className="mb-3 h-4 w-48 rounded bg-slate-900" />

            {/* Contact row */}
            <div className="mb-4 flex gap-2">
              <div className="h-2 w-20 rounded bg-slate-300" />
              <div className="h-2 w-16 rounded bg-slate-300" />
              <div className="h-2 w-24 rounded bg-slate-300" />
            </div>

            {/* Summary */}
            <div className="mb-4 space-y-2">
              <div className="h-2 w-full rounded bg-slate-200" />
              <div className="h-2 w-5/6 rounded bg-slate-200" />
            </div>

            {/* EXPERIENCE */}
            <Section titleColor={color}>
              <Line w="w-28" />
              <Line />
              <Line w="w-5/6" />
            </Section>

            {/* PROJECTS */}
            <Section titleColor={color}>
              <Line w="w-32" />
              <Line w="w-4/6" />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- helpers ---------- */

const Section = ({ children, titleColor }) => (
  <div className="mb-4">
    <div
      className="mb-2 h-2 w-24 rounded"
      style={{ backgroundColor: titleColor, opacity: 0.85 }}
    />
    <div className="space-y-2">{children}</div>
  </div>
);

const Line = ({ w = "w-full" }) => (
  <div className={`h-2 rounded bg-slate-200 ${w}`} />
);

export default BoldTemplatePreview;
