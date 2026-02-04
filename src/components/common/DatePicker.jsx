// "use client";

// import * as React from "react";
// import { ChevronDownIcon } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// function toYMD(date) {
//   if (!(date instanceof Date)) return null;

//   const yyyy = date.getFullYear();
//   const mm = String(date.getMonth() + 1).padStart(2, "0");
//   const dd = String(date.getDate()).padStart(2, "0");

//   return `${yyyy}-${mm}-${dd}`;
// }

// function fromYMD(value) {
//   if (!value) return undefined;

//   // Already a Date (happens on reset / hydration)
//   if (value instanceof Date) {
//     return value;
//   }

//   // Expect YYYY-MM-DD string
//   if (typeof value === "string") {
//     const [y, m, d] = value.split("-").map(Number);
//     return new Date(y, m - 1, d);
//   }

//   return undefined;
// }

// export function DatePicker({ field }) {
//   const [open, setOpen] = React.useState(false);

//   const selectedDate = React.useMemo(() => fromYMD(field.value), [field.value]);

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           className="justify-between rounded-xl border-slate-300 bg-[#F3F7F5] font-normal hover:cursor-pointer focus:ring-2 focus:ring-[#183D3D]/30"
//         >
//           {field.value
//             ? new Date(field.value).toLocaleDateString()
//             : "Select date"}
//           <ChevronDownIcon />
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent
//         className="w-auto overflow-hidden rounded-lg border bg-white p-0 shadow-md"
//         align="start"
//       >
//         <Calendar
//           endMonth={new Date(2050, 12)}
//           mode="single"
//           selected={selectedDate}
//           captionLayout="dropdown"
//           onSelect={(date) => {
//             if (!date) {
//               field.onChange(null);
//             } else {
//               field.onChange(toYMD(date)); // ✅ STRING, NOT Date
//             }
//             setOpen(false);
//           }}
//         />

//         <Button
//           variant="outline"
//           className="m-3"
//           onClick={() => {
//             field.onChange(null);
//             setOpen(false);
//           }}
//         >
//           Reset
//         </Button>
//       </PopoverContent>
//     </Popover>
//   );
// }

"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function toYMDMonthStart(date) {
  if (!(date instanceof Date)) return null;

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}-01`; // ✅ Always 1st of month
}

function fromYMDMonthStart(value) {
  if (!value) return undefined;

  // Already a Date (reset / hydration)
  if (value instanceof Date) return value;

  // Expect YYYY-MM-DD (we only care about YYYY-MM)
  if (typeof value === "string") {
    const [y, m] = value.split("-").map(Number);
    if (!y || !m) return undefined;

    // ✅ Local construction avoids timezone shift issues
    return new Date(y, m - 1, 1);
  }

  return undefined;
}

function formatMonthYear(value) {
  const d = fromYMDMonthStart(value);
  if (!d) return "Select month";

  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function DatePicker({ field }) {
  const [open, setOpen] = React.useState(false);

  const selectedDate = React.useMemo(
    () => fromYMDMonthStart(field.value),
    [field.value],
  );

  const [year, setYear] = React.useState(() =>
    selectedDate ? selectedDate.getFullYear() : new Date().getFullYear(),
  );

  // keep year in sync with selected value (important for hydration + reset)
  React.useEffect(() => {
    if (selectedDate) setYear(selectedDate.getFullYear());
  }, [selectedDate]);

  const selectedYM = React.useMemo(() => {
    if (!selectedDate) return null;
    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
    return `${yyyy}-${mm}`;
  }, [selectedDate]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="justify-between rounded-xl border-slate-300 bg-[#F3F7F5] font-normal hover:cursor-pointer focus:ring-2 focus:ring-[#183D3D]/30"
        >
          {formatMonthYear(field.value)}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto overflow-hidden rounded-lg border bg-white p-3 shadow-md"
        align="start"
      >
        {/* YEAR CONTROLS */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-8 px-3"
            onClick={() => setYear((y) => Math.max(1900, y - 1))}
          >
            Prev
          </Button>

          <div className="text-sm font-semibold">{year}</div>

          <Button
            type="button"
            variant="outline"
            className="h-8 px-3"
            onClick={() => setYear((y) => Math.min(2050, y + 1))}
          >
            Next
          </Button>
        </div>

        {/* MONTH GRID */}
        <div className="grid grid-cols-3 gap-2">
          {MONTHS.map((monthName, idx) => {
            const monthIndex = idx;
            const mm = String(monthIndex + 1).padStart(2, "0");
            const ym = `${year}-${mm}`;
            const active = selectedYM === ym;

            return (
              <Button
                key={monthName}
                type="button"
                variant={active ? "default" : "outline"}
                className="h-9 rounded-lg"
                onClick={() => {
                  // ✅ Save as YYYY-MM-01 for backend
                  const dateValue = `${year}-${mm}-01`;
                  field.onChange(dateValue);
                  setOpen(false);
                }}
              >
                {monthName}
              </Button>
            );
          })}
        </div>

        {/* RESET */}
        <Button
          type="button"
          variant="outline"
          className="mt-3 w-full"
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
