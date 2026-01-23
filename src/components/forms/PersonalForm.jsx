import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
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
import { Textarea } from "../ui/textarea";
const PersonalForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "personalDetails.socials",
  });

  return (
    <div className="rounded-3xl bg-white/60 p-3 shadow-sm md:p-6">
      <div className="flex w-full flex-col bg-transparent">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 rounded-2xl bg-[#e9fff0]/30 p-4">
            <div className="flex gap-3 max-md:flex-col md:flex-row">
              <div className="flex flex-1 flex-col gap-3">
                <Label
                  className={"text-sm font-medium text-slate-600"}
                  htmlFor="name"
                >
                  Full Name
                </Label>

                <div className="flex flex-col gap-y-1">
                  <Input
                    className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                    placeholder="Enter your name"
                    {...register("personalDetails.fullName", {})}
                  />

                  {errors.personalDetails?.fullName && (
                    <p className="mt-2 pb-2 text-sm text-red-600">
                      {errors.personalDetails.fullName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3">
                <Label
                  className={"text-sm font-medium text-slate-600"}
                  htmlFor="email"
                >
                  Email
                </Label>

                <div className="flex flex-col gap-y-1">
                  <Input
                    className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                    placeholder="Enter your email"
                    {...register("personalDetails.email", {})}
                  />
                  {errors.personalDetails?.email && (
                    <p className="mt-2 pb-2 text-sm text-red-600">
                      {errors.personalDetails.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Label
              className={"mt-1 text-sm font-medium text-slate-600"}
              htmlFor="phone"
            >
              Phone Number (With Country Code)
            </Label>

            <div className="flex flex-col gap-y-1">
              <Input
                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="Eg. +919123860265"
                type={"text"}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    ![
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                      "+",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                {...register("personalDetails.phone", {})}
              />
              {errors.personalDetails?.phone && (
                <p className="mt-2 pb-2 text-sm text-red-600">
                  {errors.personalDetails.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl bg-[#e9fff0]/30 p-4">
            <Label
              className={"text-sm font-medium text-slate-600"}
              htmlFor="Address"
            >
              Address
            </Label>

            <div className="flex flex-col gap-y-1">
              <Textarea
                className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="Enter your address"
                {...register("personalDetails.address", {})}
              />
              {errors.personalDetails?.address && (
                <p className="mt-2 pb-2 text-sm text-red-600">
                  {errors.personalDetails.address.message}
                </p>
              )}
            </div>

            <Label
              className={"text-sm font-medium text-slate-600"}
              htmlFor="About"
            >
              About Me
            </Label>

            <div className="flex flex-col gap-y-1">
              <Textarea
                className="min-h-[120px] rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                placeholder="Brief professional summary (2–4 lines)"
                {...register("personalDetails.about", {})}
              />
              {errors.personalDetails?.about && (
                <p className="mt-2 pb-2 text-sm text-red-600">
                  {errors.personalDetails.about.message}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-[#F7FAF8] p-4">
            {/* socials grid */}

            <div className="flex flex-col gap-3 rounded-2xl bg-[#e9fff0]/30 p-0">
              <Label
                className={"text-sm font-medium text-slate-600"}
                htmlFor="socials"
              >
                Social Links
              </Label>
              <div className={`grid grid-cols-1 gap-3 md:gap-x-8 md:gap-y-3`}>
                {fields.map((obj, index) => (
                  <div key={obj.id} className="gap-x-1">
                    <div className="flex items-center gap-x-3">
                      <Input
                        className="rounded-xl border-slate-300 bg-[#F3F7F5] focus:ring-2 focus:ring-[#183D3D]/30"
                        placeholder="Link"
                        {...register(`personalDetails.socials.${index}.link`)}
                        onKeyDown={(e) => {
                          if (e.key === " ") {
                            e.preventDefault();
                          }
                        }}
                      />

                      <Controller
                        name={`personalDetails.socials.${index}.name`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value ?? ""}
                          >
                            <SelectTrigger
                              className={
                                "rounded-xl border-slate-300 bg-[#F3F7F5] shadow-none focus:ring-2 focus:ring-[#183D3D]/30"
                              }
                            >
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent
                              className={"rounded-sm border-0 bg-white"}
                            >
                              <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
                              <SelectItem value="GITHUB">GitHub</SelectItem>
                              <SelectItem value="INSTAGRAM">
                                Instagram
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />

                      <div className={`pl-2`}>
                        <Button
                          className={
                            "text-red-600 hover:cursor-pointer hover:bg-red-50"
                          }
                          type="button"
                          // variant="destructive"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div>
                      {errors.personalDetails?.socials?.[index]?.link && (
                        <p className="mt-2 pb-2 text-sm text-red-600">
                          {errors.personalDetails.socials?.[index].link.message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-[#183D3D] text-[#183D3D] hover:cursor-pointer hover:bg-[#183D3D] hover:text-white"
                onClick={() => append({ name: "LINKEDIN" })}
              >
                + Add Social
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalForm;
