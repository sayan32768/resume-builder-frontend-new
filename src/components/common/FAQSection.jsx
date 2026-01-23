import { useState } from "react";

const faqs = [
  {
    question: "How does the resume builder work?",
    answer:
      "You simply choose a template, enter your details, and our builder formats everything professionally and automatically.",
  },
  {
    question: "Are the resumes ATS-friendly?",
    answer:
      "Yes. All resumes are optimized to pass Applicant Tracking Systems used by recruiters.",
  },
  {
    question: "Can I edit my resume after downloading?",
    answer:
      "Absolutely. You can edit and update your resume anytime from your dashboard.",
  },
  {
    question: "Do you support different job roles?",
    answer:
      "Yes. We provide templates and suggestions tailored to students, professionals, developers, and more.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your data is encrypted and securely stored. We never share your information with third parties.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <section className="w-full py-0">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-2">
          {/* LEFT */}
          <div>
            <span className="text-sm font-medium tracking-widest text-emerald-700">
              FAQ
            </span>

            <h2 className="mt-4 text-5xl leading-tight font-semibold text-slate-900">
              Frequently asked <br /> questions
            </h2>
          </div>

          {/* RIGHT */}
          <div className="divide-y text-slate-300">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-lg font-medium text-slate-900">
                    {faq.question}
                  </span>

                  <span className="text-2xl text-slate-500">
                    {openIndex === index ? "×" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <p className="mt-4 max-w-md text-slate-500">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
