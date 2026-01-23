export default function AboutSection() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADING */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-medium tracking-widest text-emerald-700">
            ABOUT US
          </span>

          <h2 className="mt-4 text-5xl leading-tight font-semibold text-slate-900">
            One platform for every <br /> stage of your career
          </h2>

          <p className="mt-4 text-slate-500">
            Build, refine, and optimize your resume with tools designed to help
            you stand out and get hired faster.
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid items-stretch gap-2 max-md:grid-cols-1 md:grid-cols-3">
          {/* LEFT CARD */}
          <div className="flex min-h-[420px] flex-col bg-[#183D3D] p-8 text-white md:col-span-1">
            <h3 className="text-3xl leading-snug font-semibold">
              Build resumes <br /> faster
            </h3>

            {/* Centering zone */}
            <div className="flex flex-1 items-center justify-center">
              <div className="relative h-64 w-64">
                <svg viewBox="0 0 36 36" className="h-full w-full">
                  {/* Background circle */}
                  <path
                    d="M18 2
             a 16 16 0 1 1 0 32
             a 16 16 0 1 1 0 -32"
                    fill="none"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="2"
                  />

                  {/* Progress */}
                  <path
                    d="M18 2
             a 16 16 0 1 1 0 32"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeDasharray="75, 100"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-semibold">10</span>
                  <span className="text-2xl opacity-80">min</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative min-h-[420px] overflow-hidden rounded-bl-[9rem] bg-[#E6F0EC] p-8 md:col-span-2">
            <h3 className="mb-6 text-3xl font-semibold text-slate-900">
              Apply across the globe
            </h3>

            {/* Decorative circles */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="h-[300px] w-[300px] rounded-full border" />
            </div>

            {/* Floating cards */}
            <div className="relative z-10 mt-12 flex items-start justify-between">
              {/* Left floating card */}
              <div className="w-40 rounded-xl bg-white p-4 shadow-md">
                <img
                  src="/src/assets/resume-smol.jpg"
                  alt="Resume preview"
                  className="mb-2 h-16 w-full rounded object-cover"
                />

                <p className="font-semibold">ATS Ready</p>
                <p className="text-sm text-slate-500">Optimized format</p>
              </div>

              {/* Center icon */}
              {/* Center globe (SVG based) */}
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-slate-400">
                <svg viewBox="0 0 100 100" className="h-28 w-28" fill="none">
                  {/* Outer circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    stroke="#183D3D"
                    strokeOpacity="0.3"
                    strokeWidth="1"
                  />

                  {/* Latitude lines */}
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="30"
                    ry="12"
                    stroke="#183D3D"
                    strokeOpacity="0.25"
                    strokeWidth="1"
                  />
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="30"
                    ry="22"
                    stroke="#183D3D"
                    strokeOpacity="0.25"
                    strokeWidth="1"
                  />

                  {/* Longitude lines */}
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="12"
                    ry="30"
                    stroke="#183D3D"
                    strokeOpacity="0.25"
                    strokeWidth="1"
                  />
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="22"
                    ry="30"
                    stroke="#183D3D"
                    strokeOpacity="0.25"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Right floating card */}
              <div className="w-40 rounded-xl bg-[#506F68] p-4 text-xl text-white shadow-md">
                <p className="font-semibold">3x</p>
                <p className="text-sm opacity-80">More Interview Calls</p>
              </div>
            </div>

            {/* Countries */}
            {/* Global reach indicator */}
            <div className="absolute right-8 bottom-6 flex items-center gap-3 text-sm text-[#183D3D]">
              <span className="font-medium">Global Reach</span>
              <div className="flex gap-2">
                <span className="rounded-full bg-white px-3 py-1 shadow-sm">
                  US
                </span>
                <span className="rounded-full bg-white px-3 py-1 shadow-sm">
                  EU
                </span>
                <span className="rounded-full bg-white px-3 py-1 shadow-sm">
                  APAC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
