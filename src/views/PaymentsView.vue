<script setup lang="ts">
import { ref } from 'vue'
import SideNavBar from '../components/SideNavBar.vue'
import BottomNavBar from '../components/BottomNavBar.vue'
import AppFooter from '../components/AppFooter.vue'
import NewPaymentModal from '../components/NewPaymentModal.vue'
import { userStore } from '../store/userStore'

const showPaymentModal = ref(false)

const openPaymentModal = () => {
  if (userStore.kycStatus !== 'verified') {
    return
  }
  showPaymentModal.value = true
}
</script>

<template>
  <div class="min-h-screen bg-background dark:bg-slate-950 text-on-surface dark:text-slate-200 font-body pb-24 md:pb-0 md:pl-64 transition-colors duration-300">
    <SideNavBar activeItem="payments" />
    
    <main class="max-w-7xl mx-auto p-6 md:p-10">
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 class="text-3xl font-black tracking-tight text-primary dark:text-white">Paiements</h2>
          <p class="text-on-surface-variant dark:text-slate-400 font-medium">Gérez vos transactions et flux financiers.</p>
        </div>
        <button 
          @click="openPaymentModal"
          :class="[
            'px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all',
            userStore.kycStatus === 'verified' 
              ? 'bg-primary dark:bg-blue-600 text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]' 
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'
          ]"
        >
          <span class="material-symbols-outlined text-sm">{{ userStore.kycStatus === 'verified' ? 'add' : 'lock' }}</span>
          {{ userStore.kycStatus === 'verified' ? 'Nouveau paiement' : 'Vérifiez votre identité' }}
        </button>
      </header>

      <div class="grid grid-cols-1 gap-6">
        <div class="bg-surface-container-low dark:bg-slate-900 rounded-[2rem] p-8 border border-outline-variant/10 dark:border-white/5">
          <h3 class="text-xl font-bold text-primary dark:text-white mb-6">Transactions Récentes</h3>
          <div class="space-y-4">
            <div v-for="tx in userStore.transactions" :key="tx.id" class="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl hover:shadow-md transition-shadow ring-1 ring-black/5 dark:ring-white/5 border border-transparent dark:border-white/5">
              <div class="flex items-center gap-4">
                <div :class="[
                  'w-12 h-12 rounded-xl flex items-center justify-center font-bold',
                  tx.type === 'incoming' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                ]">
                  <span class="material-symbols-outlined">{{ tx.type === 'incoming' ? 'north_east' : 'south_west' }}</span>
                </div>
                <div>
                  <p class="font-bold text-primary dark:text-white">{{ tx.label }}</p>
                  <p class="text-xs text-on-surface-variant font-medium">{{ tx.date }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-black text-primary dark:text-white" :class="tx.type === 'incoming' ? 'text-green-500' : 'text-red-500'">
                  {{ tx.type === 'incoming' ? '+' : '' }}{{ userStore.formatAmount(tx.amount) }}
                </p>
                <p :class="['text-[10px] font-bold uppercase tracking-widest', tx.status === 'completed' ? 'text-green-600' : tx.status === 'failed' ? 'text-secondary' : 'text-amber-600']">
                  {{ tx.status === 'completed' ? 'Complété' : tx.status }}
                </p>
              </div>
            </div>
          </div>
          <div v-if="userStore.transactions.length === 0" class="text-center py-10 opacity-50">
            Aucune transaction récente.
          </div>
        </div>
      </div>
      
      <AppFooter class="mt-20" />
    </main>

    <BottomNavBar activeItem="pay" />

    <NewPaymentModal 
      :show="showPaymentModal" 
      @close="showPaymentModal = false" 
    />
  </div>
</template>
