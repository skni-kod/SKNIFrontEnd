<template>
  <div>
    <v-card outlined class="ma-2">
      <v-card-title
        class="text-h4 justify-center font-weight-bold"
        style="word-break: break-word;"
      >O Studenckim Kole Naukowym Informatyków "KOD"</v-card-title>
      <v-divider />
      <v-card-text class="text-h6">
        <p>Koło skupia głównie studentów kierunku Informatyka Wydziału Elektrotechniki i Informatyki i od początku działalności udaje się zachęcić do czynnego udziału w pracach Koła już studentów pierwszych lat studiów.</p>
        <p>Celem pracy Koła jest poszerzenie wiedzy z dziedziny optymalnego rozwiązywania zagadnień programowania oraz poznawanie nowoczesnych technologii informatycznych. W ramach regularnych spotkań studenci samodzielnie przygotowują referaty oraz organizują wewnętrzne współzawodnictwo w rozwiązywaniu interesujących ich zagadnień.</p>
        <p>Członkowie Koła mają możliwość testowania nowoczesnego oprogramowania systemowego i sieciowego, a także obsługi własnych serwerów. W ramach Koła działa Rzeszowska Grupa .NET, zajmująca się technologiami programistycznymi firmy Microsoft.</p>
        <p>Efektem pracy Koła jest udział w zawodach informatycznych, takich jak Imagine Cup, Akademickie Mistrzostwa w Programowaniu Zespołowym, a także udział w ogólnopolskich konferencjach dla młodych pracowników nauki i studentów.</p>
      </v-card-text>
    </v-card>
    <p class="text-h4 text-center font-weight-bold">Historia koła</p>
    <v-timeline class="ma-2" :dense="$vuetify.breakpoint.xs">
      <v-timeline-item
        fill-dot
        class="pa-1"
        v-for="item in timelineItems"
        :key="item.timestamp"
        :icon="item.icon"
      >
        <template v-slot:opposite>
          <span
            v-text="item.timestamp"
            class="headline font-weight-bold primary--text"
            
          ></span>
        </template>
        <v-card class="grey lighten-4">
          <v-card-title class="primary white--text font-weight-bold" style="word-break: break-word;">{{ item.title }}</v-card-title>
          <v-divider />
          <v-card-text>{{ item.text }}</v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component
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
