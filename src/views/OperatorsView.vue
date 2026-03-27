<script setup lang="ts">
import SideNavBar from '../components/SideNavBar.vue'
import AppFooter from '../components/AppFooter.vue'
import NotificationBell from '../components/NotificationBell.vue'
import { userStore } from '../store/userStore'
import Swal from 'sweetalert2'

const operators = [
  {
    id: 'mpesa',
    name: 'M-Pesa',
    type: 'Mobile Money',
    status: 'active',
    fee: '0.5%',
    settlement: 'Instantané',
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    textColor: 'text-red-600',
    description: 'Le leader du mobile money en RDC par Vodacom.',
    icon: 'smartphone'
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
    type: 'Mobile Money',
    status: 'active',
    fee: '0.5%',
    settlement: 'Instantané',
    color: 'bg-red-600',
    lightColor: 'bg-red-100',
    textColor: 'text-red-700',
    description: 'Solution de paiement mobile par Airtel RDC.',
    icon: 'smartphone'
  },
  {
    id: 'orange',
    name: 'Orange Money',
    type: 'Mobile Money',
    status: 'active',
    fee: '0.5%',
    settlement: 'Instantané',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    description: 'Portefeuille électronique par Orange RDC.',
    icon: 'smartphone'
  },
  {
    id: 'equity',
    name: 'EquityBCDC',
    type: 'Banque',
    status: 'active',
    fee: '1.0%',
    settlement: 'J+1',
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    description: 'Virements et encaissements via le réseau EquityBCDC.',
    icon: 'account_balance'
  },
  {
    id: 'rawbank',
    name: 'Rawbank',
    type: 'Banque',
    status: 'maintenance',
    fee: '1.0%',
    settlement: 'J+1',
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
    textColor: 'text-yellow-600',
    description: 'Services bancaires par la première banque de RDC.',
    icon: 'account_balance'
  },
  {
    id: 'illicocash',
    name: 'Illicocash',
    type: 'Mobile/Bank',
    status: 'active',
    fee: '0.8%',
    settlement: 'Instantané',
    color: 'bg-blue-800',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    description: 'Le portefeuille digital de Rawbank.',
    icon: 'account_balance_wallet'
  }
]

const handleOperatorDetails = (op: any) => {
  Swal.fire({
    title: op.name,
    html: `
      <div class="text-left space-y-4 pt-4">
        <p class="text-sm opacity-70">${op.description}</p>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <p class="text-[10px] font-bold opacity-50 uppercase">Frais</p>
            <p class="text-lg font-black text-primary">${op.fee}</p>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <p class="text-[10px] font-bold opacity-50 uppercase">Règlement</p>
            <p class="text-lg font-black text-on-surface">${op.settlement}</p>
          </div>
        </div>
        <div class="p-4 border border-dashed rounded-xl border-outline-variant/30">
          <p class="text-xs font-medium">Statut de la passerelle : <span class="font-bold ${op.status === 'active' ? 'text-emerald-500' : 'text-amber-500'} uppercase">${op.status}</span></p>
        </div>
      </div>
    `,
    confirmButtonText: 'Fermer',
    showDenyButton: true,
    denyButtonText: 'Documentation API',
    background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
    color: userStore.isDarkMode ? '#ffffff' : '#000000',
  })
}
</script>

<template>
  <div class="bg-surface dark:bg-slate-950 text-on-surface dark:text-slate-200 transition-colors duration-300">
    <SideNavBar activeItem="operators" />

    <main class="ml-0 md:ml-64 min-h-screen p-8 lg:p-12">
      <!-- Header -->
      <header class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-3xl font-black tracking-tight text-on-surface dark:text-white mb-1">Mes Opérateurs</h2>
          <p class="text-on-surface-variant dark:text-slate-400 font-medium">Gérez vos canaux d'encaissement et de décaissement en RDC.</p>
        </div>
        <div class="flex items-center gap-6">
          <NotificationBell />
          <div class="h-10 w-[1px] bg-outline-variant/20 hidden sm:block"></div>
          <div class="text-right hidden sm:block">
            <p class="text-sm font-bold text-on-surface dark:text-white">{{ userStore.user.name }}</p>
            <p class="text-xs text-on-surface-variant dark:text-slate-400">{{ userStore.user.role }}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-primary-fixed overflow-hidden ring-4 ring-white shadow-sm">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO80Q1jjW8rbmYMvQ2uAebn26cXCl9zRqjfMwQfMCi0maHGeeAxteGDxUX09Srronw--l3CgDlPRXII_TNV79uo76xGbfFkdmGK0GQNGIEDFg-MuxG_67D5Iegqh8KJORUTZVGbP-ePksnin6Ky_di0qSyGvoHkYMf58nj3SLFU_1aQXDwExmc--78pM6r9jvfOLyVVTQLIBNOpDNKi33bKZv8rcDTd69b1IN_XW-sbRU1YQLIrW8cuH1SZ31W0D-zwAvkPW1e1mI" lazy-loading class="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div 
          v-for="op in operators" 
          :key="op.id"
          class="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-outline-variant/10 dark:border-white/5 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div class="flex justify-between items-start mb-2">
              <div :class="['w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm', op.color]">
                <span class="material-symbols-outlined text-base">{{ op.icon }}</span>
              </div>
              <div :class="['px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest', op.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700']">
                {{ op.status }}
              </div>
            </div>
            <h3 class="text-sm font-bold text-on-surface dark:text-white mb-0.5 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{{ op.name }}</h3>
            <p class="text-[8px] font-black text-on-surface-variant dark:text-slate-500 uppercase tracking-[0.1em] mb-2">{{ op.type }}</p>
            <p class="text-[10px] text-on-surface-variant dark:text-slate-400 leading-tight mb-4 opacity-60 line-clamp-2 h-8">{{ op.description }}</p>
          </div>
          
          <div class="pt-3 border-t border-outline-variant/10 flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-[8px] font-bold text-on-surface-variant dark:text-slate-500 uppercase">Frais</span>
              <span class="text-sm font-black text-primary dark:text-blue-400">{{ op.fee }}</span>
            </div>
            <button 
              @click="handleOperatorDetails(op)"
              class="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-[10px] font-bold hover:bg-primary hover:text-white transition-all"
            >
              Gérer
            </button>
          </div>
        </div>
      </div>

      <AppFooter class="mt-20" />
    </main>
  </div>
</template>
