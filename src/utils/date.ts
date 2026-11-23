import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

export function formatDate(value: string | Date | undefined | null, pattern = 'd MMMM yyyy'): string {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return format(date, pattern, { locale: pl });
}

export function formatDateTime(value: string | Date | undefined | null): string {
  return formatDate(value, 'd MMMM yyyy, HH:mm');
}
