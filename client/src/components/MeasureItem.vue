<template>
  <div>
    <h2 class="title is-4 disaster-title">
      {{disaster}}
    </h2>
    <div v-for="{name, link} in measureItems" class="columns">
      <label class="checkbox" v-if="link === ''">
        <input type="checkbox">
        {{name}}
      </label>

      <label class="checkbox" v-else>
        <input type="checkbox">
        <a href="link">{{name}}</a>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import MeasureItem_t from '../@types/MeasureItem';

interface Props {
  disaster: MeasureItem_t["disaster"],
  measureItems: MeasureItem_t["measureItems"]
}

const {disaster, measureItems} = defineProps<Props>()
</script>