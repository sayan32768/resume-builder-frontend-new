import React from "react";

const MinimalTemplatePreview = ({ color = "#183D3D", variant = "card" }) => {
  const size =
    variant === "thumbnail"
      ? { width: 440, height: 320 }
      : { width: "100%", height: "100%" };

  return (
    <div className="relative overflow-hidden rounded-t-xl" style={size}>
      {/* Tinted background (same as Classic) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: color,
          opacity: 0.08,
        }}
      />

      {/* Floating resume frame */}
      <div className="absolute inset-x-5 top-5 bottom-5 overflow-hidden rounded-md bg-white shadow-lg">
        {/* Resume content */}
        <div className="flex h-full flex-col px-6 pt-6">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-2 h-3 w-32 rounded bg-slate-300" />
            <div className="mx-auto h-2 w-40 rounded bg-slate-200" />

            <div className="mt-3 flex justify-center gap-3">
              <div className="h-2 w-16 rounded bg-slate-200" />
              <div className="h-2 w-16 rounded bg-slate-200" />
              <div className="h-2 w-20 rounded bg-slate-200" />
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-slate-200" />

          {/* Body */}
          <div className="flex-1 space-y-5">
            {/* Experience */}
            <Section color={color}>
              <Line w="w-28" />
              <Line />
              <Line w="w-5/6" />
            </Section>

            {/* Projects */}
            <Section color={color}>
              <Line w="w-32" />
              <Line />
            </Section>

            {/* Education */}
            <Section color={color}>
              <Line w="w-40" />
              <Line w="w-4/6" />
            </Section>

            {/* Skills */}
            <div>
              <div
                className="mb-2 h-2 w-20 rounded"
                style={{ backgroundColor: color, opacity: 0.7 }}
              />
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-2 w-10 rounded bg-slate-200" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- helpers ---------- */

const Section = ({ children, color }) => (
  <div>
    <div
      className="mb-2 h-2 w-24 rounded"
      style={{ backgroundColor: color, opacity: 0.7 }}
    />
    <div className="space-y-2">{children}</div>
  </div>
);

const Line = ({ w = "w-full" }) => (
  <div className={`h-2 rounded bg-slate-200 ${w}`} />
);

export default MinimalTemplatePreview;
