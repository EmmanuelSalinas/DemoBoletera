<script lang="ts" setup>
import { RouterView } from 'vue-router';
//import ThemeProvider from '@/providers/ui/TThemProvider.vue' // ajusta la ruta si está en otro lado

</script>
<template>
  <!-- <ThemeProvider /> -->
  <RouterView id="displayer" class="application | displayer" />
  <div id="recaptcha-container"/>
</template>
