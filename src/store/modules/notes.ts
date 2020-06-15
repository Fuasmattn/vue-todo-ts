import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

export interface Task {
  title: string;
  isDone: boolean;
}

export interface Note {
  id: string;
  title: string;
  content?: string;
  isDone?: boolean;
  labelId: number | string;
  tasks?: Array<Task>;
  color: string;
}

export interface Label {
  title: string;
  color?: string;
  id: string;
}

const defaultColor = "#FFFFFF";

@Module({ namespaced: true })
class Notes extends VuexModule {
  public notes: Array<Note> = [
    {
      id: "0",
      title: "Walk the dog",
      labelId: "Private",
      content: "",
      color: defaultColor
    },
    {
      id: "1",
      title: "there is a cat",
      labelId: "Private",
      content: "",
      color: "#A7FFEB",
      tasks: [
        { isDone: false, title: "bring cat back to the neighbours" },
        { isDone: false, title: "get a lawyer" },
        { isDone: true, title: "find a cat" }
      ]
    },
    {
      title: "Do nothing",
      labelId: "",
      content: "",
      color: defaultColor,
      id: "3"
    }
  ];

  public labels: Array<Label> = [
    { id: "Private", title: "Private" },
    { id: "Work", title: "Work" }
  ];

  get labelsById() {
    return this.labels.reduce(
      (list: { [labelId: string]: Array<Label> }, label: Label) => {
        const t = list[label.id] ? list[label.id] : [];
        list[label.id] = [...t, label];
        return list;
      },
      {}
    );
  }

  get notesByLabel() {
    return this.notes.reduce(
      (list: { [label: string]: Array<Note> }, note: Note) => {
        const t = list[note.labelId] ? list[note.labelId] : [];
        list[note.labelId] = [...t, note];
        return list;
      },
      {}
    );
  }

  @Mutation
  public setNote(note: Note): void {
    this.notes.push(note);
  }

  @Mutation
  public updateNotes(notes: Array<Note>): void {
    this.notes = notes;
  }

  @Action
  public createNote(note: Note): void {
    this.context.commit("setNote", note);
  }

  @Mutation
  public addLabel(label: Label): void {
    this.labels.push(label);
  }

  @Action
  public createLabel(title: string, color = defaultColor): void {
    const label: Label = { title, color, id: title };
    this.context.commit("addLabel", label);
  }

  @Mutation
  public setLabels(labels: Array<Label>): void {
    this.labels = labels;
  }

  @Action
  public updateLabels(labels: Array<Label>): void {
    this.context.commit("setLabels", labels);
  }
}
export default Notes;
