<template>
  <div class="notes">
    <v-row>
      <v-col cols="8">
        <notes-form @update="updateNotes" :label="activeLabel" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="note in notes" :key="note.title" :cols="4">
        <v-card :color="note.color">
          <v-card-title v-text="note.title"></v-card-title>
          <v-card-subtitle v-if="note.content"
            >{{ note.content }}
            <div v-if="note.tasks">
              <v-checkbox
                v-for="(task, i) in note.tasks"
                :key="i"
                dense
                class="checkbox"
                v-model="task.isDone"
                :label="task.title"
              ></v-checkbox></div
          ></v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

import NotesForm from "../components/Notes/NotesForm.vue";

import { Note } from "../store/modules/notes";

const notes = namespace("notes");

@Component({ components: { NotesForm } })
export default class Notes extends Vue {
  public activeLabel = "";

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
  public addNote!: (note: Note) => void;

  updateNotes(payload: { title: string; content: string; color: string }) {
    const note: Note = {
      title: payload.title,
      content: payload.content,
      label: this.activeLabel,
      color: payload.color
    };
    this.addNote(note);
  }
}
</script>
<style lang="scss" scoped>
.notes {
  padding-left: 50px;
}
</style>
