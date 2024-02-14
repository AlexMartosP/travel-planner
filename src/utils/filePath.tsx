export function generateUniqueImagePath(fileType: string) {
  const extension = fileType.split("/")[1];

  return crypto.randomUUID() + "." + extension;
}
