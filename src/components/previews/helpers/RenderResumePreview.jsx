import ResumePreviewModern from "@/components/previews/resume-previews/ResumePreviewModern";
import ResumePreviewClassic from "@/components/previews/resume-previews/ResumePreviewClassic";
import ResumePreviewMinimal from "@/components/previews/resume-previews/ResumePreviewMinimal";
import ResumePreviewCharm from "@/components/previews/resume-previews/ResumePreviewCharm";
import ResumePreviewBold from "@/components/previews/resume-previews/ResumePreviewBold";
import ResumePreviewBoxed from "@/components/previews/resume-previews/ResumePreviewBoxed";

export const renderResumePreview = (type, accentColor) => {
  switch (type) {
    case "Modern":
      return <ResumePreviewModern color={accentColor} />;

    case "Classic":
      return <ResumePreviewClassic color={accentColor} />;

    case "Minimal":
      return <ResumePreviewMinimal color={accentColor} />;

    case "Charm":
      return <ResumePreviewCharm color={accentColor} />;

    case "Boxed":
      return <ResumePreviewBoxed color={accentColor} />;

    case "Bold":
      return <ResumePreviewBold color={accentColor} />;

    default:
      return <ResumePreviewClassic color={accentColor} />;
  }
};
