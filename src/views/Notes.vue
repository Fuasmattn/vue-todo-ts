<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-container>
          <v-form ref="form">
            <v-text-field
              @keydown.enter="updateNotes"
              v-model="input"
              label="New Note"
              solo
            ></v-text-field>
          </v-form>
        </v-container>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="note in notes" :key="note.title" :cols="4">
        <v-card>
          <v-card-title v-text="note.title"></v-card-title>
          <v-card-subtitle v-if="note.content"
            >{{ note.content }}
            <div v-if="note.tasks">
              <v-checkbox
                v-for="(task, i) in note.tasks"
                :key="i"
                dense
                ripple="false"
                class="checkbox"
                v-model="task.isDone"
                :label="task.title"
              ></v-checkbox></div
          ></v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { Note } from "../store/modules/notes";

const notes = namespace("notes");

@Component
export default class Notes extends Vue {
  public activeLabel = "";
  public input = "";

  @Watch("$route.params.label", { immediate: true })
  labelChanged(label: string) {
    this.activeLabel = label ? label : "";
  }

  get notes() {
    return this.notesByLabel[this.activeLabel];
  }

  get notesTitle() {
    return this.activeLabel ? this.activeLabel : "My Notes";
  }

  @notes.Getter
  public notesByLabel!: { [label: string]: Array<Note> };

  @notes.Action
  public addNote!: (title: string) => void;

  resetInput() {
    this.input = "";
  }
  updateNotes() {
    this.addNote(this.input);
    this.resetInput();
  }
}
</script>
<style lang="scss" scoped>
.checkbox {
}
</style>
