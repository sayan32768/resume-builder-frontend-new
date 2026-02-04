import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";

Font.register({
  family: "Nunito Sans",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/nunito/v8/ySZTeT3IuzJj0GK6uGpbBg.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/nunito/v8/B4-BGlpEzQ4WP-D3Zi0PRQ.ttf",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/nunito/v8/aEdlqgMuYbpe4U3TnqOQMA.ttf",
      fontWeight: 700,
    },
    {
      src: "https://fonts.gstatic.com/s/nunito/v8/NZNWFpgsC6hUUE2c03CLoQ.ttf",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    display: "flex", // ✅ add this
    minHeight: "297mm", // ✅ add this
    width: "210mm",
    height: "297mm",
    backgroundColor: "#ffffff",
    color: "#1f2937",
    fontSize: 11,
    fontFamily: "Nunito Sans",
  },

  /* LEFT COLUMN */
  leftColumn: {
    width: "35%",
    backgroundColor: "#F8FAFC",
    color: "#1f2937",
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },

  leftSection: {
    marginBottom: 24,
  },

  leftTitle: {
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: 12,
    letterSpacing: 1,
    fontSize: 11,
  },

  leftText: {
    fontSize: 11,
    marginBottom: 6,
    lineHeight: 1.5,
  },

  bold: { fontWeight: 700 },
  semibold: { fontWeight: 600 },
  italic: { fontStyle: "italic" },

  link: {
    // color: "#2563eb",
    textDecoration: "underline",
  },

  /* RIGHT COLUMN */
  rightColumn: {
    width: "65%",
    padding: 32,
  },

  header: {
    borderBottomWidth: 3,
    paddingBottom: 16,
    marginBottom: 24,
  },

  headerName: {
    fontSize: 24,
    fontWeight: 700,
    color: "#1f2937",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },

  headerAbout: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#4b5563",
    marginTop: 4,
  },

  rightSection: {
    marginBottom: 24,
  },

  rightTitle: {
    textTransform: "uppercase",
    color: "#1f2937",
    fontWeight: 600,
    marginBottom: 8,
    letterSpacing: 1,
    fontSize: 12,
  },

  rightItem: {
    marginBottom: 12,
  },

  description: {
    color: "#374151",
    marginTop: 2,
  },

  listItem: {
    marginLeft: 10,
    marginBottom: 4,
  },
});

const ResumePDFModern = ({ data, color }) => {
  const personal = data?.personalDetails || {};
  const education = data?.educationDetails || [];
  const skills = data?.skills || [];
  const experience = data?.professionalExperience || [];
  const otherExp = data?.otherExperience || [];
  const projects = data?.projects || [];
  const certifications = data?.certifications || [];

  const yearRange = (dates) => {
    if (!dates) return "";
    if (dates.startDate && dates.endDate)
      return `${new Date(dates.startDate).toLocaleString(undefined, {
        month: "short",
        year: "numeric",
      })} - ${new Date(dates.endDate).toLocaleString(undefined, {
        month: "short",
        year: "numeric",
      })}`;
    if (dates.startDate)
      return `${new Date(dates.startDate).toLocaleString(undefined, {
        month: "short",
        year: "numeric",
      })} - Present`;
    if (dates.endDate)
      return `Ended ${new Date(dates.endDate).toLocaleString(undefined, {
        month: "short",
        year: "numeric",
      })}`;
    return "";
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        {/* LEFT COLUMN */}
        <View style={styles.leftColumn}>
          <View>
            {/* CONTACT */}
            <View style={styles.leftSection}>
              <Text style={[styles.leftTitle, { color: color }]}>Contact</Text>
              {personal.phone && (
                <Text style={styles.leftText}>{personal.phone}</Text>
              )}
              {personal.email && (
                <Text style={styles.leftText}>{personal.email}</Text>
              )}
              {personal.address && (
                <Text style={styles.leftText}>{personal.address}</Text>
              )}
              {(personal.socials || []).map((s, i) => (
                <Text key={i} style={styles.leftText}>
                  {s.link ? (
                    <Link style={[{ color: color }]} src={s.link}>
                      {s.name}
                    </Link>
                  ) : (
                    `${s.name}: -`
                  )}
                </Text>
              ))}
            </View>

            {/* EDUCATION */}
            {education.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={[styles.leftTitle, { color: color }]}>
                  Education
                </Text>
                {education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    {(edu.degree || edu.name) && (
                      <Text style={[styles.leftText, styles.semibold]}>
                        {edu.degree || ""}
                        {edu.degree && edu.name ? " • " : ""}
                        {edu.name || ""}
                      </Text>
                    )}
                    {edu.location && (
                      <Text style={[styles.leftText, styles.italic]}>
                        {edu.location}
                      </Text>
                    )}
                    {edu.dates && (
                      <Text style={styles.leftText}>
                        {yearRange(edu.dates)}
                      </Text>
                    )}
                    {edu.grades?.score && edu.grades?.type && (
                      <Text style={styles.leftText}>
                        {edu.grades.type === "CGPA"
                          ? `CGPA: ${edu.grades.score}`
                          : `Percentage: ${edu.grades.score}%`}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* SKILLS */}
            {skills.length > 0 && (
              <View style={[styles.leftSection, { marginBottom: 4 }]}>
                <Text style={[styles.leftTitle, { color: color }]}>
                  Key Skills
                </Text>
                {skills.map((s, i) => (
                  <Text key={i} style={styles.leftText}>
                    {s.skillName}
                  </Text>
                ))}
              </View>
            )}

            {/* CERTIFICATIONS */}
            {certifications.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={[styles.leftTitle, { color: color }]}>
                  Certifications
                </Text>
                {certifications.map((cert, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    {cert.issueDate && (
                      <Text style={[styles.leftText, styles.italic]}>
                        (
                        {new Date(cert.issueDate).toLocaleString(undefined, {
                          month: "short",
                          year: "numeric",
                        })}
                        )
                      </Text>
                    )}
                    <Text style={[styles.leftText, styles.bold]}>
                      {cert.title}
                    </Text>
                    <Text style={styles.leftText}>{cert.issuingAuthority}</Text>
                    {cert.link && (
                      <Link
                        src={cert.link}
                        style={[styles.leftText, styles.link, { color: color }]}
                      >
                        Link
                      </Link>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* RIGHT COLUMN */}
        <View style={styles.rightColumn}>
          {/* HEADER */}
          <View style={[styles.header, { borderBottomColor: color }]}>
            <Text style={styles.headerName}>{personal.fullName || "-"}</Text>
            {personal.about && (
              <Text style={styles.headerAbout}>{personal.about}</Text>
            )}
          </View>

          {/* PROFESSIONAL EXPERIENCE */}
          {experience.length > 0 && (
            <View style={styles.rightSection}>
              <Text style={styles.rightTitle}>Professional Experience</Text>
              {experience.map((exp, i) => (
                <View key={i} style={styles.rightItem}>
                  <Text style={styles.leftText}>{yearRange(exp.dates)}</Text>
                  <Text style={[styles.leftText, styles.bold]}>
                    {exp.position || "-"}
                  </Text>
                  <Text style={[styles.leftText, styles.italic]}>
                    {exp.companyName || "-"}
                    {exp.companyAddress ? ` – ${exp.companyAddress}` : ""}
                  </Text>
                  {exp.workDescription && (
                    <Text style={styles.description}>
                      {exp.workDescription}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <View style={styles.rightSection}>
              <Text style={styles.rightTitle}>Projects</Text>
              {projects.map((p, i) => (
                <View key={i} style={styles.rightItem}>
                  <Text style={[styles.leftText, styles.bold]}>
                    {p.title || p.name || "-"}
                  </Text>
                  {p.description && (
                    <Text style={styles.description}>{p.description}</Text>
                  )}
                  {p.extraDetails && (
                    <Text style={styles.description}>{p.extraDetails}</Text>
                  )}
                  {(p.links || []).map((l, idx) => (
                    <Link
                      key={idx}
                      src={l.link}
                      style={[styles.leftText, styles.link, { color: color }]}
                    >
                      Link
                    </Link>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* OTHER EXPERIENCE */}
          {otherExp.length > 0 && (
            <View style={styles.rightSection}>
              <Text style={styles.rightTitle}>Other Experience</Text>
              {otherExp.map((exp, i) => (
                <View key={i} style={styles.rightItem}>
                  <Text style={styles.leftText}>{yearRange(exp.dates)}</Text>
                  <Text style={[styles.leftText, styles.bold]}>
                    {exp.position || "-"}
                  </Text>
                  <Text style={[styles.leftText, styles.italic]}>
                    {exp.companyName || "-"}
                    {exp.companyAddress ? ` – ${exp.companyAddress}` : ""}
                  </Text>
                  {exp.workDescription && (
                    <Text style={styles.description}>
                      {exp.workDescription}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDFModern;
