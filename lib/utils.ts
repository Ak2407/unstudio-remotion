import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getVideoDuration = (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.addEventListener("loadedmetadata", () => {
      const duration = video.duration;
      if (!isNaN(duration) && duration > 0) {
        console.log(duration);
        resolve(duration);
      } else {
        reject(new Error("Failed to get video duration"));
      }
    });

    video.addEventListener("error", (error) => {
      reject(new Error("Error loading video: " + error.message));
    });

    video.src = url;
  });
};
