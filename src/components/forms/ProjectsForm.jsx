import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AddButtonDotted from "../common/AddButtonDotted";
import { Textarea } from "../ui/textarea";

// const LinksSection = ({ index }) => {
//   const {
//     control,
//     register,
//     formState: { errors },
//   } = useFormContext();

//   const {
//     fields: linkFields,
//     append: linkAppend,
//     remove: linkRemove,
//   } = useFieldArray({
//     control,
//     name: `projects.${index}.links`,
//   });

//   return (
//     <div className="flex flex-col gap-y-3">
//       {linkFields.map((object, idx) => (
//         <div key={object.id} className="flex flex-col gap-3">
//           <Label>Project Link</Label>

//           <div className="flex flex-col gap-y-1">
//             <div className="flex flex-row gap-x-3">
//               <Input
//                 placeholder={`Project Link ${idx + 1}`}
//                 {...register(`projects.${index}.links.${idx}.link`, {})}
//                 onKeyDown={(e) => {
//                   if (e.key === " ") {
//                     e.preventDefault();
//                   }
//                 }}
//               />

//               <div className={`pl-2`}>
//                 <Button
//                   className={"text-black hover:cursor-pointer"}
//                   type="button"
//                   variant="destructive"
//                   size="icon"
//                   onClick={() => linkRemove(idx)}
//                 >
//                   Remove
//                 </Button>
//               </div>
//             </div>
//             {errors.projects?.[index]?.links?.[idx]?.link && (
//               <p className="text-red-900">
//                 {errors.projects?.[index]?.links?.[idx]?.link.message}
//               </p>
//             )}
//           </div>
//         </div>
//       ))}

//       <Button
//         type="button"
//         variant={"outline"}
//         className={
//           "w-full hover:cursor-pointer hover:bg-slate-900 hover:text-white"
//         }
//         onClick={() => linkAppend({ link: "" })}
//       >
//         + Add Link
//       </Button>
//     </div>
//   );
// };

const LinksSection = ({ index }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const {
    fields: linkFields,
    append: linkAppend,
    remove: linkRemove,
  } = useFieldArray({
    control,
    name: `projects.${index}.links`,
  });

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-slate-600">Project Links</h3>

      <div className="flex flex-col gap-3">
        {linkFields.map((object, idx) => (
          <div key={object.id} className="flex flex-col gap-3">
            <div className="group flex items-center gap-2 rounded-xl bg-[#F3F7F5] p-3 shadow-sm focus-within:ring-2 focus-within:ring-[#183D3D]/30">
              <Input
                className="border-none bg-transparent p-0 text-sm focus-visible:ring-0"
                placeholder={`https://example.com`}
                {...register(`projects.${index}.links.${idx}.link`)}
                onKeyDown={(e) => {
                  if (e.key === " ") e.preventDefault();
                }}
              />

              <button
                type="button"
                onClick={() => linkRemove(idx)}
                className="text-xs text-slate-400 opacity-0 transition group-hover:opacity-100 hover:text-red-600"
              >
                ✕
              </button>
            </div>

            {errors.projects?.[index]?.links?.[idx]?.link && (
              <p className="mt-1 pb-2 text-sm text-red-600">
                {errors.projects[index].links?.[idx]?.link.message}
              </p>
            )}
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-fit rounded-xl border border-[#183D3D]/20 bg-[#e9fff0]/60 px-4 py-2 text-sm font-medium text-[#183D3D] shadow-none transition-all duration-200 hover:border-[#183D3D]/35 hover:bg-[#e9fff0] hover:shadow-sm focus-visible:ring-2 focus-visible:ring-[#183D3D]/25"
        onClick={() => linkAppend({ link: "" })}
      >
        + Add Link
      </Button>
    </div>
  );
};

const ProjectsForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  // return (
  //   <div className="flex flex-col gap-y-5">
  //     {fields.map((obj, index) => {
  //       return (
  //         <div key={obj.id}>
  //           <h1 className="text-xl mb-3">Project {index + 1} Details</h1>
  //           <div className="flex flex-col gap-y-3 rounded-2xl">
  //             <Label>Project Title</Label>
  //             <div className="flex flex-col gap-y-1">
  //               <Input {...register(`projects.${index}.title`, {})} />
  //               {errors.projects?.[index]?.title && (
  //                 <p className="text-red-900">
  //                   {errors.projects?.[index]?.title?.message}
  //                 </p>
  //               )}
  //             </div>

  //             <Label>Project Description</Label>
  //             <div className="flex flex-col gap-y-1">
  //               <Textarea {...register(`projects.${index}.description`, {})} />
  //               {errors.projects?.[index]?.description && (
  //                 <p className="text-red-900">
  //                   {errors.projects?.[index]?.description?.message}
  //                 </p>
  //               )}
  //             </div>

  //             <Label>Extra Details</Label>
  //             <div className="flex flex-col gap-y-1">
  //               <Textarea {...register(`projects.${index}.extraDetails`, {})} />
  //               {errors.projects?.[index]?.extraDetails && (
  //                 <p className="text-red-900">
  //                   {errors.projects?.[index]?.extraDetails?.message}
  //                 </p>
  //               )}
  //             </div>

  //             <LinksSection index={index} />

  //             <Button
  //               type="button"
  //               variant={"outline"}
  //               className={
  //                 "w-full hover:bg-slate-900 hover:text-white hover:cursor-pointer"
  //               }
  //               onClick={() => remove(index)}
  //             >
  //               Remove Project
  //             </Button>

  //             <hr
  //               className={`my-8 border-t border-gray-400 ${
  //                 fields.length === 1 ? "hidden" : "block"
  //               }`}
  //             />
  //           </div>
  //         </div>
  //       );
  //     })}

  //     {fields.length === 0 ? (
  //       <AddButtonDotted onClick={() => append()} text="+ Add Project" />
  //     ) : (
  //       <Button
  //         type="button"
  //         variant={"outline"}
  //         className={"hover:bg-slate-900 hover:text-white hover:cursor-pointer"}
  //         onClick={(e) => {
  //           e.preventDefault();
  //           append();
  //         }}
  //       >
  //         + Add Project
  //       </Button>
  //     )}
  //   </div>
  // );

  return (
    <div className="flex flex-col gap-4">
      {fields.map((obj, index) => (
        <div
          key={obj.id}
          className="rounded-3xl bg-white/60 p-4 shadow-sm md:p-6"
        >
          {/* HEADER */}
          <div className="flex flex-row justify-between gap-4 rounded-2xl bg-[#e9fff0]/30 p-4">
            <h2 className="text-sm font-semibold text-[#183D3D]">
              Project {index + 1}
            </h2>

            {fields.length > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4 rounded-2xl bg-[#e9fff0]/30 p-4">
            {/* PROJECT TITLE */}
            <div>
              <Label className="text-sm font-medium text-slate-600">
                Project Title
              </Label>
              <Input
                className="mt-2 rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="Project name"
                {...register(`projects.${index}.title`)}
              />
              {errors.projects?.[index]?.title && (
                <p className="mt-3 pb-2 text-sm text-red-600">
                  {errors.projects[index].title.message}
                </p>
              )}
            </div>

            {/* PROJECT DESCRIPTION */}
            <div>
              <Label className="text-sm font-medium text-slate-600">
                Project Description
              </Label>
              <Textarea
                className="mt-2 min-h-[120px] rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="What problem did you solve? What was your role?"
                {...register(`projects.${index}.description`)}
              />
              {errors.projects?.[index]?.description && (
                <p className="mt-3 pb-2 text-sm text-red-600">
                  {errors.projects[index].description.message}
                </p>
              )}
            </div>

            {/* EXTRA DETAILS */}
            <div>
              <Label className="text-sm font-medium text-slate-600">
                Extra Details
              </Label>
              <Textarea
                className="mt-2 rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="Tech stack, impact, metrics, links, etc."
                {...register(`projects.${index}.extraDetails`)}
              />
              {errors.projects?.[index]?.extraDetails && (
                <p className="mt-3 pb-2 text-sm text-red-600">
                  {errors.projects[index].extraDetails.message}
                </p>
              )}
            </div>

            {/* LINKS */}
            <div className="rounded-xl bg-[#F7FAF8] p-4">
              <LinksSection index={index} />
            </div>
          </div>
        </div>
      ))}

      {/* ADD PROJECT */}
      {fields.length === 0 ? (
        <AddButtonDotted
          onClick={(e) => {
            e.preventDefault();
            append();
          }}
          text="+ Add Project"
        />
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-fit rounded-xl border border-[#183D3D]/20 bg-[#e9fff0]/60 px-4 py-2 text-sm font-medium text-[#183D3D] shadow-none transition-all duration-200 hover:border-[#183D3D]/35 hover:bg-[#e9fff0] hover:shadow-sm focus-visible:ring-2 focus-visible:ring-[#183D3D]/25"
          onClick={(e) => {
            e.preventDefault();
            append();
          }}
        >
          + Add Project
        </Button>
      )}
    </div>
  );
};

export default ProjectsForm;
