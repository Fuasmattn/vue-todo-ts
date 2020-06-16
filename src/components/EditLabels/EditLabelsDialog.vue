<template>
  <v-dialog v-model="dialog" overlay-color="#e5e5e5" scrollable width="300">
    <template v-slot:activator="{ on, attrs }">
      <span class="font-weight-medium" v-bind="attrs" v-on="on">
        Edit Labels
      </span>
    </template>

    <v-card>
      <v-card-title class="text-body-1" primary-title>
        Edit Labels
      </v-card-title>

      <v-card-text class="px-1">
        <v-list flat>
          <v-list-item-group v-model="model">
            <v-list-item class="px-2" :ripple="false">
              <form class="d-flex w-100 justify-space-between align-center">
                <v-btn small class="mr-2" icon>
                  <v-icon v-if="isFocused(0)" small>mdi-close</v-icon>
                  <v-icon v-else @click="model = 0" small
                    >mdi-plus</v-icon
                  ></v-btn
                >

                <v-text-field
                  dense
                  :solo="!isFocused(0)"
                  :style="isFocused(0) ? 'padding-left: 12px' : ''"
                  flat
                  class="pt-0 mt-0 "
                  v-model="newLabel"
                  hide-details
                  placeholder="Create new label"
                  required
                ></v-text-field>
                <v-btn small class="ml-2" icon
                  ><v-icon v-if="isFocused(0)" small>mdi-check</v-icon></v-btn
                >
              </form>
            </v-list-item>

            <v-list-item
              v-for="(label, i) in labels"
              :key="label.title"
              class="px-2"
              :ripple="false"
            >
              <form class="d-flex w-100 justify-space-betwee align-center">
                <v-btn small class="mr-2" icon
                  ><v-icon small>mdi-label</v-icon></v-btn
                >

                <v-text-field
                  dense
                  flat
                  :solo="!isFocused(i + 1)"
                  :style="isFocused(i + 1) ? 'padding-left: 12px' : ''"
                  class="pt-0 mt-0"
                  :value="label.title"
                  @input="
                    value =>
                      onInput({
                        title: value,
                        id: label.id,
                        color: label.color
                      })
                  "
                  hide-details
                  :placeholder="label.title"
                  required
                ></v-text-field>
                <v-btn small class="ml-2" icon
                  ><v-icon v-if="isFocused(i + 1)" small>mdi-check</v-icon>
                  <v-icon v-else small>mdi-pencil</v-icon>
                </v-btn>
              </form>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="onConfirm">
          Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { Label } from "../../store/modules/notes";

@Component
export default class Dialog extends Vue {
  @Prop() labels!: Array<Label>;

  public dialog = false;
  public newLabel = "";
  public model = "";
  public innerModel: Array<Label> = this.labels;

  isFocused(index: number) {
    return +this.model === index;
  }

  @Emit("update:labels")
  onConfirm() {
    this.dialog = false;
    return this.innerModel;
  }

  onInput(newValue: Label) {
    const newLabels = this.innerModel.map((label: Label) =>
      label.id === newValue.id ? { ...label, title: newValue.title } : label
    );
    this.innerModel = newLabels;
  }
}
</script>
<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
</style>
