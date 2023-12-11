<template>
    <div class="home">
      <Idiomas/>
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import Idiomas from "@/components/Idiomas.vue"; // @ is an alias to /src
  
  @Options({
    components: {
      Idiomas,
    },
  })
  export default class HomeView extends Vue {}
  </script>