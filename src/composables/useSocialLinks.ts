import { onMounted, ref } from 'vue';
import { FooterService } from '@/services/FooterService';

export interface SocialLink {
  title: string;
  link: string;
  icon: string;
}

const FALLBACK: SocialLink[] = [
  { title: 'Facebook', link: 'https://www.facebook.com/skni.kod', icon: 'facebook' },
  { title: 'Instagram', link: 'https://www.instagram.com/skni.kod/', icon: 'instagram' },
  { title: 'LinkedIn', link: 'https://www.linkedin.com/company/78064192', icon: 'linkedin' },
];

const links = ref<SocialLink[]>(FALLBACK);
let loaded = false;

export function useSocialLinks() {
  onMounted(async () => {
    if (loaded) {
      return;
    }
    loaded = true;
    try {
      const data = await new FooterService().getLinks();
      if (Array.isArray(data) && data.length) {
        links.value = data.map((l) => ({ title: l.title, link: l.link, icon: l.icon }));
      }
    } catch {
      links.value = FALLBACK;
    }
  });

  return links;
}
