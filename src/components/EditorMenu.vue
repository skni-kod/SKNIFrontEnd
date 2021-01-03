   <template>
   <div>
   <v-speed-dial fixed right bottom direction="top" v-model="fab">
      <template v-slot:activator>
        <v-btn
          large
          v-model="fab"
          class="text-body-1 font-weight-bold"
          color="primary"
          style="z-index: 3;"
        >
          <v-icon large v-if="fab" left>mdi-close</v-icon>
          <v-icon large v-else left>mdi-dots-vertical</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>
      <v-container class="ma-0 pa-0">
        <v-row justify="end">
          <v-btn
            color="blue white--text"
            class="ma-2"
            @click="$vuetify.goTo(0, { duration: 1000 })"
          >
            <v-icon left>mdi-arrow-collapse-up</v-icon>
            <span>Przejdź na górę</span>
          </v-btn>
        </v-row>
        <v-row justify="end">
          <v-btn
            color="blue white--text"
            class="ma-2"
            @click="$vuetify.goTo('footer', { duration: 1000 })"
          >
            <v-icon left>mdi-arrow-collapse-down</v-icon>
            <span>Przejdź na dół</span>
          </v-btn>
        </v-row>
        <v-row justify="end">
          <v-btn color="success" class="ma-2" @click="saveChanges">
            <v-icon left>mdi-pencil</v-icon>
            <span>Zatwierdź zmiany</span>
          </v-btn>
        </v-row>
        <v-row justify="end">
          <v-btn color="error" class="ma-2" @click="dialog = true">
            <v-icon left>mdi-pencil-off</v-icon>
            <span>Odrzuć zmiany</span>
          </v-btn>
        </v-row>
      </v-container>
    </v-speed-dial>
      <confirmation-dialog
    v-if="dialog"
    @yes="discardChanges"
    @no="dialog = false"
    :text=text
  ></confirmation-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { component } from 'vue/types/umd';


@Component

export default class Edit extends Vue{

  @Prop({required:true}) private text!: string;

  private saveChanges(){
    this.$emit("saveChanges");
  }
  private discardChanges(){
    this.$emit("discardChanges");
  }
  private data() {
    return {
      dialog: false,
    };
  }
}
</script>