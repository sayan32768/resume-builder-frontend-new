import React from "react";
import previewImg from "../../assets/resume.webp";

const Hero = () => {
  return (
    <div className="mx-auto h-full max-w-7xl px-12">
      <div className="grid h-full gap-12 max-lg:grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <a href="/home">
              <span className="text-sm font-medium tracking-wide text-[#183D3D]">
                TRY IT NOW!
              </span>
            </a>

            <h1 className="">
              <span className="font-semibold tracking-tight text-slate-900 max-lg:text-7xl lg:text-7xl">
                Change the way <br />
                you craft your{" "}
              </span>
              <span
                style={{ fontFamily: '"Playfair Display", serif' }}
                className="text-7xl font-normal text-slate-900 italic"
              >
                resume
              </span>
            </h1>
          </div>

          <p className="max-w-md text-slate-600">
            From your first draft to your final submission, our resume builder
            helps you showcase your skills, experience, and potential with
            confidence.
          </p>

          <div className="mt-4 flex items-center gap-6">
            <a href="/home">
              <div className="rounded-full bg-[#183D3D] px-6 py-3 font-medium text-white max-lg:text-sm">
                Get Started Now
              </div>
            </a>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-500">★★★★★</span>
                <span className="font-medium">5.0</span>
              </div>
              <span className="text-slate-500">from 120+ reviews</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE GRID */}
        <div className="h-[520px] w-full">
          <div className="grid h-full grid-cols-2 grid-rows-2 gap-0.5">
            {/* Top Left */}
            <div
              className="rounded-0 relative bg-cover bg-center"
              style={{ backgroundImage: `url(${previewImg})` }}
            >
              <div className="absolute inset-0 bg-[#183D3D]/20" />
            </div>

            {/* Top Right */}
            <div className="flex flex-col justify-between rounded-l-[10rem] bg-[#ECECDC] p-10">
              <div className="">
                <h3 className="text-right font-semibold text-[#183D3D] max-md:text-xl md:text-5xl">
                  1+
                </h3>
                <p className="max-md:text-m mt-1 text-slate-600 md:text-xl">
                  Resume Templates
                </p>
              </div>

              <div className="flex items-end gap-1 self-end">
                <div className="h-10 w-7 rounded bg-[#F3F7F5] shadow-sm" />
                <div className="h-12 w-8 rounded bg-[#F3F7F5] shadow-md" />
                <div className="h-14 w-9 rounded bg-[#F3F7F5] shadow-lg" />
              </div>
            </div>

            {/* Bottom Left */}
            <div className="flex flex-col justify-between rounded-tr-[10rem] bg-[#E4EFEA] p-6">
              <div className="flex flex-row">
                <div className="flex gap-1 text-emerald-800 max-md:text-3xl md:text-7xl">
                  ✦
                </div>
                <div className="flex gap-1 text-emerald-800/60 max-md:text-3xl md:text-7xl">
                  ✦
                </div>
              </div>

              <p className="max-md:text-m mb-2 text-right text-slate-600 md:text-xl">
                Resumes Created
              </p>

              <div className="flex -space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C7D7FF] bg-[#EAF2FF] text-xs font-medium text-[#2F5FE3]">
                  JD
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F6C1CC] bg-[#FDECEF] text-xs font-medium text-[#C2416C]">
                  AK
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4CCFF] bg-[#EEE9FF] text-xs font-medium text-[#5B4BC7]">
                  SM
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#183D3D] text-sm text-white shadow-sm">
                  ↗
                </div>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="rounded-0 flex flex-col justify-between bg-[#183D3D] p-6 text-white">
              <div className="flex justify-between">
                <h3 className="font-semibold max-md:text-xl md:text-3xl">
                  95%
                </h3>
                <p className="text-2xl">↑</p>
              </div>

              <div className="relative h-16 w-full border-b border-l border-white opacity-70">
                <div className="relative h-16 w-full border-b border-l border-white/40">
                  <svg
                    viewBox="0 0 100 40"
                    className="absolute inset-0 h-full w-full"
                    fill="none"
                  >
                    {/* Line graph */}
                    <path
                      d="M0 30 L20 26 L40 22 L60 18 L80 10 L100 6"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />

                    {/* End dot */}
                    <circle cx="100" cy="6" r="2.5" fill="white" />
                  </svg>
                </div>
              </div>

              <p className="max-md:text-m text-right md:text-xl">ATS Match</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
