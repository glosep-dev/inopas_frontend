<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="text-on-surface antialiased overflow-x-hidden">
    <!-- Barre de navigation -->
    <nav
      class="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-[0_1px_10px_rgba(0,0,0,0.02)] shadow-sm"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div class="text-2xl font-black tracking-tighter text-[#0a1944] dark:text-white uppercase">INOPAS</div>
        <div class="hidden md:flex items-center gap-x-8">
          <a
            class="font-['Inter'] font-medium tracking-tight text-[#0a1944] dark:text-white font-bold border-b-2 border-[#0a1944] dark:border-blue-400"
            href="#"
          >Solutions</a>
          <a
            class="font-['Inter'] font-medium tracking-tight text-slate-500 dark:text-slate-400 hover:text-[#0a1944] transition-colors"
            href="#"
          >Développeurs</a>
          <a
            class="font-['Inter'] font-medium tracking-tight text-slate-500 dark:text-slate-400 hover:text-[#0a1944] transition-colors"
            href="#"
          >Tarifs</a>
        </div>
        <div class="flex items-center gap-x-4">
          <RouterLink
            to="/login"
            class="hidden md:block text-slate-500 dark:text-slate-400 hover:text-[#0a1944] font-medium px-4 py-2 transition-colors"
          >Connexion</RouterLink>
          <RouterLink
            to="/register"
            class="bg-[#0a1944] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md"
          >Commencer</RouterLink>
        </div>
      </div>
    </nav>

    <main class="pt-24">
      <!-- Section Hero -->
      <section class="relative px-6 py-20 md:py-32 max-w-7xl mx-auto overflow-hidden">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="relative z-10">
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold tracking-wide mb-6 uppercase"
            >
              <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Nouveau : Règlements directs dans 15+ pays
            </div>
            <h1 class="text-5xl md:text-7xl font-extrabold text-primary tracking-tighter leading-[0.9] mb-8">
              Le Moteur du <br />Commerce <span class="text-secondary">Moderne.</span>
            </h1>
            <p class="text-on-surface-variant text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              INOPAS est la couche de paiement unifiée pour l'Afrique. Une seule API pour accepter le mobile money,
              les cartes et les virements bancaires sur les marchés les plus fragmentés du continent.
            </p>
            <div class="flex flex-wrap gap-4">
              <RouterLink
                to="/register"
                class="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:shadow-xl transition-all active:scale-95"
              >
                Commencer
                <span class="material-symbols-outlined text-xl">arrow_forward</span>
              </RouterLink>
              <button
                class="bg-surface-container-lowest text-primary px-8 py-4 rounded-xl font-bold border border-outline-variant/20 hover:bg-surface-container-low transition-all"
              >
                Voir la documentation
              </button>
            </div>
            <div class="mt-12 flex items-center gap-6">
              <div class="flex -space-x-3">
                <img
                  class="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVB0CCt7k-jrZBGgBBHS0NGeivR4jzcquV5hswlVonNzYQaZSQFAa9i8DhEXGO2TTbU12JstcLf9MOAe2IlpBcZOLiRDXLe2JbFgRuoEQfEKYPV9bdZrtlNc5r0ckvZkX1FLLUjHd5IpHa9uXyHcHfoASd1umXp67f62lic8FD5Fky6F7VKz8mx-wN7OjGd5daqLwUfZcSn5mgSfmJcF0BC1KQjOzYJ8-6mg1ovO_mVVo7oI5ejmk_HQK1cFf-YE__nWrUf35UJBk"
                  alt="Utilisateur"
                />
                <img
                  class="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi4FmRYix3GBR78bWfLkshVY_2ijzTsWZoHGilCmGqCLob7cAbrQqqjpMsOBXLORPJrdSiQjptI318_hEAAB5nblLbRUkxdLKbrNtUl2x7Es_NIMFhc66q8_0M3gDCkMg6PQCNViZl3xcpa9kkFeQ3NHBtI_6wH3GYzHNBspikDOiZFAKmFkuyKGfItgVM5zjKlx9rPqxrzkCWktfTjfSLtkJ_z7DjOwuEMjuQcc_2_lSPfYfZXGcoPZOdF9Ami9IpCPZca6KQfXM"
                  alt="Utilisateur"
                />
                <img
                  class="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1BCrJ6xGrg07XiqCUDK1fKWmYAQgaetQCau0wQBX8WalahR1FGN7Kvp8JtvT3q4oMCLhStkHiEXTicxQW21VvZw8lEQ1vXY4xOKbrAFBEv9Xz1XA47RzGwcKhT1p4KY4TpZ3o6oUNHV4pBzslbrxICS2zw3OfHR2KgUPqkgY97OAzN-9HksGUIQiRdHK0BYt2nV3c7PEqlfSTNw21IHlAfH-YkFhmdgFtGWZKMM7BCJFASK7zTLdN2KZC4laFpHFFpK6_Sb5b9Gc"
                  alt="Utilisateur"
                />
              </div>
              <p class="text-sm text-on-surface-variant font-medium">
                Adopté par <span class="text-primary font-bold">2 500+</span> entreprises en croissance
              </p>
            </div>
          </div>
          <div class="relative">
            <div
              class="absolute -top-20 -right-20 w-96 h-96 bg-primary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            ></div>
            <div
              class="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary-fixed rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            ></div>
            <div
              class="relative bg-surface-container-lowest p-6 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 transform rotate-2"
            >
              <div class="bg-primary p-8 rounded-[1.5rem] text-white">
                <div class="flex justify-between items-start mb-12">
                  <span class="material-symbols-outlined text-4xl">contactless</span>
                  <span class="text-sm font-bold opacity-70 tracking-widest uppercase">INOPAS Platinum</span>
                </div>
                <div class="space-y-1">
                  <p class="text-sm font-bold opacity-60 uppercase tracking-widest">Solde Total</p>
                  <h3 class="text-3xl font-bold">125 950 000 CDF</h3>
                </div>
                <div class="flex justify-between items-end">
                  <div>
                    <p class="text-[10px] opacity-40 uppercase tracking-tighter mb-1">ID Marchand</p>
                    <p class="font-mono text-sm">**** **** 8829</p>
                  </div>
                  <div class="w-12 h-8 bg-white/20 rounded-md backdrop-blur-sm"></div>
                </div>
              </div>
              <div class="mt-8 space-y-4">
                <div class="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container"
                    >
                      <span class="material-symbols-outlined text-lg">trending_up</span>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-primary">Dépôt Mobile Money</p>
                      <p class="text-xs text-on-surface-variant">Il y a 2 min</p>
                    </div>
                  </div>
                  <p class="text-xs font-bold opacity-60">Reçu aujourd'hui</p>
                  <p class="text-sm font-bold text-primary">+2 850 000 CDF</p>
                </div>
                <div class="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container"
                    >
                      <span class="material-symbols-outlined text-lg">cached</span>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-primary">Traitement Carte</p>
                      <p class="text-xs text-on-surface-variant">Il y a 15 min</p>
                    </div>
                  </div>
                  <p class="text-xs font-bold opacity-60">Transaction encours</p>
                  <p class="text-sm font-bold text-primary">+12 500 000 CDF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Indicateurs de confiance -->
      <section class="bg-surface-container-low py-12">
        <div class="max-w-7xl mx-auto px-6">
          <p class="text-center text-[10px] uppercase tracking-[0.3em] font-bold text-outline mb-10">
            Ils nous font confiance
          </p>
          <div class="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale contrast-125">
            <span class="text-2xl font-black text-primary italic">AIRTEL</span>
            <span class="text-2xl font-black text-primary italic">MTN</span>
            <span class="text-2xl font-black text-primary italic">ORANGE</span>
            <span class="text-2xl font-black text-primary italic">MOOV</span>
            <span class="text-2xl font-black text-primary italic">VISA</span>
          </div>
        </div>
      </section>

      <!-- Grille de fonctionnalités -->
      <section class="py-24 px-6 max-w-7xl mx-auto">
        <div class="mb-16">
          <h2 class="text-4xl font-extrabold text-primary tracking-tight mb-4">Conçu pour la vitesse.</h2>
          <p class="text-on-surface-variant max-w-lg">
            Nous avons éliminé la complexité des paiements transfrontaliers pour que vous puissiez vous concentrer sur votre produit.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Fonctionnalité principale -->
          <div
            class="md:col-span-2 bg-primary rounded-[2rem] p-10 text-white flex flex-col justify-between overflow-hidden relative group"
          >
            <div class="relative z-10">
              <span class="material-symbols-outlined text-4xl text-primary-fixed mb-6">dynamic_feed</span>
              <h3 class="text-3xl font-bold mb-4">Intégration API unifiée</h3>
              <p class="text-blue-100/70 max-w-md leading-relaxed">
                Arrêtez d'écrire du code séparé pour chaque réseau mobile. Une seule intégration vous donne accès à
                plus de 20 fournisseurs de mobile money et réseaux de cartes internationaux instantanément.
              </p>
            </div>
            <div class="mt-12 flex items-center gap-4">
              <div class="px-4 py-2 bg-white/10 rounded-lg font-mono text-sm backdrop-blur-md">
                inopas.checkout.init()
              </div>
              <div class="px-4 py-2 bg-white/10 rounded-lg font-mono text-sm backdrop-blur-md">
                status: "success"
              </div>
            </div>
            <div
              class="absolute -right-20 bottom-0 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-700"
            >
              <span class="material-symbols-outlined text-[300px]">code</span>
            </div>
          </div>
          <!-- Règlements en temps réel -->
          <div
            class="bg-white rounded-[2rem] p-10 shadow-sm border border-outline-variant/10 hover:bg-surface-container-low transition-colors duration-500"
          >
            <div
              class="w-12 h-12 bg-secondary-container rounded-2xl flex items-center justify-center text-on-secondary-container mb-6"
            >
              <span class="material-symbols-outlined">bolt</span>
            </div>
            <h3 class="text-xl font-bold text-primary mb-3">Règlements en temps réel</h3>
            <p class="text-on-surface-variant text-sm leading-relaxed">
              Pourquoi attendre des jours pour votre argent ? Nous traitons les règlements en temps réel pour que votre trésorerie ne s'arrête jamais.
            </p>
          </div>
          <!-- Sécurité bancaire -->
          <div
            class="bg-white rounded-[2rem] p-10 shadow-sm border border-outline-variant/10 hover:bg-surface-container-low transition-colors duration-500"
          >
            <div
              class="w-12 h-12 bg-tertiary-container rounded-2xl flex items-center justify-center text-on-tertiary-container mb-6"
            >
              <span class="material-symbols-outlined">security</span>
            </div>
            <h3 class="text-xl font-bold text-primary mb-3">Sécurité de niveau bancaire</h3>
            <p class="text-on-surface-variant text-sm leading-relaxed">
              Infrastructure certifiée PCI-DSS Niveau 1 avec chiffrement 256 bits pour chaque transaction.
            </p>
          </div>
          <!-- Tableau de bord intelligent -->
          <div
            class="md:col-span-2 bg-surface-container-high rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-10"
          >
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-primary mb-4">Tableau de bord intelligent</h3>
              <p class="text-on-surface-variant leading-relaxed mb-6">
                Surveillez les taux de réussite des transactions, le taux de désabonnement et les métriques de croissance régionale depuis une interface unique et élégante.
              </p>
              <ul class="space-y-3">
                <li class="flex items-center gap-2 text-sm font-semibold text-primary">
                  <span class="material-symbols-outlined text-sm text-secondary">check_circle</span>
                  Analyses détaillées et export
                </li>
                <li class="flex items-center gap-2 text-sm font-semibold text-primary">
                  <span class="material-symbols-outlined text-sm text-secondary">check_circle</span>
                  Gestion multi-utilisateurs
                </li>
              </ul>
            </div>
            <div class="flex-1 w-full h-full bg-white rounded-2xl p-4 shadow-lg">
              <div class="space-y-3">
                <div class="h-2 w-3/4 bg-slate-100 rounded"></div>
                <div class="flex gap-2">
                  <div class="h-16 flex-1 bg-primary-fixed rounded"></div>
                  <div class="h-16 flex-1 bg-surface-container-highest rounded"></div>
                  <div class="h-16 flex-1 bg-primary-fixed rounded"></div>
                </div>
                <div class="h-2 w-1/2 bg-slate-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Comment ça marche -->
      <section class="py-24 bg-primary text-white overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div>
              <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-none">
                Prêt en trois<br />étapes simples.
              </h2>
              <p class="text-blue-100/60 max-w-sm">
                Pas de paperasse complexe. Pas de longs délais d'attente. Juste une concentration pure sur votre activité.
              </p>
            </div>
            <div class="flex gap-4">
              <button
                class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <span class="material-symbols-outlined">west</span>
              </button>
              <button
                class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <span class="material-symbols-outlined">east</span>
              </button>
            </div>
          </div>
          <div class="grid md:grid-cols-3 gap-12 relative">
            <div class="relative group">
              <span class="text-8xl font-black text-white/5 absolute -top-12 -left-4">01</span>
              <div class="relative">
                <h4 class="text-xl font-bold mb-4">Créer un compte</h4>
                <p class="text-blue-100/70">
                  Inscrivez-vous en quelques minutes. Complétez notre processus KYC simple pour débloquer des limites de transaction plus élevées immédiatement.
                </p>
              </div>
            </div>
            <div class="relative group">
              <span class="text-8xl font-black text-white/5 absolute -top-12 -left-4">02</span>
              <div class="relative">
                <h4 class="text-xl font-bold mb-4">Intégrer l'API</h4>
                <p class="text-blue-100/70">
                  Utilisez nos SDK légers ou l'API directe pour ajouter les paiements mobile money à votre flux de paiement en moins de 30 minutes.
                </p>
              </div>
            </div>
            <div class="relative group">
              <span class="text-8xl font-black text-white/5 absolute -top-12 -left-4">03</span>
              <div class="relative">
                <h4 class="text-xl font-bold mb-4">Passer en production</h4>
                <p class="text-blue-100/70">
                  Basculez en mode production et commencez à recevoir des paiements de clients dans plusieurs régions instantanément.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section CTA -->
      <section class="py-24 px-6">
        <div
          class="max-w-5xl mx-auto bg-surface-container rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-secondary-fixed opacity-20 blur-3xl -mr-20 -mt-20 rounded-full"
          ></div>
          <div class="relative z-10">
            <h2 class="text-4xl md:text-5xl font-black text-primary tracking-tighter mb-8">
              Accélérez la croissance<br />de votre entreprise.
            </h2>
            <p class="text-on-surface-variant max-w-xl mx-auto mb-10 text-lg">
              Rejoignez des milliers d'entrepreneurs africains qui construisent le futur du commerce avec Inopas.
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <RouterLink
                to="/register"
                class="bg-[#0a1944] text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl active:scale-95 transition-all"
              >Créer un compte gratuit</RouterLink>
              <button
                class="bg-white text-primary border border-outline-variant/30 px-10 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-low transition-all"
              >Contacter l'équipe commerciale</button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Pied de page -->
    <footer class="bg-[#f7f9ff] dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/20 w-full py-12 px-6">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex flex-col items-center md:items-start gap-4">
          <span class="font-black text-slate-300 text-2xl tracking-tighter uppercase">INOPAS</span>
          <p class="text-slate-400 text-xs font-['Inter'] tracking-normal text-center md:text-left">
            © 2024 Inopas Solutions de Paiement. Sécurisé par chiffrement de niveau bancaire.
          </p>
        </div>
        <div class="flex flex-wrap justify-center gap-8">
          <a class="text-slate-400 hover:text-slate-600 text-xs font-['Inter'] transition-opacity" href="#">Politique de confidentialité</a>
          <a class="text-slate-400 hover:text-slate-600 text-xs font-['Inter'] transition-opacity" href="#">Conditions d'utilisation</a>
          <a class="text-slate-400 hover:text-slate-600 text-xs font-['Inter'] transition-opacity" href="#">Sécurité</a>
          <a class="text-slate-400 hover:text-slate-600 text-xs font-['Inter'] transition-opacity" href="#">Statut</a>
        </div>
        <div class="flex gap-4">
          <div
            class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            <span class="material-symbols-outlined text-sm">public</span>
          </div>
          <div
            class="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            <span class="material-symbols-outlined text-sm">alternate_email</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Navigation mobile -->
    <div
      class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-6 pt-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.04)] rounded-t-[2.5rem]"
    >
      <div
        class="flex flex-col items-center justify-center bg-[#0a1944] text-white rounded-full p-3 mb-2 transform -translate-y-2 transition-all"
      >
        <span class="material-symbols-outlined">home</span>
        <span class="text-[10px] uppercase tracking-widest font-bold">Accueil</span>
      </div>
      <RouterLink to="#" class="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
        <span class="material-symbols-outlined">account_balance_wallet</span>
        <span class="text-[10px] uppercase tracking-widest font-bold">Payer</span>
      </RouterLink>
      <RouterLink to="/api-keys" class="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
        <span class="material-symbols-outlined">code</span>
        <span class="text-[10px] uppercase tracking-widest font-bold">Clés</span>
      </RouterLink>
      <RouterLink to="#" class="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
        <span class="material-symbols-outlined">person</span>
        <span class="text-[10px] uppercase tracking-widest font-bold">Profil</span>
      </RouterLink>
    </div>
  </div>
</template>
