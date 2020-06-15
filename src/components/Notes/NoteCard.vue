<template>
  <v-card :color="note.color">
    <v-card-title class="text-body-1" v-text="note.title"></v-card-title>
    <v-card-subtitle
      >{{ note.content }}
      <div v-if="note.tasks" class="mt-4">
        <v-checkbox
          v-for="(task, i) in getOpenTasks(note)"
          :key="i + 'open'"
          dense
          hide-details
          class="checkbox"
          v-model="task.isDone"
          ><template v-slot:label
            ><span class="text-body-2">{{ task.title }}</span></template
          ></v-checkbox
        >
        <v-divider
          class="my-2"
          v-if="!getOpenTasks(note).length || getClosedTasks(note).length"
        ></v-divider>
        <v-checkbox
          v-for="(task, i) in getClosedTasks(note)"
          :key="i"
          densej
          hide-details
          color="black"
          class="checkbox"
          v-model="task.isDone"
          ><template v-slot:label
            ><span class="text-decoration-line-through text-body-2">{{
              task.title
            }}</span></template
          ></v-checkbox
        >
      </div>

      <v-chip small v-if="note.label" color="#00000010" class="mt-4">
        <span>{{ note.label }}</span>
      </v-chip>
    </v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Note, Task } from "../../store/modules/notes";

@Component
export default class Card extends Vue {
  @Prop() readonly note!: Note;

  getOpenTasks(note: Note) {
    return note && note.tasks
      ? note.tasks.filter((task: Task) => !task.isDone)
      : [];
  }

  getClosedTasks(note: Note) {
    return note && note.tasks
      ? note.tasks.filter((task: Task) => task.isDone)
      : [];
  }
}
</script>
