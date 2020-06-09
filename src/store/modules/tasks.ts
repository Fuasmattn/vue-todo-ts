import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

export interface Task {
  title: string;
  isDone: boolean;
}

@Module({ namespaced: true })
class Tasks extends VuexModule {
  public tasks: Array<Task> = [{ isDone: false, title: "Walk the dog" }];
  @Mutation
  public updateTasks(title: string): void {
    const task: Task = { title, isDone: false };
    this.tasks.push(task);
  }
  @Action
  public addTask(title: string): void {
    this.context.commit("updateTasks", title);
  }
}
export default Tasks;
