<script setup lang="ts">
import { ref } from 'vue'
import SideNavBar from '../components/SideNavBar.vue'
import BottomNavBar from '../components/BottomNavBar.vue'
import { userStore } from '../store/userStore'
import Swal from 'sweetalert2'

const showModal = ref(false)
const newKeyName = ref('')

const handleRevokeKey = async (id: string, name: string) => {
  const result = await Swal.fire({
    title: 'Révoquer la clé ?',
    text: `Voulez-vous vraiment révoquer la clé "${name}" ? Cette action est irréversible.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, révoquer',
    cancelButtonText: 'Annuler',
    confirmButtonColor: '#ef4444',
    background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
    color: userStore.isDarkMode ? '#ffffff' : '#000000',
  })

  if (result.isConfirmed) {
    userStore.revokeApiKey(id)
    Swal.fire({
      title: 'Clé révoquée',
      text: 'La clé API ne peut plus être utilisée pour l\'authentification.',
      icon: 'success',
      background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
      color: userStore.isDarkMode ? '#ffffff' : '#000000',
    })
  }
}

const handleGenerateKey = async () => {
  if (!newKeyName.value.trim()) {
    Swal.fire({
      title: 'Erreur',
      text: 'Veuillez donner un nom à votre clé.',
      icon: 'error',
      background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
      color: userStore.isDarkMode ? '#ffffff' : '#000000',
    })
    return
  }

  userStore.addApiKey(newKeyName.value)
  showModal.value = false
  newKeyName.value = ''

  Swal.fire({
    title: 'Clé générée !',
    text: 'Votre nouvelle clé API est prête à être utilisée.',
    icon: 'success',
    timer: 2000,
    showConfirmButton: false,
    background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
    color: userStore.isDarkMode ? '#ffffff' : '#000000',
  })
}

const handleCopyKey = (key: string) => {
  navigator.clipboard.writeText(key)
  Swal.fire({
    title: 'Copié !',
    text: 'La clé API a été copiée dans le presse-papier.',
    icon: 'success',
    toast: true,
    position: 'top-end',
    timer: 3000,
    showConfirmButton: false,
    background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
    color: userStore.isDarkMode ? '#ffffff' : '#000000',
  })
}

const handleViewKey = (key: any) => {
  Swal.fire({
    title: `Clé : ${key.name}`,
    html: `
      <div class="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-sm break-all border border-slate-200 dark:border-slate-700">
        ${key.key}
      </div>
      <p class="mt-4 text-xs text-on-surface-variant font-medium">Ne partagez jamais cette clé secrette avec qui que ce soit.</p>
    `,
    icon: 'info',
    confirmButtonText: 'Fermer',
    showDenyButton: true,
    denyButtonText: 'Copier',
    background: userStore.isDarkMode ? '#1e293b' : '#ffffff',
    color: userStore.isDarkMode ? '#ffffff' : '#000000',
  }).then((result) => {
    if (result.isDenied) {
      handleCopyKey(key.key)
    }
  })
}
</script>

<template>
  <div class="bg-background dark:bg-slate-950 font-body text-on-surface dark:text-slate-200 selection:bg-primary-fixed selection:text-on-primary-fixed transition-colors duration-300">
    <SideNavBar activeItem="api-keys" />

    <main class="md:ml-64 min-h-screen pb-24 md:pb-12">
      <!-- Navigation supérieure -->
      <header class="fixed top-0 right-0 left-0 md:left-64 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl z-30 shadow-[0_1px_10px_rgba(0,0,0,0.02)]">
        <div class="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <h2 class="text-xl font-extrabold tracking-tight text-[#0a1944] dark:text-blue-400">Clés API</h2>
          <div class="flex items-center gap-4">
            <button
              class="hidden md:flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 active:scale-95 transition-all"
              @click="showModal = true"
            >
              <span class="material-symbols-outlined text-sm">add</span>
              Générer une nouvelle clé API
            </button>
            <div class="w-10 h-10 rounded-full bg-surface-container-highest dark:bg-slate-800 overflow-hidden ring-2 ring-white dark:ring-slate-700">
              <img
                alt="Photo de profil"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsZOLzVQ4OtLolFUShvdGyNWUS5IA-6QBhtcSfYwgoyWrw6_SOCuF0-mlP5_8vqZM--yHh4cUuYXcqCo3dED_FG-r2fTMDLWtdfakP_ZW8SEbGX5ZueQKGOyePK9K_NgOpNNyrlgQQEM1SDxXiHDCgvuNwpoTEC-XES7f5OhiVswzFAZ_YGR1rqAKIo24L4Znjq0Op1C5YHj37RSujOpmC24bqPvAxfQLBe0woHurwbPitGPKgKZLzIUZTEjvXJZDrp9GX_VrjGpY"
              />
            </div>
          </div>
        </div>
      </header>

      <!-- Zone de contenu -->
      <div class="pt-24 px-6 max-w-7xl mx-auto space-y-12">
        <!-- Section d'introduction -->
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div class="lg:col-span-8">
            <h3 class="text-4xl font-black text-on-surface dark:text-white tracking-tighter mb-4">Sécurisez votre environnement.</h3>
            <p class="text-on-surface-variant dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
              Gérez vos jetons d'authentification secrets pour intégrer Inopas dans vos applications. Les clés donnent un accès complet aux données sensibles de votre compte. Ne les partagez pas dans des dépôts publics.
            </p>
          </div>
          <div class="lg:col-span-4 flex justify-start lg:justify-end">
            <div class="bg-primary-fixed dark:bg-blue-600/10 p-6 rounded-2xl flex items-center gap-4 shadow-sm w-full lg:w-auto border border-white/5">
              <div class="bg-primary dark:bg-blue-600 text-on-primary w-12 h-12 rounded-xl flex items-center justify-center">
                <span class="material-symbols-outlined">security</span>
              </div>
              <div>
                <p class="text-xs font-bold text-on-primary-fixed dark:text-blue-300 uppercase tracking-wider">Score sécurité</p>
                <p class="text-xl font-black text-on-primary-fixed dark:text-white">Excellent</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Grille des clés API -->
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold text-on-surface-variant dark:text-slate-500 uppercase tracking-[0.2em]">Identifiants actifs</h4>
            <span class="text-xs text-on-surface-variant dark:text-slate-500 font-medium">{{ userStore.apiKeys.length }} clés au total</span>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <div
              v-for="key in userStore.apiKeys"
              :key="key.id"
              class="group bg-surface-container-lowest dark:bg-slate-900 rounded-2xl p-6 transition-all hover:bg-white dark:hover:bg-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-6 border border-transparent dark:border-white/5"
            >
              <div class="flex items-start gap-4">
                <div :class="[key.iconBg, key.iconText, 'p-3 rounded-xl']">
                  <span class="material-symbols-outlined">{{ key.icon }}</span>
                </div>
                <div>
                  <h5 class="font-bold text-on-surface dark:text-white">{{ key.name }}</h5>
                  <div class="flex items-center gap-2 font-mono text-xs text-on-surface-variant dark:text-slate-400 mt-1">
                    <span>{{ key.key.substring(0, 10) }}********************{{ key.key.substring(key.key.length - 4) }}</span>
                    <button @click="handleCopyKey(key.key)" class="hover:text-primary dark:hover:text-blue-400 transition-colors">
                      <span class="material-symbols-outlined text-xs">content_copy</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap items-center gap-8">
                <div class="hidden sm:block">
                  <p class="text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-slate-500 font-bold mb-1">Créée le</p>
                  <p class="text-sm font-semibold dark:text-slate-300">{{ key.created }}</p>
                </div>
                <div>
                  <p class="text-[10px] uppercase tracking-widest text-on-surface-variant dark:text-slate-500 font-bold mb-1">Statut</p>
                  <div
                    v-if="key.status === 'active'"
                    class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Active
                  </div>
                  <div
                    v-else
                    class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200"
                  >
                    Inactive
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button @click="handleViewKey(key)" class="px-4 py-2 text-sm font-bold text-primary dark:text-blue-400 hover:bg-surface-container-low dark:hover:bg-slate-800 rounded-lg transition-colors">Voir</button>
                  <button
                    class="px-4 py-2 text-sm font-bold text-secondary dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    :disabled="key.status === 'inactive'"
                    :class="{ 'opacity-30 grayscale cursor-not-allowed': key.status === 'inactive' }"
                    @click="handleRevokeKey(key.id, key.name)"
                  >
                    Révoquer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Teaser documentation -->
        <section class="bg-primary text-on-primary rounded-[2rem] p-8 md:p-12 overflow-hidden relative">
          <div class="relative z-10 max-w-xl">
            <h4 class="text-2xl font-black tracking-tight mb-4">La documentation d'intégration est à un clic.</h4>
            <p class="text-on-primary-container dark:text-blue-100 text-lg mb-8 opacity-90">
              Apprenez à implémenter les webhooks, gérer les flux d'abonnement et traiter les règlements multi-devises avec notre API moderne.
            </p>
            <a
              class="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest border-b-2 border-on-primary-container dark:border-blue-400 pb-1 hover:text-white transition-colors"
              href="#"
            >
              Explorer la documentation
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-primary-container rounded-full opacity-20 blur-3xl"></div>
          <div class="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block opacity-10">
            <span class="material-symbols-outlined text-[12rem]" style="font-variation-settings: 'FILL' 1;">code</span>
          </div>
        </section>
      </div>

      <!-- Pied de page -->
      <footer class="w-full py-12 px-6 border-t border-slate-100 dark:border-slate-800/10 transition-colors">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 dark:text-slate-500">
          <p class="text-xs font-['Inter'] tracking-normal">
            © 2024 Inopas Solutions de Paiement. Sécurisé par chiffrement de niveau bancaire.
          </p>
          <div class="flex gap-6">
            <a class="hover:text-slate-600 dark:hover:text-slate-300 text-xs font-['Inter'] transition-all" href="#">Politique de confidentialité</a>
            <a class="hover:text-slate-600 dark:hover:text-slate-300 text-xs font-['Inter'] transition-all" href="#">Conditions d'utilisation</a>
            <a class="hover:text-slate-600 dark:hover:text-slate-300 text-xs font-['Inter'] transition-all" href="#">Sécurité</a>
            <a class="hover:text-slate-600 dark:hover:text-slate-300 text-xs font-['Inter'] transition-all" href="#">Statut</a>
          </div>
          <span class="font-black text-slate-300 dark:text-slate-700">INOPAS</span>
        </div>
      </footer>
    </main>

    <BottomNavBar activeItem="api-keys" />

    <!-- Modal nouvelle clé API -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[60] flex items-center justify-center p-6"
      @click.self="showModal = false"
    >
      <div class="bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-md shadow-2xl p-8 relative border border-white/5">
        <button class="absolute top-6 right-6 text-on-surface-variant dark:text-slate-500 hover:text-on-surface dark:hover:text-white transition-colors" @click="showModal = false">
          <span class="material-symbols-outlined">close</span>
        </button>
        <h4 class="text-2xl font-black tracking-tight text-[#0a1944] dark:text-blue-400 mb-2">Nouvelle clé secrète</h4>
        <p class="text-on-surface-variant dark:text-slate-400 text-sm mb-8">Donnez un nom descriptif à votre clé pour l'identifier facilement par la suite.</p>
        <form class="space-y-6" @submit.prevent>
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-on-surface dark:text-slate-300 mb-2">Libellé de la clé</label>
            <input
              v-model="newKeyName"
              class="w-full bg-surface-container-low dark:bg-slate-800 border-transparent rounded-xl focus:ring-4 focus:ring-primary-fixed-dim/30 dark:focus:ring-blue-500/20 focus:border-primary dark:focus:border-blue-500 transition-all p-4 text-sm font-semibold text-on-surface dark:text-white"
              placeholder="ex. Intégration site web"
              type="text"
            />
          </div>
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-on-surface dark:text-slate-300 mb-2">Permissions</label>
            <div class="space-y-3">
              <label class="flex items-center gap-3 p-3 rounded-xl border border-outline-variant/30 dark:border-white/5 hover:bg-surface-container-low dark:hover:bg-slate-800 cursor-pointer transition-colors text-on-surface dark:text-white">
                <input checked class="text-primary dark:text-blue-500 focus:ring-primary dark:focus:ring-blue-500 bg-transparent" name="perm" type="radio" />
                <div>
                  <p class="text-sm font-bold">Accès complet</p>
                  <p class="text-xs text-on-surface-variant dark:text-slate-500">Lecture/écriture sur toutes les ressources</p>
                </div>
              </label>
              <label class="flex items-center gap-3 p-3 rounded-xl border border-outline-variant/30 dark:border-white/5 hover:bg-surface-container-low dark:hover:bg-slate-800 cursor-pointer transition-colors text-on-surface dark:text-white">
                <input class="text-primary dark:text-blue-500 focus:ring-primary dark:focus:ring-blue-500 bg-transparent" name="perm" type="radio" />
                <div>
                  <p class="text-sm font-bold">Lecture seule</p>
                  <p class="text-xs text-on-surface-variant dark:text-slate-500">Ne peut pas effectuer d'actions ni de paiements</p>
                </div>
              </label>
            </div>
          </div>
          <button
            class="w-full bg-primary dark:bg-blue-600 text-on-primary py-4 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            type="button"
            @click="handleGenerateKey"
          >
            Créer la clé
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
