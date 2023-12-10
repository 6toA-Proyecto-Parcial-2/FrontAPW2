<template>
  <div class="home">
    <Encargados />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Encargados from "@/components/Encargados.vue"; // @ is an alias to /src

@Options({
  components: {
    Encargados,
  },
})
export default class HomeView extends Vue {}
</script>
