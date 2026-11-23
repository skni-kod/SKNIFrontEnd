const SECTION_ICONS: Record<number, string> = {
  1: 'monitor-cellphone',
  2: 'gamepad-variant-outline',
  3: 'chip',
};

export function sectionIcon(id?: number, fallback = 'folder-outline'): string {
  return (id !== undefined && SECTION_ICONS[id]) || fallback;
}
