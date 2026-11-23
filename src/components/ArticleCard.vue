<template>
  <article class="article-card">
    <div class="article-card__media">
      <img v-if="thumbnail" :src="thumbnail" :alt="article.title" loading="lazy" />
      <div v-else class="article-card__placeholder" aria-hidden="true">
        <img src="@/assets/logo_small.png" alt="" />
      </div>
      <span v-if="groupLabel" class="article-card__group">{{ groupLabel }}</span>
    </div>
    <div class="article-card__body">
      <time v-if="date" class="article-card__date" :datetime="String(article.creation_date)">{{ date }}</time>
      <h3 class="article-card__title">
        <router-link v-if="linkable" :to="to" class="article-card__link">{{ article.title || 'Bez tytułu' }}</router-link>
        <span v-else>{{ article.title || 'Bez tytułu' }}</span>
      </h3>
      <p v-if="excerpt" class="article-card__excerpt">{{ excerpt }}</p>
      <footer class="article-card__footer">
        <span v-if="author" class="article-card__author">
          <UserAvatar :first-name="author.first_name" :last-name="author.last_name" :username="author.username" :size="28" />
          {{ authorName }}
        </span>
        <span class="article-card__more">
          Czytaj <i class="mdi mdi-arrow-right" aria-hidden="true"></i>
        </span>
      </footer>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import removeMarkdown from 'remove-markdown';
import type { ArticleModel } from '@/models/ArticleModel';
import UserAvatar from '@/components/ui/UserAvatar.vue';
import { formatDate } from '@/utils/date';
import { mediaUrl } from '@/utils/media';

const props = withDefaults(defineProps<{ article: ArticleModel; linkable?: boolean }>(), { linkable: true });

const to = computed(() => ({
  name: 'article',
  params: { id: props.article.id, alias: props.article.alias || 'artykul' },
}));

const thumbnail = computed(() => {
  const first = props.article.gallery && props.article.gallery[0];
  return first ? mediaUrl(first.thumbnail || first.image) : '';
});

const date = computed(() => formatDate(props.article.creation_date));

const excerpt = computed(() => {
  const text = removeMarkdown(props.article.text || '').replace(/\s+/g, ' ').trim();
  return text.length > 220 ? `${text.slice(0, 220).trim()}…` : text;
});

const author = computed<any>(() => {
  const first = props.article.authors && (props.article.authors as any[])[0];
  return first && typeof first === 'object' ? first : null;
});

const authorName = computed(() =>
  author.value ? [author.value.first_name, author.value.last_name].filter(Boolean).join(' ') || author.value.username : '',
);

const groupLabel = computed(() => ({ News: 'Aktualność', Article: 'Artykuł' } as Record<string, string>)[props.article.group] || '');
</script>

<style scoped>
.article-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xs);
  transition: box-shadow var(--t) var(--ease), transform var(--t) var(--ease), border-color var(--t);
}

.article-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
  border-color: var(--border-strong);
}

.article-card__media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--surface-2);
}

.article-card__media > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms var(--ease);
}

.article-card:hover .article-card__media > img {
  transform: scale(1.04);
}

.article-card__placeholder {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.18), transparent 50%),
    linear-gradient(135deg, var(--primary-soft) 0%, var(--surface-2) 100%);
}

.article-card__placeholder img {
  width: 42%;
  opacity: 0.55;
}

.article-card__group {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.92);
  color: var(--primary-strong);
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.article-card__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  padding: 22px 24px 20px;
}

.article-card__date {
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
}

.article-card__title {
  font-size: 19px;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card__link {
  color: var(--text);
}

.article-card__link::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
}

.article-card__link:focus-visible {
  outline: none;
}

.article-card:has(.article-card__link:focus-visible) {
  box-shadow: 0 0 0 3px var(--primary-ring);
}

.article-card__excerpt {
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  font-size: 14px;
}

.article-card__author {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  font-weight: 500;
  color: var(--text);
}

.article-card__more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  color: var(--primary);
  font-weight: 600;
  white-space: nowrap;
}

.article-card__more .mdi {
  transition: transform var(--t) var(--ease);
}

.article-card:hover .article-card__more .mdi {
  transform: translateX(3px);
}
</style>
