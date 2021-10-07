<template>
  <div class="card">
    <router-link class="card-link" to="/article">
      <div class="card-image">
        <img
          :src="require('@/assets/article.jpg')"
          alt="Drukarka 3D"
          class="equipment-image"
        />
      </div>
    </router-link>

    <div class="card-date">6 września 2021</div>
    <router-link class="card-link" to="/article">
      <h3 class="card-title">Projekt SKNI Junior wystartował</h3>
    </router-link>

    <p class="card-text">
      Z przyjemnością informujemy, że wreszcie udaje się nam wystartować z
      projektem, nad którym długo pracowaliśmy...
    </p>
    <router-link class="card-link card-arrow" to="/article">
      <div class="svg" v-html="arrowRight"></div>
    </router-link>

    <div class="card-author">
      <div class="card-icon">
        <div class="svg" v-html="user"></div>
      </div>
      <div class="signature">Paweł Miękina</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Sponsors extends Vue {
  @Prop(String) private readonly title!: string;
  @Prop(String) private readonly text!: string;
  @Prop(String) private readonly link!: string;
  @Prop(String) private readonly icon!: string;

  private data() {
    return {
      user:
        '<svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.21 21v-2a4 4 0 00-4-4h-8a4 4 0 00-4 4v2M12.21 11a4 4 0 100-8 4 4 0 000 8z" stroke="#55ACEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
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
  position: relative;
  padding-top: 220px;
  .card-image {
    position: absolute;
    top: 0;
    height: 200px;
    left: 0;
    width: 100%;

    img {
      width: 100%;
      border-radius: 20px 20px 0 0;
      object-fit: cover;
    }
  }

  .card-date {
    color: $primary;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .card-link {
    text-decoration: none;
  }
  .card-title {
    font-size: 18px;
    margin-bottom: 20px;
    color: $text-color;
    font-weight: 700;
  }
  .card-arrow {
    margin-bottom: 20px;
  }
  .card-text {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .card-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #f1f1f1;
    fill: white;
    margin-right: 20px;
    .svg {
      width: 24px;
      height: 24px;
    }
  }

  .card-author {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .signature {
      font-weight: 600;
      font-size: 18px;
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
