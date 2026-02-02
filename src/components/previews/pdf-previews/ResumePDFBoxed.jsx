import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";

/* Fonts */
Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/montserrat/v7/Kqy6-utIpx_30Xzecmeo8_esZW2xOQ-xsNqO47m55DA.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/montserrat/v7/IQHow_FEYlDC4Gzy_m8fcgJKKGfqHaYFsRG-T3ceEVo.ttf",
      fontWeight: 700,
    },
  ],
});

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/opensans/v13/IgZJs4-7SA1XX_edsoXWog.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/opensans/v13/MTP_ySUJH_bn48VBG8sNSi3USBnSvpkopQaUR-2r7iU.ttf",
      fontWeight: 600,
    },
    {
      src: " https://fonts.gstatic.com/s/opensans/v13/O4NhV7_qs9r9seTo7fnsVKCWcynf_cDxXwCLxiixG1c.ttf",
      fontWeight: 400,
      fontStyle: "italic",
    },
  ],
});

/* Styles */
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    width: "210mm",
    height: "297mm",
    backgroundColor: "#ffffff",
    fontFamily: "Open Sans",
    color: "#333",
  },

  /* LEFT SIDEBAR */
  left: {
    width: "32%",
    backgroundColor: "#F0F2F5",
    padding: 30,
  },

  sidebarSection: {
    marginBottom: 30,
  },

  sidebarTitle: {
    fontFamily: "Montserrat",
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 6,
    marginBottom: 12,
  },

  label: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#666",
    marginBottom: 2,
  },

  value: {
    fontSize: 11,
    marginBottom: 10,
  },

  skill: {
    fontSize: 11,
    marginBottom: 6,
  },

  /* RIGHT CONTENT */
  right: {
    width: "68%",
    padding: 40,
  },

  headerBox: {
    borderWidth: 2,
    paddingVertical: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    marginBottom: 30,
    alignSelf: "center",
    width: "90%",
  },

  name: {
    fontFamily: "Montserrat",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontFamily: "Montserrat",
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 6,
    marginBottom: 14,
  },

  block: {
    marginBottom: 16,
  },

  blockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  blockTitle: {
    fontSize: 13,
    fontWeight: 700,
  },

  blockLoc: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "#666",
  },

  blockSub: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 2,
  },

  blockDate: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#888",
    marginBottom: 6,
  },

  blockDesc: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#444",
  },
});

/* Date Helper */
const formatDateRange = (dates) => {
  if (!dates) return "";
  const s = dates.startDate ? new Date(dates.startDate) : null;
  const e = dates.endDate ? new Date(dates.endDate) : null;
  if (s && e) return `${s.getFullYear()} - ${e.getFullYear()}`;
  if (s) return `${s.getFullYear()} - Present`;
  if (e) return `Ended ${e.getFullYear()}`;
  return "";
};

const ResumePDFBoxed = ({ data, color = "#111827" }) => {
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
        {/* LEFT SIDEBAR */}
        <View style={styles.left}>
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Details</Text>

            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{p.address || "-"}</Text>

            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{p.phone || "-"}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{p.email || "-"}</Text>

            {(p.socials || []).map((s, i) => (
              <View key={i}>
                <Text style={styles.label}>{s.name}</Text>
                <Text style={styles.value}>{s.link || "-"}</Text>
              </View>
            ))}
          </View>

          {skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {skills.map((s, i) => (
                <Text key={i} style={styles.skill}>
                  {s.skillName}
                </Text>
              ))}
            </View>
          )}

          {certifications.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Certifications</Text>
              {certifications.map((c, i) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 11, fontWeight: 700 }}>
                    {c.title}
                  </Text>
                  <Text style={{ fontSize: 10, color: "#666" }}>
                    {c.issuingAuthority}
                  </Text>
                  {c.issueDate && (
                    <Text style={{ fontSize: 9, fontStyle: "italic" }}>
                      {new Date(c.issueDate).getFullYear()}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* RIGHT CONTENT */}
        <View style={styles.right}>
          <View style={[styles.headerBox, { borderColor: color }]}>
            <Text style={[styles.name, { color }]}>{p.fullName || "-"}</Text>
          </View>

          {p.about && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.blockDesc}>{p.about}</Text>
            </View>
          )}

          {experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Employment History</Text>
              {experience.map((e, i) => (
                <View key={i} style={styles.block}>
                  <View style={styles.blockHeader}>
                    <Text style={styles.blockTitle}>
                      {e.position} at {e.companyName}
                    </Text>
                    <Text style={styles.blockLoc}>
                      {e.companyAddress || ""}
                    </Text>
                  </View>
                  <Text style={styles.blockDate}>
                    {formatDateRange(e.dates)}
                  </Text>
                  {e.workDescription && (
                    <Text style={styles.blockDesc}>{e.workDescription}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((p, i) => (
                <View key={i} style={styles.block}>
                  <Text style={styles.blockTitle}>{p.title || p.name}</Text>
                  {p.description && (
                    <Text style={styles.blockDesc}>{p.description}</Text>
                  )}
                  {p.extraDetails && (
                    <Text style={styles.blockDesc}>{p.extraDetails}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((e, i) => (
                <View key={i} style={styles.block}>
                  <View style={styles.blockHeader}>
                    <Text style={styles.blockTitle}>{e.degree}</Text>
                    <Text style={styles.blockLoc}>{e.location}</Text>
                  </View>
                  <Text style={styles.blockSub}>{e.name}</Text>
                  <Text style={styles.blockDate}>
                    {formatDateRange(e.dates)}
                  </Text>
                  {e.grades?.score && (
                    <Text style={styles.blockDesc}>
                      {e.grades.type}: {e.grades.score}
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

export default ResumePDFBoxed;
