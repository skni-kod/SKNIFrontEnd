<template>
  <div class="card">
    <div class="card-icon">
      <div class="svg" v-html="icons[icon]"></div>
    </div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-text">
      {{ text }}
    </p>
    <router-link class="card-link" :to="link">
      <div class="svg" v-html="arrowRight"></div>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Section extends Vue {
  @Prop(String) private readonly title!: string;
  @Prop(String) private readonly text!: string;
  @Prop(String) private readonly link!: string;
  @Prop(String) private readonly icon!: string;

  private data() {
    return {
      icons: {
        game:
          '<svg viewBox="0 0 510.513 510.513" xmlns="http://www.w3.org/2000/svg"><path d="m508.934 374.044-21.002-114.24c-6.75-52.217-51.437-91.535-104.128-91.535h-257.1c-52.691 0-97.377 39.318-104.128 91.536L1.574 374.044c-10.442 56.8 32.377 109.844 89.812 112.149 54.727 2.191 98.696-42.488 98.868-95.801.002-.19-6.175-.124 130.001-.124 0 53.13 43.973 98.129 98.868 95.925 57.175-2.295 100.305-55.077 89.811-112.149zm-56.307 70.411c-24.653 17.362-58.817 15.887-81.888-6.276-13.019-12.507-20.485-30.036-20.485-48.095 0-16.117-13.286-29.815-30-29.815h-130c-16.711 0-30 13.695-30 29.815 0 36.591-30.051 67.639-67.666 66.134-34.39-1.38-61.562-29.525-62.643-63.358-.271-8.47-.571-4.114 22.211-128.039.052-.282.096-.566.131-.852 4.682-37.456 36.674-65.701 74.416-65.701h257.1c37.742 0 69.733 28.245 74.416 65.701.081.66-1.404-7.495 21.208 115.5 4.79 26.013-6.885 50.961-26.8 64.986z"/><path d="M183.254 272.269h-25v-25c0-8.284-6.716-15-15-15s-15 6.716-15 15v25h-25c-8.284 0-15 6.716-15 15s6.716 15 15 15h25v25c0 8.284 6.716 15 15 15s15-6.716 15-15v-25h25c8.284 0 15-6.716 15-15s-6.716-15-15-15zM381.964 244.338c-1.856-8.857-10.636-13.932-19.07-11.42-8.654 2.82-12.207 11.399-9.99 18.7 2.746 8.583 11.353 12.238 18.7 10 7.762-2.477 11.748-9.866 10.36-17.28zM407.254 272.269c-8.284 0-15 6.716-15 15v1c0 8.284 6.716 15 15 15s15-6.716 15-15v-1c0-8.285-6.716-15-15-15zM327.254 272.269c-8.284 0-15 6.716-15 15v1c0 8.284 6.716 15 15 15s15-6.716 15-15v-1c0-8.285-6.716-15-15-15zM381.964 324.339c-1.856-8.857-10.636-13.932-19.07-11.42-8.617 2.808-12.197 11.285-9.99 18.71 2.865 8.762 11.492 12.186 18.7 9.99 7.733-2.468 11.753-9.841 10.36-17.28zM216.363 104.378c-5.858 5.858-5.858 15.355 0 21.213 5.857 5.857 15.355 5.857 21.213 0 9.77-9.77 25.584-9.772 35.355 0 5.858 5.858 15.355 5.858 21.213 0s5.858-15.355 0-21.213c-21.443-21.445-56.336-21.444-77.781 0z"/><path d="M192.321 80.336c34.781-34.781 91.08-34.787 125.865 0 5.857 5.858 15.355 5.858 21.213 0s5.858-15.355 0-21.213c-46.504-46.505-121.78-46.511-168.291 0-5.858 5.858-5.858 15.355 0 21.213s15.356 5.858 21.213 0z"/></svg>',
        monitor:
          '<svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.19 3.794H4.114c-1.11 0-2.01.893-2.01 1.995v9.974c0 1.102.9 1.995 2.01 1.995h16.078c1.11 0 2.01-.893 2.01-1.995V5.789c0-1.102-.9-1.995-2.01-1.995zM8.132 21.747h8.04M12.152 17.758v3.99" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        cpu:
          '<svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#prefix__clip0)" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.349 4.353H6.291c-1.11 0-2.01.893-2.01 1.995v11.969c0 1.102.9 1.995 2.01 1.995h12.058c1.11 0 2.01-.893 2.01-1.995V6.347c0-1.1-.9-1.994-2.01-1.994z"/><path d="M15.334 9.34H9.305v5.985h6.03V9.34zM9.305 1.36v2.993M15.334 1.36v2.993M9.305 20.312v2.992M15.334 20.312v2.992M20.359 9.34h3.014M20.359 14.327h3.014M1.267 9.34H4.28M1.267 14.327H4.28"/></g><defs><clipPath id="prefix__clip0"><path fill="#fff" transform="translate(.262 .363)" d="M0 0h24.116v23.938H0z"/></clipPath></defs></svg>',
      },
      arrowRight:
        '<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15.352 10.185 5.024 4.988-5.024 4.987" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.299 4.201v6.982c0 1.058.423 2.073 1.177 2.821a4.035 4.035 0 0 0 2.842 1.169h12.058" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    };
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;
@use '@/styles/components/buttons';

.card {
  border-radius: 20px;
  max-width: 350px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.35);
  padding: 40px 40px;

  .card-title {
    font-size: 21px;
    margin-bottom: 20px;
  }

  .card-text {
    font-size: 14px;
  }

  .card-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: $primary;
    fill: white;
    margin-bottom: 40px;

    .svg {
      width: 24px;
      height: 24px;
    }
  }

  .card-link {
    margin-left: auto;
    margin-right: 0;
    .svg {
      color: #d5d3d3;
      transition: color 0.3s;
    }
    &:hover .svg {
      color: $primary;
    }
  }
}
</style>
