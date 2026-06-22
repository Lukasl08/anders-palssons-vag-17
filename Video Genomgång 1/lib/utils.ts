import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Slå ihop Tailwind-klasser utan konflikter (shadcn-konvention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
