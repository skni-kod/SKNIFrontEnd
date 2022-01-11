<template>
  <router-link :to="link" class="link" v-if="link">
    <component :is="icon" class="icon" />
    <span class="text">{{ text }}</span>
  </router-link>

  <div class="link" @click="handleClick" v-else>
    <component :is="icon" class="icon" />
    <span class="text">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProjectTile from '@/components/NewDesign/projects/ProjectTile.vue';
import SectionHeader from '@/components/NewDesign/SectionHeader.vue';
import AddIcon from '@/assets/icons/plus.svg?inline';
import { RawLocation } from 'vue-router';

@Component({
  components: {
    ProjectTile,
    SectionHeader,
    AddIcon,
  },
})
export default class ToolbarItem extends Vue {
  @Prop() link: RawLocation | undefined;
  @Prop(String) text!: string;
  @Prop() icon!: Vue;

  handleClick() {
    this.$emit('click');
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;

.link {
  display: flex;
  align-items: center;
  cursor: pointer;

  .icon {
    width: 30px;
    height: 30px;
    color: $body-bg;
    display: block;
    margin-right: 10px;
  }

  .text {
    font-weight: 600;
    color: $body-bg;
    text-decoration: none;
    display: block;
  }
}

/* @include media-breakpoint-down("md") {
    .projects {
      grid-template-columns: 1fr;
      grid-template-rows: unset;
    }
  } */
</style>