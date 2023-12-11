<template>
  <div class="home">
    <Generos />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Generos from "@/components/Generos.vue"; // @ is an alias to /src

@Options({
  components: {
    Generos,
  },
})
export default class HomeView extends Vue {}
</script>
