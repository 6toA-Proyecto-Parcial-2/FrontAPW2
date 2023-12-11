<template>
  <div class="home">
    <Categorias />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Categorias from "@/components/Categorias.vue"; // @ is an alias to /src

@Options({
  components: {
    Categorias,
  },
})
export default class HomeView extends Vue {}
</script>
