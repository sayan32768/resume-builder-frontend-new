import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";

const ResumePreviewBold = ({ color = "#f14d34" }) => {
  // Default to the orange-red from image
  const { control } = useFormContext();
  const data = useWatch({ control });

  const personal = data?.personalDetails || {};
  const education = data?.educationDetails || [];
  const experience = data?.professionalExperience || [];
  const projects = data?.projects || [];
  const otherExp = data?.otherExperience || [];
  const certifications = data?.certifications || [];
  const skills = data?.skills || [];

  const formatDateRange = (dates) => {
    if (!dates) return "";
    const { startDate, endDate } = dates;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (start && end && !isNaN(start) && !isNaN(end))
      return `${start.getFullYear()} - ${end.getFullYear()}`;
    if (start && !isNaN(start)) return `${start.getFullYear()} - Present`;
    if (end && !isNaN(end)) return `Ended ${end.getFullYear()}`;
    return "";
  };

  return (
    <div className="resume-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
        
        .resume-container {
          display: flex;
          width: 210mm;
          height: 297mm;
          background-color: #ffffff;
          overflow: hidden;
          box-sizing: border-box;
          font-family: 'Roboto', sans-serif;
          color: #222;
        }

        /* The Left Colored Strip */
        .accent-strip {
          width: 55px; /* Fixed width strip */
          height: 100%;
          background-color: ${color};
          flex-shrink: 0;
        }

        /* Main Content Area */
        .content-area {
          flex-grow: 1;
          padding: 40px 45px;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .header-name {
          font-size: 48px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1;
          color: #000;
          margin-bottom: 15px;
        }

        .contact-line {
          font-size: 13px;
          font-weight: 700;
          color: #000;
          margin-bottom: 25px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
        }
        
        .contact-separator {
           margin: 0 4px;
        }

        .profile-summary {
          font-size: 13px;
          line-height: 1.5;
          color: #444;
          margin-bottom: 30px;
          text-align: justify;
        }

        /* Sections */
        .section-block {
          margin-bottom: 25px;
        }

        .section-heading {
          font-size: 18px;
          font-weight: 700;
          text-transform: uppercase;
          color: #000;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
        }

        /* Experience / Entries */
        .entry-block {
          margin-bottom: 18px;
        }

        .entry-date {
          font-weight: 700;
          font-size: 13px;
          color: #000;
          margin-bottom: 2px;
        }

        .entry-header {
          font-size: 13px;
          color: #000;
          margin-bottom: 6px;
        }

        .entry-desc {
          font-size: 13px;
          line-height: 1.5;
          color: #444;
        }

        /* Lists within entries (like education bullets) */
        .entry-list {
          margin-top: 4px;
          padding-left: 18px;
          font-size: 13px;
          color: #444;
        }
        .entry-list li {
            margin-bottom: 2px;
        }

        /* Skills Grid */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 20px;
          row-gap: 4px;
        }
        
        .skill-item {
          font-size: 13px;
          color: #444;
          display: flex;
          align-items: center;
        }
        .skill-bullet {
           margin-right: 8px;
           font-size: 16px;
           line-height: 10px;
        }

        a {
            color: inherit;
            text-decoration: none;
        }
      `}</style>

      {/* Vertical Strip */}
      <div className="accent-strip"></div>

      {/* Main Content */}
      <div className="content-area">
        {/* Name */}
        <div className="header-name">{personal.fullName || "Your Name"}</div>

        {/* Contact Info Row */}
        <div className="contact-line">
          {personal.address && (
            <>
              <span>{personal.address}</span>
              <span className="contact-separator">|</span>
            </>
          )}
          <span>{personal.phone || "(555) 555-5555"}</span>
          <span className="contact-separator">|</span>
          <span>{personal.email || "email@example.com"}</span>

          {personal.socials?.map((s, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              <span className="contact-separator">|</span>
              <a href={s.link} target="_blank" rel="noopener noreferrer">
                {s.link ? s.link.replace(/^https?:\/\//, "") : s.name}
              </a>
            </span>
          ))}
        </div>

        {/* Summary */}
        {personal.about && (
          <div className="profile-summary">{personal.about}</div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="section-block">
            <div className="section-heading">Experience</div>
            {experience.map((exp, i) => (
              <div key={i} className="entry-block">
                <div className="entry-date">{formatDateRange(exp.dates)}</div>
                <div className="entry-header">
                  {exp.position || "Position"} | {exp.companyName || "Company"}{" "}
                  {exp.companyAddress && `| ${exp.companyAddress}`}
                </div>
                {exp.workDescription && (
                  <div className="entry-desc">{exp.workDescription}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects (Styled like Experience) */}
        {projects.length > 0 && (
          <div className="section-block">
            <div className="section-heading">Projects</div>
            {projects.map((proj, i) => (
              <div key={i} className="entry-block">
                <div className="entry-date">
                  {proj.title || "Project Title"}
                </div>
                {proj.links?.length > 0 && (
                  <div className="entry-header">
                    {proj.links.map((l) => l.link).join(" | ")}
                  </div>
                )}
                <div className="entry-desc">
                  {proj.description}
                  {proj.extraDetails && (
                    <div style={{ marginTop: "4px" }}>{proj.extraDetails}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other Experience */}
        {otherExp.length > 0 && (
          <div className="section-block">
            <div className="section-heading">Other Experience</div>
            {otherExp.map((exp, i) => (
              <div key={i} className="entry-block">
                <div className="entry-date">{formatDateRange(exp.dates)}</div>
                <div className="entry-header">
                  {exp.position || "Position"} | {exp.companyName || "Company"}
                </div>
                {exp.workDescription && (
                  <div className="entry-desc">{exp.workDescription}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="section-block">
            <div className="section-heading">Education</div>
            {education.map((edu, i) => (
              <div key={i} className="entry-block">
                <div className="entry-date">{formatDateRange(edu.dates)}</div>
                <div className="entry-header">
                  {edu.degree || "Degree"} | {edu.name || "University"}{" "}
                  {edu.location && `| ${edu.location}`}
                </div>
                <ul className="entry-list">
                  {edu.grades?.score && (
                    <li>
                      {edu.grades.type === "CGPA" ? "CGPA" : "Grade"}:{" "}
                      {edu.grades.score}
                    </li>
                  )}
                  {/* Placeholder for coursework if it existed in data, matching reference style */}
                  {/* <li>Relevant coursework: Major subjects...</li> */}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Certifications (Styled like Education) */}
        {certifications.length > 0 && (
          <div className="section-block">
            <div className="section-heading">Certifications</div>
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="entry-block"
                style={{ marginBottom: "10px" }}
              >
                <div className="entry-date">
                  {cert.issueDate
                    ? new Date(cert.issueDate).getFullYear()
                    : "Year"}
                </div>
                <div className="entry-header">
                  {cert.title || "Certification"} |{" "}
                  {cert.issuingAuthority || "Authority"}
                </div>
                {cert.link && <div className="entry-desc">{cert.link}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Skills (Two Column Grid) */}
        {(skills.length > 0 ||
          (personal.languages && personal.languages.length > 0)) && (
          <div className="section-block">
            <div className="section-heading">Skills</div>
            <div className="skills-grid">
              {skills.map((s, i) => (
                <div key={i} className="skill-item">
                  <span className="skill-bullet">•</span> {s.skillName}
                </div>
              ))}
              {/* Treating languages as skills to fit the grid layout */}
              {personal.languages?.map((lang, i) => (
                <div key={`lang-${i}`} className="skill-item">
                  <span className="skill-bullet">•</span> {lang} (Language)
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreviewBold;
