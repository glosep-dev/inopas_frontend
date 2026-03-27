<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import SideNavBar from '../components/SideNavBar.vue'
import AppFooter from '../components/AppFooter.vue'
import NotificationBell from '../components/NotificationBell.vue'
import NewPaymentModal from '../components/NewPaymentModal.vue'
import NewDepositModal from '../components/NewDepositModal.vue'
import NewWithdrawalModal from '../components/NewWithdrawalModal.vue'
import { userStore } from '../store/userStore'
import Swal from 'sweetalert2'

const showPaymentModal = ref(false)
const showDepositModal = ref(false)
const showWithdrawalModal = ref(false)

const handleDeposit = () => {
  showDepositModal.value = true
}

const handleWithdraw = () => {
  showWithdrawalModal.value = true
}

const handleReport = () => {
  Swal.fire({
    title: 'Génération du relevé',
    text: 'Veuillez patienter pendant que nous préparons votre rapport...',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
    background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
    color: userStore.isDarkMode ? '#ffffff' : '#000000',
  }).then(() => {
    Swal.fire({
      title: 'Rapport prêt !',
      text: 'Votre relevé bancaire a été généré avec succès au format PDF.',
      icon: 'success',
      confirmButtonText: 'Télécharger',
      background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
      color: userStore.isDarkMode ? '#ffffff' : '#000000',
    })
  })
}

const handleNewKey = async () => {
  const { value: name } = await Swal.fire({
    title: 'Nouvelle clé API',
    input: 'text',
    inputLabel: 'Nom de la clé',
    inputPlaceholder: 'ex: Serveur Production',
    showCancelButton: true,
    confirmButtonText: 'Générer',
    cancelButtonText: 'Annuler',
    background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
    color: userStore.isDarkMode ? '#ffffff' : '#000000',
    inputValidator: (value) => {
      if (!value) return 'Veuillez entrer un nom'
    }
  })

  if (name) {
    userStore.addApiKey(name)
    Swal.fire({
      title: 'Clé générée !',
      text: `La clé pour "${name}" a été créée avec succès.`,
      icon: 'success',
      background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
      color: userStore.isDarkMode ? '#ffffff' : '#000000',
    })
    userStore.addNotification({
      title: 'Nouvelle Clé API',
      message: `Une nouvelle clé "${name}" a été générée.`,
      type: 'info'
    })
  }
}

const handleTransactionClick = (tx: any) => {
  Swal.fire({
    title: 'Détails de l\'opération',
    html: `
      <div class="text-left space-y-4 pt-4">
        <div class="flex justify-between border-b pb-2">
          <span class="opacity-70">Libellé :</span>
          <span class="font-bold">${tx.label}</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="opacity-70">Date :</span>
          <span class="font-bold">${tx.date}</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="opacity-70">Montant :</span>
          <span class="font-bold ${tx.type === 'incoming' ? 'text-emerald-500' : 'text-red-500'}">${userStore.formatAmount(tx.amount)}</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="opacity-70">Statut :</span>
          <span class="font-bold text-emerald-500">${tx.status === 'completed' ? 'Opération terminée' : 'En cours'}</span>
        </div>
        <div class="flex justify-between">
          <span class="opacity-70">ID Référence :</span>
          <span class="font-mono text-xs">${tx.id}</span>
        </div>
      </div>
    `,
    icon: tx.type === 'incoming' ? 'success' : 'info',
    confirmButtonText: 'Fermer',
    background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
    color: userStore.isDarkMode ? '#ffffff' : '#000000',
  })
}
</script>

<template>
  <div class="bg-surface dark:bg-slate-950 text-on-surface dark:text-slate-200 transition-colors duration-300">
    <SideNavBar activeItem="overview" />

    <main class="ml-0 md:ml-64 min-h-screen p-8 lg:p-12">
      <!-- En-tête -->
      <header class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-3xl font-black tracking-tight text-on-surface dark:text-white mb-1">Tableau de Bord Personnel</h2>
          <p class="text-on-surface-variant dark:text-slate-400 font-medium">Suivez vos finances et gérez vos opérations en toute sécurité.</p>
        </div>
        <div class="flex items-center gap-6">
          <NotificationBell />
          <div class="h-10 w-[1px] bg-outline-variant/20 hidden sm:block"></div>
          <div class="text-right hidden sm:block">
            <p class="text-sm font-bold text-on-surface dark:text-white">{{ userStore.user.name }}</p>
            <p class="text-xs text-on-surface-variant dark:text-slate-400">{{ userStore.user.role }}</p>
          </div>
          <RouterLink to="/profile" class="w-12 h-12 rounded-full bg-primary-fixed dark:bg-slate-800 overflow-hidden ring-4 ring-white dark:ring-slate-700 shadow-sm hover:scale-105 transition-transform block">
            <img
              alt="Photo de profil"
              class="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO80Q1jjW8rbmYMvQ2uAebn26cXCl9zRqjfMwQfMCi0maHGeeAxteGDxUX09Srronw--l3CgDlPRXII_TNV79uo76xGbfFkdmGK0GQNGIEDFg-MuxG_67D5Iegqh8KJORUTZVGbP-ePksnin6Ky_di0qSyGvoHkYMf58nj3SLFU_1aQXDwExmc--78pM6r9jvfOLyVVTQLIBNOpDNKi33bKZv8rcDTd69b1IN_XW-sbRU1YQLIrW8cuH1SZ31W0D-zwAvkPW1e1mI"
            />
          </RouterLink>
        </div>
      </header>
<br>
      <!-- Bannière KYC -->
      <div v-if="userStore.kycStatus !== 'verified'" class="mb-10 overflow-hidden rounded-[2.5rem] bg-amber-50 border border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30 flex flex-col md:flex-row items-center justify-between p-8 gap-6 shadow-sm">
        <div class="flex items-center gap-6 text-center md:text-left">
          <div :class="['w-16 h-16 rounded-full flex items-center justify-center shadow-inner', userStore.kycStatus === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-amber-600 text-white shadow-amber-600/20']">
            <span class="material-symbols-outlined text-3xl font-variation-settings-fill">{{ userStore.kycStatus === 'pending' ? 'hourglass_empty' : 'warning' }}</span>
          </div>
          <div>
            <p v-if="userStore.kycStatus === 'none'" class="text-xl font-black text-amber-900 dark:text-amber-200">Vérification de compte requise</p>
            <p v-if="userStore.kycStatus === 'pending'" class="text-xl font-black text-amber-900 dark:text-amber-200">Vérification en cours...</p>
            <p class="text-on-surface-variant font-medium opacity-80 mt-1">
              {{ userStore.kycStatus === 'pending' ? 'Notre équipe examine vos documents. Délai moyen : 12h-24h.' : 'Soumettez vos documents pour débloquer toutes les fonctionnalités de votre compte.' }}
            </p>
          </div>
        </div>
        <div class="flex gap-4">
          <RouterLink v-if="userStore.kycStatus === 'none'" to="/kyc" class="px-8 py-4 bg-amber-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-amber-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap">
            Vérifier mon identité
          </RouterLink>
          <button v-if="userStore.kycStatus === 'pending'" @click="userStore.setKycStatus('verified')" class="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/20 hover:scale-[1.02] transition-all">
            Simuler la validation (Admin Demo)
          </button>
        </div>
      </div>

      <!-- Actions Rapides -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button @click="showPaymentModal = true" class="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-outline-variant/10 dark:border-white/5 hover:shadow-md transition-all group text-left">
          <div class="w-12 h-12 bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary dark:group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <span class="material-symbols-outlined">send</span>
          </div>
          <p class="font-black text-on-surface dark:text-white">Envoyer</p>
          <p class="text-xs text-on-surface-variant dark:text-slate-500 font-medium">Virement instantané</p>
        </button>

        <button @click="handleDeposit" class="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-outline-variant/10 dark:border-white/5 hover:shadow-md transition-all group text-left">
          <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <span class="material-symbols-outlined">add_circle</span>
          </div>
          <p class="font-black text-on-surface dark:text-white">Déposer</p>
          <p class="text-xs text-on-surface-variant dark:text-slate-500 font-medium">Recharger mon compte</p>
        </button>

        <RouterLink to="/payments" class="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-outline-variant/10 dark:border-white/5 hover:shadow-md transition-all group text-left block">
          <div class="w-12 h-12 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <span class="material-symbols-outlined">history</span>
          </div>
          <p class="font-black text-on-surface dark:text-white">Historique</p>
          <p class="text-xs text-on-surface-variant dark:text-slate-500 font-medium">Suivre mes dépenses</p>
        </RouterLink>

        <RouterLink to="/support" class="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-outline-variant/10 dark:border-white/5 hover:shadow-md transition-all group text-left block">
          <div class="w-12 h-12 bg-secondary-fixed dark:bg-red-500/10 text-secondary dark:text-red-400 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-white transition-colors">
            <span class="material-symbols-outlined">help</span>
          </div>
          <p class="font-black text-on-surface dark:text-white">Aide</p>
          <p class="text-xs text-on-surface-variant dark:text-slate-500 font-medium">Besoin d'assistance ?</p>
        </RouterLink>
      </div>

      <!-- Grille Bento -->
      <div class="grid grid-cols-12 gap-6">
        <!-- Carte solde principal -->
        <div
          class="col-span-12 lg:col-span-8 bg-surface-container-low dark:bg-slate-900 rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[320px] dark:border dark:border-white/5"
        >
          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-4">
              <span class="px-3 py-1 bg-primary-fixed dark:bg-blue-900/50 text-primary dark:text-blue-200 text-[10px] font-bold uppercase tracking-widest rounded-full">Argent disponible</span>
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p class="text-on-surface-variant dark:text-slate-400 text-sm font-bold mb-1 opacity-70">Solde de votre compte</p>
            <h3 class="text-6xl font-black tracking-tighter text-primary dark:text-white mb-2">
              {{ userStore.formatAmount(userStore.balance) }}
            </h3>
            <p class="text-on-surface-variant font-medium flex items-center gap-2">
              <span class="material-symbols-outlined text-emerald-500 text-sm">trending_up</span>
              <span class="text-emerald-600 font-bold">+12,4%</span> cette semaine
            </p>
          </div>
          <div class="relative z-10 flex flex-wrap gap-4 mt-8">
            <button @click="handleWithdraw" class="flex-1 min-w-[140px] px-6 py-4 bg-primary dark:bg-blue-600 text-on-primary rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-xl">payments</span>
              Retirer des CDF
            </button>
            <button @click="handleReport" class="flex-1 min-w-[140px] px-6 py-4 bg-white dark:bg-slate-800 text-primary dark:text-blue-400 border border-primary/10 dark:border-white/10 rounded-2xl font-black hover:bg-surface-container-highest dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-xl">history</span>
              Relevé bancaire
            </button>
          </div>
          <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div class="absolute right-10 top-10 flex gap-1 opacity-20">
            <div class="w-1 h-16 bg-primary rounded-full"></div>
            <div class="w-1 h-24 bg-primary rounded-full"></div>
            <div class="w-1 h-12 bg-primary rounded-full"></div>
            <div class="w-1 h-20 bg-primary rounded-full"></div>
          </div>
        </div>

        <!-- Gestion rapide des clés API -->
        <div class="col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-outline-variant/10 dark:border-white/5 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-6">
              <div class="p-3 bg-tertiary-fixed rounded-2xl text-primary">
                <span class="material-symbols-outlined text-2xl">vpn_key</span>
              </div>
              <button @click="Swal.fire({ title: 'Actions API', text: 'Fonctionnalités de gestion avancée (Révocation, Rotation) bientôt disponibles.', icon: 'info', background: userStore.isDarkMode ? '#1e293b' : '#ffffff', color: userStore.isDarkMode ? '#ffffff' : '#000000' })" class="text-primary hover:bg-primary-fixed p-2 rounded-full transition-colors">
                <span class="material-symbols-outlined">more_vert</span>
              </button>
            </div>
            <h4 class="text-xl font-bold text-on-surface dark:text-white mb-2">Clés API actives</h4>
            <p class="text-sm text-on-surface-variant dark:text-slate-400 mb-6 leading-relaxed">Gérez vos clés d'environnement de production et de test.</p>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-surface-container-low dark:bg-slate-800 rounded-xl">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-slate-400">code</span>
                  <span class="text-sm font-bold text-on-surface dark:text-slate-200">Live_Prod_01</span>
                </div>
                <span class="text-[10px] font-black text-emerald-600 uppercase">Active</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-surface-container-low dark:bg-slate-800 rounded-xl">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-slate-400">terminal</span>
                  <span class="text-sm font-bold text-on-surface dark:text-slate-200">Staging_Env</span>
                </div>
                <span class="text-[10px] font-black text-amber-600 uppercase">Restreinte</span>
              </div>
            </div>
          </div>
          <button @click="handleNewKey" class="mt-6 w-full py-3 text-primary dark:text-blue-400 font-bold border-2 border-primary-fixed dark:border-blue-900/30 rounded-xl hover:bg-primary-fixed dark:hover:bg-blue-900/20 transition-colors text-sm">
            Créer une nouvelle clé
          </button>
        </div>

        <!-- Activité récente -->
        <div class="col-span-12 lg:col-span-7 bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-outline-variant/10 dark:border-white/5">
          <div class="flex justify-between items-center mb-8">
            <div>
              <h4 class="text-xl font-bold text-on-surface dark:text-white">Vos dernières opérations</h4>
              <p class="text-xs text-on-surface-variant dark:text-slate-400 font-medium mt-1">Historique des 30 derniers jours</p>
            </div>
            <RouterLink to="/payments" class="text-sm font-bold text-primary dark:text-blue-400 hover:underline" href="#">Gérer mes paiements</RouterLink>
          </div>
          <div class="space-y-6">
            <div v-for="tx in userStore.transactions.slice(0, 4)" :key="tx.id" 
              @click="handleTransactionClick(tx)"
              class="flex items-center justify-between group cursor-pointer transition-all hover:translate-x-1"
            >
              <div class="flex items-center gap-4">
                <div :class="[
                  'w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shrink-0',
                  tx.provider === 'M-Pesa' ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' : 
                  tx.provider === 'Airtel Money' ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400' :
                  tx.provider === 'Orange Money' ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400' :
                  tx.channel === 'bank' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-surface-container-highest dark:bg-slate-700 text-on-surface-variant dark:text-slate-400'
                ]">
                  <span class="material-symbols-outlined">{{ tx.channel === 'mobile_money' ? 'smartphone' : 'account_balance' }}</span>
                </div>
                <div>
                  <h5 class="font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors line-clamp-1">{{ tx.label }}</h5>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold px-2 py-0.5 rounded-md bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-400">{{ tx.provider }}</span>
                    <span class="text-[10px] text-on-surface-variant dark:text-slate-500 font-medium">{{ tx.date }}</span>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-black" :class="tx.type === 'incoming' ? 'text-emerald-600' : 'text-on-surface dark:text-white'">
                  {{ tx.type === 'incoming' ? '+' : '' }}{{ userStore.formatAmount(tx.amount) }}
                </p>
                <span :class="[
                  'inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase',
                  tx.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : tx.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                ]">
                  {{ tx.status === 'completed' ? 'Opération terminée' : tx.status === 'pending' ? 'En cours de validation' : 'Échouée' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Métriques de performance -->
        <div class="col-span-12 lg:col-span-5 grid grid-cols-2 gap-6">
          <div class="col-span-2 bg-primary-container rounded-[2rem] p-8 text-white relative overflow-hidden">
            <h5 class="text-on-primary-container text-xs font-bold uppercase tracking-widest mb-4">Tendances de volume</h5>
            <div class="flex items-end gap-2 h-32 mb-6">
              <div class="flex-1 bg-white/10 h-[40%] rounded-t-lg"></div>
              <div class="flex-1 bg-white/10 h-[65%] rounded-t-lg"></div>
              <div class="flex-1 bg-white/20 h-[50%] rounded-t-lg"></div>
              <div class="flex-1 bg-white/40 h-[85%] rounded-t-lg"></div>
              <div class="flex-1 bg-white h-[100%] rounded-t-lg"></div>
              <div class="flex-1 bg-white/30 h-[70%] rounded-t-lg"></div>
              <div class="flex-1 bg-white/20 h-[60%] rounded-t-lg"></div>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <p class="text-2xl font-black">3,2B CDF</p>
                <p class="text-[10px] text-on-primary-container uppercase font-bold">Cette semaine</p>
              </div>
              <span class="material-symbols-outlined text-4xl opacity-20">insights</span>
            </div>
          </div>
          <div class="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-outline-variant/10 dark:border-white/5 text-center">
            <div class="text-primary dark:text-blue-400 mb-2">
              <span class="material-symbols-outlined text-3xl">bolt</span>
            </div>
            <p class="text-2xl font-black text-on-surface dark:text-white">24ms</p>
            <p class="text-[10px] text-on-surface-variant dark:text-slate-500 font-bold uppercase">Vitesse réseau</p>
          </div>
          <div class="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-outline-variant/10 dark:border-white/5 text-center">
            <div class="text-emerald-600 dark:text-emerald-400 mb-2">
              <span class="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <p class="text-2xl font-black text-on-surface dark:text-white">99,9%</p>
            <p class="text-[10px] text-on-surface-variant dark:text-slate-500 font-bold uppercase">Fiabilité système</p>
          </div>
          <div class="col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-outline-variant/10 dark:border-white/5">
            <div class="flex items-center justify-between mb-8">
              <h4 class="text-sm font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-[0.2em]">Répartition par Opérateur</h4>
              <span class="material-symbols-outlined text-on-surface-variant dark:text-slate-500">pie_chart</span>
            </div>
            <div class="space-y-6">
              <div v-for="op in [
                { name: 'M-Pesa', vol: '45%', color: 'bg-red-500' },
                { name: 'Airtel Money', vol: '25%', color: 'bg-red-700' },
                { name: 'Orange Money', vol: '15%', color: 'bg-orange-500' },
                { name: 'Banques (Equity/Raw)', vol: '15%', color: 'bg-blue-600' }
              ]" :key="op.name" class="space-y-2">
                <div class="flex justify-between text-xs font-bold">
                  <span class="text-on-surface dark:text-slate-200">{{ op.name }}</span>
                  <span class="text-on-surface-variant dark:text-slate-400">{{ op.vol }}</span>
                </div>
                <div class="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div :class="[op.color, 'h-full transition-all duration-1000']" :style="{ width: op.vol }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppFooter class="mt-20" />
    </main>

    <!-- Bouton flottant - Mobile uniquement -->
    <div class="md:hidden fixed bottom-6 right-6 z-50">
      <button @click="showPaymentModal = true" class="w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform">
        <span class="material-symbols-outlined">add</span>
      </button>
    </div>

    <!-- Modals -->
    <NewPaymentModal :show="showPaymentModal" @close="showPaymentModal = false" />
    <NewDepositModal :show="showDepositModal" @close="showDepositModal = false" />
    <NewWithdrawalModal :show="showWithdrawalModal" @close="showWithdrawalModal = false" />
  </div>
</template>
