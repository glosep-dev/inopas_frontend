<script setup lang="ts">
import { ref } from 'vue'
import { userStore } from '../store/userStore'
import { showAlert } from '../utils/sweetalert'
import SideNavBar from '../components/SideNavBar.vue'
import BottomNavBar from '../components/BottomNavBar.vue'
import AppFooter from '../components/AppFooter.vue'

const isEditing = ref(false)
const editData = ref({ ...userStore.user })

const toggleEdit = () => {
  if (isEditing.value) {
    // Mode Annuler
    editData.value = { ...userStore.user }
  }
  isEditing.value = !isEditing.value
}

const saveProfile = () => {
  userStore.updateProfile(editData.value)
  isEditing.value = false
  showAlert('Profil mis à jour', 'Vos modifications ont été enregistrées avec succès.', 'success')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-body pb-24 md:pb-0 md:pl-64 transition-colors duration-300">
    <SideNavBar activeItem="settings" />
    
    <main class="max-w-4xl mx-auto p-6 md:p-12">
      <header class="mb-12">
        <h2 class="text-4xl font-black text-primary dark:text-white tracking-tight">Mon Profil</h2>
        <p class="text-slate-500 dark:text-slate-400 font-medium">Gérez vos informations personnelles et votre compte.</p>
      </header>

      <!-- Profile Card -->
      <section class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center gap-10 mb-10">
        <div class="relative">
          <div class="w-32 h-32 rounded-full overflow-hidden ring-8 ring-primary/5 dark:ring-white/5 shadow-2xl bg-slate-200 dark:bg-slate-800">
            <img :src="userStore.user.avatar" class="w-full h-full object-cover" alt="Profile">
          </div>
          <button v-if="isEditing" class="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
            <span class="material-symbols-outlined text-sm font-bold">photo_camera</span>
          </button>
        </div>
        
        <div class="flex-1 text-center md:text-left">
          <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
            <h3 v-if="!isEditing" class="text-3xl font-black dark:text-white">{{ userStore.user.name }}</h3>
            <input v-else v-model="editData.name" class="text-2xl font-black bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-2 w-full max-w-sm focus:ring-2 focus:ring-primary/20 dark:text-white" />
            <span class="inline-block px-3 py-1 bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full self-center">
              {{ userStore.user.role }}
            </span>
          </div>
          <p v-if="!isEditing" class="text-slate-500 dark:text-slate-400 font-medium mb-6">{{ userStore.user.email }}</p>
          <input v-else v-model="editData.email" class="font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-2 w-full max-w-sm mb-6 focus:ring-2 focus:ring-primary/20" />
          
          <div class="flex flex-wrap justify-center md:justify-start gap-4">
            <div class="bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400">
              Inscrit en {{ userStore.user.joined }}
            </div>
            <div v-if="userStore.kycStatus === 'verified'" class="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">verified</span> Identité vérifiée
            </div>
            <div v-else class="bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">warning</span> KYC requis
            </div>
          </div>
        </div>
      </section>

      <!-- Settings Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <!-- Account Info -->
        <div class="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-white/5">
          <h4 class="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
            <span class="material-symbols-outlined text-primary dark:text-blue-400">person</span> Informations personnelles
          </h4>
          <div class="space-y-4">
            <div class="space-y-1 text-left">
              <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Nom complet</label>
              <p v-if="!isEditing" class="font-bold dark:text-slate-200">{{ userStore.user.name }}</p>
              <input v-else v-model="editData.name" class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 dark:text-white" />
            </div>
            <div class="space-y-1 text-left">
              <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Email</label>
              <p v-if="!isEditing" class="font-bold dark:text-slate-200">{{ userStore.user.email }}</p>
              <input v-else v-model="editData.email" class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 dark:text-white" />
            </div>
            <div class="space-y-1 text-left">
              <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Téléphone</label>
              <p v-if="!isEditing" class="font-bold dark:text-slate-200">{{ userStore.user.phone }}</p>
              <input v-else v-model="editData.phone" class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 dark:text-white" />
            </div>
          </div>
          <button v-if="!isEditing" @click="toggleEdit" class="w-full mt-8 py-3 bg-slate-50 dark:bg-slate-800 text-primary dark:text-blue-400 font-bold rounded-xl hover:bg-primary-fixed dark:hover:bg-slate-700 transition-colors">
            Modifier les infos
          </button>
          <div v-else class="flex gap-4 mt-8">
            <button @click="toggleEdit" class="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              Annuler
            </button>
            <button @click="saveProfile" class="flex-1 py-3 bg-primary dark:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
              Enregistrer
            </button>
          </div>
        </div>

        <!-- Account Status & Verification -->
        <div class="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-white/5">
          <h4 class="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white">
            <span class="material-symbols-outlined text-primary dark:text-blue-400">verified_user</span> Vérification & Sécurité
          </h4>
          <div class="space-y-6">
            <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
              <div>
                <p class="text-sm font-bold dark:text-white">Statut KYC</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ userStore.kycStatus === 'verified' ? 'Compte entièrement vérifié' : 'Action requise pour débloquer les limites' }}</p>
              </div>
              <router-link :to="userStore.kycStatus === 'verified' ? '#' : '/kyc'" 
                :class="['px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest', userStore.kycStatus === 'verified' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 underline']">
                {{ userStore.kycStatus === 'verified' ? 'Valide' : 'Vérifier' }}
              </router-link>
            </div>
            
            <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
              <div>
                <p class="text-sm font-bold dark:text-white">Double authentification</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">Sécurité renforcée active</p>
              </div>
              <div class="w-10 h-6 bg-primary dark:bg-blue-600 rounded-full relative">
                <div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <button class="w-full mt-6 py-3 border-2 border-primary-fixed dark:border-blue-900/50 text-primary dark:text-blue-400 font-bold rounded-xl hover:bg-primary-fixed dark:hover:bg-blue-900/10 transition-colors">
            Sécurité avancée
          </button>
        </div>
      </div>

      <AppFooter />
    </main>

    <BottomNavBar />
  </div>
</template>
