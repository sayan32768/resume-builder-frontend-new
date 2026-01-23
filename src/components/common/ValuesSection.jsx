export default function ValuesSection() {
  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* TOP TEXT ROW */}
        <div className="mb-16 grid items-start max-lg:gap-0 max-md:grid-cols-1 md:grid-cols-2 lg:gap-12">
          <div>
            <span className="text-sm font-medium tracking-widest text-emerald-700">
              VALUES
            </span>

            <h2 className="mt-4 text-5xl leading-tight font-semibold text-slate-900">
              Build resumes <br /> that work
            </h2>
          </div>

          <p className="max-w-md pt-10 text-slate-500">
            Everything we build is designed to help you present your skills
            clearly, professionally, and in a way recruiters expect.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid gap-3 max-lg:grid-cols-2 lg:grid-cols-3">
          {/* CARD 1 */}
          <div className="flex min-h-[320px] flex-col justify-between border border-slate-200 p-8">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border">
                ◯
              </div>

              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Clarity & Transparency
              </h3>

              <p className="text-slate-500">
                Clear sections, readable layouts, and no hidden formatting — so
                recruiters see exactly what matters.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border">
              ↗
            </div>
          </div>

          {/* CARD 2 */}
          <div className="flex min-h-[320px] flex-col justify-between border border-slate-200 p-8">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border">
                ◇
              </div>

              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Smart Resume Design
              </h3>

              <p className="text-slate-500">
                Professionally designed templates that balance creativity with
                recruiter-friendly structure.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border">
              ↗
            </div>
          </div>

          {/* CARD 3 (HIGHLIGHT) */}
          <div className="flex min-h-[320px] flex-col justify-between rounded-tr-[120px] bg-[#ECE9D9] p-8">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-slate-600">
                ◎
              </div>

              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                ATS Optimization
              </h3>

              <p className="text-slate-600">
                Every resume is built to pass Applicant Tracking Systems,
                ensuring your profile reaches real recruiters.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#183D3D] text-white">
              ↗
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
