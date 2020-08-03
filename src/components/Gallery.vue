<template>
  <div>
    <v-card :dark="dark" :color="color" class="elevation-0">
      <v-card v-if="title"> <!--<v-card v-if="title || categories == true">-->
        <div v-if="title">
          <h1 block class="text-center">{{ title }}</h1>
          <v-divider class="VueDivider"></v-divider>
        </div>
        <!-- <div v-if="categories == true">
          <v-container class="pa-1">
            <v-layout my-3 mx-0 row wrap justify-space-between>
              <v-flex class="mx-1 py-1" v-for="cat in categories" :key="cat.name">
                <v-hover>
                  <v-btn
                    block
                    rounded
                    slot-scope="{ hover }"
                    :color="`${hover ? categoryColorHovered : category === cat.name ? categoryColorSelected : categoryColor}`"
                    @click="category=cat.name"
                  >
                    <v-icon large left>{{ cat.icon }}</v-icon>
                    <span>{{ cat.name }}</span>
                  </v-btn>
                </v-hover>
              </v-flex>
            </v-layout>
          </v-container>
        </div> -->
      </v-card>
      <v-container grid-list-sm fluid>
        <v-layout row wrap justify-center>
          <v-flex v-for="(img, n) in imgs" :key="n" xs6 sm4 md3 lg2 xl1>
            <v-card flat tile class="d-flex elevation-2">
              <v-img
                class="clickable"
                :src="img"
                aspect-ratio="1"
                @click.native="dialog = true; dialogSrc = img;"
              >
                <template v-slot:placeholder>
                  <v-layout fill-height align-center justify-center ma-0>
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
                </template>
              </v-img>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-dialog width="800px" v-model="dialog">
      <v-card>
        <v-img :src="dialogSrc" class="grey lighten-2"></v-img>
        <v-hover>
          <v-btn
            :large="hover ? true : false"
            slot-scope="{ hover }"
            :color="`${hover ? 'red' : categoryColor}`"
            :outlined="hover ? false : true"
            fab
            fixed
            top
            right
            @click="dialog = false"
          >
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </v-hover>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Gallery extends Vue {
  @Prop({ default: '' }) public readonly title!: string;
  @Prop({ default: 'secondary' }) public readonly categoryColor!: string;
  @Prop({ default: 'accent' }) public readonly categoryColorHovered!: string;
  @Prop({ default: 'primary' }) public readonly categoryColorSelected!: string;
  @Prop({ default: '' }) public readonly color!: string;
  @Prop({ default: false }) public readonly dark!: boolean;
  @Prop({ default: [] }) public readonly imgs!: string[];
//   @Prop({ default: [] }) public readonly categories!: object[];

  public data() {
    return {
      category: null,
      dialog: false,
      dialogSrc: null,
    };
  }
}
</script>
