<template>
  <div class="home">
    <Nacionalidades />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Nacionalidades from "@/components/Nacionalidades.vue"; // @ is an alias to /src

@Options({
  components: {
    Nacionalidades,
  },
})
export default class HomeView extends Vue {}
</script>
