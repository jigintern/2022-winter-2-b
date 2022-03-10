<script setup lang="ts">
import { ref } from "vue";
import Prefectures from "./components/Prefectures.vue"
import MeasureItem_t from "./@types/MeasureItem"
import MeasureItem from "./components/MeasureItem.vue";
import Header from "./components/Header.vue";


const baseUrl = import.meta.env.VITE_BASE_URL

const measureItem = ref<MeasureItem_t>({disaster:"",measureItems:[]})

const selectPrefecture = async (prefecture: string):Promise<void> => {
  const res = await fetch(`${baseUrl}/api/prefectures?p=${prefecture}`)
  measureItem.value = await res.json()
}


</script>

<template>
  <Header />
  <Prefectures :select-prefecture="selectPrefecture" />
  <div class="measureItem">
    <MeasureItem
      :disaster="measureItem.disaster"
      :measure-items="measureItem.measureItems"
    />
  </div>
</template>

<style>
@import "bulma/css/bulma.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-left: 10vw;
  color: #2c3e50;
  margin-top: 60px;
}
 
.measureItem {
  margin-top: 2em;
  text-align: left;
}
</style>
