<template>
  <div class="notes">
    <note-dialog
      :note="selectedNote"
      :open="dialogOpen"
      @change="onChange"
    ></note-dialog>
    <v-row>
      <v-col cols="6" offset="2">
        <notes-form @update="updateNotes" :label="activeLabel" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="note in notes" :key="note.title" :cols="3">
        <note-card
          @click="onClick(note)"
          v-show="!selectedNote || note.id !== selectedNote.id"
          :note="note"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

import NotesForm from "../components/Notes/NotesForm.vue";
import NoteCard from "../components/Notes/NoteCard.vue";
import NoteDialog from "../components/Notes/EditNoteDialog.vue";

import { Note } from "../store/modules/notes";

const notes = namespace("notes");

@Component({ components: { NotesForm, NoteCard, NoteDialog } })
export default class Notes extends Vue {
  public activeLabel = "";
  public dialogOpen = false;
  public selectedNote: Note | null = null;

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
  public createNote!: (note: Note) => void;

  onClick(note: Note) {
    this.selectedNote = note;
    this.dialogOpen = true;
  }
  onChange(value: boolean) {
    if (!value) {
      this.selectedNote = null;
    }
    this.dialogOpen = value;
  }

  updateNotes(payload: {
    id: string;
    title: string;
    content: string;
    color: string;
  }) {
    const note: Note = {
      id: payload.id,
      title: payload.title,
      content: payload.content,
      labelId: this.activeLabel,
      color: payload.color
    };
    this.createNote(note);
  }
}
</script>
<style lang="scss" scoped>
.notes {
  padding-left: 50px;
}
</style>
