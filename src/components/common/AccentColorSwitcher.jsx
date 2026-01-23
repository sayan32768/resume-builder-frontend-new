const AccentColorSwitcher = ({ colors, activeColor, changeColor }) => {
  // border border-white/60 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md
  return (
    <div className="flex items-center space-x-4 rounded-2xl py-3">
      <span className="text-sm font-medium text-slate-600">Accent</span>

      <div className="flex items-center space-x-3">
        {colors.map((c) => (
          <button
            type="button"
            key={c.name}
            title={c.name}
            onClick={() => changeColor(c.value)}
            className={`relative h-8 w-8 rounded-full transition-all hover:scale-110 focus:outline-none ${
              activeColor === c.value
                ? "ring-2 ring-[#183D3D] ring-offset-2"
                : "ring-1 ring-slate-300"
            }`}
            style={{ backgroundColor: c.value }}
          ></button>
        ))}
      </div>
    </div>
    // <div className="w-full bg-amber-100"></div>
  );
};

export default AccentColorSwitcher;
