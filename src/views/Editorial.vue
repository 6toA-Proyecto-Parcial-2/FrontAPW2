<template>
  <div class="home">
    <Editoriales />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Editoriales from "@/components/Editoriales.vue"; // @ is an alias to /src

@Options({
  components: {
    Editoriales,
  },
})
export default class HomeView extends Vue {}
</script>
