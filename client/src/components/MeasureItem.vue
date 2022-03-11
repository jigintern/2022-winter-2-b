<template>
  <div>
    <h2 class="title is-4 disaster-title">
      {{disaster}}
    </h2>
    <div v-for="{id,name, link, checked} in measureItemCheckbox" class="columns" :key="id">
      <label class="checkbox item">
        <input type="checkbox" :checked="checked" @change="checkItem(id)">
        <s v-if="checked">{{name}}</s>
        <span v-else>{{name}}</span>
        <a v-if="link != null" :href="link" target="_blank" rel="noreferrer">  amazonへ</a>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MeasureItem_t from '../@types/MeasureItem'
interface Props {
  disaster: string,
  measureItems: MeasureItem_t[string]
}
const {measureItems} = defineProps<Props>()

type MeasureItemCheckbox_t = MeasureItem_t[string][number] & {checked: boolean}
const measureItemCheckboxInit: MeasureItemCheckbox_t[] = measureItems.map((item) => ({...item,checked:false}))
const measureItemCheckbox = ref<MeasureItemCheckbox_t[]>(measureItemCheckboxInit)

const checkItem = (id:number) => {
  const checkboxCopy = [...measureItemCheckbox.value]
  measureItemCheckbox.value = checkboxCopy.map(item => {
    if (item.id === id) {
      return {...item, checked: !item.checked}
    }
    return item
  })
}
</script>

<style>
.item {
  padding-top: 1em;
}
.link-button {
  margin-left:0.5em;
}
</style>