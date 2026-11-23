export const HARDWARE_STATUSES = [
  { value: 'Available', label: 'Dostępny', tone: 'success', hint: 'Sprzęt jest dostępny do wypożyczenia.' },
  { value: 'Rented', label: 'Wypożyczony', tone: 'warning', hint: 'Sprzęt został już wypożyczony.' },
  { value: 'Unavailable', label: 'Niedostępny', tone: 'danger', hint: 'Sprzęt nie jest wypożyczany.' },
] as const;

export function hardwareStatus(value?: string) {
  return HARDWARE_STATUSES.find((s) => s.value === value) || HARDWARE_STATUSES[0];
}
