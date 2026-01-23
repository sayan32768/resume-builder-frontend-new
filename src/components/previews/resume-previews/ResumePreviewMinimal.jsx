import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const ResumePreviewMinimal = ({ color }) => {
  const { control } = useFormContext();
  const data = useWatch({ control });

  const personal = data?.personalDetails || {};
  const education = data?.educationDetails || [];
  const skills = data?.skills || [];
  const experience = data?.professionalExperience || [];
  const otherExp = data?.otherExperience || [];
  const projects = data?.projects || [];
  const certifications = data?.certifications || [];

  return (
    <div className="resume-minimal">
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

.resume-minimal {
  width: 210mm;
  height: 297mm;
  padding: 44px 48px;
  font-family: "Inter", system-ui, sans-serif;
  color: #111827;
  background: white;
}

/* ================= HEADER ================= */
.min-header {
  text-align: center;
  margin-bottom: 28px;
}

.min-header h1 {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0;
}

.min-header .subtitle {
  margin-top: 10px;
  font-size: 13px;
  color: #4b5563;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* CONTACT ROW */
.min-contact {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 22px;
  font-size: 11px;
  color: #374151;
}

/* HAIRLINE DIVIDER UNDER HEADER */
.min-divider {
  margin: 28px 0 20px;
  height: 1px;
  background: #e5e7eb;
}

/* ================= SECTION TITLE ================= */
.min-title {
  margin-top: 26px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${color};
}

.min-title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

/* ================= BLOCK TEXT ================= */
.min-block {
  font-size: 12px;
  line-height: 1.65;
  color: #374151;
  margin-bottom: 14px;
}

/* ================= EXPERIENCE ================= */
.min-exp {
  margin-bottom: 18px;
}

.min-exp .role {
  font-weight: 600;
  font-size: 13px;
  color: #111827;
}

.min-exp .meta {
  font-size: 11px;
  color: #6b7280;
  margin-top: 2px;
}

.min-exp .desc {
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.6;
  color: #374151;
}

/* ================= SKILLS ================= */
.min-skills {
  font-size: 12px;
  color: #374151;
  line-height: 1.7;
}

.min-skills span:not(:last-child)::after {
  content: " · ";
  color: #9ca3af;
}

/* ================= LINKS ================= */
.min-link {
  display: inline-block;
  margin-top: 4px;
  color: ${color};
  text-decoration: underline;
  font-size: 11px;
}
      `}</style>

      {/* ================= HEADER ================= */}
      <div className="min-header">
        <h1>{personal.fullName || "-"}</h1>

        {personal.about && <p className="subtitle">{personal.about}</p>}

        <div className="min-contact">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
          {personal.socials?.map((s, i) => (
            <span key={i}>
              {s.name}: {s.link || "-"}
            </span>
          ))}
        </div>
      </div>

      <div className="min-divider" />

      {/* ================= EXPERIENCE ================= */}
      {experience.length > 0 && (
        <>
          <div className="min-title">Experience</div>
          {experience.map((exp, i) => (
            <div key={i} className="min-exp">
              <div className="role">{exp.position || "-"}</div>
              <div className="meta">
                {exp.companyName || "-"}
                {exp.companyAddress && ` · ${exp.companyAddress}`}
                {exp.dates?.startDate &&
                  ` · ${new Date(exp.dates.startDate).getFullYear()}${
                    exp.dates?.endDate
                      ? "–" + new Date(exp.dates.endDate).getFullYear()
                      : "–Present"
                  }`}
              </div>
              {exp.workDescription && (
                <div className="desc">{exp.workDescription}</div>
              )}
            </div>
          ))}
        </>
      )}

      {/* ================= PROJECTS ================= */}
      {projects.length > 0 && (
        <>
          <div className="min-title">Projects</div>
          {projects.map((p, i) => (
            <div key={i} className="min-exp">
              <div className="role">{p.title || p.name || "-"}</div>
              {p.description && <div className="desc">{p.description}</div>}
              {p.extraDetails && <div className="desc">{p.extraDetails}</div>}
              {p.links?.map((l, idx) => (
                <a
                  key={idx}
                  href={l.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-link"
                >
                  {l.link}
                </a>
              ))}
            </div>
          ))}
        </>
      )}

      {/* ================= EDUCATION ================= */}
      {education.length > 0 && (
        <>
          <div className="min-title">Education</div>
          {education.map((edu, i) => (
            <div key={i} className="min-exp">
              <div className="role">
                {edu.degree || ""}
                {edu.degree && edu.name ? " · " : ""}
                {edu.name || ""}
              </div>
              <div className="meta">
                {edu.location}
                {edu.dates?.startDate &&
                  ` · ${new Date(edu.dates.startDate).getFullYear()}${
                    edu.dates?.endDate
                      ? "–" + new Date(edu.dates.endDate).getFullYear()
                      : "–Present"
                  }`}
              </div>
              {edu.grades?.score && (
                <div className="desc">
                  {edu.grades.type === "CGPA"
                    ? `CGPA: ${edu.grades.score}`
                    : `Percentage: ${edu.grades.score}%`}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* ================= SKILLS ================= */}
      {skills.length > 0 && (
        <>
          <div className="min-title">Skills</div>
          <div className="min-skills">
            {skills.map((s, i) => (
              <span key={i}>{s.skillName}</span>
            ))}
          </div>
        </>
      )}

      {/* ================= CERTIFICATIONS ================= */}
      {certifications.length > 0 && (
        <>
          <div className="min-title">Certifications</div>
          {certifications.map((c, i) => (
            <div key={i} className="min-exp">
              <div className="role">{c.title}</div>
              <div className="meta">
                {c.issuingAuthority}
                {c.issueDate && ` · ${new Date(c.issueDate).getFullYear()}`}
              </div>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-link"
                >
                  {c.link}
                </a>
              )}
            </div>
          ))}
        </>
      )}

      {/* ================= OTHER EXPERIENCE ================= */}
      {otherExp.length > 0 && (
        <>
          <div className="min-title">Other Experience</div>
          {otherExp.map((exp, i) => (
            <div key={i} className="min-exp">
              <div className="role">{exp.position || "-"}</div>
              <div className="meta">
                {exp.companyName || "-"}
                {exp.companyAddress && ` · ${exp.companyAddress}`}
              </div>
              {exp.workDescription && (
                <div className="desc">{exp.workDescription}</div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ResumePreviewMinimal;
