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

  // Preserve absolute URLs, including future Cloudinary URLs.
  if (/^(https?:)?\/\//i.test(value) || /^(data|blob):/i.test(value)) {
    return value;
  }

  // Preserve existing root-relative URLs.
  if (value.startsWith("/")) {
    return value;
  }

  const pathWithoutQuery = value.split(/[?#]/, 1)[0];
  const filename = pathWithoutQuery.split("/").pop()?.toLowerCase() ?? "";
  const recoveredImage = recoveredProjectImages[filename];

  if (recoveredImage) {
    return recoveredImage;
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
