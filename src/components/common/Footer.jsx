import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full py-10 text-slate-700 max-md:px-6 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row">
        <div className="flex flex-col gap-10">
          <h2 className="text-5xl font-bold text-[#183D3D]">Resume.</h2>
          <p className="max-w-sm text-slate-600">
            Create stunning, professional resumes effortlessly. Build, preview,
            and download your perfect resume — all in one place.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-slate-900">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="transition hover:text-[#183D3D]">
                Home
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-slate-900">Follow Us</h3>
          <div className="flex gap-4 text-xl text-slate-600">
            <a href="#" className="transition hover:text-[#183D3D]">
              <FaGithub />
            </a>
            <a href="#" className="transition hover:text-[#183D3D]">
              <FaLinkedin />
            </a>
            <a href="#" className="transition hover:text-[#183D3D]">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="mb-3 font-semibold text-slate-900">Newsletter</h3>
          <p className="mb-3 max-w-xs text-slate-600">
            Subscribe to get the latest updates and resume tips.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-l-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
            <button
              type="submit"
              onClick={(e) => e.preventDefault()}
              className="rounded-r-xl bg-[#183D3D] px-4 text-white transition hover:bg-[#145252]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-300 pt-4 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} Resume. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
