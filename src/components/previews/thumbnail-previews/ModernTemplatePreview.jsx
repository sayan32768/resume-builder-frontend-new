const ModernTemplatePreview = ({ color = "#183D3D", variant = "card" }) => {
  const size =
    variant === "thumbnail"
      ? { width: 465, height: 322 }
      : { width: "100%", height: "100%" };

  return (
    <div className="relative overflow-hidden rounded-t-xl" style={size}>
      {/* Tinted background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: color,
          opacity: 0.08,
        }}
      />

      {/* Content */}
      <div className="absolute inset-x-5 top-5 bottom-5 rounded-md bg-white shadow-lg">
        {/* Header */}
        <div className="px-4 pt-4">
          <div
            className="h-3 w-32 rounded"
            style={{ backgroundColor: color }}
          />
          <div className="mt-2 h-2 w-40 rounded bg-slate-300" />
        </div>

        {/* Divider */}
        <div
          className="mx-4 my-3 h-px"
          style={{ backgroundColor: color, opacity: 0.35 }}
        />

        {/* Body */}
        <div className="grid grid-cols-[1fr_2fr] gap-3 px-4">
          <div className="space-y-2">
            <div className="h-2 w-full rounded bg-slate-200" />
            <div className="h-2 w-4/5 rounded bg-slate-200" />
            <div className="h-2 w-3/5 rounded bg-slate-200" />
          </div>

          <div className="space-y-2">
            <div className="h-2 w-full rounded bg-slate-300" />
            <div className="h-2 w-5/6 rounded bg-slate-300" />
            <div className="h-2 w-4/6 rounded bg-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplatePreview;
