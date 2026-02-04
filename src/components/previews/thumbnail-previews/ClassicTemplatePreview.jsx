const ClassicTemplatePreview = ({ color = "#183D3D", variant = "card" }) => {
  const size =
    variant === "thumbnail"
      ? { width: 450, height: 320 }
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

      {/* Floating resume */}
      <div className="absolute inset-x-5 top-5 bottom-5 flex overflow-hidden rounded-md bg-white shadow-lg">
        {/* Sidebar */}
        <div className="w-1/3 p-3" style={{ backgroundColor: color }}>
          <div className="mb-3 h-3 w-16 rounded bg-white/70" />
          <div className="space-y-2">
            <div className="h-2 w-full rounded bg-white/30" />
            <div className="h-2 w-4/5 rounded bg-white/30" />
            <div className="h-2 w-3/5 rounded bg-white/30" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          <div
            className="mb-2 h-3 w-40 rounded"
            style={{ backgroundColor: color, opacity: 0.85 }}
          />
          <div
            className="mb-3 h-px w-full"
            style={{ backgroundColor: color, opacity: 0.35 }}
          />

          <div className="space-y-2">
            <div className="h-2 w-full rounded bg-slate-200" />
            <div className="h-2 w-5/6 rounded bg-slate-200" />
            <div className="h-2 w-4/6 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplatePreview;
