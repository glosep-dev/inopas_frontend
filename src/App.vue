<script setup lang="ts">
import { RouterView } from 'vue-router'
import { watch, onMounted } from 'vue'
import { userStore } from './store/userStore'

watch(() => userStore.isDarkMode, (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })

onMounted(() => {
  // Initialize from store on load
  if (userStore.isDarkMode) {
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <RouterView />
</template>
