import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Controller } from "react-hook-form";
import { DatePicker } from "../common/DatePicker";
import AddButtonDotted from "../common/AddButtonDotted";

const CertificationForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });
  // return (
  //   <div className="flex flex-col bg-gray-50 w-full">
  //     {fields.map((obj, index) => (
  //       <div key={obj.id} className="flex flex-col gap-3 mb-4 rounded-xl">
  //         <h1 className="text-xl">Certification Details {index + 1}</h1>

  //         <div className="flex md:flex-col max-md:flex-col gap-3">
  //           <div className="flex flex-col gap-3 flex-1">
  //             <Label htmlFor="issuingAuthority">Issuing Authority</Label>

  //             <div className="gap-y-1 flex flex-col">
  //               <Input
  //                 placeholder="Issuing Authority"
  //                 {...register(`certifications.${index}.issuingAuthority`, {})}
  //               />

  //               {errors.certifications?.[index]?.issuingAuthority && (
  //                 <p className="pb-2 text-red-900">
  //                   {errors.certifications?.[index]?.issuingAuthority.message}
  //                 </p>
  //               )}
  //             </div>
  //           </div>

  //           <div className="flex flex-col gap-3 flex-1">
  //             <Label htmlFor="title">Title</Label>

  //             <div className="gap-y-1 flex flex-col">
  //               <Input
  //                 placeholder="Enter Certification Title"
  //                 {...register(`certifications.${index}.title`, {})}
  //               />
  //               {errors.certifications?.[index]?.title && (
  //                 <p className="pb-2 text-red-900">
  //                   {errors.certifications?.[index]?.title.message}
  //                 </p>
  //               )}
  //             </div>
  //           </div>

  //           <div className="flex flex-1 flex-col gap-y-3">
  //             <Label htmlFor="issueDate">Issue Date</Label>
  //             <div className="flex flex-col gap-y-1">
  //               <Controller
  //                 name={`certifications.${index}.issueDate`}
  //                 control={control}
  //                 render={({ field }) => <DatePicker field={field} />}
  //               />
  //               {errors.certifications?.[index]?.issueDate && (
  //                 <p className="pb-2 text-red-900">
  //                   {errors.certifications?.[index]?.issueDate.message}
  //                 </p>
  //               )}
  //             </div>
  //           </div>

  //           <div className="flex flex-col gap-3 flex-1">
  //             <Label htmlFor="link">Link</Label>

  //             <div className="gap-y-1 flex flex-col">
  //               <Input
  //                 placeholder="Enter a link"
  //                 {...register(`certifications.${index}.link`, {})}
  //                 onKeyDown={(e) => {
  //                   if (e.key === " ") {
  //                     e.preventDefault();
  //                   }
  //                 }}
  //               />
  //               {errors.certifications?.[index]?.link && (
  //                 <p className="pb-2 text-red-900">
  //                   {errors.certifications?.[index]?.link.message}
  //                 </p>
  //               )}
  //             </div>
  //           </div>
  //         </div>

  //         <Button
  //           variant={"outline"}
  //           className={`w-full mt-1 hover:bg-slate-900 hover:text-white hover:cursor-pointer`}
  //           onClick={() => remove(index)}
  //         >
  //           Remove Certification
  //         </Button>

  //         <hr
  //           className={`my-8 border-t border-gray-400 ${
  //             fields.length === 1 ? "hidden" : "block"
  //           }`}
  //         />
  //       </div>
  //     ))}

  //     {fields.length === 0 ? (
  //       <AddButtonDotted onClick={() => append()} text="+ Add Certification" />
  //     ) : (
  //       <Button
  //         variant={"outline"}
  //         className={
  //           "w-full hover:bg-slate-900 hover:text-white hover:cursor-pointer"
  //         }
  //         onClick={(e) => {
  //           e.preventDefault();
  //           append();
  //         }}
  //       >
  //         Add Certification
  //       </Button>
  //     )}

  //     {errors?.certifications && (
  //       <p className="pb-2 text-red-900">{errors.certifications?.message}</p>
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
              Certification {index + 1}
            </h2>

            {fields.length > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            )}
          </div>

          {/* Main info */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#e9fff0]/30 p-4">
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-slate-600">
                Issuing Authority
              </Label>
              <Input
                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="Issuing organization (Google, AWS, Coursera...)"
                {...register(`certifications.${index}.issuingAuthority`)}
              />
              {errors.certifications?.[index]?.issuingAuthority && (
                <p className="text-sm text-red-600">
                  {errors.certifications[index].issuingAuthority.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-slate-600">
                Certification Title
              </Label>
              <Input
                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="Certification title"
                {...register(`certifications.${index}.title`)}
              />
              {errors.certifications?.[index]?.title && (
                <p className="text-sm text-red-600">
                  {errors.certifications[index].title.message}
                </p>
              )}
            </div>
          </div>

          {/* Date + link */}
          <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-[#F7FAF8] p-4">
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-slate-600">
                Issue Date
              </Label>
              <Controller
                name={`certifications.${index}.issueDate`}
                control={control}
                render={({ field }) => <DatePicker field={field} />}
              />
              {errors.certifications?.[index]?.issueDate && (
                <p className="text-sm text-red-600">
                  {errors.certifications[index].issueDate.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-slate-600">
                Certification Link
              </Label>
              <Input
                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="https://..."
                {...register(`certifications.${index}.link`)}
                onKeyDown={(e) => {
                  if (e.key === " ") e.preventDefault();
                }}
              />
              {errors.certifications?.[index]?.link && (
                <p className="text-sm text-red-600">
                  {errors.certifications[index].link.message}
                </p>
              )}
            </div>
          </div>

          {/* Remove */}
          {/* <Button
            type="button"
            variant="outline"
            className="mt-4 rounded-xl border-red-300 text-red-600 hover:bg-red-50"
            onClick={() => remove(index)}
          >
            Remove Certification
          </Button> */}
        </div>
      ))}

      {/* Add new */}
      {fields.length === 0 ? (
        <AddButtonDotted onClick={() => append()} text="+ Add Certification" />
      ) : (
        <Button
          variant="outline"
          className="w-fit rounded-xl border border-[#183D3D]/20 bg-[#e9fff0]/60 px-4 py-2 text-sm font-medium text-[#183D3D] shadow-none transition-all duration-200 hover:border-[#183D3D]/35 hover:bg-[#e9fff0] hover:shadow-sm focus-visible:ring-2 focus-visible:ring-[#183D3D]/25"
          onClick={(e) => {
            e.preventDefault();
            append();
          }}
        >
          + Add Certification
        </Button>
      )}

      {errors?.certifications && (
        <p className="text-sm text-red-600">{errors.certifications.message}</p>
      )}
    </div>
  );
};

export default CertificationForm;
