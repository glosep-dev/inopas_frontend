<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '../store/userStore'
import { showAlert } from '../utils/sweetalert'
import SideNavBar from '../components/SideNavBar.vue'

const router = useRouter()
const step = ref(1)

const formData = ref({
  accountType: 'particulier', // 'particulier' or 'entreprise'
  country: 'République Démocratique du Congo',
  docType: 'electeur', // For individuals
  enterpriseDocs: {
    rccm: null, // Document
    idnatNumber: '', // Text
    nifNumber: '', // Text
    gerant: null // Document
  }
})

const nextStep = () => {
  if (step.value < 3) step.value++
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

const submitKyc = () => {
  userStore.setKycStatus('pending')
  showAlert('Dossier RDC transmis', 'Votre dossier est en cours d\'examen par nos équipes à Kinshasa. Délai : 24h-48h.', 'success')
  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-background dark:bg-slate-950 text-on-surface dark:text-slate-200 font-body md:pl-64 transition-colors duration-300">
    <SideNavBar activeItem="settings" />
    
    <main class="max-w-3xl mx-auto p-6 md:p-12">
      <header class="mb-12 text-center">
        <h2 class="text-4xl font-black text-primary dark:text-white tracking-tight">Vérification de compte</h2>
        <p class="text-on-surface-variant dark:text-slate-400 font-medium mt-2">Conformément aux réglementations financières, nous devons valider votre identité.</p>
      </header>

      <!-- Steps Indicator -->
      <div class="flex justify-between items-center mb-12 relative px-4">
        <div class="absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/30 dark:bg-white/10 -translate-y-1/2 -z-10"></div>
        <div v-for="s in 3" :key="s" 
          :class="['w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all', 
            step >= s ? 'bg-primary dark:bg-blue-600 text-white scale-110 shadow-lg shadow-primary/20' : 'bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-500']">
          {{ s }}
        </div>
      </div>

      <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-outline-variant/10 dark:border-white/5">
        <!-- Step 1: Info RDC -->
        <div v-if="step === 1" class="space-y-6 text-left">
          <div class="flex items-center gap-4 p-4 bg-primary/5 dark:bg-blue-500/10 rounded-2xl border border-primary/10 dark:border-blue-500/20 mb-8">
            <span class="text-3xl">🇨🇩</span>
            <div>
              <p class="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest">Zone d'opération</p>
              <p class="text-sm font-black dark:text-slate-200">République Démocratique du Congo</p>
            </div>
          </div>

          <div class="space-y-4">
            <label class="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest px-1">Type de compte</label>
            <div class="grid grid-cols-2 gap-4">
              <button @click="formData.accountType = 'particulier'" 
                :class="['p-4 rounded-2xl border-2 font-bold transition-all flex flex-col items-center gap-2', formData.accountType === 'particulier' ? 'border-primary dark:border-blue-500 bg-primary/5 dark:bg-blue-500/10 text-primary dark:text-blue-300' : 'border-outline-variant/20 dark:border-white/5 text-on-surface-variant dark:text-slate-500']">
                <span class="material-symbols-outlined">person</span>
                Particulier
              </button>
              <button @click="formData.accountType = 'entreprise'" 
                :class="['p-4 rounded-2xl border-2 font-bold transition-all flex flex-col items-center gap-2', formData.accountType === 'entreprise' ? 'border-primary dark:border-blue-500 bg-primary/5 dark:bg-blue-500/10 text-primary dark:text-blue-300' : 'border-outline-variant/20 dark:border-white/5 text-on-surface-variant dark:text-slate-500']">
                <span class="material-symbols-outlined">business</span>
                Entreprise
              </button>
            </div>
          </div>

          <div v-if="formData.accountType === 'particulier'" class="space-y-4 pt-4">
            <label class="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest px-1">Document d'identité</label>
            <div class="grid grid-cols-2 gap-4">
              <button @click="formData.docType = 'electeur'" 
                :class="['p-4 rounded-2xl border-2 font-bold text-sm transition-all text-center', formData.docType === 'electeur' ? 'border-primary dark:border-blue-500 bg-primary/5 dark:bg-blue-500/10 text-primary dark:text-blue-300' : 'border-outline-variant/20 dark:border-white/5 text-on-surface-variant dark:text-slate-500']">
                Carte d'électeur
              </button>
              <button @click="formData.docType = 'passport'" 
                :class="['p-4 rounded-2xl border-2 font-bold text-sm transition-all text-center', formData.docType === 'passport' ? 'border-primary dark:border-blue-500 bg-primary/5 dark:bg-blue-500/10 text-primary dark:text-blue-300' : 'border-outline-variant/20 dark:border-white/5 text-on-surface-variant dark:text-slate-500']">
                Passeport
              </button>
            </div>
          </div>

          <div v-else class="p-6 bg-slate-50 dark:bg-slate-700/30 rounded-3xl space-y-4">
            <p class="text-xs font-bold text-primary dark:text-blue-400 uppercase tracking-widest">Éléments requis (Entreprise)</p>
            <ul class="space-y-2 text-xs font-medium text-on-surface-variant dark:text-slate-400">
              <li class="flex items-center gap-2 font-bold text-primary dark:text-blue-400">📁 Statuts & RCCM (Document)</li>
              <li class="flex items-center gap-2">🔢 Identification Nationale (Numéro)</li>
              <li class="flex items-center gap-2">🔢 Numéro d'Impôt (Numéro)</li>
              <li class="flex items-center gap-2 font-bold text-primary dark:text-blue-400">📁 Pièce d'identité du gérant (Document)</li>
            </ul>
          </div>
        </div>

        <!-- Step 2: Specialized Upload -->
        <div v-if="step === 2" class="space-y-6 text-center">
          <h3 class="text-2xl font-black text-primary dark:text-white mb-2">Chargement des pièces</h3>
          
          <div v-if="formData.accountType === 'particulier'" class="space-y-4">
            <p class="text-sm font-medium mb-4 text-on-surface dark:text-slate-300">Veuillez charger votre <span class="font-bold text-primary dark:text-blue-400">{{ formData.docType === 'electeur' ? "Carte d'électeur" : 'Passeport' }}</span></p>
            <div class="border-4 border-dashed border-outline-variant/20 dark:border-white/10 rounded-[2rem] p-12 hover:border-primary/50 dark:hover:border-blue-500 transition-colors cursor-pointer group bg-surface-container-lowest dark:bg-slate-800">
              <span class="material-symbols-outlined text-6xl text-primary/40 dark:text-white/20 group-hover:scale-110 transition-transform mb-4">cloud_upload</span>
              <p class="font-bold text-primary dark:text-blue-400">Déposez votre fichier ici</p>
              <p class="text-[10px] text-on-surface-variant dark:text-slate-500 font-medium mt-2 uppercase tracking-widest">JPG, PNG ou PDF (max. 5Mo)</p>
            </div>
          </div>

          <div v-else class="space-y-4">
            <!-- RCCM Document -->
            <div class="flex items-center justify-between p-4 bg-white dark:bg-slate-700/50 rounded-2xl border border-outline-variant/10">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary">description</span>
                <span class="text-xs font-bold">RCCM (Document)</span>
              </div>
              <button class="px-4 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase hover:bg-primary hover:text-white transition-all">
                Charger
              </button>
            </div>

            <!-- Numbers (NIF / ID NAT) -->
            <div class="grid grid-cols-1 gap-3">
              <div class="space-y-1 text-left">
                <label class="text-[10px] font-bold text-primary dark:text-blue-400 uppercase px-4">Identification Nationale (ID NAT)</label>
                <input v-model="formData.enterpriseDocs.idnatNumber" type="text" placeholder="Entrez le numéro ID NAT" class="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-2xl p-4 text-sm font-bold text-on-surface dark:text-white" />
              </div>
              <div class="space-y-1 text-left">
                <label class="text-[10px] font-bold text-primary dark:text-blue-400 uppercase px-4">Numéro d'Impôt (NIF)</label>
                <input v-model="formData.enterpriseDocs.nifNumber" type="text" placeholder="Entrez le numéro NIF" class="w-full bg-slate-100 dark:bg-slate-700/50 border-none rounded-2xl p-4 text-sm font-bold text-on-surface dark:text-white" />
              </div>
            </div>

            <!-- Gérant Document -->
            <div class="flex items-center justify-between p-4 bg-white dark:bg-slate-700/50 rounded-2xl border border-outline-variant/10">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary">badge</span>
                <span class="text-xs font-bold">Pièce du Gérant</span>
              </div>
              <button class="px-4 py-2 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase hover:bg-primary hover:text-white transition-all">
                Charger
              </button>
            </div>
          </div>

          <div class="flex items-start gap-3 text-[10px] leading-relaxed font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 p-4 rounded-2xl text-left border border-amber-100 dark:border-amber-500/20">
            <span class="material-symbols-outlined text-sm">warning</span>
            Attention : Les photocopies en noir et blanc ne sont pas acceptées. Utilisez des scans originaux ou des photos nettes prises à la lumière du jour.
          </div>
        </div>

        <!-- Step 3: Confirmation -->
        <div v-if="step === 3" class="space-y-6 text-center">
          <span class="material-symbols-outlined text-7xl text-emerald-500">task_alt</span>
          <h3 class="text-2xl font-black text-primary dark:text-white">Prêt pour l'envoi</h3>
          <p class="text-on-surface-variant dark:text-slate-400 font-medium">En cliquant sur confirmer, vous certifiez que les informations fournies sont exactes.</p>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex gap-4 mt-12">
          <button v-if="step > 1" @click="prevStep" class="flex-1 py-4 rounded-2xl font-bold bg-surface-container-low text-primary hover:bg-surface-container-high transition-all">
            Précédent
          </button>
          <button v-if="step < 3" @click="nextStep" class="flex-1 bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all">
            Continuer
          </button>
          <button v-if="step === 3" @click="submitKyc" class="flex-1 bg-[#0a1944] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#0a1944]/20 hover:scale-[1.01] active:scale-[0.99] transition-all">
            Confirmer l'envoi
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
