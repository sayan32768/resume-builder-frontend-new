import React from "react";
import { Button } from "../ui/button";

const AddButtonDotted = ({ onClick, text }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="flex h-28 w-full items-center justify-center rounded-2xl border-2 border-dashed border-[#183D3D]/40 text-sm font-medium text-[#183D3D] transition hover:border-[#183D3D] hover:bg-[#E6F0EC]"
    >
      {text}
    </Button>
  );
};

export default AddButtonDotted;
