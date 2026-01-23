import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";

/* FONT */
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc9.ttf",
      fontWeight: 700,
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmYUtfBBc9.ttf",
      fontWeight: 900,
    },
  ],
});

/* STYLES */
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    width: "210mm",
    height: "297mm",
    fontFamily: "Roboto",
    backgroundColor: "#ffffff",
  },

  /* LEFT STRIP */
  strip: {
    width: 55,
  },

  /* CONTENT */
  content: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 45,
    paddingBottom: 40,
  },

  name: {
    fontSize: 40,
    fontWeight: 900,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 18,
  },

  separator: {
    marginHorizontal: 6,
  },

  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#374151",
    marginBottom: 24,
  },

  section: {
    marginBottom: 22,
  },

  heading: {
    fontSize: 16,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  entry: {
    marginBottom: 14,
  },

  date: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 2,
  },

  header: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 4,
  },

  body: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#374151",
  },

  listItem: {
    fontSize: 11,
    marginLeft: 10,
    marginBottom: 2,
  },

  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  skill: {
    width: "50%",
    fontSize: 11,
    marginBottom: 4,
  },
});

/* DATE FORMATTER */
const formatDateRange = (dates) => {
  if (!dates) return "";
  const s = dates.startDate ? new Date(dates.startDate) : null;
  const e = dates.endDate ? new Date(dates.endDate) : null;
  if (s && e) return `${s.getFullYear()} - ${e.getFullYear()}`;
  if (s) return `${s.getFullYear()} - Present`;
  if (e) return `Ended ${e.getFullYear()}`;
  return "";
};

/* COMPONENT */
const ResumePDFBold = ({ data, color = "#f14d34" }) => {
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
        {/* STRIP */}
        <View style={[styles.strip, { backgroundColor: color }]} />

        {/* CONTENT */}
        <View style={styles.content}>
          {/* NAME */}
          <Text style={styles.name}>{p.fullName || "-"}</Text>

          {/* CONTACT */}
          <View style={styles.contactRow}>
            {p.address && <Text>{p.address}</Text>}
            {p.address && <Text style={styles.separator}>|</Text>}
            {p.phone && <Text>{p.phone}</Text>}
            {p.phone && <Text style={styles.separator}>|</Text>}
            {p.email && <Text>{p.email}</Text>}
            {(p.socials || []).map((s, i) => (
              <Text key={i}>
                <Text style={styles.separator}>|</Text>
                {s.link}
              </Text>
            ))}
          </View>

          {/* SUMMARY */}
          {p.about && <Text style={styles.summary}>{p.about}</Text>}

          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Experience</Text>
              {experience.map((e, i) => (
                <View key={i} style={styles.entry}>
                  <Text style={styles.date}>{formatDateRange(e.dates)}</Text>
                  <Text style={styles.header}>
                    {e.position} | {e.companyName}
                    {e.companyAddress && ` | ${e.companyAddress}`}
                  </Text>
                  {e.workDescription && (
                    <Text style={styles.body}>{e.workDescription}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Projects</Text>
              {projects.map((p, i) => (
                <View key={i} style={styles.entry}>
                  <Text style={styles.header}>{p.title || p.name}</Text>
                  {p.description && (
                    <Text style={styles.body}>{p.description}</Text>
                  )}
                  {p.extraDetails && (
                    <Text style={styles.body}>{p.extraDetails}</Text>
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

          {/* OTHER EXPERIENCE */}
          {otherExp.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Other Experience</Text>
              {otherExp.map((e, i) => (
                <View key={i} style={styles.entry}>
                  <Text style={styles.date}>{formatDateRange(e.dates)}</Text>
                  <Text style={styles.header}>
                    {e.position} | {e.companyName}
                  </Text>
                  {e.workDescription && (
                    <Text style={styles.body}>{e.workDescription}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Education</Text>
              {education.map((edu, i) => (
                <View key={i} style={styles.entry}>
                  <Text style={styles.date}>{formatDateRange(edu.dates)}</Text>
                  <Text style={styles.header}>
                    {edu.degree} | {edu.name}
                    {edu.location && ` | ${edu.location}`}
                  </Text>
                  {edu.grades?.score && (
                    <Text style={styles.body}>
                      {edu.grades.type}: {edu.grades.score}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* CERTIFICATIONS */}
          {certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Certifications</Text>
              {certifications.map((c, i) => (
                <View key={i} style={styles.entry}>
                  <Text style={styles.header}>
                    {c.title} | {c.issuingAuthority}
                  </Text>
                  {c.issueDate && (
                    <Text style={styles.body}>
                      {new Date(c.issueDate).getFullYear()}
                    </Text>
                  )}
                  {c.link && <Text style={styles.body}>{c.link}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* SKILLS */}
          {skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Skills</Text>
              <View style={styles.skillGrid}>
                {skills.map((s, i) => (
                  <Text key={i} style={styles.skill}>
                    • {s.skillName}
                  </Text>
                ))}
                {(p.languages || []).map((l, i) => (
                  <Text key={`lang-${i}`} style={styles.skill}>
                    • {l} (Language)
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDFBold;
