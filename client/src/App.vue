<script setup lang="ts">
import { computed, ref } from "vue"
import Prefectures from "./components/Prefectures.vue"
import MeasureItem_t from "./@types/MeasureItem"
import SelectPrefectureResponse from "./@types/SelectPrefectureResponse"
import MeasureItem from "./components/MeasureItem.vue"
import Header from "./components/Header.vue"
import Notification from "./components/Notification.vue"

const baseUrl = import.meta.env.VITE_BASE_URL

const measureItems = ref<MeasureItem_t>({})
const selectedPrefecture = ref<string>('')
const isNotificationActive = ref<boolean>(false)

const notify = () => isNotificationActive.value = true
const closeNotification = () => isNotificationActive.value = false
const disasterDummy = computed(() => (selectedPrefecture.value === '北海道' ? "大雪" : selectedPrefecture.value === "沖縄県" ? "台風" : "災害"))



const selectPrefecture = async (prefecture: string):Promise<void> => {
  selectedPrefecture.value = prefecture
  notify()

  const res:SelectPrefectureResponse = await (await fetch(`${baseUrl}/api/prefectures?p=${prefecture}`)).json()
  // レスポンスの形からdisasterを取り出しやすいように整形する
  measureItems.value = res.reduce<MeasureItem_t>((p,c) => {
    // disasterごとに振り分ける
    if(p?.[c.disaster] == null) {
      return {
        ...p,
        [c.disaster]:[{
          id: c.id,
          name:c.ItemName,
          link:c.ItemLink
        }]
      }
    }

    return {
      ...p,
      [c.disaster]:[
        ...p[c.disaster],
        {
          id:c.id,
          name:c.ItemName,
          link:c.ItemLink
        }
      ]
    }
  }, {})

}
</script>

<template>
  <Notification
    :prefecture="selectedPrefecture"
    :disaster="disasterDummy"
    :close-notification="closeNotification"
    v-if="isNotificationActive"
  />
  <Header />
  <Prefectures :select-prefecture="selectPrefecture" class="prefectures" />
  <div v-for="(measureItem, disaster) in measureItems" :key="disaster" class="measureItem content">
    <MeasureItem
      :disaster="(disaster as string)"
      :measure-items="measureItem"
    />
  </div>
</template>

<style>
@import "bulma/css/bulma.css";
#app {
  width:100vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* margin-left: 10vw; */
  color: #2c3e50;
  padding-bottom: 10vh;
}

.prefectures {
  padding-left: 10vw;
}

.measureItem {
  padding-left:10vw;
  margin-top: 2em;
  text-align: left;
}


</style>
