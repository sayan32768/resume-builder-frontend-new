import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";

/* ---------------- FONT ---------------- */
Font.register({
  family: "Noto Sans",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/notosans/v6/0Ue9FiUJwVhi4NGfHJS5uA.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/notosans/v6/PIbvSEyHEdL91QLOQRnZ1y3USBnSvpkopQaUR-2r7iU.ttf",
      fontWeight: 700,
    },
  ],
});

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  page: {
    width: "210mm",
    height: "297mm",
    display: "flex", // ✅ add this
    flexDirection: "column", // ✅ add this
    minHeight: "297mm", // ✅ add this
    paddingTop: 38,
    paddingBottom: 38,
    paddingHorizontal: 40,
    fontFamily: "Noto Sans",
    color: "#111827",
    backgroundColor: "#ffffff",
  },

  pageContent: {
    flex: 1, // important: fills remaining blank space
  },

  /* HEADER */
  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 13,
    color: "#4b5563",
    maxWidth: 520,
    textAlign: "center",
    lineHeight: 1.3,
  },

  contactRow: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    fontSize: 11,
    color: "#374151",
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 14,
  },

  /* SECTION TITLE */
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: "uppercase",
  },

  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
    marginLeft: 12,
  },

  /* EXPERIENCE / BLOCKS */
  block: {
    marginBottom: 14,
  },

  role: {
    fontSize: 13,
    fontWeight: 700,
  },

  meta: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 2,
  },

  desc: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 1.3,
    color: "#374151",
  },

  /* SKILLS */
  skillsRow: {
    fontSize: 12,
    lineHeight: 1.7,
    color: "#374151",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  skillDot: {
    marginRight: 6,
    color: "#9ca3af",
  },

  link: {
    fontSize: 11,
    marginTop: 4,
    textDecoration: "underline",
  },
});

/* ---------------- HELPERS ---------------- */
const formatYearRange = (dates) => {
  if (!dates) return "";
  const s = dates.startDate ? new Date(dates.startDate) : null;
  const e = dates.endDate ? new Date(dates.endDate) : null;
  if (s && e)
    return `${s.toLocaleString(undefined, {
      month: "short",
      year: "numeric",
    })}–${e.toLocaleString(undefined, {
      month: "short",
      year: "numeric",
    })}`;
  if (s)
    return `${s.toLocaleString(undefined, {
      month: "short",
      year: "numeric",
    })}–Present`;
  return "";
};

/* ---------------- COMPONENT ---------------- */
const ResumePDFMinimal = ({ data, color = "#111827" }) => {
  const personal = data?.personalDetails || {};
  const education = data?.educationDetails || [];
  const skills = data?.skills || [];
  const experience = data?.professionalExperience || [];
  const otherExp = data?.otherExperience || [];
  const projects = data?.projects || [];
  const certifications = data?.certifications || [];

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.pageContent}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.name}>{personal.fullName || ""}</Text>

            {personal.about && (
              <Text style={styles.subtitle}>{personal.about}</Text>
            )}

            <View style={styles.contactRow}>
              {personal.email && <Text>{personal.email}</Text>}
              {personal.phone && <Text>{personal.phone}</Text>}
              {personal.address && <Text>{personal.address}</Text>}

              {(personal.socials || []).map((s, i) =>
                s.link ? (
                  <Link
                    key={i}
                    src={s.link}
                    style={{ textDecoration: "underline", color: "#000000" }}
                  >
                    {s.name}
                  </Link>
                ) : (
                  <Text key={i}>{s.name}: -</Text>
                ),
              )}
            </View>
          </View>

          <View style={styles.divider} />

          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <>
              <View style={styles.sectionTitle}>
                <Text style={{ color }}>Experience</Text>
                <View style={styles.sectionLine} />
              </View>

              {experience.map((exp, i) => (
                <View key={i} style={styles.block}>
                  <Text style={styles.role}>{exp.position || "-"}</Text>
                  <Text style={styles.meta}>
                    {exp.companyName}
                    {exp.companyAddress && ` · ${exp.companyAddress}`}
                    {formatYearRange(exp.dates) &&
                      ` · ${formatYearRange(exp.dates)}`}
                  </Text>
                  {exp.workDescription && (
                    <Text style={styles.desc}>{exp.workDescription}</Text>
                  )}
                </View>
              ))}
            </>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <>
              <View style={styles.sectionTitle}>
                <Text style={{ color }}>Projects</Text>
                <View style={styles.sectionLine} />
              </View>

              {projects.map((p, i) => (
                <View key={i} style={styles.block}>
                  <Text style={styles.role}>{p.title || p.name}</Text>

                  {p.description && (
                    <Text style={styles.desc}>{p.description}</Text>
                  )}
                  {p.extraDetails && (
                    <Text style={styles.desc}>{p.extraDetails}</Text>
                  )}

                  {(p.links || []).length > 0 && (
                    <View style={{ marginTop: 4 }}>
                      {p.links.map((l, idx) => (
                        <Link
                          key={idx}
                          src={l.link}
                          style={[
                            styles.desc,
                            {
                              color,
                              textDecoration: "underline",
                            },
                          ]}
                        >
                          Link
                        </Link>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <>
              <View style={styles.sectionTitle}>
                <Text style={{ color }}>Education</Text>
                <View style={styles.sectionLine} />
              </View>

              {education.map((edu, i) => (
                <View key={i} style={styles.block}>
                  <Text style={styles.role}>
                    {edu.degree}
                    {edu.name && ` · ${edu.name}`}
                  </Text>
                  <Text style={styles.meta}>
                    {edu.location}
                    {formatYearRange(edu.dates) &&
                      ` · ${formatYearRange(edu.dates)}`}
                  </Text>
                  {edu.grades?.score && (
                    <Text style={styles.desc}>
                      {edu.grades.type}: {edu.grades.score}
                    </Text>
                  )}
                </View>
              ))}
            </>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <>
              <View style={styles.sectionTitle}>
                <Text style={{ color }}>Skills</Text>
                <View style={styles.sectionLine} />
              </View>

              <View style={styles.skillsRow}>
                {skills.map((s, i) => (
                  <Text key={i}>
                    {s.skillName}
                    {i !== skills.length - 1 && " · "}
                  </Text>
                ))}
              </View>
            </>
          )}

          {/* CERTIFICATIONS */}
          {certifications.length > 0 && (
            <>
              <View style={styles.sectionTitle}>
                <Text style={{ color }}>Certifications</Text>
                <View style={styles.sectionLine} />
              </View>

              {certifications.map((c, i) => (
                <View key={i} style={styles.block}>
                  <Text style={styles.role}>{c.title}</Text>

                  <Text style={styles.meta}>
                    {c.issuingAuthority}
                    {c.issueDate &&
                      ` · ${new Date(c.issueDate).toLocaleString(undefined, {
                        month: "short",
                        year: "numeric",
                      })}`}
                  </Text>

                  {c.link && (
                    <Link
                      src={c.link}
                      style={[
                        styles.meta,
                        { color, textDecoration: "underline" },
                      ]}
                    >
                      Link
                    </Link>
                  )}
                </View>
              ))}
            </>
          )}

          {/* OTHER EXPERIENCE */}
          {otherExp.length > 0 && (
            <>
              <View style={styles.sectionTitle}>
                <Text style={{ color }}>Other Experience</Text>
                <View style={styles.sectionLine} />
              </View>

              {otherExp.map((exp, i) => (
                <View key={i} style={styles.block}>
                  <Text style={styles.role}>{exp.position}</Text>
                  <Text style={styles.meta}>
                    {exp.companyName}
                    {exp.companyAddress && ` · ${exp.companyAddress}`}
                    {formatYearRange(exp.dates) &&
                      ` · ${formatYearRange(exp.dates)}`}
                  </Text>

                  {exp.workDescription && (
                    <Text style={styles.desc} wrap={false}>
                      {exp.workDescription}
                    </Text>
                  )}
                </View>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDFMinimal;
