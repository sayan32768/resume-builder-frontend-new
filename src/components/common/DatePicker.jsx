"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function toYMD(date) {
  if (!(date instanceof Date)) return null;

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

function fromYMD(value) {
  if (!value) return undefined;

  // Already a Date (happens on reset / hydration)
  if (value instanceof Date) {
    return value;
  }

  // Expect YYYY-MM-DD string
  if (typeof value === "string") {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  return undefined;
}

export function DatePicker({ field }) {
  const [open, setOpen] = React.useState(false);

  const selectedDate = React.useMemo(() => fromYMD(field.value), [field.value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-between rounded-xl border-slate-300 bg-[#F3F7F5] font-normal hover:cursor-pointer focus:ring-2 focus:ring-[#183D3D]/30"
        >
          {field.value
            ? new Date(field.value).toLocaleDateString()
            : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto overflow-hidden rounded-lg border bg-white p-0 shadow-md"
        align="start"
      >
        <Calendar
          endMonth={new Date(2050, 12)}
          mode="single"
          selected={selectedDate}
          captionLayout="dropdown"
          onSelect={(date) => {
            if (!date) {
              field.onChange(null);
            } else {
              field.onChange(toYMD(date)); // ✅ STRING, NOT Date
            }
            setOpen(false);
          }}
        />

        <Button
          variant="outline"
          className="m-3"
          onClick={() => {
            field.onChange(null);
            setOpen(false);
          }}
        >
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  );
}
