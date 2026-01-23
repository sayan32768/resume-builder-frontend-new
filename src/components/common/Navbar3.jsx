import { Link } from "react-router-dom";

export default function Navbar3() {
  return (
    <header className="w-full">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* LEFT: LOGO */}
        <a href="/home">
          <div className="flex items-center gap-16">
            <span className="text-2xl font-semibold text-[#183D3D]">
              Resume.
            </span>
          </div>
        </a>

        {/* CENTER: LINKS (optional) */}
        {/* <div className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <Link to="#" className="hover:text-slate-900">
            Features
          </Link>
          <Link to="#" className="hover:text-slate-900">
            Pricing
          </Link>
          <Link to="#" className="hover:text-slate-900">
            About
          </Link>
        </div> */}

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-4">
          {/* <Link
            to="/login"
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Sign in
          </Link> */}

          <Link
            to="/home"
            className="rounded-full bg-[#183D3D] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 max-md:hidden"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
