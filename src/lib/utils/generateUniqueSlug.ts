import { generateSlug } from "./generateSlug";

export function generateUniqueSlug(title: string, existingSlug: string[]) {
  const baseSlug = generateSlug(title);
  let slug = baseSlug;
  let count = 1;

  while (existingSlug.includes(slug)) {
    count += 1;
    slug = `${baseSlug}-${count}`;
  }
  return slug;
}
