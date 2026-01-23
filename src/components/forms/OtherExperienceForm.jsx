import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DatePicker } from "../common/DatePicker";
import AddButtonDotted from "../common/AddButtonDotted";
import { Textarea } from "../ui/textarea";

const OtherExperienceForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "otherExperience",
  });

  // return (
  //   <div className="flex flex-col bg-gray-50 w-full">
  //     {fields.map((obj, index) => (
  //       <div key={obj.id} className="flex flex-col gap-3 p-0 mb-4 rounded-xl">
  //         <h1 className="text-xl">Other Experience Details {index + 1}</h1>

  //         <div className="flex flex-col gap-3">
  //           <div className="flex flex-col gap-3 flex-1">
  //             <Label htmlFor="companyName">Organization Name</Label>

  //             <div className="gap-y-1 flex flex-col">
  //               <Input
  //                 placeholder="Organization Name"
  //                 {...register(`otherExperience.${index}.companyName`, {})}
  //               />

  //               {errors.otherExperience?.[index]?.companyName && (
  //                 <p className="pb-2 text-red-900">
  //                   {errors.otherExperience?.[index]?.companyName?.message}
  //                 </p>
  //               )}
  //             </div>
  //           </div>

  //           <div className="flex flex-col gap-3 flex-1">
  //             <Label htmlFor="companyAddress">Organization Address</Label>

  //             <div className="gap-y-1 flex flex-col">
  //               <Textarea
  //                 placeholder="Enter organization address"
  //                 {...register(`otherExperience.${index}.companyAddress`, {})}
  //               />
  //               {errors.otherExperience?.[index]?.companyAddress && (
  //                 <p className="pb-2 text-red-900">
  //                   {errors.otherExperience?.[index]?.companyAddress?.message}
  //                 </p>
  //               )}
  //             </div>
  //           </div>
  //         </div>

  //         <div className="flex flex-col gap-y-1">
  //           <div className="flex flex-row space-x-3">
  //             <div className="flex flex-col gap-3 flex-3">
  //               <Label htmlFor="position">Your Role</Label>

  //               <Input
  //                 placeholder="Enter your role"
  //                 {...register(`otherExperience.${index}.position`, {})}
  //               />
  //             </div>
  //           </div>

  //           {errors.otherExperience?.[index]?.position && (
  //             <p className="pb-2 text-red-900">
  //               {errors.otherExperience?.[index]?.position?.message}
  //             </p>
  //           )}
  //         </div>

  //         <div className="flex flex-col gap-1">
  //           <div className="flex flex-row gap-x-3">
  //             <div className="flex flex-1 flex-col gap-y-3">
  //               <Label htmlFor="startDate">Start Date</Label>
  //               <div className="flex flex-col gap-y-1">
  //                 <Controller
  //                   name={`otherExperience.${index}.dates.startDate`}
  //                   control={control}
  //                   render={({ field }) => <DatePicker field={field} />}
  //                 />
  //               </div>
  //             </div>

  //             <div className="flex flex-1 flex-col gap-y-3">
  //               <Label htmlFor="endDate">End Date</Label>

  //               <div className="flex flex-col gap-y-1">
  //                 <Controller
  //                   name={`otherExperience.${index}.dates.endDate`}
  //                   control={control}
  //                   render={({ field }) => <DatePicker field={field} />}
  //                 />
  //               </div>
  //             </div>
  //           </div>

  //           {errors.otherExperience?.[index]?.dates && (
  //             <p className="pb-2 text-red-900">
  //               {errors.otherExperience?.[index]?.dates.message}
  //             </p>
  //           )}
  //         </div>

  //         <Label htmlFor="workDescription">Description</Label>

  //         <div className="gap-y-1 flex flex-col">
  //           <Textarea
  //             placeholder="Description"
  //             {...register(`otherExperience.${index}.workDescription`, {})}
  //           />
  //           {errors.otherExperience?.[index]?.workDescription && (
  //             <p className="pb-2 text-red-900">
  //               {errors.otherExperience?.[index]?.workDescription.message}
  //             </p>
  //           )}
  //         </div>

  //         <Button
  //           variant={"outline"}
  //           className={`w-full mt-1 hover:bg-slate-900 hover:text-white hover:cursor-pointer`}
  //           onClick={() => remove(index)}
  //         >
  //           Remove Experience
  //         </Button>

  //         <hr
  //           className={`my-8 border-t border-gray-400 ${
  //             fields.length === 1 ? "hidden" : "block"
  //           }`}
  //         />
  //       </div>
  //     ))}

  //     {fields.length === 0 ? (
  //       <AddButtonDotted
  //         onClick={(e) => {
  //           e.preventDefault();
  //           append();
  //         }}
  //         text="+ Add Other Experience"
  //       />
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
  //         + Add Other Experience
  //       </Button>
  //     )}

  //     {errors?.otherExperience && (
  //       <p className="pb-2 text-red-900">{errors.otherExperience.message}</p>
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
              Other Experience {index + 1}
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

          {/* Organization Info */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#e9fff0]/30 p-4">
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-slate-600">
                Organization Name
              </Label>
              <Input
                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="Organization Name"
                {...register(`otherExperience.${index}.companyName`)}
              />
              {errors.otherExperience?.[index]?.companyName && (
                <p className="text-sm text-red-600">
                  {errors.otherExperience[index].companyName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-slate-600">
                Organization Address
              </Label>
              <Textarea
                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="Address"
                {...register(`otherExperience.${index}.companyAddress`)}
              />
              {errors.otherExperience?.[index]?.companyAddress && (
                <p className="text-sm text-red-600">
                  {errors.otherExperience[index].companyAddress.message}
                </p>
              )}
            </div>
          </div>

          {/* Role + Dates */}
          <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-[#F7FAF8] p-4">
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-slate-600">
                Your Role
              </Label>
              <Input
                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="Your role or responsibility"
                {...register(`otherExperience.${index}.position`)}
              />
              {errors.otherExperience?.[index]?.position && (
                <p className="text-sm text-red-600">
                  {errors.otherExperience[index].position.message}
                </p>
              )}
            </div>

            <div className="flex gap-3 max-md:flex-col">
              <div className="flex flex-1 flex-col gap-2">
                <Label className="text-sm font-medium text-slate-600">
                  Start Date
                </Label>
                <Controller
                  name={`otherExperience.${index}.dates.startDate`}
                  control={control}
                  render={({ field }) => <DatePicker field={field} />}
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <Label className="text-sm font-medium text-slate-600">
                  End Date
                </Label>
                <Controller
                  name={`otherExperience.${index}.dates.endDate`}
                  control={control}
                  render={({ field }) => <DatePicker field={field} />}
                />
              </div>
            </div>

            {errors.otherExperience?.[index]?.dates && (
              <p className="text-sm text-red-600">
                {errors.otherExperience[index].dates.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-[#e9fff0]/30 p-4">
            <Label className="text-sm font-medium text-slate-600">
              Description
            </Label>
            <Textarea
              className="min-h-[100px] rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
              placeholder="What did you do? What impact did you make?"
              {...register(`otherExperience.${index}.workDescription`)}
            />
            {errors.otherExperience?.[index]?.workDescription && (
              <p className="text-sm text-red-600">
                {errors.otherExperience[index].workDescription.message}
              </p>
            )}
          </div>

          {/* Remove */}
          {/* <Button
            type="button"
            variant="outline"
            className="mt-4 rounded-xl border-red-300 text-red-600 hover:bg-red-50"
            onClick={() => remove(index)}
          >
            Remove Experience
          </Button> */}
        </div>
      ))}

      {/* Add new */}
      {fields.length === 0 ? (
        <AddButtonDotted
          onClick={(e) => {
            e.preventDefault();
            append();
          }}
          text="+ Add Other Experience"
        />
      ) : (
        <Button
          variant="outline"
          className="rounded-xl border-[#183D3D] text-[#183D3D] hover:bg-[#183D3D] hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            append();
          }}
        >
          + Add Other Experience
        </Button>
      )}

      {errors?.otherExperience && (
        <p className="text-sm text-red-600">{errors.otherExperience.message}</p>
      )}
    </div>
  );
};

export default OtherExperienceForm;
