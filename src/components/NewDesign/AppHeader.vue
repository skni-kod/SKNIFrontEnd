<template>
  <header
    class="header"
    :class="{ 'is-pinned': isPinned, 'menu-open': menuOpen }"
  >
    <div class="header-wrapper">
      <router-link
        class="header-nav-item-link"
        :to="{ name: 'home' }"
        @click="handleNavLinkClick"
      >
        <img :src="require('@/assets/logo_small.png')" class="header-logo" />
      </router-link>

      <nav class="header-nav">
        <router-link
          class="mobile-drawer-logo-link"
          :to="{ name: 'home' }"
          @click="handleNavLinkClick"
        >
          <img
            :src="require('@/assets/logo_small.png')"
            class="mobile-drawer-logo"
          />
        </router-link>

        <ul class="header-nav-wrapper">
          <li class="header-nav-item" @click="handleNavLinkClick">
            <router-link class="header-nav-item-link" :to="{ name: 'about' }"
              >O nas</router-link
            >
          </li>

          <li class="header-nav-item" @click="handleNavLinkClick">
            <router-link class="header-nav-item-link" :to="{ name: 'articles' }"
              >Artykuły</router-link
            >
          </li>

          <!-- <li class="header-nav-item" @click="handleNavLinkClick">
            <router-link class="header-nav-item-link" :to="{ name: 'sections' }">Sekcje</router-link>
          </li> -->

          <li class="header-nav-item" @click="handleNavLinkClick">
            <router-link class="header-nav-item-link" :to="{ name: 'projects' }"
              >Projekty</router-link
            >
          </li>

          <li
            class="header-nav-item"
            @click="handleNavLinkClick"
            v-if="isLoggedIn"
          >
            <router-link class="header-nav-item-link" :to="{ name: 'hardware' }"
              >Sprzęt</router-link
            >
          </li>

          <li class="header-nav-item junior" @click="handleNavLinkClick">
            <a
              class="header-nav-item-link"
              href="https://kod.prz.edu.pl/junior"
              target="_blank"
              >Junior</a
            >
          </li>

          <li
            class="header-nav-item"
            @click="handleNavLinkClick"
            v-if="!isLoggedIn"
          >
            <router-link class="header-nav-item-link" :to="{ name: 'login' }"
              >Logowanie</router-link
            >
          </li>

          <li
            class="header-nav-item"
            @click="handleNavLinkClick"
            v-if="isLoggedIn"
          >
            <router-link class="header-nav-item-link" :to="{ name: 'panel' }"
              >Panel</router-link
            >
          </li>

          <li
            class="header-nav-item"
            @click="handleLogoutClick"
            v-if="isLoggedIn"
          >
            <button class="header-nav-item-link">Wyloguj</button>
          </li>
        </ul>

        <div class="drawer-links">
          <a
            href="https://www.facebook.com/skni.kod"
            class="drawer-link"
            target="_blank"
          >
            <facebook-icon />
          </a>

          <a
            href="https://www.instagram.com/skni.kod/"
            class="drawer-link"
            target="_blank"
          >
            <instagram-icon />
          </a>

          <a
            href="https://www.linkedin.com/company/78064192"
            class="drawer-link"
            target="_blank"
          >
            <linkedin-icon />
          </a>
        </div>
      </nav>

      <button
        :class="{
          hamburger: true,
          'hamburger--squeeze': true,
          'is-active': menuOpen,
        }"
        type="button"
        @click="toggleMenu"
      >
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>

    <div class="drawer-overlay" @click="toggleMenu"></div>
  </header>
</template>

<script lang="ts">
import { FooterModel } from '@/models/FooterModel';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import FacebookIcon from '@/assets/icons/facebook.svg?inline';
import InstagramIcon from '@/assets/icons/instagram.svg?inline';
import LinkedinIcon from '@/assets/icons/linkedin.svg?inline';

@Component({
  components: {
    FacebookIcon,
    LinkedinIcon,
    InstagramIcon,
  },
})
export default class AppHeader extends Vue {
  isPinned = false;
  menuOpen = false;
  links: FooterModel[] = [];

  get isLoggedIn() {
    return this.$store.getters.isAuthenticated;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  handleNavLinkClick() {
    this.menuOpen = false;
  }

  mounted() {
    window.addEventListener('scroll', this.onScroll);
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    if (window.scrollY > 5 && !this.isPinned) {
      requestAnimationFrame(() => (this.isPinned = true));
    } else if (window.scrollY <= 5 && this.isPinned) {
      requestAnimationFrame(() => (this.isPinned = false));
    }
  }

  handleLogoutClick() {
    this.$store.dispatch('logout');
    this.menuOpen = false;
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;

@use '~hamburgers/_sass/hamburgers/hamburgers' with (
  $hamburger-types: (squeeze),
  $hamburger-layer-width: 30px,
  $hamburger-layer-height: 3px,
  $hamburger-layer-spacing: 4px,
  $hamburger-active-layer-color: $primary
);

.header {
  @include responsiveLayout();
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;

  transition: height 0.3s, box-shadow 0.3s;
  height: 150px;

  &.is-pinned {
    background-color: $body-bg;
    box-shadow: 0 0px 40px 0 $shadow-color;
    height: 100px;

    .header-logo {
      height: 60px;
      width: auto;
    }
  }

  .header-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    height: 100%;
    position: relative;
  }

  .header-logo {
    height: 80px;
    width: auto;
    transition: height 0.3s;
  }

  .hamburger {
    display: none;

    .hamburger-box {
      margin-bottom: -3px;
    }
  }

  @include media-breakpoint-down('lg') {
    .hamburger {
      display: block;

      &.is-active {
        background-color: $body-bg;
        border-radius: 10px;
        box-shadow: 0 0 20px #ddd;
      }
    }

    .drawer-overlay {
      position: fixed;
      inset: 0;
      background-color: #fff;
      z-index: -1;
      cursor: pointer;
      transition: opacity 0.3s;
      pointer-events: none;
      opacity: 0;
    }

    &.menu-open {
      .drawer-overlay {
        opacity: 0.8;
        pointer-events: initial;
      }

      .header-wrapper .header-nav {
        box-shadow: 0px 0px 50px $shadow-color;
        transform: translateX(0);
      }
    }
  }
}

.header-nav {
  font-size: 18px;
  font-weight: 400;
  color: $text-color;
  font-family: Montserrat;

  .header-nav-wrapper {
    list-style: none;
    display: flex;
    gap: 50px;
    height: 55px;
    align-items: center;

    .header-nav-item {
      .header-nav-item-link {
        color: unset;
        text-decoration: none;
        transition: color 0.3s;
        position: relative;

        &:hover {
          color: $primary;
        }

        &.router-link-active {
          &::after {
            content: '';
            display: block;
            width: 100%;
            height: 3px;
            background-color: $primary;
            border-radius: 20px;
            position: absolute;
            bottom: -15px;
          }
        }
      }

      &.junior {
        color: $primary;
        font-weight: 600;
      }
    }
  }

  .mobile-drawer-logo-link {
    display: none;
  }

  .drawer-links {
    display: none;
  }

  @include media-breakpoint-down('lg') {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: $body-bg;
    width: 80%;
    max-width: 350px;
    padding: 30px 0;
    transform: translateX(-100%);
    box-shadow: 0px 0px 0 $shadow-color;
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;

    .drawer-links {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 20px;
      align-items: center;

      .drawer-link {
        transition: color 0.3s;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        color: $text-color;

        svg {
          width: 24px;
          height: 24px;
        }

        &:hover {
          color: $primary;
        }
      }
    }

    .header-nav-wrapper {
      flex-direction: column;
      height: auto;
      gap: 0;
      padding: 0;
      margin-bottom: auto;

      .header-nav-item {
        width: 100%;

        .header-nav-item-link {
          display: block;
          padding: 15px 30px;

          &.router-link-active {
            &::after {
              width: 3px;
              height: calc(100% - 20px);
              bottom: 10px;
              left: 12px;
            }
          }
        }
      }
    }

    .mobile-drawer-logo-link {
      padding: 0 30px 30px;
      display: flex;
      justify-content: center;

      .mobile-drawer-logo {
        height: 70px;
      }
    }
  }
}
</style>
