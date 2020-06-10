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
            <v-icon>mdi-lightbulb-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Notes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="`/labels/${label.title}`"
          v-for="label in labels"
          :key="label.title"
          link
        >
          <v-list-item-action>
            <v-icon>mdi-label-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ label.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="indigo" dark flat>
      <v-toolbar-title>{{ appname }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <slot></slot>
      </v-container>
    </v-content>
    <v-footer color="indigo" app></v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Label } from "../../store/modules/notes";

const notes = namespace("notes");

@Component
export default class Navigation extends Vue {
  @notes.State
  public labels!: Array<Label>;

  @notes.Action
  public addLabel!: (title: string, color?: string) => void;

  public mini = true;

  get appname() {
    return this.$route.params.label
      ? this.$route.params.label
      : process.env.VUE_APP_TITLE;
  }

  toggleDrawer() {
    this.mini = !this.mini;
  }
}
</script>
<style lang="scss" scoped></style>
