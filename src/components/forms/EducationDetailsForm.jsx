import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePicker } from "../common/DatePicker";
import { Textarea } from "../ui/textarea";
import AddButtonDotted from "../common/AddButtonDotted";

const EducationDetailsForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "educationDetails",
  });

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
              Education {index + 1}
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

          {/* INSTITUTION + DEGREE */}
          <div className="flex flex-row gap-4 rounded-2xl bg-[#e9fff0]/30 p-4">
            <div className="flex flex-1 flex-col gap-2">
              <Label className="text-sm font-medium text-slate-600">
                Institution Name
              </Label>
              <Input
                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="University / College"
                {...register(`educationDetails.${index}.name`)}
              />
              {errors.educationDetails?.[index]?.name && (
                <p className="ml-1 text-sm text-red-600">
                  {errors.educationDetails[index].name.message}
                </p>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <Label className="text-sm font-medium text-slate-600">
                Degree
              </Label>
              <Input
                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="B.Tech, B.Sc, M.Sc"
                {...register(`educationDetails.${index}.degree`)}
              />
              {errors.educationDetails?.[index]?.degree && (
                <p className="ml-4 text-sm text-red-600">
                  {errors.educationDetails[index].degree.message}
                </p>
              )}
            </div>
          </div>

          {/* SCORE + TYPE */}
          <div className="flex flex-row gap-4 rounded-2xl bg-[#e9fff0]/30 p-4">
            <div className="flex flex-1 flex-col gap-2">
              <Label className="text-sm font-medium text-slate-600">
                Score
              </Label>
              <Input
                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="8.5 / 85"
                {...register(`educationDetails.${index}.grades.score`)}
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <Label className="text-sm font-medium text-slate-600">
                Grade Type
              </Label>
              <Controller
                name={`educationDetails.${index}.grades.type`}
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-sm border-0 bg-white">
                      <SelectItem value="CGPA">CGPA</SelectItem>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {errors.educationDetails?.[index]?.grades && (
            <p className="ml-4 text-sm text-red-600">
              {errors.educationDetails[index].grades.message ??
                "Invalid grade details"}
            </p>
          )}

          {/* ADDITIONAL INFO */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#e9fff0]/30 p-4">
            <Label className="text-sm font-medium text-slate-600">
              Additional Info
            </Label>
            <Textarea
              className="min-h-[100px] rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
              placeholder="Honors, specialization, achievements"
              {...register(`educationDetails.${index}.grades.message`)}
            />
            {errors.educationDetails?.[index]?.grades?.message && (
              <p className="ml-4 text-sm text-red-600">
                {errors.educationDetails[index].grades.message.message}
              </p>
            )}
          </div>

          {/* DATES */}
          <div className="flex flex-row gap-4 rounded-2xl bg-[#e9fff0]/30 p-4">
            <div className="flex flex-1 flex-col gap-2">
              <Label className="text-sm font-medium text-slate-600">
                Start Date
              </Label>
              <Controller
                name={`educationDetails.${index}.dates.startDate`}
                control={control}
                render={({ field }) => <DatePicker field={field} />}
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <Label className="text-sm font-medium text-slate-600">
                End Date
              </Label>
              <Controller
                name={`educationDetails.${index}.dates.endDate`}
                control={control}
                render={({ field }) => <DatePicker field={field} />}
              />
            </div>
          </div>

          {errors.educationDetails?.[index]?.dates && (
            <p className="ml-4 text-sm text-red-600">
              {errors.educationDetails[index].dates.message}
            </p>
          )}

          {/* LOCATION */}
          <div className="flex flex-col gap-4 rounded-2xl bg-[#e9fff0]/30 p-4">
            <Label className="text-sm font-medium text-slate-600">
              Location
            </Label>
            <Textarea
              className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
              placeholder="City, Country"
              {...register(`educationDetails.${index}.location`)}
            />
            {errors.educationDetails?.[index]?.location && (
              <p className="ml-4 text-sm text-red-600">
                {errors.educationDetails[index].location.message}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* ADD EDUCATION */}
      {fields.length === 0 ? (
        <AddButtonDotted
          onClick={(e) => {
            e.preventDefault();
            append();
          }}
          text="+ Add Education"
        />
      ) : (
        <Button
          type="button"
          variant="outline"
          className="rounded-xl border-[#183D3D] text-[#183D3D] hover:bg-[#183D3D] hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            append();
          }}
        >
          + Add Education
        </Button>
      )}

      {errors?.educationDetails && (
        <p className="text-sm text-red-600">
          {errors.educationDetails.message}
        </p>
      )}
    </div>
  );
};

export default EducationDetailsForm;
