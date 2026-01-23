import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import MailIcon from "../../../icons/mail.png";
import GithubIcon from "../../../icons/github.png";
import LinkedinIcon from "../../../icons/linkedin.png";
import MapPinIcon from "../../../icons/map-pin.png";
import PhoneIcon from "../../../icons/phone.png";
import TwitterIcon from "../../../icons/twitter.png";

Font.register({
  family: "Nunito Sans",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/nunito/v8/ySZTeT3IuzJj0GK6uGpbBg.ttf",
      fontWeight: "normal",
    },
    {
      src: "http://fonts.gstatic.com/s/nunito/v8/B4-BGlpEzQ4WP-D3Zi0PRQ.ttf",
      fontWeight: 600,
    },
    {
      src: "http://fonts.gstatic.com/s/nunito/v8/aEdlqgMuYbpe4U3TnqOQMA.ttf",
      fontWeight: 700,
    },
    {
      src: "http://fonts.gstatic.com/s/nunito/v8/QVvFcvcPoFKH9Q71V4WsjQ.ttf",
      fontWeight: 900,
    },
    {
      src: "http://fonts.gstatic.com/s/nunito/v8/NZNWFpgsC6hUUE2c03CLoQ.ttf",
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  icon: {
    width: 10,
    height: 10,
    marginRight: 6,
    marginBottom: 6,
  },

  page: {
    flexDirection: "row",
    width: "210mm",
    height: "297mm",
    fontFamily: "Nunito Sans",
    backgroundColor: "#ffffff",
  },

  /* LEFT */
  left: {
    width: "35%",
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    paddingTop: 28,
    paddingHorizontal: 22,
    paddingBottom: 28,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  leftSection: {
    marginBottom: 18,
  },

  leftTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    paddingBottom: 6,
    marginBottom: 10,
  },

  leftText: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 4,
  },

  muted: { color: "#d1d5db" },
  faint: { color: "#9ca3af", fontSize: 9 },
  bold: { fontWeight: 700 },
  italic: { fontStyle: "italic" },

  link: {
    color: "#93c5fd",
    textDecoration: "underline",
    fontSize: 9,
  },

  /* RIGHT */
  right: {
    width: "65%",
    paddingTop: 32,
    paddingHorizontal: 36,
    color: "#111827",
    flexDirection: "column",
  },

  name: {
    fontSize: 22,
    fontWeight: 900,
    marginBottom: 4,
  },

  title: {
    fontSize: 12,
    fontWeight: 500,
    color: "#6b7280",
    marginBottom: 16,
  },

  section: {
    marginBottom: 18,
  },

  sectionHeading: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1f2937",
    borderBottomWidth: 2,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
    marginBottom: 8,
  },

  bodyText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
  },

  date: {
    fontSize: 9,
    color: "#6b7280",
    fontWeight: 500,
  },

  company: {
    fontSize: 11,
    fontWeight: 700,
    color: "#111827",
  },

  position: {
    fontSize: 10,
    fontWeight: 600,
    color: "#1d4ed8",
    marginBottom: 2,
  },

  listItem: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 3,
    lineHeight: 1.5,
  },
});

const formatDateRange = (dates) => {
  if (!dates) return "";
  const s = dates.startDate ? new Date(dates.startDate) : null;
  const e = dates.endDate ? new Date(dates.endDate) : null;
  if (s && e) return `${s.getFullYear()} - ${e.getFullYear()}`;
  if (s) return `${s.getFullYear()} - Present`;
  if (e) return `Ended ${e.getFullYear()}`;
  return "";
};

const ResumePDFClassic = ({ data, color }) => {
  const p = data?.personalDetails || {};
  const education = data?.educationDetails || [];
  const experience = data?.professionalExperience || [];
  const projects = data?.projects || [];
  const otherExp = data?.otherExperience || [];
  const certifications = data?.certifications || [];
  const skills = data?.skills || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* LEFT */}
        <View style={[styles.left, { backgroundColor: color }]}>
          <View>
            {/* CONTACT */}
            <View style={styles.leftSection}>
              <Text style={styles.leftTitle}>Contact</Text>
              {p.email && (
                <View style={styles.iconRow}>
                  <Image src={MailIcon} style={styles.icon} />
                  <Text style={styles.leftText}>{p.email}</Text>
                </View>
              )}

              {p.phone && (
                <View style={styles.iconRow}>
                  <Image src={PhoneIcon} style={styles.icon} />
                  <Text style={styles.leftText}>{p.phone}</Text>
                </View>
              )}

              {p.address && (
                <View style={styles.iconRow}>
                  <Image src={MapPinIcon} style={styles.icon} />
                  <Text style={styles.leftText}>{p.address}</Text>
                </View>
              )}

              {(p.socials || []).map((s, i) => {
                const name = s.name?.toLowerCase();
                const icon =
                  name === "github"
                    ? GithubIcon
                    : name === "linkedin"
                      ? LinkedinIcon
                      : name === "twitter"
                        ? TwitterIcon
                        : null;

                return (
                  <View key={i} style={styles.iconRow}>
                    {icon && <Image src={icon} style={styles.icon} />}
                    <Text style={styles.leftText}>
                      {s.name}: {s.link || "-"}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* EDUCATION */}
            {education.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.leftTitle}>Education</Text>
                {education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={[styles.leftText, styles.bold]}>
                      {edu.degree} {edu.name && `• ${edu.name}`}
                    </Text>
                    {edu.location && (
                      <Text style={[styles.leftText, styles.muted]}>
                        {edu.location}
                      </Text>
                    )}
                    <Text style={styles.faint}>
                      {formatDateRange(edu.dates)}
                    </Text>
                    {edu.grades?.score && (
                      <Text style={styles.muted}>
                        {edu.grades.type}: {edu.grades.score}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* SKILLS */}
            {skills.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.leftTitle}>Skills</Text>
                {skills.map((s, i) => (
                  <Text key={i} style={styles.leftText}>
                    • {s.skillName}
                  </Text>
                ))}
              </View>
            )}

            {/* CERTIFICATIONS */}
            {certifications.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.leftTitle}>Certifications</Text>
                {certifications.map((c, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    {c.issueDate && (
                      <Text style={[styles.faint, styles.italic]}>
                        ({new Date(c.issueDate).getFullYear()})
                      </Text>
                    )}
                    <Text style={[styles.leftText, styles.bold]}>
                      {c.title}
                    </Text>
                    <Text style={styles.muted}>{c.issuingAuthority}</Text>
                    {c.link && <Text style={styles.link}>{c.link}</Text>}
                  </View>
                ))}
              </View>
            )}

            {/* LANGUAGES */}
            {p.languages?.length > 0 && (
              <View style={styles.leftSection}>
                <Text style={styles.leftTitle}>Languages</Text>
                <Text style={styles.leftText}>{p.languages.join(", ")}</Text>
              </View>
            )}
          </View>
        </View>

        {/* RIGHT */}
        <View style={styles.right}>
          <Text style={styles.name}>{p.fullName || "-"}</Text>
          {p.title && <Text style={styles.title}>{p.title}</Text>}

          {p.about && (
            <View style={styles.section}>
              <Text style={styles.bodyText}>{p.about}</Text>
            </View>
          )}

          {experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Professional Experience</Text>
              {experience.map((e, i) => (
                <View key={i} style={{ marginBottom: 12 }}>
                  <Text style={styles.date}>{formatDateRange(e.dates)}</Text>
                  <Text style={styles.company}>{e.companyName}</Text>
                  {e.companyAddress && (
                    <Text style={styles.bodyText}>{e.companyAddress}</Text>
                  )}
                  <Text style={styles.position}>{e.position}</Text>
                  {e.workDescription && (
                    <Text style={styles.bodyText}>{e.workDescription}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Projects</Text>
              {projects.map((p, i) => (
                <View key={i} style={{ marginBottom: 12 }}>
                  <Text style={styles.company}>{p.title || p.name}</Text>
                  {p.description && (
                    <Text style={styles.bodyText}>{p.description}</Text>
                  )}
                  {p.extraDetails && (
                    <Text style={styles.bodyText}>{p.extraDetails}</Text>
                  )}
                  {(p.links || []).map((l, idx) => (
                    <Text key={idx} style={styles.listItem}>
                      • {l.link}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {otherExp.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Other Experience</Text>
              {otherExp.map((e, i) => (
                <View key={i} style={{ marginBottom: 12 }}>
                  <Text style={styles.date}>{formatDateRange(e.dates)}</Text>
                  <Text style={styles.company}>{e.position}</Text>
                  <Text style={styles.bodyText}>
                    {e.companyName}
                    {e.companyAddress && ` – ${e.companyAddress}`}
                  </Text>
                  {e.workDescription && (
                    <Text style={styles.bodyText}>{e.workDescription}</Text>
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

export default ResumePDFClassic;
