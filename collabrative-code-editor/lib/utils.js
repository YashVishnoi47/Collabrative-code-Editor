import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function formatDate(isoString) {
  const date = new Date(isoString);

  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
    // hour12: true,
  }}