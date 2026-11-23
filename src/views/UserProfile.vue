<template>
  <div>
    <LoadingState v-if="!loaded" class="page" />
    <template v-else>
      <PageHeader eyebrow="Profil użytkownika">
        <template #title>
          <span class="who">
            <UserAvatar :first-name="profileUser.first_name" :last-name="profileUser.last_name" :username="profileUser.username" :size="64" />
            <span class="who__text">
              {{ fullName }}
              <small>@{{ profileUser.username || 'anonymous' }}</small>
            </span>
          </span>
        </template>
      </PageHeader>

      <div class="page">
        <div class="container stack">
          <section class="card card--pad about">
            <h2 class="block-title">O mnie</h2>
            <MarkdownView v-if="profile.description" :content="profile.description" />
            <p v-else class="muted">Użytkownik nie uzupełnił jeszcze opisu profilu.</p>
          </section>

          <section v-if="articles.length" class="stack">
            <h2 class="block-title">Artykuły użytkownika</h2>
            <ArticleGrid
              :articles="articles"
              :loading="false"
              :page="pagination.currentPage"
              :page-count="pagination.pageCount"
              @update:page="getUserArticles"
            />
          </section>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import beAxios from '@/axios';
import { ArticlesService } from '@/services/ArticlesService';
import type { ArticleModel } from '@/models/ArticleModel';
import { PaginationModel } from '@/models/PaginationModel';
import PageHeader from '@/components/ui/PageHeader.vue';
import LoadingState from '@/components/ui/LoadingState.vue';
import UserAvatar from '@/components/ui/UserAvatar.vue';
import MarkdownView from '@/components/MarkdownView.vue';
import ArticleGrid from '@/components/ArticleGrid.vue';

const route = useRoute();
const router = useRouter();
const articlesService = new ArticlesService();
const pagination = reactive(new PaginationModel(1, 3, 3));
const articles = ref<ArticleModel[]>([]);
const profile = ref<any>({});
const loaded = ref(false);

const profileUser = computed(() => profile.value.user || {});
const fullName = computed(
  () => [profileUser.value.first_name, profileUser.value.last_name].filter(Boolean).join(' ') || 'Gal Anonim',
);

async function getUser() {
  await beAxios
    .get('api/profiles/' + route.params.id + '/')
    .then((res) => {
      if (res.status === 200) {
        profile.value = res.data;
        document.title = `${fullName.value} | SKNI KOD`;
      } else {
        router.replace({ name: 'error404' });
      }
    })
    .catch(() => {
      router.replace({ name: 'error404' });
    });
}

function getUserArticles(pageNumber: number) {
  if (pageNumber === undefined || Number.isNaN(pageNumber)) {
    pageNumber = 1;
  }
  pagination.currentPage = pageNumber;
  if (!profile.value.user) {
    return;
  }
  articlesService
    .getUserArticles(profile.value.user.id, pageNumber, pagination.itemsPerPage, false)
    .then((container) => {
      articles.value = container.results;
      pagination.itemCount = container.count;
    });
}

onMounted(() => {
  getUser().then(() => {
    loaded.value = true;
    getUserArticles(1);
  });
});
</script>

<style scoped>
.who {
  display: inline-flex;
  align-items: center;
  gap: 18px;
}

.who__text {
  display: grid;
  line-height: 1.15;
}

.who__text small {
  margin-top: 6px;
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--text-muted);
}

.stack {
  display: grid;
  gap: 32px;
}

.about {
  display: grid;
  gap: 14px;
}

.block-title {
  font-size: 22px;
}
</style>
