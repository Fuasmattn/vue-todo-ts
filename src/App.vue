<template>
  <v-app>
    <v-content>
      <navigation><router-view /></navigation>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "./components/Navigation/Navigation.vue";

@Component({ components: { Navigation } })
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  font-family: "Roboto", sans-serif;
}

/* style overrides app-bar */
.v-toolbar__content {
  border-bottom: 1px solid #e4e4e4 !important;
}

/* List Item style overrides */
.theme--light.v-list-item--active:before,
.theme--light.v-list-item--active:hover:before,
.theme--light.v-list-item:focus:before {
  opacity: 0.3 !important;
}

/* style overrides for vuetify color picker component */
.v-color-picker__color {
  border-radius: 100% !important;
  height: 32px !important;
  width: 32px !important;
  max-height: 32px !important;
}

.v-color-picker__controls {
  display: none !important;
}

.v-color-picker__swatch {
  margin-bottom: 0 !important;
}

.v-color-picker__swatch:first-of-type {
  .v-color-picker__color:first-of-type {
    border: 2px solid rgb(210, 210, 210);
    &:hover {
      border: 2px solid black;
    }
  }
}
.v-color-picker__color:hover {
  border: 2px solid black;
}
</style>
