import ModernTemplatePreview from "@/components/previews/thumbnail-previews/ModernTemplatePreview";
import ClassicTemplatePreview from "@/components/previews/thumbnail-previews/ClassicTemplatePreview";
import MinimalTemplatePreview from "../thumbnail-previews/MinimalTemplatePreview";
import CharmTemplatePreview from "../thumbnail-previews/CharmTemplatePreview";
import BoldTemplatePreview from "../thumbnail-previews/BoldTemplatePreview";
import BoxedTemplatePreview from "../thumbnail-previews/BoxedTemplatePreview";

export const RESUME_TEMPLATES = [
  {
    id: "classic",
    name: "Classic",
    Preview: ClassicTemplatePreview,
    description: "Traditional two-column professional layout",
  },
  {
    id: "modern",
    name: "Modern",
    Preview: ModernTemplatePreview,
    description: "Clean modern layout with subtle accents",
  },
  {
    id: "minimal",
    name: "Minimal",
    Preview: MinimalTemplatePreview,
    description: "Minimal layout focused on clean typography",
  },
  {
    id: "charm",
    name: "Charm",
    Preview: CharmTemplatePreview,
    description: "Soft editorial layout with elegant styling",
  },
  // {
  //   id: "boxed",
  //   name: "Boxed",
  //   Preview: BoxedTemplatePreview,
  //   description: "Structured layout with boxed sections",
  // },
  // {
  //   id: "bold",
  //   name: "Bold",
  //   Preview: BoldTemplatePreview,
  //   description: "Bold layout with strong visual emphasis",
  // },
];
