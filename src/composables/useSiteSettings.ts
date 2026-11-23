import { ref } from 'vue';
import { SiteSettingsService, type SiteSettings } from '@/services/SiteSettingsService';

const settings = ref<SiteSettings | null>(null);
const failed = ref(false);
let pending: Promise<void> | null = null;

function load(force = false) {
  if (pending && !force) {
    return pending;
  }
  pending = new SiteSettingsService()
    .get()
    .then((data) => {
      settings.value = data;
      failed.value = false;
    })
    .catch(() => {
      failed.value = true;
    });
  return pending;
}

export function useSiteSettings() {
  load();
  return { settings, failed, reload: () => load(true), set: (value: SiteSettings) => (settings.value = value) };
}
