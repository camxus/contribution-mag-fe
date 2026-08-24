"use client";

import { useEffect, useState } from "react";

export function useImageContrast(src: string) {
  const [tone, setTone] = useState<"light" | "dark">("light");

  useEffect(() => {
    let active = true;
    const image = new Image();
    image.crossOrigin = "anonymous";
    const detect = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;
      const size = 32;
      canvas.width = size;
      canvas.height = size;
      try {
        context.drawImage(image, 0, 0, size, size);
        const pixels = context.getImageData(0, 0, size, size).data;
        let luminance = 0;
        for (let index = 0; index < pixels.length; index += 4) {
          luminance +=
            (0.2126 * pixels[index] +
              0.7152 * pixels[index + 1] +
              0.0722 * pixels[index + 2]) /
            255;
        }
        if (active)
          setTone(luminance / (pixels.length / 4) > 0.56 ? "dark" : "light");
      } catch {
        if (active) setTone("dark");
      }
    };
    image.onload = detect;
    image.onerror = () => {
      if (active) setTone("light");
    };
    image.src = src;
    if (image.complete) detect();
    return () => {
      active = false;
    };
  }, [src]);

  return tone;
}
