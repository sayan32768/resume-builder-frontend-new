import React from "react";

const CharmTemplatePreview = ({ color = "#8F9B8F", variant = "card" }) => {
  const size =
    variant === "thumbnail"
      ? { width: 470, height: 320 }
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
          {/* LEFT SIDEBAR (Charm green panel) */}
          <div
            className="flex w-[38%] flex-col gap-3 p-3"
            style={{ backgroundColor: color }}
          >
            <div className="h-3 w-20 rounded bg-white/70" />

            <div className="space-y-2">
              <div className="h-2 w-full rounded bg-white/30" />
              <div className="h-2 w-5/6 rounded bg-white/30" />
              <div className="h-2 w-4/6 rounded bg-white/30" />
            </div>

            <div className="mt-2 space-y-2">
              <div className="h-2 w-3/4 rounded bg-white/30" />
              <div className="h-2 w-2/3 rounded bg-white/30" />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-1 flex-col">
            {/* Header band */}
            <div className="bg-[#ECECE5] px-4 py-3">
              <div className="h-3 w-40 rounded bg-slate-400" />
              <div className="mt-2 h-2 w-28 rounded bg-slate-300" />
            </div>

            {/* Body */}
            <div className="flex-1 space-y-4 p-4">
              {/* Experience block */}
              <Section color={color}>
                <Line w="w-32" />
                <Line />
                <Line w="w-5/6" />
              </Section>

              {/* Projects block */}
              <Section color={color}>
                <Line w="w-40" />
                <Line w="w-4/6" />
              </Section>

              {/* Education block */}
              <Section color={color}>
                <Line w="w-28" />
                <Line w="w-3/4" />
              </Section>
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

export default CharmTemplatePreview;
