<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { showToast } from '../utils/sweetalert'

const router = useRouter()

const handleLogin = () => {
  showToast('Connexion réussie !')
  setTimeout(() => {
    router.push('/dashboard')
  }, 1000)
}
</script>

<template>
  <div class="bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
    <div class="min-h-screen flex flex-col md:flex-row">
      <!-- Côté gauche : Branding -->
      <div class="hidden md:flex md:w-1/2 lg:w-3/5 bg-primary relative overflow-hidden items-center justify-center p-12">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-fixed rounded-full blur-[120px]"></div>
          <div class="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary-container rounded-full blur-[150px]"></div>
        </div>
        <div class="relative z-10 max-w-xl">
          <h1 class="text-white font-headline text-6xl font-black tracking-tighter mb-8 leading-[0.9]">
            La nouvelle ère des paiements institutionnels.
          </h1>
          <p class="text-on-primary-container text-xl leading-relaxed font-medium mb-12 opacity-80">
            Infrastructure sécurisée et haute vitesse conçue pour le commerce numérique moderne. Accédez à votre tableau de bord global et gérez vos transactions avec une précision architecturale.
          </p>
          <div class="grid grid-cols-2 gap-8">
            <div class="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span class="material-symbols-outlined text-primary-fixed-dim text-3xl mb-4">shield_lock</span>
              <h3 class="text-white font-bold mb-2">Niveau bancaire</h3>
              <p class="text-on-primary-container text-sm">Protocole de chiffrement multi-couches pour chaque transaction.</p>
            </div>
            <div class="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span class="material-symbols-outlined text-primary-fixed-dim text-3xl mb-4">bolt</span>
              <h3 class="text-white font-bold mb-2">Temps réel</h3>
              <p class="text-on-primary-container text-sm">Moteur de règlement instantané avec 99,99% de disponibilité.</p>
            </div>
          </div>
        </div>
        <div class="absolute bottom-12 left-12">
          <span class="text-2xl font-black tracking-tighter text-white">INOPAS</span>
        </div>
      </div>

      <!-- Côté droit : Formulaire de connexion -->
      <main class="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 bg-surface">
        <div class="w-full max-w-md">
          <div class="md:hidden mb-12 flex justify-center">
            <span class="text-3xl font-black tracking-tighter text-primary">INOPAS</span>
          </div>
          <div class="mb-10 text-center md:text-left">
            <h2 class="text-4xl font-black tracking-tighter text-on-surface mb-3">Bon retour</h2>
            <p class="text-on-surface-variant font-medium">Entrez vos identifiants pour accéder à votre portail.</p>
          </div>
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div class="space-y-2">
              <label class="block text-sm font-bold text-on-surface ml-1" for="email">Adresse e-mail</label>
              <div class="relative">
                <input
                  class="w-full px-5 py-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-outline/50 font-medium"
                  id="email"
                  name="email"
                  placeholder="nom@entreprise.com"
                  required
                  type="email"
                />
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center px-1">
                <label class="block text-sm font-bold text-on-surface" for="password">Mot de passe</label>
                <a class="text-xs font-bold text-secondary hover:underline transition-all" href="#">Mot de passe oublié ?</a>
              </div>
              <div class="relative">
                <input
                  class="w-full px-5 py-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-outline/50 font-medium"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                />
              </div>
            </div>
            <div class="flex items-center space-x-3 px-1">
              <input
                class="w-5 h-5 rounded border-outline-variant/30 text-primary focus:ring-primary/20"
                id="remember"
                type="checkbox"
              />
              <label class="text-sm font-semibold text-on-surface-variant cursor-pointer" for="remember">Rester connecté pendant 30 jours</label>
            </div>
            <button
              class="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-xl shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              type="submit"
            >
              Se connecter au portail
              <span class="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>
          <div class="mt-10">
            <div class="relative flex items-center justify-center mb-8">
              <div class="w-full h-[1px] bg-outline-variant/20"></div>
              <span class="absolute px-4 bg-surface text-xs font-bold text-outline uppercase tracking-widest">Ou continuer avec</span>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <button
                class="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-colors font-semibold text-sm"
              >
                <img
                  alt="Google"
                  class="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp0d2qofG5CJFbXe-ZhW1XcXVBOD4clZHVru_OHBWKsIEYCBsABfr4FRsutzx7PBeW9_OigCMkYZyuvbnnxyIh-FffEuq10wypSadUdR4OtCVZr9YPxfRNBmpp2mI7aL6EcQIubyW6JtbNBcxKdVKMdvswYFJ_OdKLBJ125q-jkokfKSjG3MBWt3ofTSt5E4dvEfNW2U6hChHzB_uks5KSVUVgbit5er5ZSw6Ch03pwasZRhpNq2kVVaeEXDymayxegS4OrIB5P-0"
                />
                Google
              </button>
              <button
                class="flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-colors font-semibold text-sm"
              >
                <span class="material-symbols-outlined text-on-surface">key</span>
                SSO
              </button>
            </div>
          </div>
          <div class="mt-12 text-center">
            <p class="text-on-surface-variant font-medium">
              Vous n'avez pas de compte institutionnel ?
              <RouterLink class="text-primary font-black hover:underline ml-1" to="/register">Commencer</RouterLink>
            </p>
          </div>
        </div>
        <footer class="mt-auto pt-12 text-center md:text-left w-full max-w-md">
          <div class="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4">
            <a class="text-xs font-bold text-outline hover:text-on-surface transition-colors" href="#">Politique de confidentialité</a>
            <a class="text-xs font-bold text-outline hover:text-on-surface transition-colors" href="#">Conditions d'utilisation</a>
            <a class="text-xs font-bold text-outline hover:text-on-surface transition-colors" href="#">Audit de sécurité</a>
          </div>
          <p class="text-[10px] font-bold text-outline/50 uppercase tracking-widest">
            © 2024 INOPAS SOLUTIONS DE PAIEMENT. SÉCURISÉ PAR CHIFFREMENT DE NIVEAU BANCAIRE.
          </p>
        </footer>
      </main>
    </div>
    <div class="fixed top-0 right-0 w-96 h-96 -mr-48 -mt-48 opacity-[0.03] pointer-events-none">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,77.3,-44.7C85.4,-31.3,90.5,-15.6,89.3,-0.7C88.1,14.3,80.6,28.6,71.5,41.2C62.4,53.8,51.8,64.7,39.1,72.4C26.4,80.1,11.6,84.7,-2.8,89.5C-17.2,94.3,-31.2,99.3,-44.1,95.1C-57,90.9,-68.8,77.5,-77.2,63.1C-85.6,48.7,-90.6,33.3,-92.4,17.7C-94.2,2.1,-92.8,-13.7,-87.3,-28.3C-81.8,-42.9,-72.2,-56.3,-59.6,-64C-47,-71.7,-31.4,-73.7,-16.4,-77.2C-1.4,-80.7,13.6,-85.7,28.6,-83.1C43.6,-80.5,58.6,-70.3,44.7,-76.4Z"
          fill="#0a1944"
          transform="translate(100 100)"
        ></path>
      </svg>
    </div>
  </div>
</template>
