<script setup lang="ts">
import { ref } from 'vue'
import { userStore } from '../store/userStore'
import Swal from 'sweetalert2'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(['close'])

const step = ref(1)
const formData = ref({
  amount: 0,
  channel: 'mobile_money' as 'mobile_money' | 'bank',
  provider: 'M-Pesa' as any,
  accountNumber: '' // Bank account or phone number
})

const close = () => {
  step.value = 1
  formData.value = {
    amount: 0,
    channel: 'mobile_money',
    provider: 'M-Pesa',
    accountNumber: ''
  }
  emit('close')
}

const nextStep = () => {
  if (step.value === 1) {
    if (!formData.value.provider) {
      Swal.fire('Erreur', 'Veuillez choisir un opérateur', 'error')
      return
    }
  }
  if (step.value === 2) {
    if (formData.value.amount <= 0) {
      Swal.fire('Erreur', 'Le montant doit être supérieur à 0', 'error')
      return
    }
    if (formData.value.amount > userStore.balance) {
      Swal.fire('Solde insuffisant', `Votre solde actuel est de ${userStore.formatAmount(userStore.balance)}`, 'error')
      return
    }
    if (!formData.value.accountNumber) {
      Swal.fire('Erreur', 'Veuillez entrer le numéro de compte ou de téléphone', 'error')
      return
    }
  }
  step.value++
}

const confirmWithdrawal = async () => {
  const result = await Swal.fire({
    title: 'Confirmer le retrait ?',
    text: `Souhaitez-vous retirer ${userStore.formatAmount(formData.value.amount)} vers votre compte ${formData.value.provider} (${formData.value.accountNumber}) ?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Oui, retirer',
    cancelButtonText: 'Annuler',
    confirmButtonColor: '#0a1944',
    background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
    color: userStore.isDarkMode ? '#ffffff' : '#000000'
  })

  if (result.isConfirmed) {
    userStore.addTransaction({
      label: `Retrait vers ${formData.value.provider}`,
      amount: -formData.value.amount,
      type: 'outgoing',
      status: 'completed',
      provider: formData.value.provider,
      channel: formData.value.channel
    })

    await Swal.fire({
      title: 'Demande envoyée !',
      text: 'Votre retrait est en cours de traitement par l\'opérateur.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
      color: userStore.isDarkMode ? '#ffffff' : '#000000'
    })

    close()
  }
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-surface dark:bg-slate-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-white/10">
      <!-- Header -->
      <div class="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-[#0a1944] text-white">
        <h3 class="text-xl font-bold">Retirer des CDF</h3>
        <button @click="close" class="p-2 hover:bg-white/10 rounded-full transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Stepper -->
      <div class="px-6 py-4 flex justify-between items-center bg-black/5 dark:bg-white/5">
        <div v-for="i in 3" :key="i" class="flex items-center">
          <div :class="[
            'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
            step >= i ? 'bg-[#0a1944] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
          ]">
            {{ i }}
          </div>
          <div v-if="i < 3" class="w-12 h-1 bg-slate-200 dark:bg-slate-700 mx-2 rounded-full overflow-hidden">
            <div :class="['h-full bg-[#0a1944] transition-all duration-300', step > i ? 'w-full' : 'w-0']"></div>
          </div>
        </div>
      </div>

      <!-- Form Content -->
      <div class="p-6">
        <!-- Step 1: Provider Selection -->
        <div v-if="step === 1" class="space-y-6 animate-in fade-in slide-in-from-right-4">
          <div class="flex gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-2xl">
            <button 
              @click="formData.channel = 'mobile_money'; formData.provider = 'M-Pesa'"
              :class="['flex-1 py-2 text-xs font-bold rounded-xl transition-all', formData.channel === 'mobile_money' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-50']"
            >
              Mobile Money
            </button>
            <button 
              @click="formData.channel = 'bank'; formData.provider = 'EquityBCDC'"
              :class="['flex-1 py-2 text-xs font-bold rounded-xl transition-all', formData.channel === 'bank' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-50']"
            >
              Banque
            </button>
          </div>

          <div>
            <label class="block text-sm font-semibold mb-3 opacity-70">Vers quel opérateur ?</label>
            <div class="grid grid-cols-3 gap-2">
              <template v-if="formData.channel === 'mobile_money'">
                <button 
                  v-for="p in ['M-Pesa', 'Airtel Money', 'Orange Money']" 
                  :key="p"
                  @click="formData.provider = p"
                  :class="['p-3 text-[10px] font-bold rounded-xl border-2 transition-all flex flex-col items-center gap-2', formData.provider === p ? 'border-[#0a1944] bg-[#0a1944]/5 text-[#0a1944]' : 'border-transparent bg-black/5 dark:bg-white/5']"
                >
                  <span class="material-symbols-outlined text-lg">smartphone</span>
                  {{ p }}
                </button>
              </template>
              <template v-else>
                <button 
                  v-for="p in ['EquityBCDC', 'Rawbank', 'Illicocash']" 
                  :key="p"
                  @click="formData.provider = p"
                  :class="['p-3 text-[10px] font-bold rounded-xl border-2 transition-all flex flex-col items-center gap-2', formData.provider === p ? 'border-[#0a1944] bg-[#0a1944]/5 text-[#0a1944]' : 'border-transparent bg-black/5 dark:bg-white/5']"
                >
                  <span class="material-symbols-outlined text-lg">account_balance</span>
                  {{ p }}
                </button>
              </template>
            </div>
          </div>
        </div>

        <!-- Step 2: Amount & Details -->
        <div v-if="step === 2" class="space-y-4 animate-in fade-in slide-in-from-right-4">
          <div class="p-4 bg-[#0a1944]/5 rounded-2xl flex items-center gap-4 mb-4">
            <div class="w-10 h-10 rounded-full bg-[#0a1944] text-white flex items-center justify-center">
              <span class="material-symbols-outlined text-xl">account_balance_wallet</span>
            </div>
            <div>
              <p class="text-[10px] font-bold opacity-50 uppercase">Depuis votre solde Principal</p>
              <p class="text-xs font-bold">Vers un compte {{ formData.provider }}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Montant à retirer (CDF)</label>
              <input 
                v-model.number="formData.amount"
                type="number" 
                class="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-4 py-3 text-2xl font-bold focus:ring-2 focus:ring-[#0a1944] outline-none transition-all"
              >
              <p class="text-[10px] mt-1 font-medium text-on-surface-variant">Solde disponible : {{ userStore.formatAmount(userStore.balance) }}</p>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-widest mb-2 opacity-70">
                {{ formData.channel === 'mobile_money' ? 'Numéro de téléphone' : 'Numéro de compte' }}
              </label>
              <input 
                v-model="formData.accountNumber"
                type="text" 
                :placeholder="formData.channel === 'mobile_money' ? 'ex: 0812345678' : 'ex: 12345678901234567890'"
                class="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[#0a1944] outline-none transition-all"
              >
            </div>
          </div>
        </div>

        <!-- Step 3: Confirmation -->
        <div v-if="step === 3" class="space-y-4 animate-in fade-in slide-in-from-right-4 text-center">
          <div class="w-20 h-20 bg-[#0a1944]/5 text-[#0a1944] rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <h4 class="font-bold text-lg">Vérification finale</h4>
          <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl space-y-2 text-left text-sm">
            <div class="flex justify-between">
              <span class="opacity-70">Montant :</span>
              <span class="font-bold text-red-500">- {{ userStore.formatAmount(formData.amount) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="opacity-70">Opérateur :</span>
              <span class="font-bold">{{ formData.provider }}</span>
            </div>
            <div class="flex justify-between">
              <span class="opacity-70">Destination :</span>
              <span class="font-bold font-mono">{{ formData.accountNumber }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="p-6 bg-black/5 dark:bg-white/5 flex gap-3">
        <button 
          v-if="step > 1"
          @click="step--"
          class="flex-1 py-3 font-bold rounded-2xl bg-slate-200 dark:bg-slate-700 hover:opacity-90 transition-opacity"
        >
          Retour
        </button>
        <button 
          v-if="step < 3"
          @click="nextStep"
          class="flex-1 py-3 font-bold rounded-2xl bg-[#0a1944] text-white hover:opacity-90 transition-opacity shadow-lg shadow-[#0a1944]/30"
        >
          Suivant
        </button>
        <button 
          v-if="step === 3"
          @click="confirmWithdrawal"
          class="flex-1 py-3 font-bold rounded-2xl bg-[#0a1944] text-white hover:opacity-90 transition-opacity shadow-lg shadow-[#0a1944]/30"
        >
          Confirmer le retrait
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation: slide-in 0.3s ease-out;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
