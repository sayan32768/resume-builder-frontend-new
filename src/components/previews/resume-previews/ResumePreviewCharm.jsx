import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Instagram,
} from "lucide-react";

const ResumePreviewCharm = ({ color }) => {
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
      return `${start.toLocaleString(undefined, {
        month: "short",
        year: "numeric",
      })} - ${end.toLocaleString(undefined, {
        month: "short",
        year: "numeric",
      })}`;
    if (start && !isNaN(start))
      return `${start.toLocaleString(undefined, {
        month: "short",
        year: "numeric",
      })} - Present`;
    if (end && !isNaN(end))
      return `Ended ${end.toLocaleString(undefined, {
        month: "short",
        year: "numeric",
      })}`;
    return "";
  };

  // Default theme colors matching the reference image
  const theme = {
    sidebarBg: "#8F9B8F", // Sage Green
    headerBg: "#ECECE5", // Beige/Grey
    mainBg: "#FFFEFA", // Off-white
    textDark: "#374151",
    textLight: "#F9FAFB",
    accent: "#6B7280",
  };

  return (
    <div className="resume-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        
        .resume-container {
          display: flex;
          flex-direction: column;
          width: 210mm;
          height: 297mm;
          background-color: ${theme.mainBg};
          overflow: hidden;
          box-sizing: border-box;
          font-family: "Outfit", sans-serif;
          color: ${theme.textDark};
        }

        /* Layout Structure */
        .main-body {
          display: flex;
          flex: 1;
          overflow: hidden; 
        }

        .left-sidebar {
          width: 38%;
          background-color: ${color || theme.sidebarBg};
          color: white;
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .right-column {
          width: 62%;
          display: flex;
          flex-direction: column;
        }

        .right-header {
          background-color: ${theme.headerBg};
          padding: 40px 40px 30px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .right-content {
          padding: 30px 40px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .footer-bar {
          background-color: ${theme.headerBg};
          padding: 15px 40px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          min-height: 50px;
        }

        /* Typography & Styling */
        .name-title {
          font-family: "Playfair Display", serif;
          font-size: 42px;
          font-weight: 700;
          color: #4A4A4A;
          margin: 0;
          line-height: 1.1;
        }

        .job-title {
          font-size: 14px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #888;
          margin-top: 8px;
          font-weight: 500;
        }

        .sidebar-section-title {
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          border-bottom: 1px solid rgba(255,255,255,0.4);
          padding-bottom: 8px;
          margin-bottom: 15px;
          color: white;
        }

        .main-section-title {
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #8F9B8F; /* Match sidebar tone */
          margin-bottom: 15px;
          border-bottom: 1px solid #E5E7EB;
          padding-bottom: 5px;
        }

        .sidebar-text {
          font-size: 13px;
          line-height: 1.7;
          color: #F3F4F6;
          opacity: 0.95;
        }

        .skill-item {
          display: block;
          margin-bottom: 6px;
          font-size: 13px;
        }

        /* Experience & Education Styling */
        .entry-block {
          margin-bottom: 16px;
        }

        .entry-title {
          font-weight: 700;
          font-size: 15px;
          color: #333;
        }

        .entry-subtitle {
          font-size: 13px;
          color: #666;
          font-style: italic;
          margin-bottom: 4px;
        }
        
        .entry-info {
           display: flex;
           justify-content: space-between;
           align-items: center;
        }

        .entry-desc {
          font-size: 13px;
          line-height: 1.6;
          color: #4B5563;
          margin-top: 4px;
        }
        
        .entry-date {
          font-size: 12px;
          font-weight: 600;
          color: #8F9B8F;
        }

        /* Footer Contacts */
        .contact-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #555;
          font-weight: 500;
        }
        
        a {
            text-decoration: none;
            color: inherit;
        }
      `}</style>

      {/* Main Body */}
      <div className="main-body">
        {/* Left Sidebar (Green) */}
        <div className="left-sidebar">
          {/* Profile Section */}
          {personal.about && (
            <div className="sidebar-section">
              <h3 className="sidebar-section-title">Profile</h3>
              <p className="sidebar-text">{personal.about || ""}</p>
            </div>
          )}
          {/* Skills Section */}
          {skills.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-section-title">Skills</h3>
              <div className="sidebar-text">
                {skills.map((s, i) => (
                  <span key={i} className="skill-item">
                    • {s.skillName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications (Mapped to Awards/Certs style) */}
          {certifications.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-section-title">Awards & Certs</h3>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: "15px" }}>
                  <p style={{ fontWeight: 600, fontSize: "14px", margin: 0 }}>
                    {cert.title || "Certificate Title"}
                  </p>
                  <p style={{ fontSize: "12px", opacity: 0.8, margin: 0 }}>
                    {cert.issuingAuthority},{" "}
                    {cert.issueDate
                      ? new Date(cert.issueDate).toLocaleString(undefined, {
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "14px",
                        color: "#F3F4F6",
                        textDecoration: "underline",
                      }}
                    >
                      Link
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {personal.languages && personal.languages.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-section-title">Languages</h3>
              <p className="sidebar-text">{personal.languages.join(", ")}</p>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Header (Beige) */}
          <div className="right-header">
            <h1 className="name-title">{personal.fullName || ""}</h1>
            {/* The reference didn't extract a Job Title explicitly, but visually it goes here. 
                Using a placeholder or a secondary field if available, otherwise generic. */}
            <p className="job-title"></p>
          </div>

          {/* Content (White) */}
          <div className="right-content">
            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="main-section-title">Work Experience</h2>
                {experience.map((exp, i) => (
                  <div key={i} className="entry-block">
                    <div className="entry-info">
                      <span className="entry-title">
                        {exp.position || "Position"}
                      </span>
                      <span className="entry-date">
                        {formatDateRange(exp.dates)}
                      </span>
                    </div>
                    <p className="entry-subtitle">
                      {exp.companyName || "Company Name"}
                      {exp.companyAddress && ` | ${exp.companyAddress}`}
                    </p>
                    {exp.workDescription && (
                      <p className="entry-desc">{exp.workDescription}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="main-section-title">Projects</h2>
                {projects.map((proj, i) => (
                  <div key={i} className="entry-block">
                    <p className="entry-title">
                      {proj.title || proj.name || "Project Title"}
                    </p>
                    {proj.description && (
                      <p className="entry-desc">{proj.description}</p>
                    )}
                    {proj.extraDetails && (
                      <p className="entry-desc">{proj.extraDetails}</p>
                    )}
                    {proj.links?.length > 0 && (
                      <div className="entry-desc" style={{ fontSize: "12px" }}>
                        {proj.links.map((l, idx) => (
                          <span key={idx} style={{ marginRight: "10px" }}>
                            <a
                              href={l.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#8F9B8F",
                                textDecoration: "underline",
                              }}
                            >
                              Link
                            </a>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Other Experience */}
            {otherExp.length > 0 && (
              <section>
                <h2 className="main-section-title">Other Experience</h2>
                {otherExp.map((exp, i) => (
                  <div key={i} className="entry-block">
                    <div className="entry-info">
                      <span className="entry-title">
                        {exp.position || "Position"}
                      </span>

                      <span className="entry-date">
                        {formatDateRange(exp.dates)}
                      </span>
                    </div>
                    <p className="entry-subtitle">
                      {exp.companyName || "Company Name"}
                      {exp.companyAddress && ` | ${exp.companyAddress}`}
                    </p>
                    {exp.workDescription && (
                      <p className="entry-desc">{exp.workDescription}</p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="main-section-title">Educational History</h2>
                {education.map((edu, i) => (
                  <div key={i} className="entry-block">
                    <div className="entry-info">
                      <span className="entry-title">
                        {edu.name || "Institution"}
                      </span>
                      <span className="entry-date">
                        {formatDateRange(edu.dates)}
                      </span>
                    </div>
                    <p className="entry-subtitle">
                      {edu.degree || "Degree"}{" "}
                      {edu.location && `| ${edu.location}`}
                    </p>
                    {edu.grades?.score && (
                      <p
                        className="entry-desc"
                        style={{ fontStyle: "italic", marginTop: "2px" }}
                      >
                        {edu.grades.type === "CGPA"
                          ? `CGPA: ${edu.grades.score}`
                          : `Percentage: ${edu.grades.score}%`}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Footer Bar (Contact Info) */}
      <div className="footer-bar">
        {personal.phone && (
          <div className="contact-pill">
            <Phone size={14} /> {personal.phone || ""}
          </div>
        )}
        {personal.email && (
          <div className="contact-pill">
            <Mail size={14} /> {personal.email || ""}
          </div>
        )}
        {personal.address && (
          <div className="contact-pill">
            <MapPin size={14} /> {personal.address}
          </div>
        )}

        {/* Socials in Footer */}
        {personal.socials?.map((s, i) => (
          <div key={i} className="contact-pill">
            {s.name?.toLowerCase() === "linkedin" && <Linkedin size={14} />}
            {s.name?.toLowerCase() === "github" && <Github size={14} />}
            {s.name?.toLowerCase() === "instagram" && <Instagram size={14} />}
            <a href={s.link} target="_blank" rel="noopener noreferrer">
              {s.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreviewCharm;
