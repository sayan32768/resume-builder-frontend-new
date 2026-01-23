export default function LogoCloud() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl border-y border-slate-200 px-10 py-10">
        {/* Trusted by label */}
        <p className="mb-8 text-center text-sm font-medium tracking-widest text-[#183D3D]">
          TRUSTED BY 20+ PARTNERS INCLUDING
        </p>

        {/* Logos */}
        <div className="flex flex-wrap items-center justify-between gap-8">
          <span className="text-lg font-bold tracking-wider text-[#183D3D] transition hover:opacity-80">
            Stripe
          </span>
          <span className="text-lg font-bold tracking-wider text-[#183D3D] transition hover:opacity-80">
            Shopify
          </span>
          <span className="text-lg font-bold tracking-wider text-[#183D3D] transition hover:opacity-80">
            Netflix
          </span>
          <span className="text-lg font-bold tracking-wider text-[#183D3D] transition hover:opacity-80">
            Slack
          </span>
          <span className="text-lg font-bold tracking-wider text-[#183D3D] transition hover:opacity-80">
            Airbnb
          </span>
        </div>
      </div>
    </section>
  );
}
