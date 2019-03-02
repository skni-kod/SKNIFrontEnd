<template>
    <v-container grid-list-md text-xs-center>
        <v-layout align-space-between justify-center row fill-height wrap>
            <v-flex xs12 md6 lg4 v-for='section in sections' :key='section.title'>
                <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">{{section.icon}}</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-xs-center">{{section.name}}</div>
                    </v-card-title>
                    <v-card-text>
                        {{section.description}}
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { SectionModel } from '@/models/SectionModel';
    @Component
    export default class HomeSectionsList extends Vue {
        @Prop() public sections!: SectionModel[];
    }
</script>
