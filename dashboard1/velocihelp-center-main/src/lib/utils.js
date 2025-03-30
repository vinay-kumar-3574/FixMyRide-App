import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { HelpCircle, Upload } from "lucide-react"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
