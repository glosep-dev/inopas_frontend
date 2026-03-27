<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps<{
  activeItem?: string
}>()

interface BottomNavItem {
  icon: string
  label: string
  route: string
  id: string
  filled?: boolean
}

const navItems: BottomNavItem[] = [
  { icon: 'home', label: 'Accueil', route: '/', id: 'home' },
  { icon: 'account_balance_wallet', label: 'Payer', route: '/payments', id: 'pay' },
  { icon: 'code', label: '', route: '/api-keys', id: 'api-keys', filled: true },
  { icon: 'person', label: 'Profil', route: '/profile', id: 'profile' },
]
</script>

<template>
  <nav
    class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-6 pt-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.04)] rounded-t-[2.5rem]"
  >
    <RouterLink
      v-for="item in navItems"
      :key="item.id"
      :to="item.route"
      :class="[
        item.filled
          ? 'flex flex-col items-center justify-center bg-[#0a1944] text-white rounded-full p-3 mb-2 transform -translate-y-2 shadow-xl transition-all'
          : 'flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 active:bg-slate-100 dark:active:bg-slate-800 transition-all'
      ]"
    >
      <span
        class="material-symbols-outlined"
        :style="item.filled ? `font-variation-settings: 'FILL' 1` : ''"
      >{{ item.icon }}</span>
      <span v-if="item.label" class="text-[10px] uppercase tracking-widest font-bold mt-1">{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>
