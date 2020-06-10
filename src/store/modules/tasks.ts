import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

export interface Task {
  title: string;
  isDone: boolean;
}

export interface Label {
  title: string;
  color?: string;
}

const defaultColor = "#ffffff";

@Module({ namespaced: true })
class Tasks extends VuexModule {
  public tasks: Array<Task> = [{ isDone: false, title: "Walk the dog" }];
  public labels: Array<Label> = [{ title: "private" }];

  @Mutation
  public updateTasks(task: Task): void {
    this.tasks.push(task);
  }
  @Action
  public addTask(title: string): void {
    const task: Task = { title, isDone: false };
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
