<template>
  <v-app>
    <v-navigation-drawer
      v-model="mini"
      expand-on-hover
      color="white"
      hide-overlay
      mini-variant-width="64"
      permanent
      clipped
      floating
      app
    >
      <v-list :shaped="!mini" :rounded="mini" dense>
        <v-list-item to="/" link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/tasks" link>
          <v-list-item-action>
            <v-icon>mdi-calendar-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tasks</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="indigo" dark flat>
      <v-toolbar-title>{{ appname }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container :class="{ mini }">
        <slot></slot>
      </v-container>
    </v-content>
    <v-footer color="indigo" app></v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Navigation extends Vue {
  public mini = true;

  get appname() {
    return process.env.VUE_APP_TITLE;
  }

  toggleDrawer() {
    this.mini = !this.mini;
  }
}
</script>
<style lang="scss" scoped>
.mini {
}
</style>
