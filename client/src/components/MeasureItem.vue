<template>
  <div>
    <h2 class="title is-4 disaster-title">
      {{disaster}}
    </h2>
    <div v-for="{name, link, checked} in measureItemCheckbox" class="columns" :key="name">
      <label class="checkbox item" v-if="link === ''">
        <input type="checkbox" :checked="checked">
        {{name}}
      </label>

      <label class="checkbox item" v-else>
        <input type="checkbox" :checked="checked">
        {{name}}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MeasureItem_t from '../@types/MeasureItem';
interface Props {
  disaster: string,
  measureItems: MeasureItem_t[string]
}

const {disaster, measureItems} = defineProps<Props>()

type MeasureItemCheckbox_t = MeasureItem_t[string][number] & {checked: boolean}
const measureItemCheckboxInit: MeasureItemCheckbox_t[] = measureItems.map((item) => ({...item,checked:false}))
const measureItemCheckbox = ref<MeasureItemCheckbox_t[]>(measureItemCheckboxInit)

</script>

<style>
.item {
  padding-top: 0.5em;
}
</style>