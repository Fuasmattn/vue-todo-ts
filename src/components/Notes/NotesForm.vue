<template>
  <v-card :color="color">
    <v-form ref="form">
      <div class="d-flex pr-3">
        <v-text-field
          @keydown.enter.prevent
          flat
          hide-details
          solo
          :background-color="color"
          v-model="title"
          :label="focused ? 'Title' : 'Write a note...'"
          @focus="focused = true"
        ></v-text-field>
        <div v-if="!focused">
          <v-btn icon class="pa-6 notes-option"
            ><v-icon>mdi-check-box-outline</v-icon></v-btn
          >
          <v-btn icon class="pa-6 notes-option"
            ><v-icon>mdi-brush</v-icon></v-btn
          >
          <v-btn icon class="pa-6 notes-option"
            ><v-icon>mdi-image-outline</v-icon></v-btn
          >
        </div>
      </div>

      <v-expand-transition>
        <div v-if="focused">
          <v-textarea
            solo
            flat
            auto-grow
            hide-details
            no-resize
            rows="1"
            :background-color="color"
            v-model="content"
            label="Write a note..."
          ></v-textarea>
          <div class="label">
            <v-chip v-if="label" color="#00000010" class="ma-2" close>
              {{ label }}
            </v-chip>
          </div>
          <div class="actions">
            <v-menu
              bottom
              offset-x
              offset-y
              origin="left top"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon>
                  <v-icon>mdi-palette</v-icon>
                </v-btn>
              </template>

              <v-color-picker
                hide-inputs
                hide-switch-mode
                show-swatches
                hide-canvas
                disabled
                :swatches="swatches"
                v-model="color"
              ></v-color-picker>
            </v-menu>

            <v-btn text @click.prevent="updateNotes">Close</v-btn>
          </div>
        </div>
      </v-expand-transition>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";
const white = "#FFFFFF";

@Component
export default class NotesForm extends Vue {
  @Prop() readonly label!: string;

  public swatches: Array<Array<string>> = [
    ["#FFFFFF", "#CBFD90", "#B388FF"],
    ["#FA8A80", "#A7FFEB", "#F8BBD0"],
    ["#FED180", "#80D8FF", "#D7CCC8"],
    ["#FFFD8D", "#82B1FF", "#CFD8DC"]
  ];

  public title = "";
  public content = "";
  public color = white;
  public focused = false;
  public showColorPicker = false;

  resetForm() {
    this.title = "";
    this.content = "";
    this.focused = false;
    this.color = white;
  }

  @Emit("update")
  update() {
    return { title: this.title, content: this.content, color: this.color };
  }

  updateNotes() {
    if (this.title || this.content) {
      this.update();
    }
    this.resetForm();
  }
}
</script>

<style scoped lang="scss">
.actions {
  display: flex;
  padding: 5px 15px 5px 8px;
  justify-content: space-between;
}

.notes-option {
  &:hover,
  &:focus > * {
    color: black !important;
  }
}
</style>
