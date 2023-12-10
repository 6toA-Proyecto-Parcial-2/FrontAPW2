<template>
  <div class="home">
    <Inventarios />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Inventarios from "@/components/Inventarios.vue"; // @ is an alias to /src

@Options({
  components: {
    Inventarios,
  },
})
export default class HomeView extends Vue {}
</script>
