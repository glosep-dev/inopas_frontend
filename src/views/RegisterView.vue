<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { showAlert } from '../utils/sweetalert'

const router = useRouter()

const handleRegister = async () => {
  const result = await showAlert('Compte créé !', 'Bienvenue chez INOPAS. Vous pouvez maintenant vous connecter.', 'success')
  if (result.isConfirmed) {
    router.push('/login')
  }
}
</script>

<template>
  <div class="bg-background text-on-surface min-h-screen flex flex-col">
    <header class="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm">
      <div class="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <RouterLink to="/" class="text-2xl font-black tracking-tighter text-primary">INOPAS</RouterLink>
        <div class="hidden md:flex items-center gap-6">
          <span class="text-xs font-medium text-on-surface-variant flex items-center gap-2">
            <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">lock</span>
            Sécurité de niveau bancaire
          </span>
        </div>
      </div>
    </header>

    <main class="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
      <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Côté gauche : Contenu éditorial -->
        <div class="lg:col-span-7 space-y-8 pr-0 lg:pr-12">
          <div class="space-y-4">
            <span
              class="inline-block px-4 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold tracking-widest uppercase"
            >
              Paiements mondiaux
            </span>
            <h1 class="text-5xl lg:text-7xl font-bold text-primary tracking-tighter leading-none">
              Le futur des <br />paiements <br /><span class="text-secondary">institutionnels.</span>
            </h1>
            <p class="text-on-surface-variant text-lg max-w-lg leading-relaxed">
              Rejoignez la prochaine génération d'infrastructure financière. Sécurisée, rapide et conçue pour le passage à l'échelle.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-surface-container-low p-6 rounded-xl space-y-3">
              <div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shadow-sm">
                <span class="material-symbols-outlined text-primary">speed</span>
              </div>
              <h3 class="font-bold text-primary">Règlement rapide</h3>
              <p class="text-xs text-on-surface-variant">Traitement en temps réel dans plus de 140 devises.</p>
            </div>
            <div class="bg-surface-container-low p-6 rounded-xl space-y-3">
              <div class="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shadow-sm">
                <span class="material-symbols-outlined text-primary">verified_user</span>
              </div>
              <h3 class="font-bold text-primary">Conformité renforcée</h3>
              <p class="text-xs text-on-surface-variant">Certifié SOC2 Type II et PCI DSS Niveau 1.</p>
            </div>
          </div>
        </div>

        <!-- Côté droit : Formulaire d'inscription -->
        <div class="lg:col-span-5">
          <div class="bg-surface-container-lowest p-8 lg:p-10 rounded-3xl shadow-2xl shadow-primary/5 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/30 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div class="relative z-10">
              <h2 class="text-2xl font-bold text-primary tracking-tight mb-2">Créer votre compte</h2>
              <p class="text-on-surface-variant text-sm mb-8">Entrez vos informations pour commencer votre parcours institutionnel.</p>
              <form class="space-y-5" @submit.prevent="handleRegister">
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-primary tracking-wide uppercase px-1">Nom complet</label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">person</span>
                    <input
                      class="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-xl focus:ring-4 focus:ring-primary-fixed-dim/30 focus:border-primary outline-none transition-all text-sm"
                      placeholder="Jean Dupont"
                      type="text"
                    />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-primary tracking-wide uppercase px-1">Adresse e-mail</label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">mail</span>
                    <input
                      class="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-xl focus:ring-4 focus:ring-primary-fixed-dim/30 focus:border-primary outline-none transition-all text-sm"
                      placeholder="nom@entreprise.com"
                      type="email"
                    />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-primary tracking-wide uppercase px-1">Numéro de téléphone</label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">phone</span>
                    <input
                      class="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-xl focus:ring-4 focus:ring-primary-fixed-dim/30 focus:border-primary outline-none transition-all text-sm"
                      placeholder="+33 6 00 00 00 00"
                      type="tel"
                    />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-primary tracking-wide uppercase px-1">Mot de passe</label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-lg">lock</span>
                    <input
                      class="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/20 rounded-xl focus:ring-4 focus:ring-primary-fixed-dim/30 focus:border-primary outline-none transition-all text-sm"
                      placeholder="••••••••••••"
                      type="password"
                    />
                  </div>
                </div>
                <div class="pt-2">
                  <button
                    class="w-full py-4 bg-primary hover:bg-primary-container text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                    type="submit"
                  >
                    Commencer
                    <span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </form>
              <div class="mt-8 pt-8 border-t border-outline-variant/10 flex flex-col items-center gap-4">
                <p class="text-sm text-on-surface-variant">
                  Vous avez déjà un compte ?
                  <RouterLink class="text-primary font-bold hover:underline ml-1" to="/login">Se connecter</RouterLink>
                </p>
                <div class="flex items-center gap-2 text-[10px] text-outline uppercase tracking-widest font-semibold">
                  <span class="material-symbols-outlined text-xs" style="font-variation-settings: 'FILL' 1;">shield</span>
                  Connexion chiffrée AES-256 bits
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="w-full py-12 px-6 border-t border-slate-100 bg-[#f7f9ff]">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="font-black text-slate-300">INOPAS</div>
        <div class="flex flex-wrap justify-center gap-6">
          <a class="text-xs font-['Inter'] text-slate-400 hover:text-slate-600 transition-opacity" href="#">Politique de confidentialité</a>
          <a class="text-xs font-['Inter'] text-slate-400 hover:text-slate-600 transition-opacity" href="#">Conditions d'utilisation</a>
          <a class="text-xs font-['Inter'] text-slate-400 hover:text-slate-600 transition-opacity" href="#">Sécurité</a>
          <a class="text-xs font-['Inter'] text-slate-400 hover:text-slate-600 transition-opacity" href="#">Statut</a>
        </div>
        <p class="text-xs font-['Inter'] text-slate-400 text-center md:text-right">
          © 2024 Inopas Solutions de Paiement. Sécurisé par chiffrement de niveau bancaire.
        </p>
      </div>
    </footer>

    <div class="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40">
      <div class="absolute top-[10%] left-[5%] w-96 h-96 bg-primary-fixed rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[10%] right-[5%] w-80 h-80 bg-secondary-fixed rounded-full blur-[100px]"></div>
    </div>
  </div>
</template>
