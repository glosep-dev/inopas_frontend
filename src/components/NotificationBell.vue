<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { userStore } from '../store/userStore'

const isOpen = ref(false)
const bellRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    // Optional: auto mark as read when opening? 
    // userStore.markAllNotificationsAsRead()
  }
}

const unreadCount = () => {
  return userStore.notifications.filter(n => !n.isRead).length
}

const closeDropdown = (e: MouseEvent) => {
  if (bellRef.value && !bellRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <div class="relative" ref="bellRef">
    <button 
      @click="toggleDropdown"
      class="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary-fixed hover:text-primary transition-all relative group"
    >
      <span class="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">notifications</span>
      <span 
        v-if="unreadCount() > 0"
        class="absolute top-2 right-2 w-5 h-5 bg-secondary text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900 animate-bounce"
      >
        {{ unreadCount() > 9 ? '9+' : unreadCount() }}
      </span>
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0 -translate-y-2"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 -translate-y-2"
    >
      <div 
        v-if="isOpen"
        class="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-outline-variant/10 overflow-hidden z-[100]"
      >
        <div class="p-6 border-b border-outline-variant/10 flex justify-between items-center">
          <h4 class="font-black text-on-surface">Notifications</h4>
          <button 
            @click="userStore.markAllNotificationsAsRead()"
            class="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline"
          >
            Tout lire
          </button>
        </div>
        
        <div class="max-h-[400px] overflow-y-auto custom-scrollbar">
          <div v-if="userStore.notifications.length === 0" class="p-10 text-center">
            <span class="material-symbols-outlined text-4xl text-outline-variant block mb-2">notifications_off</span>
            <p class="text-sm text-on-surface-variant font-medium">Aucune notification</p>
          </div>
          
          <div 
            v-for="notif in userStore.notifications" 
            :key="notif.id"
            class="p-5 border-b border-outline-variant/5 hover:bg-surface-container-low transition-colors cursor-pointer relative"
            :class="{ 'bg-primary/5': !notif.isRead }"
          >
            <div class="flex gap-4">
              <div :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 
                notif.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
              ]">
                <span class="material-symbols-outlined text-xl">
                  {{ notif.type === 'success' ? 'check_circle' : notif.type === 'warning' ? 'warning' : 'info' }}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-on-surface truncate">{{ notif.title }}</p>
                <p class="text-xs text-on-surface-variant line-clamp-2 mt-0.5 leading-relaxed">{{ notif.message }}</p>
                <p class="text-[10px] text-outline mt-2 font-medium">{{ notif.time }}</p>
              </div>
              <div v-if="!notif.isRead" class="w-2 h-2 rounded-full bg-primary mt-1 shadow-sm shadow-primary/40"></div>
            </div>
          </div>
        </div>
        
        <div class="p-4 bg-surface-container-lowest text-center">
          <button class="text-xs font-bold text-on-surface-variant hover:text-primary transition-colors">
            Voir tout l'historique
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(var(--md-sys-color-outline-variant), 0.2);
  border-radius: 10px;
}
</style>
