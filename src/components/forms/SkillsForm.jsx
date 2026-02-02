import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import AddButtonDotted from "../common/AddButtonDotted";

export const SkillsForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.currentTarget.value.trim() !== "") {
        append({ skillName: "" });
      }
    }
  };

  // return (
  //   <div className="flex flex-col gap-y-3">
  //     {fields.map((obj, index) => (
  //       <div key={obj.id}>
  //         <div className="flex flex-col gap-y-3">
  //           <Label htmlFor={`skill${index}.name`}>Skill {index + 1}</Label>

  //           <div className="flex flex-col gap-y-1">
  //             <div className="flex flex-row gap-4">
  //               <Input
  //                 placeholder="Enter a skill"
  //                 {...register(`skills.${index}.skillName`, {})}
  //                 onKeyDown={(e) => handleKeyDown(e, index)}
  //               />
  //               <Button
  //                 className={"text-black hover:cursor-pointer"}
  //                 type="button"
  //                 variant="destructive"
  //                 size="icon"
  //                 onClick={() => remove(index)}
  //               >
  //                 Remove
  //               </Button>
  //             </div>
  //             {errors?.skills?.[index]?.skillName && (
  //               <p className="text-red-900">
  //                 {errors?.skills?.[index]?.skillName?.message}
  //               </p>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     ))}

  //     {fields.length === 0 ? (
  //       <AddButtonDotted
  //         onClick={() => append({ skillName: "" })}
  //         text="+ Add Skill"
  //       />
  //     ) : (
  //       <Button
  //         type="button"
  //         variant={"outline"}
  //         className={
  //           "w-full hover:cursor-pointer hover:bg-slate-900 hover:text-white"
  //         }
  //         onClick={() => append({ skillName: "" })}
  //       >
  //         + Add a skill
  //       </Button>
  //     )}
  //   </div>
  // );

  return (
    <div className="rounded-3xl bg-white/60 p-3 shadow-sm md:p-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-[#e9fff0]/30 p-4">
        <h2 className="text-sm font-semibold text-[#183D3D]">Skills</h2>

        {/* SKILLS GRID */}
        <div className="flex flex-wrap gap-3">
          {fields.map((obj, index) => (
            <div key={obj.id}>
              <div className="group flex flex-row items-center gap-2 rounded-full bg-[#F3F7F5] px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#183D3D]/30">
                <Input
                  placeholder="Skill"
                  className="h-8 w-32 border-none bg-transparent p-0 text-sm focus-visible:ring-0"
                  {...register(`skills.${index}.skillName`)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-xs text-slate-400 opacity-70 transition group-hover:opacity-100 hover:text-red-600"
                >
                  ✕
                </button>
              </div>

              {/* ERROR */}
              {errors?.skills?.[index]?.skillName && (
                <p className="mt-3 pb-2 text-sm text-red-600">
                  {errors?.skills?.[index]?.skillName?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ADD SKILL */}
        <Button
          type="button"
          variant="outline"
          className="w-fit rounded-xl border border-[#183D3D]/20 bg-[#e9fff0]/60 px-4 py-2 text-sm font-medium text-[#183D3D] shadow-none transition-all duration-200 hover:border-[#183D3D]/35 hover:bg-[#e9fff0] hover:shadow-sm focus-visible:ring-2 focus-visible:ring-[#183D3D]/25"
          onClick={() => append({ skillName: "" })}
        >
          + Add Skill
        </Button>
      </div>
    </div>
  );
};
