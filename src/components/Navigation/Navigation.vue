<template>
  <v-app>
    <v-navigation-drawer
      v-model="mini"
      color="white"
      hide-overlay
      :mini-variant.sync="mini"
      mini-variant-width="64"
      permanent
      clipped
      floating
      app
    >
      <v-list :shaped="!mini" :rounded="mini">
        <v-list-item-group
          v-model="item"
          active-class="active-item"
          color="primary"
        >
          <v-list-item :ripple="false" to="/" link>
            <v-list-item-action>
              <v-icon>mdi-lightbulb-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >Notes</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item :ripple="false" to="/reminders" link>
            <v-list-item-action>
              <v-icon>mdi-bell-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >Reminders</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :ripple="false"
            :to="`/labels/${label.title}`"
            v-for="label in labels"
            :key="label.title"
            link
          >
            <v-list-item-action>
              <v-icon>mdi-label-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">{{
                label.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item :ripple="false">
            <v-list-item-action>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">
              </v-list-item-title>
              <edit-labels-dialog
                :labels="labels"
                @update:labels="onUpdateLabels"
              />
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/archive" :ripple="false">
            <v-list-item-action>
              <v-icon>mdi-archive-arrow-down-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >Archive</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/trash" :ripple="false">
            <v-list-item-action>
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >Trash</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-container fluid>
      <slot></slot>
    </v-container>

    <v-app-bar app clipped-left color="white" flat>
      <v-app-bar-nav-icon
        class="nav-icon"
        @click.stop="mini = !mini"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="title"
        ><div class="d-flex">
          <v-img
            v-if="!label"
            class="mr-3"
            :width="32"
            src="../../assets/keep-icon.png"
          ></v-img
          ><span class="headline appname">{{ appname }}</span>
        </div>
      </v-toolbar-title>
    </v-app-bar>

    <v-footer color="white" app>
      <v-spacer></v-spacer>Made with <v-icon class="mx-2">mdi-laptop</v-icon> by
      Martin Prinz</v-footer
    >
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Label } from "../../store/modules/notes";

import EditLabelsDialog from "../EditLabels/EditLabelsDialog.vue";

const notes = namespace("notes");

@Component({ components: { EditLabelsDialog } })
export default class Navigation extends Vue {
  @notes.State
  public labels!: Array<Label>;

  @notes.Action
  public createLabel!: (title: string, color?: string) => void;

  @notes.Action
  public updateLabels!: (titles: Array<Label>) => void;

  public mini = true;
  public item = 1;
  public labelDialog = false;

  get label() {
    return this.$route.params.label;
  }

  get appname() {
    return this.label ? this.label : process.env.VUE_APP_TITLE;
  }

  toggleDrawer() {
    this.mini = !this.mini;
  }

  onUpdateLabels(labels: Array<Label>) {
    this.updateLabels(labels);
  }
}
</script>
<style lang="scss" scoped>
.active-item > div {
  color: black;
}
.appname {
  color: #5f6368;
}
.title {
  padding-left: 5px !important;
}
.nav-icon {
  margin-left: -8px !important;
}
</style>
