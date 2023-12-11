<template>
  <div class="home">
    <Autores />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Autores from "@/components/Autores.vue"; // @ is an alias to /src

@Options({
  components: {
    Autores,
  },
})
export default class HomeView extends Vue {}
</script>
