<template>
  <div class="home">
    <TraduccionIdioma />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TraduccionIdioma from "@/components/TraduccionIdioma.vue"; // @ is an alias to /src

@Options({
  components: {
    TraduccionIdioma,
  },
})
export default class HomeView extends Vue {}
</script>
