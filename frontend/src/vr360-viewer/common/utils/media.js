export function youtubeEmbedUrl(url) {
  if (!url) return '';
  const value = String(url).trim();
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/i,
    /youtu\.be\/([^?&]+)/i,
    /youtube\.com\/embed\/([^?&/]+)/i,
    /youtube\.com\/shorts\/([^?&/]+)/i,
  ];
  const match = patterns.map((pattern) => value.match(pattern)).find(Boolean);
  return match?.[1] ? `https://www.youtube.com/embed/${match[1]}` : '';
}

export function resolveAssetUrl(url, baseUrl = '') {
  if (!url) return '';
  if (/^(blob:|data:|https?:)/i.test(url)) return url;
  return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
}
