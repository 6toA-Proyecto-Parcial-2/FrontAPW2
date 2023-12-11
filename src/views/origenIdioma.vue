<template>
  <div class="home">
    <origenIdioma />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import origenIdioma from "@/components/origenIdioma.vue"; // @ is an alias to /src

@Options({
  components: {
    origenIdioma,
  },
})
export default class HomeView extends Vue {}
</script>
