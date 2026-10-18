const recoveredProjectImages: Record<string, string> = {
  "recovered-productivity.avif": "/images/productivity.avif",
  "recovered-booking.avif": "/images/booking.avif",
  "recovered-gaming.avif": "/images/gaming.avif",
  "recovered-calculator.avif": "/images/calculator.avif",
};

export function resolveProjectImage(
  image: string | null | undefined,
  fallback: string,
): string {
  if (!image?.trim()) {
    return fallback;
  }

  const value = image.trim();
  const isAbsoluteHttpUrl = /^https?:\/\//i.test(value);
  const isPortfolioApiMedia =
    /^https?:\/\/api\.yohannestekle\.com\/media\/projects\//i.test(value);

  // Map known recovered project images before preserving absolute URLs.
  const pathWithoutQuery = value.split(/[?#]/, 1)[0];
  const filename = pathWithoutQuery.split("/").pop()?.toLowerCase() ?? "";
  const recoveredImage = recoveredProjectImages[filename];

  if (recoveredImage && (!isAbsoluteHttpUrl || isPortfolioApiMedia)) {
    return recoveredImage;
  }

  // Preserve external URLs, including future Cloudinary URLs.
  if (/^(https?:)?\/\//i.test(value) || /^(data|blob):/i.test(value)) {
    return value;
  }

  // Preserve other existing root-relative URLs.
  if (value.startsWith("/")) {
    return value;
  }

  // Support other relative Django media paths.
  if (pathWithoutQuery.startsWith("projects/")) {
    return `/media/${pathWithoutQuery}`;
  }

  if (pathWithoutQuery.startsWith("media/")) {
    return `/${pathWithoutQuery}`;
  }

  return `/${pathWithoutQuery}`;
}
