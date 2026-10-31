/**
 * Accept only absolute HTTPS URLs for external project links.
 * Reject malformed URLs and URLs containing embedded credentials.
 */
export function getSafeHttpsUrl(
  value: string | null | undefined,
): string | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value.trim());

    if (
      url.protocol !== "https:" ||
      !url.hostname ||
      url.username ||
      url.password
    ) {
      return undefined;
    }

    return url.href;
  } catch {
    return undefined;
  }
}
