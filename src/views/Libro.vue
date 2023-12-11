<template>
  <div class="home">
    <Libros />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Libros from "@/components/Libros.vue"; // @ is an alias to /src

@Options({
  components: {
    Libros,
  },
})
export default class HomeView extends Vue {}
</script>
