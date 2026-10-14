// Panorama files coming straight off a 360° camera/drone can be 50-70MB at
// 15000px+ wide. Chiến lược resize cho ảnh 360:
//   - Cách 1: ảnh đã đủ nhỏ & không cần thu → GIỮ NGUYÊN (không re-encode),
//     bảo toàn chất lượng + định dạng gốc.
//   - Cách 4: khi phải thu nhỏ theo tỉ lệ lớn, dùng thu-nhỏ-nhiều-bước
//     (halving) + imageSmoothingQuality:"high" cho ảnh nét, ít răng cưa.
// Trần hiển thị thực tế do GPU quyết định (xem PreviewEngine.MAX_TEXTURE_SIZE).

// Thu nhỏ chất lượng cao bằng cách halve dần tới khi trong phạm vi 2x mục tiêu,
// rồi bước cuối về đúng kích thước. Kỹ thuật này tránh răng cưa/mờ mà một lần
// drawImage t? l? l?n hay g�y ra.
function highQualityDownscale(source, targetW, targetH) {
  let curW = source.width;
  let curH = source.height;
  let src = source; // ImageBitmap cho bước đầu, sau đó là canvas
  let canvas = null;

  while (curW > targetW * 2) {
    const nextW = Math.max(targetW, Math.round(curW / 2));
    const nextH = Math.max(targetH, Math.round(curH / 2));
    const c = document.createElement("canvas");
    c.width = nextW;
    c.height = nextH;
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(src, 0, 0, nextW, nextH);
    src = c;
    canvas = c;
    curW = nextW;
    curH = nextH;
  }

  // Bước cuối về đúng kích thước (hoặc re-encode full-res khi không thu nhỏ).
  if (canvas === null || curW !== targetW || curH !== targetH) {
    const cf = document.createElement("canvas");
    cf.width = targetW;
    cf.height = targetH;
    const ctx = cf.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(src, 0, 0, targetW, targetH);
    canvas = cf;
  }
  return canvas;
}

// Formats that can carry transparency. Re-encoding one of these to JPEG
// flattens the alpha channel to black, which silently ruins a logo PNG.
const ALPHA_CAPABLE = /^image\/(png|webp|gif|avif)$/i;

/** Output format that preserves whatever the source file could carry. */
export function preservingMimeType(file) {
  return ALPHA_CAPABLE.test(file?.type || '') ? 'image/png' : 'image/jpeg';
}

export async function resizeImageFile(
  file,
  { maxWidth = 8192, quality = 0.92, skipBytes = 8 * 1024 * 1024, mimeType = 'image/jpeg' } = {},
) {
  const bmp = await createImageBitmap(file);
  const origWidth = bmp.width;
  const origHeight = bmp.height;

  const needsDownscale = maxWidth > 0 && origWidth > maxWidth;

  // Cách 1: ảnh không cần thu nhỏ VÀ dung lượng đã ổn → giữ nguyên file gốc.
  // Ví dụ 4000×3000 / 3MB thì không đụng tới.
  if (!needsDownscale && file.size <= skipBytes) {
    bmp.close();
    return { file, width: origWidth, height: origHeight, originalSize: file.size, resizedSize: file.size, resized: false };
  }

  let targetW = origWidth;
  let targetH = origHeight;
  if (needsDownscale) {
    targetW = maxWidth;
    targetH = Math.round(origHeight * (maxWidth / origWidth));
  }

  // Cách 4: thu nhỏ nhiều bước cho ảnh nét (hoặc re-encode full-res khi
  // needsDownscale=false nhưng file quá nặng > skipBytes).
  const canvas = highQualityDownscale(bmp, targetW, targetH);
  bmp.close();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, mimeType, quality));

  // Never make things worse: nếu re-encode không nhỏ hơn (ảnh đã tối ưu),
  // giữ file gốc.
  if (!blob || blob.size >= file.size) {
    return { file, width: origWidth, height: origHeight, originalSize: file.size, resizedSize: file.size, resized: false };
  }

  const extension = mimeType === "image/png" ? ".png" : mimeType === "image/webp" ? ".webp" : ".jpg";
  const outName = file.name.replace(/\.[^.]+$/, "") + extension;
  const outFile = new File([blob], outName, { type: mimeType, lastModified: Date.now() });
  return { file: outFile, width: targetW, height: targetH, originalSize: file.size, resizedSize: outFile.size, resized: true };
}

export function formatBytes(n) {
  if (!n && n !== 0) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
