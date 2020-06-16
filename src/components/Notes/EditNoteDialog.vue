<template>
  <v-dialog
    @input="setOpen(false)"
    overlay-color="#e5e5e5"
    :value="open"
    width="600"
  >
    <v-card v-if="note" :color="note.color">
      <v-card-text class="px-1">
        <v-form ref="form">
          <div class="d-flex pr-3">
            <v-text-field
              @keydown.enter.prevent
              flat
              hide-details
              solo
              :background-color="note.color"
              v-model="note.title"
            >
              <template v-slot:label>
                <span class="font-weight-medium">{{
                  note.title ? note.title : "Write a note..."
                }}</span>
              </template>
            </v-text-field>
          </div>

          <v-expand-transition>
            <div>
              <v-textarea
                solo
                flat
                auto-grow
                hide-details
                no-resize
                rows="1"
                :background-color="note.color"
                v-model="note.content"
                label="Write a note..."
              ></v-textarea>
              <div class="label">
                <v-chip v-if="note.label" color="#00000010" class="ma-2" close>
                  {{ note.label.title }}
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
                      <v-icon>mdi-palette-outline</v-icon>
                    </v-btn>
                  </template>

                  <v-color-picker
                    hide-inputs
                    hide-switch-mode
                    show-swatches
                    hide-canvas
                    disabled
                    :swatches="swatches"
                    v-model="note.color"
                  ></v-color-picker>
                </v-menu>
              </div>
            </div>
          </v-expand-transition>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click.prevent="onClick">close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { Note } from "../../store/modules/notes";

@Component
export default class NoteDialog extends Vue {
  @Prop() readonly open!: boolean;
  @Prop() readonly note!: Note;

  public swatches: Array<Array<string>> = [
    ["#FFFFFF", "#CBFD90", "#B388FF"],
    ["#FA8A80", "#A7FFEB", "#F8BBD0"],
    ["#FED180", "#80D8FF", "#D7CCC8"],
    ["#FFFD8D", "#82B1FF", "#CFD8DC"]
  ];

  @Emit("change")
  setOpen(value: boolean) {
    return value;
  }

  onClick() {
    this.setOpen(false);
  }
}
</script>
<style lang="scss" scoped></style>
