import ResumePDFBold from "../pdf-previews/ResumePDFBold";
import ResumePDFBoxed from "../pdf-previews/ResumePDFBoxed";
import ResumePDFCharm from "../pdf-previews/ResumePDFCharm";
import ResumePDFClassic from "../pdf-previews/ResumePDFClassic";
import ResumePDFMinimal from "../pdf-previews/ResumePDFMinimal";
import ResumePDFModern from "../pdf-previews/ResumePDFModern";

export const renderResumePDF = (type, accentColor, formData) => {
  switch (type) {
    case "Classic":
      return <ResumePDFClassic color={accentColor} data={formData} />;

    case "Modern":
      return <ResumePDFModern color={accentColor} data={formData} />;

    case "Bold":
      return <ResumePDFBold color={accentColor} data={formData} />;

    case "Boxed":
      return <ResumePDFBoxed color={accentColor} data={formData} />;

    case "Charm":
      return <ResumePDFCharm color={accentColor} data={formData} />;

    case "Minimal":
      return <ResumePDFMinimal color={accentColor} data={formData} />;

    default:
      return <ResumePDFClassic color={accentColor} data={formData} />;
  }
};
