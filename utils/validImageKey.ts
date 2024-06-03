export function isValidImageFilename(filename: string): boolean {
  const validExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "tiff"];

  const pattern = new RegExp(`^.+\\.(${validExtensions.join("|")})$`, "i");

  return pattern.test(filename);
}
