<script setup lang="ts">
import { ref, computed } from 'vue'
import { userStore } from '../store/userStore'
import Swal from 'sweetalert2'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits(['close'])

const step = ref(1)
const formData = ref({
  recipient: '',
  account: '',
  amount: 0,
  reference: '',
  category: 'Service',
  channel: 'mobile_money' as 'mobile_money' | 'bank',
  provider: 'M-Pesa' as any
})

const fee = computed(() => {
  return formData.value.amount * 0.005 // 0.5% fee
})

const total = computed(() => {
  return formData.value.amount + fee.value
})

const canAfford = computed(() => {
  return total.value <= userStore.balance
})

const close = () => {
  step.value = 1
  formData.value = {
    recipient: '',
    account: '',
    amount: 0,
    reference: '',
    category: 'Service',
    channel: 'mobile_money',
    provider: 'M-Pesa'
  }
  emit('close')
}

const nextStep = () => {
  if (step.value === 1) {
    if (!formData.value.recipient || !formData.value.account) {
      Swal.fire('Erreur', 'Veuillez remplir les informations du bénéficiaire', 'error')
      return
    }
    if (formData.value.channel === 'mobile_money' && !/^\d{9,10}$/.test(formData.value.account)) {
      Swal.fire('Erreur', 'Veuillez entrer un numéro de téléphone valide (9 ou 10 chiffres)', 'error')
      return
    }
  }
  if (step.value === 2) {
    if (formData.value.amount <= 0) {
      Swal.fire('Erreur', 'Le montant doit être supérieur à 0', 'error')
      return
    }
    if (!canAfford.value) {
      Swal.fire('Solde insuffisant', 'Votre solde actuel ne permet pas de couvrir ce montant et les frais.', 'warning')
      return
    }
  }
  step.value++
}

const confirmPayment = async () => {
  const result = await Swal.fire({
    title: 'Confirmer le paiement ?',
    text: `Souhaitez-vous envoyer ${userStore.formatAmount(formData.value.amount)} à ${formData.value.recipient} ?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Oui, envoyer',
    cancelButtonText: 'Annuler',
    confirmButtonColor: '#3b82f6',
    background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
    color: userStore.isDarkMode ? '#ffffff' : '#000000'
  })

  if (result.isConfirmed) {
    userStore.addTransaction({
      label: `Virement ${formData.value.provider} vers ${formData.value.recipient}`,
      amount: -total.value,
      type: 'outgoing',
      status: 'completed',
      provider: formData.value.provider,
      channel: formData.value.channel
    })

    await Swal.fire({
      title: 'Paiement effectué !',
      text: 'Le virement a été traité avec succès.',
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
      <div class="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
        <h3 class="text-xl font-bold text-on-surface dark:text-white">Nouveau Paiement</h3>
        <button @click="close" class="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Stepper -->
      <div class="px-6 py-4 flex justify-between items-center bg-black/5 dark:bg-white/5">
        <div v-for="i in 3" :key="i" class="flex items-center">
          <div :class="[
            'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
            step >= i ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
          ]">
            {{ i }}
          </div>
          <div v-if="i < 3" class="w-12 h-1 bg-slate-200 dark:bg-slate-700 mx-2 rounded-full overflow-hidden">
            <div :class="['h-full bg-primary transition-all duration-300', step > i ? 'w-full' : 'w-0']"></div>
          </div>
        </div>
      </div>

      <!-- Form Content -->
      <div class="p-6">
        <!-- Step 1: Channel & Recipient -->
        <div v-if="step === 1" class="space-y-6 animate-in fade-in slide-in-from-right-4">
          <!-- Channel Selection -->
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

          <!-- Provider Selection -->
          <div>
            <label class="block text-sm font-semibold mb-3 opacity-70">Opérateur / Banque</label>
            <div class="grid grid-cols-3 gap-2">
              <template v-if="formData.channel === 'mobile_money'">
                <button 
                  v-for="p in ['M-Pesa', 'Airtel Money', 'Orange Money']" 
                  :key="p"
                  @click="formData.provider = p"
                  :class="['p-2 text-[10px] font-bold rounded-xl border-2 transition-all', formData.provider === p ? 'border-primary bg-primary/5' : 'border-transparent bg-black/5 dark:bg-white/5']"
                >
                  {{ p }}
                </button>
              </template>
              <template v-else>
                <button 
                  v-for="p in ['EquityBCDC', 'Rawbank', 'Illicocash']" 
                  :key="p"
                  @click="formData.provider = p"
                  :class="['p-2 text-[10px] font-bold rounded-xl border-2 transition-all', formData.provider === p ? 'border-primary bg-primary/5' : 'border-transparent bg-black/5 dark:bg-white/5']"
                >
                  {{ p }}
                </button>
              </template>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2 opacity-70">Nom du bénéficiaire</label>
            <input 
              v-model="formData.recipient"
              type="text" 
              placeholder="Ex: Jean Mukendi"
              class="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
            >
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2 opacity-70">
              {{ formData.channel === 'mobile_money' ? 'Numéro de téléphone' : 'Numéro de compte / RIB' }}
            </label>
            <input 
              v-model="formData.account"
              type="text" 
              :placeholder="formData.channel === 'mobile_money' ? '0812345678' : 'RIB / IBAN'"
              class="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all"
            >
          </div>
        </div>

        <!-- Step 2: Amount -->
        <div v-if="step === 2" class="space-y-4 animate-in fade-in slide-in-from-right-4">
          <div>
            <label class="block text-sm font-semibold mb-2 opacity-70">Montant (CDF)</label>
            <input 
              v-model.number="formData.amount"
              type="number" 
              class="w-full bg-black/5 dark:bg-white/5 border-none rounded-2xl px-4 py-3 text-2xl font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
            >
          </div>
          <div class="p-4 bg-primary/10 rounded-2xl space-y-2">
            <div class="flex justify-between text-sm">
              <span>Frais (0.5%)</span>
              <span class="font-bold">{{ userStore.formatAmount(fee) }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold border-t border-black/5 dark:border-white/5 pt-2">
              <span>Total</span>
              <span>{{ userStore.formatAmount(total) }}</span>
            </div>
          </div>
          <p v-if="!canAfford" class="text-xs text-error font-medium flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">warning</span>
            Solde insuffisant (Actuel: {{ userStore.formatAmount(userStore.balance) }})
          </p>
        </div>

        <!-- Step 3: Confirmation -->
        <div v-if="step === 3" class="space-y-4 animate-in fade-in slide-in-from-right-4 text-center">
          <div class="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="material-symbols-outlined text-4xl">verify_user</span>
          </div>
          <h4 class="font-bold text-lg">Vérification finale</h4>
          <p class="text-sm opacity-70">
            Vous allez envoyer <strong>{{ userStore.formatAmount(formData.amount) }}</strong> (frais inclus : {{ userStore.formatAmount(total) }}) vers le compte de <strong>{{ formData.recipient }}</strong>.
          </p>
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
          class="flex-1 py-3 font-bold rounded-2xl bg-primary text-white hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
        >
          Suivant
        </button>
        <button 
          v-if="step === 3"
          @click="confirmPayment"
          class="flex-1 py-3 font-bold rounded-2xl bg-primary text-white hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
        >
          Confirmer
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
