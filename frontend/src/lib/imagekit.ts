export function imageKit(src: string, width = 1200) {
  if (!src.includes("ik.imagekit.io")) return src;
  return src.replace("/tr:w-1400,fo-auto/", `/tr:w-${width},fo-auto,f-webp/`);
}
