import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import MailIcon from "../../../icons/mail-dark.png";
import GithubIcon from "../../../icons/github-dark.png";
import LinkedinIcon from "../../../icons/linkedin-dark.png";
import MapPinIcon from "../../../icons/map-pin-dark.png";
import PhoneIcon from "../../../icons/phone-dark.png";
import InstagramIcon from "../../../icons/instagram-dark.png";

/* Fonts */
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

Font.register({
  family: "Playfair Display",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/playfairdisplay/v10/UC3ZEjagJi85gF9qFaBgICsv6SrURqJprbhH_C1Mw8w.ttf",
      fontWeight: 700,
    },
  ],
});

/* Theme */
const theme = {
  sidebarBg: "#8F9B8F",
  headerBg: "#ECECE5",
  mainBg: "#FFFEFA",
  textDark: "#374151",
  textLight: "#F9FAFB",
};

/* Styles */
const styles = StyleSheet.create({
  page: {
    width: "210mm",
    height: "297mm",
    display: "flex", // ✅ add this
    flexDirection: "column", // ✅ add this
    minHeight: "297mm", // ✅ add this
    backgroundColor: theme.mainBg,
    fontFamily: "Nunito Sans",
    color: theme.textDark,
  },

  body: {
    flexDirection: "row",
    flex: 1,
  },

  pageContent: {
    flex: 1, // important: fills remaining blank space
  },

  /* LEFT SIDEBAR */
  sidebar: {
    width: "38%",
    backgroundColor: theme.sidebarBg,
    padding: 25,
    color: theme.textLight,
  },

  sidebarSection: {
    marginBottom: 24,
  },

  sidebarTitle: {
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    paddingBottom: 6,
    marginBottom: 12,
  },

  sidebarText: {
    fontSize: 11,
    lineHeight: 1.6,
  },

  skill: {
    fontSize: 11,
    marginBottom: 4,
  },

  /* RIGHT COLUMN */
  right: {
    width: "62%",
    flexDirection: "column",
  },

  header: {
    backgroundColor: theme.headerBg,
    padding: 32,
  },

  name: {
    fontFamily: "Playfair Display",
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1.1,
    color: "#4A4A4A",
  },

  jobTitle: {
    fontSize: 11,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#888",
    marginTop: 8,
  },

  content: {
    padding: 28,
    flex: 1,
  },

  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: theme.sidebarBg,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 4,
    marginBottom: 12,
  },

  entry: {
    marginBottom: 14,
  },

  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  entryTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#333",
  },

  entryDate: {
    fontSize: 10,
    fontWeight: 600,
    color: theme.sidebarBg,
  },

  entrySub: {
    fontSize: 11,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 4,
  },

  entryDesc: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#4B5563",
  },

  footer: {
    backgroundColor: theme.headerBg,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "nowrap", // ✅ no wrap
    width: "100%",
  },

  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    maxWidth: "25%", // ✅ prevents one item eating whole row
  },
  footerIcon: {
    width: 12,
    height: 12,
  },
  footerText: {
    fontSize: 7,
    color: "#555",
    fontWeight: 500,
  },
  footerLink: {
    fontSize: 9,
    color: "#555",
    fontWeight: 500,
    textDecoration: "none",
  },
});

/* Date helper */
const formatDateRange = (dates) => {
  if (!dates) return "";
  const s = dates.startDate ? new Date(dates.startDate) : null;
  const e = dates.endDate ? new Date(dates.endDate) : null;
  if (s && e)
    return `${s.toLocaleString(undefined, {
      month: "short",
      year: "numeric",
    })} - ${e.toLocaleString(undefined, {
      month: "short",
      year: "numeric",
    })}`;
  if (s)
    return `${s.toLocaleString(undefined, {
      month: "short",
      year: "numeric",
    })} - Present`;
  if (e)
    return `Ended ${e.toLocaleString(undefined, {
      month: "short",
      year: "numeric",
    })}`;
  return "";
};

const ResumePDFCharm = ({ data, color }) => {
  const p = data?.personalDetails || {};
  const education = data?.educationDetails || [];
  const experience = data?.professionalExperience || [];
  const projects = data?.projects || [];
  const otherExp = data?.otherExperience || [];
  const certifications = data?.certifications || [];
  const skills = data?.skills || [];

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.pageContent}>
          <View style={styles.body}>
            {/* LEFT SIDEBAR */}
            <View
              style={[
                styles.sidebar,
                { backgroundColor: color || theme.sidebarBg },
              ]}
            >
              {p.about && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Profile</Text>
                  <Text style={styles.sidebarText}>{p.about || "-"}</Text>
                </View>
              )}

              {skills.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Skills</Text>
                  {skills.map((s, i) => (
                    <Text key={i} style={styles.skill}>
                      • {s.skillName}
                    </Text>
                  ))}
                </View>
              )}

              {certifications.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Awards & Certs</Text>
                  {certifications.map((c, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                      <Text style={{ fontSize: 11, fontWeight: 600 }}>
                        {c.title}
                      </Text>
                      <Text style={{ fontSize: 10, opacity: 0.8 }}>
                        {c.issuingAuthority}
                        {c.issueDate &&
                          `, ${new Date(c.issueDate).toLocaleString(undefined, {
                            month: "short",
                            year: "numeric",
                          })}`}
                      </Text>
                      {c.link && (
                        <Link
                          src={c.link}
                          style={{
                            fontSize: 10,
                            color: "#F3F4F6",
                            textDecoration: "underline",
                          }}
                        >
                          Link
                        </Link>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {p.languages?.length > 0 && (
                <View style={styles.sidebarSection}>
                  <Text style={styles.sidebarTitle}>Languages</Text>
                  <Text style={styles.sidebarText}>
                    {p.languages.join(", ")}
                  </Text>
                </View>
              )}
            </View>

            {/* RIGHT */}
            <View style={styles.right}>
              <View style={styles.header}>
                <Text style={styles.name}>{p.fullName || ""}</Text>
                <Text style={styles.jobTitle}></Text>
              </View>

              <View style={styles.content}>
                {experience.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Work Experience</Text>
                    {experience.map((e, i) => (
                      <View key={i} style={styles.entry}>
                        <View style={styles.entryRow}>
                          <Text style={styles.entryTitle}>{e.position}</Text>
                          <Text style={styles.entryDate}>
                            {formatDateRange(e.dates)}
                          </Text>
                        </View>
                        <Text style={styles.entrySub}>
                          {e.companyName}
                          {e.companyAddress && ` | ${e.companyAddress}`}
                        </Text>
                        {e.workDescription && (
                          <Text style={styles.entryDesc}>
                            {e.workDescription}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}

                {projects.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    {projects.map((p, i) => (
                      <View key={i} style={styles.entry}>
                        <Text style={styles.entryTitle}>
                          {p.title || p.name}
                        </Text>
                        {p.description && (
                          <Text style={styles.entryDesc}>{p.description}</Text>
                        )}
                        {p.extraDetails && (
                          <Text style={styles.entryDesc}>{p.extraDetails}</Text>
                        )}
                        {(p.links || []).length > 0 && (
                          <View style={{ marginTop: 4 }}>
                            {p.links.map((l, idx) => (
                              <Link
                                key={idx}
                                src={l.link}
                                style={{
                                  color: "#8F9B8F",
                                  textDecoration: "underline",
                                  fontSize: 9,
                                }}
                              >
                                Link
                              </Link>
                            ))}
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                )}

                {otherExp.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Other Experience</Text>

                    {otherExp.map((exp, i) => (
                      <View key={i} style={styles.entry}>
                        {/* Row 1: Position + Date */}
                        <View style={styles.entryRow}>
                          <Text style={styles.entryTitle}>
                            {exp.position || "Position"}
                          </Text>
                          <Text style={styles.entryDate}>
                            {formatDateRange(exp.dates)}
                          </Text>
                        </View>

                        {/* Row 2: Company + Address */}
                        <Text style={styles.entrySub}>
                          {exp.companyName || "Company Name"}
                          {exp.companyAddress ? ` | ${exp.companyAddress}` : ""}
                        </Text>

                        {/* Row 3: Description */}
                        {exp.workDescription && (
                          <Text style={styles.entryDesc}>
                            {exp.workDescription}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}

                {education.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Educational History</Text>
                    {education.map((e, i) => (
                      <View key={i} style={styles.entry}>
                        <View style={styles.entryRow}>
                          <Text style={styles.entryTitle}>{e.name}</Text>
                          <Text style={styles.entryDate}>
                            {formatDateRange(e.dates)}
                          </Text>
                        </View>
                        <Text style={styles.entrySub}>
                          {e.degree}
                          {e.location && ` | ${e.location}`}
                        </Text>
                        {e.grades?.score && (
                          <Text style={styles.entryDesc}>
                            {e.grades.type}: {e.grades.score}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            {p.phone && (
              <View style={styles.footerItem}>
                <Image src={PhoneIcon} style={styles.footerIcon} />
                <Text style={styles.footerText}>{p.phone}</Text>
              </View>
            )}

            {p.email && (
              <View style={styles.footerItem}>
                <Image src={MailIcon} style={styles.footerIcon} />
                <Text style={styles.footerText}>{p.email}</Text>
              </View>
            )}

            {p.address && (
              <View style={styles.footerItem}>
                <Image src={MapPinIcon} style={styles.footerIcon} />
                <Text style={styles.footerText}>{p.address}</Text>
              </View>
            )}

            {(p.socials || []).map((s, i) => {
              const name = s.name?.toLowerCase();
              const icon =
                name === "github"
                  ? GithubIcon
                  : name === "linkedin"
                    ? LinkedinIcon
                    : name === "instagram"
                      ? InstagramIcon
                      : null;

              return (
                <View key={i} style={styles.footerItem}>
                  {icon && <Image src={icon} style={styles.footerIcon} />}

                  {s.link ? (
                    <Link src={s.link} style={styles.footerLink}>
                      {s.name}
                    </Link>
                  ) : (
                    <Text style={styles.footerText}>{s.name}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDFCharm;
