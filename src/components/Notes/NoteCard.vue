<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :ripple="false"
      @click="$emit('click')"
      class="v-card"
      outlined
      :elevation="hover ? 2 : 0"
      :style="`background: ${note.color}`"
    >
      <v-card-title class="text-body-1" v-text="note.title"></v-card-title>
      <v-card-subtitle v-if="note.tasks || note.content"
        >{{ note.content }}
        <div v-if="note.tasks" class="mt-4">
          <v-checkbox
            v-for="(task, i) in getOpenTasks(note)"
            :key="i + 'open'"
            dense
            hide-details
            class="my-2"
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
            dense
            hide-details
            color="black"
            class="my-2"
            v-model="task.isDone"
            ><template v-slot:label
              ><span class="text-decoration-line-through text-body-2">{{
                task.title
              }}</span></template
            ></v-checkbox
          >
        </div>
      </v-card-subtitle>
      <div class="px-3">
        <v-chip small v-if="note.labelId" color="#00000010">
          <span>{{ labelsById[note.labelId][0].title }}</span>
        </v-chip>
      </div>
      <v-card-actions
        :style="`opacity: ${hover ? 1 : 0}`"
        class="card-actions pa-0"
      >
        <v-list-item class="grow">
          <v-row>
            <v-btn small icon class="mr-2"
              ><v-icon small>mdi-bell-plus-outline</v-icon></v-btn
            >
            <v-btn small icon class="mr-2"
              ><v-icon small>mdi-palette-outline</v-icon></v-btn
            >
          </v-row>
        </v-list-item></v-card-actions
      >
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Note, Task, Label } from "../../store/modules/notes";

import { namespace } from "vuex-class";
const notes = namespace("notes");

@Component
export default class Card extends Vue {
  @Prop() readonly note!: Note;

  @notes.Getter
  public labelsById!: { [id: string]: Label };

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
<style lang="scss" scoped>
.card-actions {
  opacity: 0;
  height: 48px;
  transition: all 0.2s ease-in-out;
}
</style>
