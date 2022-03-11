<template>
<span class="my-notif">
<div class="notification is-primary">
  <button class="delete" @click="closeNotification()" />
  <p>お住いの{{prefecture}}では、まもなく<strong>{{disaster}}</strong>の時期がきます！！</p>
  <p>チェックリストを確認しましょう！</p>
</div>
</span>
</template>

<script setup lang="ts">
  type Props = {
    prefecture: string,
    disaster: string,
    closeNotification: () => void
  }
  defineProps<Props>()
</script>

<style>
.my-notif div {
  position: fixed;
}
.notification{
  bottom:1em;
  right:1em;
  z-index: 10;
  box-shadow: 0 0 1em rgb(0 0 0 / 10%);
};
</style>