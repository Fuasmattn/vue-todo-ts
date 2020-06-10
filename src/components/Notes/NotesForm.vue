<template>
  <v-card>
    <v-form ref="form">
      <v-text-field
        @keydown.enter.prevent
        flat
        hide-details
        solo
        v-model="title"
        :label="focused ? 'Title' : 'Write a note...'"
        :append-icon="focused ? '' : 'mdi-lightbulb-outline'"
        @focus="focused = true"
      ></v-text-field>
      <div v-if="focused">
        <v-textarea
          solo
          flat
          auto-grow
          hide-details
          no-resize
          rows="1"
          v-model="content"
          label="Write a note..."
        ></v-textarea>
        <div class="label">
          <v-chip class="ma-2" close>
            {{ label }}
          </v-chip>
        </div>
        <div class="actions">
          <v-btn icon>
            <v-icon>mdi-palette</v-icon>
          </v-btn>
          <v-btn text @click.prevent="updateNotes">Close</v-btn>
        </div>
      </div>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

@Component
export default class NotesForm extends Vue {
  @Prop() readonly label!: string;

  public title = "";
  public content = "";
  public focused = false;

  resetForm() {
    this.title = "";
    this.content = "";
    this.focused = false;
  }

  @Emit("update")
  update() {
    return { title: this.title, content: this.content };
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
</style>
