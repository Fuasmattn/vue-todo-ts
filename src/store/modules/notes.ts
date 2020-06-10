import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

export interface Task {
  title: string;
  isDone: boolean;
}

export interface Note {
  title: string;
  content?: string;
  isDone?: boolean;
  label: string;
  tasks?: Array<Task>;
  color: string;
}

export interface Label {
  title: string;
  color?: string;
}

const defaultColor = "#FFFFFF";

@Module({ namespaced: true })
class Notes extends VuexModule {
  public notes: Array<Note> = [
    {
      title: "Walk the dog",
      label: "Private",
      content: "",
      color: defaultColor
    },
    {
      title: "there is a cat",
      label: "Private",
      content: "careful, you don't own any cat.",
      color: "#A7FFEB",
      tasks: [{ isDone: false, title: "bring cat back to the neighbors" }]
    },
    { title: "Do nothing", label: "", content: "", color: defaultColor }
  ];

  public labels: Array<Label> = [{ title: "Private" }, { title: "Work" }];

  get notesByLabel() {
    return this.notes.reduce(
      (list: { [label: string]: Array<Note> }, note: Note) => {
        const t = list[note.label] ? list[note.label] : [];
        list[note.label] = [...t, note];
        return list;
      },
      {}
    );
  }

  @Mutation
  public updateNotes(note: Note): void {
    this.notes.push(note);
  }
  @Action
  public addNote(note: Note): void {
    this.context.commit("updateNotes", note);
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
export default Notes;
