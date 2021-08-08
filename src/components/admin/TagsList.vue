<template>
  <v-card outlined class="rounded-lg">
    <v-card-title
      class="text-h4 white--text justify-center font-weight-bold primary pa-0"
      >Lista tagów</v-card-title
    >
    <v-card-text class="pa-2" v-if="list.length > 0">
      <v-row align="center" justify="center" class="ma-2">
        <v-col
          cols="12"
          sm="6"
          lg="4"
          xl="3"
          v-for="el in list"
          :key="el.id"
          class="pa-1"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card class="px-2">
              <v-card-text>
                <v-row align="center" justify="center">
                  <v-col cols="auto">
                    <v-icon x-large class="primary--text">mdi-tag</v-icon>
                  </v-col>
                  <v-col cols="auto">
                    <v-card-title
                      class="text-h4 font-weight-thin justify-center"
                      >{{ el.name }}</v-card-title
                    >
                  </v-col>
                </v-row>
                <v-fade-transition>
                  <v-overlay
                    v-if="hover"
                    absolute
                    opacity="0.8"
                    color="success"
                    @click.native="edit()"
                    style="cursor: pointer; width: 50%"
                  >
                    <v-row
                      no-gutters
                      class="fill-height"
                      align="center"
                      justify="center"
                    >
                      <v-col cols="auto">
                        <v-icon x-large class="white--text pa-0 ma-0"
                          >mdi-pencil</v-icon
                        >
                      </v-col>
                    </v-row>
                  </v-overlay>
                </v-fade-transition>
                <v-fade-transition>
                  <v-overlay
                    v-if="hover"
                    absolute
                    opacity="0.8"
                    color="error"
                    @click.native="removeClicked()"
                    style="cursor: pointer; width: 50%; left: 50%"
                  >
                    <v-row
                      no-gutters
                      class="fill-height"
                      align="center"
                      justify="center"
                    >
                      <v-col cols="auto">
                        <v-icon x-large class="white--text pa-0 ma-0"
                          >mdi-delete</v-icon
                        >
                      </v-col>
                    </v-row>
                  </v-overlay>
                </v-fade-transition>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text class="text-h3 text-center my-2" v-else
      >Brak tagów! Dodaj jakiś :)</v-card-text
    >
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TagsList extends Vue {
  @Prop({ required: true }) private list!: object;

  private removeClicked(name: string) {
    this.$emit('remove', name);
  }
}
</script>
