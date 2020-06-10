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
        <v-card class="mx-auto" max-width="400" tile>
          <v-list>
            <v-subheader>My Tasks</v-subheader>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item
                v-for="(task, i) in tasks"
                :key="i"
                :inactive="inactive"
              >
                <v-list-item-content>
                  <v-checkbox
                    v-model="task.isDone"
                    :label="task.title"
                  ></v-checkbox>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { Task } from "../store/modules/tasks";

const tasks = namespace("tasks");

@Component
export default class Tasks extends Vue {
  public input = "";
  @tasks.State
  public tasks!: Array<Task>;

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
