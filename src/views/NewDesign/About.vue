<template>
  <div class="about-section">
    <SectionHeader
      title='O Studenckim Kole Naukowym Informatyków "KOD"'
      subtitle="o nas"
    >
    </SectionHeader>
    <div class="about-section-description">
      <div class="about-section-description-inner">
        <p>
          Koło skupia głównie studentów kierunku Informatyka Wydziału
          Elektrotechniki i Informatyki i od początku działalności udaje się
          zachęcić do czynnego udziału w pracach Koła już studentów pierwszych
          lat studiów.
        </p>
        <p>
          Celem pracy Koła jest poszerzenie wiedzy z dziedziny optymalnego
          rozwiązywania zagadnień programowania oraz poznawanie nowoczesnych
          technologii informatycznych. W ramach regularnych spotkań studenci
          samodzielnie przygotowują referaty oraz organizują wewnętrzne
          współzawodnictwo w rozwiązywaniu interesujących ich zagadnień.
        </p>
        <p>
          Członkowie Koła mają możliwość testowania nowoczesnego oprogramowania
          systemowego i sieciowego, a także obsługi własnych serwerów. W ramach
          Koła działa Rzeszowska Grupa .NET, zajmująca się technologiami
          programistycznymi firmy Microsoft.
        </p>
        <p>
          Efektem pracy Koła jest udział w zawodach informatycznych, takich jak
          Imagine Cup, Akademickie Mistrzostwa w Programowaniu Zespołowym, a
          także udział w ogólnopolskich konferencjach dla młodych pracowników
          nauki i studentów.
        </p>
      </div>

      <img :src="require('@/assets/about_1.jpg')" />
    </div>
    <SectionHeader title="Historia koła" subtitle="o nas"> </SectionHeader>
    <v-timeline class="ma-2" :dense="$vuetify.breakpoint.xs">
      <v-timeline-item
        fill-dot
        class="pa-1"
        v-for="item in timelineItems"
        :key="item.timestamp"
        :icon="item.icon"
        color="#55acee"
      >
        <template v-slot:opposite>
          <span
            v-text="item.timestamp"
            class="headline font-weight-bold primary--text"
          ></span>
        </template>
        <v-card class="grey lighten-4">
          <v-card-title
            class="primary white--text font-weight-bold"
            style="word-break: break-word"
            >{{ item.title }}</v-card-title
          >
          <v-divider />
          <v-card-text>{{ item.text }}</v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import SectionHeader from '../../components/NewDesign/SectionHeader.vue';

import Vue from 'vue';

@Component({
  components: {
    SectionHeader,
  },
})
export default class Page404 extends Vue {
  private data() {
    return {
      timelineItems: [
        {
          timestamp: 1997,
          icon: 'mdi-handshake',
          title: 'Założenie Koła Naukowego',
          text:
            'Studenckie Koło Naukowe Informatyków "KOD" działa od 1997 r. \
            Założyli go studenci pierwszego roku uruchomionego wówczas kierunku Informatyka na Wydziale Elektrycznym Politechniki. \
            Opiekunem naukowym koła został dr inż. Andrzej Kubaszek (Zakład Podstaw Elektrotechniki i Informatyki)',
        },
        {
          timestamp: 2003,
          icon: 'mdi-rename-box',
          title: 'Zmiana nazwy Koła',
          text:
            'W związku z rozwojem studenckiego ruchu naukowego nazwa Koła zmieniała się, najpierw na Koło Naukowe Informatyków – Programowanie Komputerów, a w 2003 r. \
                Walne Zebranie Koła podjęło uchwałę o zmianie nazwy na Koło Naukowe Informatyków KOD. \
                Ostatecznie nazwa została zmieniona na Studenckie Koło Naukowe Informatyków "KOD".',
        },
        {
          timestamp: 2008,
          icon: 'mdi-account-tie',
          title: 'Zmiana opiekuna Koła',
          text:
            'Od 2008 r. funkcję opiekuna koła pełni dr inż. Bartosz Trybus (Katedra Informatyki i Automatyki)',
        },
      ],
    };
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/helpers' as *;
@use '@/styles/components/buttons';
.about-section {
  margin-top: 50px;
  @include responsiveLayout();
  row-gap: 50px;
  width: 100%;

  .section-header {
    text-align: center;
    margin-bottom: 25px;
  }

  .v-sheet.v-card {
    border-radius: 20px;
  }

  img {
    width: 100%;
    box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.35);
    border-radius: 20px;
  }
  .about-section-description {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 50px;

    .about-section-description-inner {
      max-width: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 991px) {
    .about-section-description {
      grid-template-columns: 1fr;

      .about-section-description-inner {
        max-width: 100%;
        margin-bottom: 25px;
      }
    }
  }
}
</style>
