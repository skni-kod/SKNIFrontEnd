export const MEDIA_URL: string = import.meta.env.VUE_APP_MEDIA_URL || '';

export function mediaUrl(path?: string | null): string {
  if (!path) {
    return '';
  }
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  return MEDIA_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
}
