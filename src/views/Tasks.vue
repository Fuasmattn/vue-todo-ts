<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-container>
          <v-form ref="form">
            <v-text-field
              @keydown.enter="updateTasks"
              v-model="input"
              label="New Task"
              solo
            ></v-text-field>
          </v-form>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-list>
          <v-subheader>My Tasks</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item v-for="(task, i) in tasks" :key="i">
              <v-list-item-content>
                <v-checkbox
                  v-model="task.isDone"
                  :label="task.title"
                ></v-checkbox>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { Task } from "../store/modules/tasks";

const tasks = namespace("tasks");

@Component
export default class Tasks extends Vue {
  public activeLabel = "";
  public input = "";

  @Watch("$route.params.label", { immediate: true })
  labelChanged(label: string) {
    this.activeLabel = label ? label : "";
  }

  get tasks() {
    return this.tasksByLabel[this.activeLabel];
  }

  @tasks.Getter
  public tasksByLabel!: { [label: string]: Array<Task> };

  @tasks.Action
  public addTask!: (title: string) => void;

  resetInput() {
    this.input = "";
  }
  updateTasks() {
    this.addTask(this.input);
    this.resetInput();
  }
}
</script>
