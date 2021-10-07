<template>
  <footer class="page-footer">
    <div class="footer-wrapper">
      <div class="footer-links">
        <a href="https://www.facebook.com/skni.kod" class="link" target="_blank">
          <facebook-icon />
        </a>

        <a href="https://www.instagram.com/skni.kod/" class="link" target="_blank">
          <instagram-icon />
        </a>

        <a href="https://www.linkedin.com/company/78064192" class="link" target="_blank">
          <linkedin-icon />
        </a>
      </div>

      <div class="footer-copyright">
        <span>{{ `Wszystkie prawa zastrzeżone © ${new Date().getFullYear()} SKNI KOD` }}</span>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import FacebookIcon from '@/assets/icons/facebook.svg?inline';
import InstagramIcon from '@/assets/icons/instagram.svg?inline';
import LinkedinIcon from '@/assets/icons/linkedin.svg?inline';

@Component({
  components: {
    FacebookIcon,
    LinkedinIcon,
    InstagramIcon
  }
})
export default class AppFooter extends Vue {

}
</script>

<style lang="scss" scoped>
@use '@/styles/helpers' as *;

.page-footer {
  margin-top: 50px;
  @include responsiveLayout();

  .footer-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70px;

    .footer-links {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;

      .link {
        display: block;
        width: 24px;
        height: 24px;
        color: $text-color;
        transition: color 0.3s;

        &:hover {
          color: $primary;
        }
      }
    }

    .footer-copyright {
      font-size: 12px;
    }
  }

  @include media-breakpoint-down("xs") {
    .footer-wrapper {
      flex-direction: column;
      justify-content: space-evenly;
    }
  }
}
</style>