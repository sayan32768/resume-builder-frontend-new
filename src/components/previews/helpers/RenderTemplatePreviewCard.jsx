import BoldTemplatePreview from "../thumbnail-previews/BoldTemplatePreview";
import BoxedTemplatePreview from "../thumbnail-previews/BoxedTemplatePreview";
import CharmTemplatePreview from "../thumbnail-previews/CharmTemplatePreview";
import ClassicTemplatePreview from "../thumbnail-previews/ClassicTemplatePreview";
import MinimalTemplatePreview from "../thumbnail-previews/MinimalTemplatePreview";
import ModernTemplatePreview from "../thumbnail-previews/ModernTemplatePreview";

export const renderTemplatePreviewCard = (resumeType, color) => {
  switch (resumeType) {
    case "Modern":
      return <ModernTemplatePreview color={color} />;

    case "Classic":
      return <ClassicTemplatePreview color={color} />;

    case "Minimal":
      return <MinimalTemplatePreview color={color} />;

    case "Charm":
      return <CharmTemplatePreview color={color} />;

    case "Bold":
      return <BoldTemplatePreview color={color} />;

    case "Boxed":
      return <BoxedTemplatePreview color={color} />;

    default:
      return <ClassicTemplatePreview color={color} />;
  }
};
