import darkGreen from "../../../src/assets/green.png";

export default function StatsSection() {
  return (
    <section
      style={{
        backgroundImage: `url(${darkGreen})`,
      }}
      className="relative w-full bg-cover bg-center py-24 text-white"
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* LEFT STATS */}
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-7xl font-semibold">1M+</h3>
              <p className="mt-2 text-xl opacity-80">Resumes created</p>
            </div>

            <div>
              <h3 className="text-7xl font-semibold">95%</h3>
              <p className="mt-2 text-xl opacity-80">ATS success rate</p>
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div>
            <span className="tracking-widest opacity-80">NUMBERS</span>

            <h2 className="mt-4 text-5xl leading-tight font-semibold">
              Built to help you <br /> get hired faster
            </h2>
          </div>
        </div>
      </div>
    </section>

    // <section className="w-full bg-[#183D3D] py-24 text-white">
    //   <div className="mx-auto max-w-7xl px-6">
    //     <div className="grid items-center gap-12 md:grid-cols-2">
    //       {/* LEFT STATS */}
    //       <div className="grid grid-cols-2 gap-12">
    //         <div>
    //           <h3 className="text-8xl font-semibold">1M+</h3>
    //           <p className="mt-2 text-xl opacity-80">Resumes created</p>
    //         </div>

    //         <div>
    //           <h3 className="text-8xl font-semibold">95%</h3>
    //           <p className="mt-2 text-xl opacity-80">ATS success rate</p>
    //         </div>
    //       </div>

    //       {/* RIGHT TEXT */}
    //       <div>
    //         <span className="tracking-widest opacity-80">NUMBERS</span>

    //         <h2 className="mt-4 text-5xl leading-tight font-semibold">
    //           Built to help you <br /> get hired faster
    //         </h2>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
