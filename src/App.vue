<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
    </v-app-bar>
    <v-content>
      <navigation> <router-view /></navigation>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "./components/Navigation/Navigation.vue";

@Component({ components: { Navigation } })
export default class App extends Vue {}
</script>

<style>
* {
  font-family: "Roboto", sans-serif;
}
</style>
