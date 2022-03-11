<template>
<div>
  <h1 class="title is-4">都道府県を選択</h1>
  <div class="select">
    <select v-model="selectedPrefecture" @change="selectPrefecture(selectedPrefecture)">
      <option></option>
      <option v-for="prefecture in prefectures" :key="prefecture">
        {{prefecture}}
      </option>
    </select>
  </div>
</div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'

const baseUrl = import.meta.env.VITE_BASE_URL

const prefectures = ref<string[]>([])
const selectedPrefecture = ref<string>('')

onMounted(async () => {
  const res = await fetch(`${baseUrl}/api/prefectures`)
  prefectures.value = await res.json()
})

interface Props {
  selectPrefecture: (p:string) => void
}
const props = defineProps<Props>()



</script>