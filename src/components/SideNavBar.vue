<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { userStore } from '../store/userStore'

interface NavItem {
  icon: string
  label: string
  route: string
  id: string
}

const props = defineProps<{
  activeItem: string
}>()

const navItems: NavItem[] = [
  { icon: 'dashboard', label: 'Vue d\'ensemble', route: '/dashboard', id: 'overview' },
  { icon: 'payments', label: 'Paiements', route: '/payments', id: 'payments' },
  { icon: 'vpn_key', label: 'Clés API', route: '/api-keys', id: 'api-keys' },
  { icon: 'leaderboard', label: 'Analyses', route: '/analytics', id: 'analytics' },
  { icon: 'settings', label: 'Paramètres', route: '/settings', id: 'settings' },
  { icon: 'hub', label: 'Mes Opérateurs', route: '/operators', id: 'operators' },
]
</script>

<template>
  <aside
    class="h-screen w-64 fixed left-0 top-0 bg-[#eef4fe] dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none flex-col p-6 gap-y-4 z-40 hidden md:flex"
  >
    <div class="mb-8">
      <h1 class="text-xl font-bold text-[#0a1944] dark:text-blue-400">Portail Inopas</h1>
      <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">Compte institutionnel</p>
    </div>
    <nav class="flex flex-col gap-y-2 flex-grow">
      <RouterLink
        v-for="item in navItems"
        :key="item.id"
        :to="item.route"
        :class="[
          'flex items-center gap-3 p-3 font-semibold text-sm transition-all text-left w-full rounded-xl',
          activeItem === item.id
            ? 'bg-white dark:bg-slate-800 text-[#0a1944] dark:text-white shadow-sm'
            : 'text-slate-500 dark:text-slate-400 hover:translate-x-1 transition-transform'
        ]"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        {{ item.label }}
      </RouterLink>
    </nav>
    <div class="pt-6 border-t border-outline-variant/20 flex flex-col gap-y-2">
      <RouterLink
        to="/profile"
        :class="[
          'flex items-center gap-3 p-3 font-semibold text-sm transition-all text-left w-full rounded-xl',
          activeItem === 'profile'
            ? 'bg-white dark:bg-slate-800 text-[#0a1944] dark:text-white shadow-sm'
            : 'text-slate-500 dark:text-slate-400 hover:translate-x-1 transition-transform'
        ]"
      >
        <span class="material-symbols-outlined text-primary">account_circle</span>
        Mon Profil
      </RouterLink>
      <RouterLink
        to="/support"
        :class="[
          'flex items-center gap-3 p-3 font-semibold text-sm transition-all text-left w-full rounded-xl',
          activeItem === 'support'
            ? 'bg-white dark:bg-slate-800 text-[#0a1944] dark:text-white shadow-sm'
            : 'text-slate-500 dark:text-slate-400 hover:translate-x-1 transition-transform'
        ]"
      >
        <span class="material-symbols-outlined">help</span>
        Assistance
      </RouterLink>
      
      <button
        @click="userStore.toggleDarkMode"
        class="flex items-center gap-3 p-3 text-slate-500 dark:text-slate-400 hover:translate-x-1 transition-transform font-semibold text-sm w-full text-left rounded-xl"
      >
        <span class="material-symbols-outlined">{{ userStore.isDarkMode ? 'light_mode' : 'dark_mode' }}</span>
        Mode {{ userStore.isDarkMode ? 'Clair' : 'Sombre' }}
      </button>

      <RouterLink
        to="/login"
        class="flex items-center gap-3 p-3 text-slate-500 dark:text-slate-400 hover:translate-x-1 transition-transform font-semibold text-sm"
      >
        <span class="material-symbols-outlined">logout</span>
        Déconnexion
      </RouterLink>
    </div>
  </aside>
</template>
