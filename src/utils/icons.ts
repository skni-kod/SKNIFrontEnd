const RENAMED: Record<string, string> = {
  'google-controller': 'controller',
  'google-controller-off': 'controller-off',
};

export function iconClass(name?: string | null, fallback = 'folder-outline'): string {
  const clean = (name || '').trim().replace(/^mdi-/, '');
  return `mdi-${RENAMED[clean] || clean || fallback}`;
}
