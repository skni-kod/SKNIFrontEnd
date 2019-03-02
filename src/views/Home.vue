<template>
  <div class='home'>
    <v-parallax :src="require('../assets/strona_bg.png')"></v-parallax>
    <home-section-list v-bind:sections="sections"></home-section-list>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { SectionsService } from '@/services/SectionsService';
import { SectionModel } from '@/models/SectionModel';

@Component
export default class Home extends Vue {
    private sectionsService!: SectionsService;
    private sections!: SectionModel[];
    constructor() {
        super();
        this.sectionsService = new SectionsService();
        this.sections = [];
    }
    public mounted() {
        this.sectionsService.getAllSections().then((p) => {
            this.sections = p;
            for (let i = 0; i < this.sections.length; ) {
                if (this.sections[i].isVisible === false) {
                    this.sections.splice(i, 1);
                } else {
                    i++;
                }
            }
        });
    }
}
</script>
