<template>
  <div class="section-list">
    <v-card class="section" v-for='section in sections' :key='section.title' style='border: 1px solid gray'>
        <v-card-title >
           <p class="section-title"> <v-icon x-large class="blue--text text--lighten-2">{{section.icon}}</v-icon> <a class="underline" > {{ section.name }}</a> </p>
        </v-card-title>
        <v-card-text >
          <div class="text">
            <p class="section-description">{{ section.description }}</p>
            </div>
        </v-card-text>
        <div class="section-button">
         <!-- <v-btn  text small color="#64b5f6" class="font-weight-bold button" >
              Czytaj wiecej...
          </v-btn> -->
        </div>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SectionModel } from '@/models/SectionModel';
@Component
export default class SectionsList extends Vue {
  @Prop() public sections!: SectionModel[];
}
</script>
<style <style lang="scss" scoped>
  .section{
    width: 50%;
    height: 300px;
    margin: auto;
    background-image: linear-gradient(to bottom, rgba(12, 12, 12, 0), rgba(12, 12, 12, 0.8)),url('../assets/strona_bg.png');
    background-size: 100% 100%;
    border-style: none !important;
    position: relative;
    margin-bottom: 10px;
  }
  .section-title{
    margin:auto;
    color: white;
      text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
  }
  .section-list{
   display: flex;
   justify-content: center;
   flex-direction: column;
   margin-bottom: 100px;
  }
  .text{
    display: flex;
    justify-content: center;
    color: white;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  }
  .section-description{
    width: 90%;
    text-align: justify;
  }
  .section-button{
    position: absolute;
    bottom: 0px;
    right: 0px;
   .button{
     margin: 0px 55px 30px 0;
   }
  }
  a:hover{
    text-decoration: underline;
  }
</style>
