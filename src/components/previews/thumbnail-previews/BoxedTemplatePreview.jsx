import React from "react";

const BoxedTemplatePreview = ({ color = "#111827", variant = "card" }) => {
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
          opacity: 0.08,
        }}
      />

      {/* Floating resume frame */}
      <div className="absolute inset-x-5 top-5 bottom-5 overflow-hidden rounded-md bg-white shadow-lg">
        <div className="flex h-full">
          {/* LEFT SIDEBAR */}
          <div className="w-1/3 bg-slate-100 p-3">
            <div className="mb-3 h-2 w-20 rounded bg-slate-400" />

            <div className="mb-4 space-y-2">
              <Line />
              <Line w="w-4/5" />
              <Line w="w-3/5" />
            </div>

            <div className="space-y-2">
              <Line w="w-5/6" />
              <Line w="w-4/6" />
              <Line w="w-3/6" />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 p-4">
            {/* BOXED HEADER */}
            <div
              className="mx-auto mb-4 h-6 w-44 rounded border-2"
              style={{ borderColor: color }}
            />

            {/* Profile */}
            <div className="mb-4 space-y-2">
              <Line />
              <Line w="w-5/6" />
            </div>

            {/* SECTION */}
            <Section>
              <Line w="w-28" />
              <Line />
              <Line w="w-5/6" />
            </Section>

            <Section>
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

const Section = ({ children }) => (
  <div className="mb-4 space-y-2">{children}</div>
);

const Line = ({ w = "w-full" }) => (
  <div className={`h-2 rounded bg-slate-200 ${w}`} />
);

export default BoxedTemplatePreview;
