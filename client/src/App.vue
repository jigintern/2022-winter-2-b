<script setup lang="ts">
import { ref } from "vue";
import Prefectures from "./components/Prefectures.vue"
import MeasureItem_t from "./@types/MeasureItem"
import MeasureItem from "./components/MeasureItem.vue";


const baseUrl = import.meta.env.VITE_BASE_URL

const measureItem = ref<MeasureItem_t>({disaster:"",measureItems:[]})

const selectPrefecture = async (prefecture: string):Promise<void> => {
  const res = await fetch(`${baseUrl}/api/prefectures?p=${prefecture}`)
  measureItem.value = await res.json()
}


</script>

<template>
  <Prefectures :select-prefecture="selectPrefecture" />
  <div class="columns is-mobile measureItem">
    <MeasureItem
      :disaster="measureItem.disaster"
      :measure-items="measureItem.measureItems"
      class="column is-4 is-offset-4"
    />
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
 
.measureItem {
  margin-top: 2em;
  text-align: left;
}
</style>
