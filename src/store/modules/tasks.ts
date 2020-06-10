import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

export interface Task {
  title: string;
  isDone: boolean;
  label: string;
}

export interface Label {
  title: string;
  color?: string;
}

const defaultColor = "#ffffff";

@Module({ namespaced: true })
class Tasks extends VuexModule {
  public tasks: Array<Task> = [
    { isDone: false, title: "Walk the dog", label: "private" },
    { isDone: false, title: "Walk the cat", label: "private" }
  ];

  public labels: Array<Label> = [{ title: "private" }];

  get tasksByLabel() {
    return this.tasks.reduce(
      (list: { [label: string]: Array<Task> }, task: Task) => {
        const t = list[task.label] ? list[task.label] : [];
        list[task.label] = [...t, task];
        return list;
      },
      {}
    );
  }

  @Mutation
  public updateTasks(task: Task): void {
    this.tasks.push(task);
  }
  @Action
  public addTask(title: string, label = ""): void {
    const task: Task = { title, isDone: false, label };
    this.context.commit("updateTasks", task);
  }

  @Mutation
  public updateLabels(label: Label): void {
    this.labels.push(label);
  }
  @Action
  public addLabel(title: string, color = defaultColor): void {
    const label: Label = { title, color };
    this.context.commit("updateLabels", label);
  }
}
export default Tasks;
