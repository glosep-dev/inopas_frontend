<script setup lang="ts">
import SideNavBar from '../components/SideNavBar.vue'
import BottomNavBar from '../components/BottomNavBar.vue'
import AppFooter from '../components/AppFooter.vue'
import { showAlert } from '../utils/sweetalert'

const handleSubmit = () => {
  showAlert('Message envoyé', 'Notre équipe vous répondra dans les plus brefs délais.', 'success')
}
</script>

<template>
  <div class="min-h-screen bg-background dark:bg-slate-950 text-on-surface dark:text-slate-200 font-body pb-24 md:pb-0 md:pl-64 transition-colors duration-300">
    <SideNavBar activeItem="support" />
    
    <main class="max-w-4xl mx-auto p-6 md:p-10">
      <header class="mb-10 text-center">
        <h2 class="text-3xl font-black tracking-tight text-primary dark:text-white">Comment pouvons-nous vous aider ?</h2>
        <p class="text-on-surface-variant dark:text-slate-400 font-medium">Consultez notre FAQ ou contactez un expert INOPAS.</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-outline-variant/10 dark:border-white/5 text-center">
          <div class="w-12 h-12 bg-primary-fixed dark:bg-blue-600/10 rounded-2xl flex items-center justify-center text-primary dark:text-blue-400 mx-auto mb-4">
            <span class="material-symbols-outlined">menu_book</span>
          </div>
          <h4 class="font-bold text-primary dark:text-white mb-2">Documentation</h4>
          <p class="text-xs text-on-surface-variant dark:text-slate-400">Guides complets pour l'intégration API.</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-outline-variant/10 dark:border-white/5 text-center">
          <div class="w-12 h-12 bg-primary-fixed dark:bg-blue-600/10 rounded-2xl flex items-center justify-center text-primary dark:text-blue-400 mx-auto mb-4">
            <span class="material-symbols-outlined">chat_bubble</span>
          </div>
          <h4 class="font-bold text-primary dark:text-white mb-2">Chat en direct</h4>
          <p class="text-xs text-on-surface-variant dark:text-slate-400">Réponse moyenne en moins de 5 min.</p>
        </div>
        <div class="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-outline-variant/10 dark:border-white/5 text-center">
          <div class="w-12 h-12 bg-primary-fixed dark:bg-blue-600/10 rounded-2xl flex items-center justify-center text-primary dark:text-blue-400 mx-auto mb-4">
            <span class="material-symbols-outlined">alternate_email</span>
          </div>
          <h4 class="font-bold text-primary dark:text-white mb-2">E-mail</h4>
          <p class="text-xs text-on-surface-variant dark:text-slate-400">Support prioritaire 24h/24 et 7j/7.</p>
        </div>
      </div>

      <div class="bg-surface-container-low dark:bg-slate-900 rounded-[2.5rem] p-10 border border-outline-variant/10 dark:border-white/5">
        <h3 class="text-2xl font-black text-primary dark:text-white mb-8 text-center">Envoyez-nous un ticket</h3>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <label class="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest px-1">Sujet</label>
            <input type="text" placeholder="Comment pouvons-nous vous aider ?" class="w-full bg-white dark:bg-slate-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 dark:focus:ring-blue-500/20 dark:text-white transition-all" required />
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest px-1">Message</label>
            <textarea rows="5" placeholder="Décrivez votre problème en détail..." class="w-full bg-white dark:bg-slate-800 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 dark:focus:ring-blue-500/20 dark:text-white transition-all" required></textarea>
          </div>
          <div class="pt-4">
            <button class="w-full bg-primary dark:bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all">
              Envoyer la demande
            </button>
          </div>
        </form>
      </div>

      <AppFooter class="mt-20" />
    </main>

    <BottomNavBar />
  </div>
</template>
