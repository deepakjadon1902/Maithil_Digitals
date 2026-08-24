import sharp from "sharp";
export async function optimizeImageForWeb(file) {
    const baseName = file.originalname.replace(/\.[^.]+$/, "");
    const buffer = await sharp(file.buffer, { failOn: "none" })
        .rotate()
        .resize({
        width: 1920,
        height: 1920,
        fit: "inside",
        withoutEnlargement: true
    })
        .webp({
        quality: 78,
        effort: 5,
        smartSubsample: true
    })
        .toBuffer();
    return {
        buffer,
        fileName: `${sanitizeBaseName(baseName)}.webp`,
        mimeType: "image/webp",
        originalSize: file.size,
        optimizedSize: buffer.length
    };
}
export function buildOptimizedVideoUrl(url) {
    if (!url.includes("ik.imagekit.io"))
        return url;
    return url.replace(/\/([^/]+)$/, "/tr:q-auto,f-auto,vc-auto/$1");
}
function sanitizeBaseName(name) {
    return name.toLowerCase().replace(/[^a-z0-9\-_]+/g, "-").replace(/^-+|-+$/g, "") || "media";
}
