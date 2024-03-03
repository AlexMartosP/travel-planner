const ACTIVITY_OVERVIEW_PATH = "overview";

export function generateActivityImagePath(fileType: string) {
  const extension = fileType.split("/")[1];

  return `${ACTIVITY_OVERVIEW_PATH}_${crypto.randomUUID()}.${extension}`;
}
