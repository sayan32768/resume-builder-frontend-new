import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Globe,
  ExternalLink,
} from "lucide-react";

const ResumePreviewBoxed = ({ color = "#111827" }) => {
  // Default to black/dark gray
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
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;600&display=swap');
        
        .resume-container {
          display: flex;
          width: 210mm;
          height: 297mm;
          background-color: #ffffff;
          overflow: hidden;
          box-sizing: border-box;
          font-family: 'Open Sans', sans-serif;
          color: #333;
        }

        /* --- LEFT SIDEBAR --- */
        .left-sidebar {
          width: 32%;
          background-color: #F0F2F5; /* Light Gray from reference */
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* --- RIGHT CONTENT --- */
        .right-content {
          width: 68%;
          padding: 40px 40px;
          display: flex;
          flex-direction: column;
        }

        /* --- HEADER BOX (Distinctive Feature) --- */
        .header-box {
          border: 2px solid ${color};
          padding: 25px 20px;
          text-align: center;
          margin-bottom: 40px;
          background: #fff;
          width: 90%;
          align-self: center; /* Center horizontally in the flex column if needed, but usually top block */
        }
        
        .header-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 32px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: ${color};
          margin: 0;
          line-height: 1.2;
        }

        /* --- SECTIONS --- */
        .section-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #111;
          border-bottom: 1px solid #ccc;
          padding-bottom: 8px;
          margin-bottom: 20px;
        }

        .sidebar-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #111;
          border-bottom: 1px solid #ccc;
          padding-bottom: 6px;
          margin-bottom: 15px;
        }

        /* --- ITEM STYLES --- */
        .contact-group {
          margin-bottom: 20px;
        }
        .contact-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 4px;
          display: block;
        }
        .contact-value {
          font-size: 13px;
          color: #333;
          word-break: break-all;
        }

        .skill-item {
            margin-bottom: 8px;
            font-size: 13px;
            font-weight: 500;
        }

        .main-block {
            margin-bottom: 25px;
        }
        
        .block-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 4px;
        }
        
        .block-title {
            font-weight: 700;
            font-size: 15px;
            color: #000;
        }
        
        .block-loc {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
        }
        
        .block-sub {
            font-size: 13px;
            font-weight: 600;
            color: #444;
            margin-bottom: 4px;
        }
        
        .block-date {
            font-size: 12px;
            color: #888;
            margin-bottom: 8px;
            font-style: italic;
        }

        .block-desc {
            font-size: 13px;
            line-height: 1.6;
            color: #444;
        }

        a {
            color: inherit;
            text-decoration: none;
        }
      `}</style>

      {/* LEFT COLUMN (Details, Skills, etc.) */}
      <div className="left-sidebar">
        {/* DETAILS SECTION */}
        <div>
          <h3 className="sidebar-title">Details</h3>

          <div className="contact-group">
            <span className="contact-label">Address</span>
            <div className="contact-value">
              {personal.address || "City, Country"}
            </div>
          </div>

          <div className="contact-group">
            <span className="contact-label">Phone</span>
            <div className="contact-value">
              {personal.phone || "(123) 456-7890"}
            </div>
          </div>

          <div className="contact-group">
            <span className="contact-label">Email</span>
            <div className="contact-value">
              {personal.email || "hello@example.com"}
            </div>
          </div>

          {personal.socials?.map((s, i) => (
            <div key={i} className="contact-group">
              <span className="contact-label">{s.name}</span>
              <div className="contact-value">
                <a href={s.link} target="_blank" rel="noopener noreferrer">
                  {s.link ? "View Profile" : "-"}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* SKILLS SECTION */}
        {skills.length > 0 && (
          <div>
            <h3 className="sidebar-title">Skills</h3>
            {skills.map((s, i) => (
              <div key={i} className="skill-item">
                {s.skillName}
              </div>
            ))}
          </div>
        )}

        {/* LANGUAGES */}
        {personal.languages && personal.languages.length > 0 && (
          <div>
            <h3 className="sidebar-title">Languages</h3>
            {personal.languages.map((l, i) => (
              <div key={i} className="skill-item">
                {l}
              </div>
            ))}
          </div>
        )}

        {/* CERTIFICATIONS (Moved to sidebar to balance layout) */}
        {certifications.length > 0 && (
          <div>
            <h3 className="sidebar-title">Certifications</h3>
            {certifications.map((cert, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "13px", fontWeight: "700" }}>
                  {cert.title}
                </div>
                <div style={{ fontSize: "11px", color: "#666" }}>
                  {cert.issuingAuthority}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontStyle: "italic",
                    color: "#888",
                  }}
                >
                  {cert.issueDate && new Date(cert.issueDate).getFullYear()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN (Main Content) */}
      <div className="right-content">
        {/* HEADER BOX */}
        <div className="header-box">
          <h1 className="header-name">{personal.fullName || "YOUR NAME"}</h1>
          {/* Placeholder for Job Title if it were available in the data schema */}
        </div>

        {/* PROFILE */}
        {personal.about && (
          <div style={{ marginBottom: "30px" }}>
            <h2 className="section-title">Profile</h2>
            <p className="block-desc">{personal.about}</p>
          </div>
        )}

        {/* EXPERIENCE */}
        {experience.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <h2 className="section-title">Employment History</h2>
            {experience.map((exp, i) => (
              <div key={i} className="main-block">
                <div className="block-header">
                  <span className="block-title">
                    {exp.position || "Position"} at {exp.companyName}
                  </span>
                  <span className="block-loc">{exp.companyAddress}</span>
                </div>
                <div className="block-date">{formatDateRange(exp.dates)}</div>
                {exp.workDescription && (
                  <p className="block-desc">{exp.workDescription}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS */}
        {projects.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <h2 className="section-title">Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} className="main-block">
                <div className="block-header">
                  <span className="block-title">
                    {proj.title || "Project Title"}
                  </span>
                </div>
                {proj.links?.length > 0 && (
                  <div style={{ fontSize: "11px", marginBottom: "4px" }}>
                    {proj.links.map((l, idx) => (
                      <a
                        key={idx}
                        href={l.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: color,
                          marginRight: "10px",
                          textDecoration: "underline",
                        }}
                      >
                        Link {idx + 1}
                      </a>
                    ))}
                  </div>
                )}
                <p className="block-desc">{proj.description}</p>
                {proj.extraDetails && (
                  <p className="block-desc" style={{ marginTop: "5px" }}>
                    {proj.extraDetails}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* OTHER EXPERIENCE */}
        {otherExp.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <h2 className="section-title">Other Experience</h2>
            {otherExp.map((exp, i) => (
              <div key={i} className="main-block">
                <div className="block-header">
                  <span className="block-title">{exp.position}</span>
                  <span className="block-loc">{exp.companyAddress}</span>
                </div>
                <div className="block-sub">{exp.companyName}</div>
                <div className="block-date">{formatDateRange(exp.dates)}</div>
                <p className="block-desc">{exp.workDescription}</p>
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <div>
            <h2 className="section-title">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="main-block">
                <div className="block-header">
                  <span className="block-title">{edu.degree || "Degree"}</span>
                  <span className="block-loc">{edu.location}</span>
                </div>
                <div className="block-sub">{edu.name || "University Name"}</div>
                <div className="block-date">{formatDateRange(edu.dates)}</div>
                {edu.grades?.score && (
                  <div className="block-desc" style={{ fontSize: "12px" }}>
                    {edu.grades.type}: {edu.grades.score}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreviewBoxed;
