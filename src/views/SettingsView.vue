<script setup lang="ts">
import SideNavBar from '../components/SideNavBar.vue'
import BottomNavBar from '../components/BottomNavBar.vue'
import AppFooter from '../components/AppFooter.vue'
import { showToast } from '../utils/sweetalert'

const handleSave = () => {
  showToast('Paramètres enregistrés !')
}
</script>

<template>
  <div class="min-h-screen bg-background dark:bg-slate-950 text-on-surface dark:text-slate-200 font-body pb-24 md:pb-0 md:pl-64 transition-colors duration-300">
    <SideNavBar activeItem="settings" />
    
    <main class="max-w-4xl mx-auto p-6 md:p-10">
      <header class="mb-10">
        <h2 class="text-3xl font-black tracking-tight text-primary dark:text-white">Paramètres</h2>
        <p class="text-on-surface-variant dark:text-slate-400 font-medium">Gérez votre profil et vos préférences de sécurité.</p>
      </header>

      <div class="space-y-8">
        <!-- Profile Section -->
        <section class="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-outline-variant/10 dark:border-white/5">
          <div class="flex items-center gap-6 mb-8 pb-8 border-b border-outline-variant/10 dark:border-white/5">
            <div class="w-24 h-24 rounded-full bg-primary-fixed dark:bg-blue-600/10 flex items-center justify-center text-primary dark:text-blue-400 text-4xl font-black">
              NS
            </div>
            <div>
              <h3 class="text-xl font-bold text-primary dark:text-white">Nsole Antigravity</h3>
              <p class="text-on-surface-variant dark:text-slate-400 font-medium">Administrateur • admin@inopas.com</p>
              <button class="mt-3 text-sm font-bold text-primary dark:text-blue-400 hover:underline">Modifier la photo</button>
            </div>
          </div>

          <form @submit.prevent="handleSave" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest px-1">Nom</label>
              <input type="text" value="Nsole" class="w-full bg-surface-container-low dark:bg-slate-800 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 dark:focus:ring-blue-500/20 dark:text-white transition-all" />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest px-1">Prénom</label>
              <input type="text" value="Antigravity" class="w-full bg-surface-container-low dark:bg-slate-800 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 dark:focus:ring-blue-500/20 dark:text-white transition-all" />
            </div>
            <div class="space-y-2 md:col-span-2">
              <label class="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest px-1">Adresse e-mail</label>
              <input type="email" value="admin@inopas.com" class="w-full bg-surface-container-low dark:bg-slate-800 border-none rounded-xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 dark:focus:ring-blue-500/20 dark:text-white transition-all" />
            </div>
            <div class="md:col-span-2 pt-4">
              <button class="bg-primary dark:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </section>

        <!-- Security Section -->
        <section class="bg-surface-container-low dark:bg-slate-900 rounded-[2rem] p-8 border border-outline-variant/10 dark:border-white/5">
          <h3 class="text-xl font-bold text-primary dark:text-white mb-6">Sécurité</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl">
              <div class="flex items-center gap-4">
                <span class="material-symbols-outlined text-primary dark:text-blue-400">key</span>
                <div>
                  <p class="font-bold text-primary dark:text-white">Authentification à deux facteurs</p>
                  <p class="text-xs text-on-surface-variant dark:text-slate-400 font-medium">Ajoutez une couche de sécurité supplémentaire.</p>
                </div>
              </div>
              <button class="text-sm font-bold text-primary dark:text-blue-400 px-4 py-2 hover:bg-primary/5 dark:hover:bg-blue-500/10 rounded-lg transition-colors">Activer</button>
            </div>
            <div class="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl">
              <div class="flex items-center gap-4">
                <span class="material-symbols-outlined text-secondary dark:text-red-400">lock</span>
                <div>
                  <p class="font-bold text-primary dark:text-white">Changer le mot de passe</p>
                  <p class="text-xs text-on-surface-variant dark:text-slate-400 font-medium">Dernière modification : il y a 3 mois.</p>
                </div>
              </div>
              <button class="text-sm font-bold text-primary dark:text-blue-400 px-4 py-2 hover:bg-primary/5 dark:hover:bg-blue-500/10 rounded-lg transition-colors">Modifier</button>
            </div>
          </div>
        </section>
      </div>

      <AppFooter class="mt-20" />
    </main>

    <BottomNavBar activeItem="profile" />
  </div>
</template>
