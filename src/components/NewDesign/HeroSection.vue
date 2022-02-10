<template>
  <section class="hero-section full-bleed" ref="sectionContainer">
    <div class="hero-section-wrapper">
      <div class="content">
        <h1 class="hero-title">
          Studenckie Koło Naukowe Informatyków
          <strong>KOD</strong>
        </h1>

        <p class="hero-text">
          Celem pracy Koła jest poszerzenie wiedzy z dziedziny optymalnego
          rozwiązywania zagadnień programowania oraz poznawanie nowoczesnych
          technologii informatycznych. W ramach regularnych spotkań studenci
          samodzielnie przygotowują referaty oraz organizują wewnętrzne
          współzawodnictwo w rozwiązywaniu interesujących ich zagadnień.
        </p>

        <link-button :to="{ hash: 'sections' }">Zobacz więcej</link-button>
      </div>

      <div class="hero-image-wrapper">
        <img
          :src="require('@/assets/hero-image.jpg')"
          alt="Studenckie Koło Naukowe Informatyków KOD"
          class="hero-image"
        />
      </div>
    </div>

    <div class="parallax-images full-bleed">
      <img
        v-for="image in images"
        :key="image"
        :src="image"
        ref="imageElements"
        class="parallax-image"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import arduino from '@/assets/hero-images/arduino.png';
import gamepad from '@/assets/hero-images/gamepad.png';
import keyboard from '@/assets/hero-images/keyboard.png';
import python from '@/assets/hero-images/python.png';
import LinkButton from '@/components/NewDesign/base/LinkButton.vue';

@Component({
  components: {
    LinkButton,
  },
})
export default class HeroSection extends Vue {
  images = [arduino, gamepad, keyboard, python];
  positions = [
    { x: 40, y: 60 },
    { x: 7, y: 80 },
    { x: 20, y: 15 },
    { x: 50, y: 30 },
  ];

  parallax(event: MouseEvent) {
    const imageElements = this.$refs.imageElements as HTMLImageElement[];

    for (const imgElement of imageElements) {
      const strength = Number.parseInt(imgElement.dataset.strength || '1', 10);
      const rotation = Number.parseInt(imgElement.dataset.rotation || '0', 10);
      const x = (window.innerWidth - event.pageX * strength) / 100;
      const y = (window.innerHeight - event.pageY * strength) / 100;

      imgElement.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${rotation}deg)`;
    }
  }

  mounted() {
    const imageElements = this.$refs.imageElements as HTMLImageElement[];
    const sectionContainer = this.$refs.sectionContainer as HTMLDivElement;

    for (const [i, imgElement] of imageElements.entries()) {
      imgElement.style.top = `${this.positions[i].y}%`;
      imgElement.style.left = `${this.positions[i].x}%`;

      const strength = this.getRandomInt(-10, 10);
      imgElement.dataset.strength = (strength !== 0 ? strength : 1).toString();

      const rotation = this.getRandomInt(-50, 50);
      imgElement.dataset.rotation = rotation.toString();
    }

    this.parallax(new MouseEvent(''));

    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      sectionContainer.addEventListener('mousemove', this.parallax);
    }
  }

  beforeDestroy() {
    const sectionContainer = this.$refs.sectionContainer as HTMLDivElement;
    const isTouchDevice    = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      sectionContainer.removeEventListener('mousemove', this.parallax);
    }
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;
@use '@/styles/components/buttons';

.hero-section {
  @include responsiveLayout();
  position: relative;

  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-image: url("~@/assets/hex.png");
  background-position: right bottom;
  padding-top: 150px;

  .hero-section-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 100px;
    z-index: 1;

    .content {
      display: flex;
      flex-direction: column;
      gap: 50px;
      align-items: flex-start;

      .hero-title {
        font-family: Montserrat;
        font-size: clamp(40px, 3vw, 55px);
        font-weight: 700;
        line-height: 1.3;

        strong {
          color: $primary;
        }
      }

      .hero-text {
        font-size: 16px;
        font-weight: 400;
        margin: 0;
      }

      .btn {
        @include buttons.button-theme($primary, $body-bg);
        width: auto;
      }
    }

    .hero-image-wrapper {
      padding-right: 20px;
      padding-bottom: 20px;
      position: relative;

      .hero-image {
        width: 400px;
        height: 500px;
        object-fit: cover;
        position: relative;
        display: block;
      }

      &::before {
        display: block;
        content: "";
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        position: absolute;
        right: 0px;
        bottom: 0px;
        background-color: $primary;
      }
    }
  }

  .parallax-images {
    position: absolute;
    width: 100%;
    height: 100%;

    .parallax-image {
      width: 100px;
      height: 100px;
      object-fit: contain;
      position: absolute;
      opacity: 0.25;
    }
  }

  @include media-breakpoint-down("md") {
    .hero-section-wrapper {
      flex-direction: column-reverse;
      gap: 50px;

      .content {
        gap: 30px;
      }

      .hero-image-wrapper {
        width: 100%;

        .hero-image {
          width: 100%;
          height: 300px;
        }
      }
    }
  }
}
</style>
