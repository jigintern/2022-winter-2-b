<script setup lang="ts">
import { ref } from "vue";
import Prefectures from "./components/Prefectures.vue"
import MeasuresItem from "./@types/MeasuresItem"

const baseUrl = import.meta.env.VITE_BASE_URL

const measuresItems = ref<MeasuresItem[]>([])

const selectPrefecture = async (prefecture: string):Promise<void> => {
  const res = await fetch(`${baseUrl}/api/prefectures?p=${prefecture}`)
  measuresItems.value = await res.json()
}


</script>

<template>
  <Prefectures :select-prefecture="selectPrefecture" />
  <div v-for="measuresItem in measuresItems">
    {{measuresItem}}
  </div>
</template>

<style>
@import "bulma/css/bulma.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
