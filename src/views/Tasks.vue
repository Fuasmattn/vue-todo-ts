<template>
  <div>
    <pre>{{ tasks }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import { Task } from "../store/modules/tasks";

const tasks = namespace("tasks");

@Component
export default class Tasks extends Vue {
  @tasks.State
  public tasks!: Array<Task>;

  @tasks.Action
  public addTask!: (title: string) => void;
}
</script>
