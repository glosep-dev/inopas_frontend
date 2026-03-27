<script setup lang="ts">
import SideNavBar from '../components/SideNavBar.vue'
import BottomNavBar from '../components/BottomNavBar.vue'
import AppFooter from '../components/AppFooter.vue'
import { userStore } from '../store/userStore'

const chartOptions = {
  chart: {
    type: 'bar',
    toolbar: { show: false },
    fontFamily: 'Inter, sans-serif',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    }
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '60%',
      distributed: true,
    }
  },
  dataLabels: { enabled: false },
  legend: { show: false },
  xaxis: {
    categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: {
        colors: userStore.isDarkMode ? '#94a3b8' : '#64748b',
        fontSize: '12px',
        fontWeight: 600,
      }
    }
  },
  yaxis: { show: false },
  grid: {
    show: true,
    borderColor: userStore.isDarkMode ? '#334155' : '#f1f5f9',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
  },
  colors: ['#0061A4', '#0061A4', '#0061A4', '#0061A4', '#0061A4', '#0061A4', '#0061A4'],
  tooltip: {
    theme: userStore.isDarkMode ? 'dark' : 'light',
    y: {
      formatter: (val: number) => {
        return userStore.formatAmount(val)
      }
    }
  }
}

const series = [{
  name: 'Volume de transactions',
  data: [1250000000, 1980000000, 1520000000, 2910000000, 1640000000, 2820000000, 2580000000]
}]
</script>

<template>
  <div class="min-h-screen bg-background dark:bg-slate-950 text-on-surface dark:text-slate-200 font-body pb-24 md:pb-0 md:pl-64 transition-colors duration-300">
    <SideNavBar activeItem="analytics" />
    
    <main class="max-w-7xl mx-auto p-6 md:p-10">
      <header class="mb-10">
        <h2 class="text-3xl font-black tracking-tight text-primary dark:text-white">Analyses</h2>
        <p class="text-on-surface-variant dark:text-slate-400 font-medium">Suivez vos performances et la croissance de votre entreprise.</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div class="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-outline-variant/10 dark:border-white/5">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-xl font-bold text-primary dark:text-white">Volume de transactions</h3>
            <select class="bg-surface-container-low dark:bg-slate-800 border-none rounded-lg text-sm font-bold text-primary dark:text-blue-400 focus:ring-0">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
            </select>
          </div>
          <div class="h-64 bg-surface-container-lowest dark:bg-slate-950/50 rounded-2xl p-2">
            <apexchart
              type="bar"
              height="100%"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </div>

        <div class="bg-primary rounded-[2rem] p-8 text-white shadow-xl shadow-primary/20 flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-bold opacity-80 mb-2">Profit Net Mensuel</h3>
            <p class="text-4xl font-black">+{{ userStore.formatAmount(345200000) }}</p>
            <p class="text-sm font-bold text-emerald-300 mt-2 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">trending_up</span>
              14% de plus que le mois dernier
            </p>
          </div>
          <div class="mt-8 space-y-4">
            <div class="flex justify-between items-center text-sm">
              <span class="opacity-70">Revenu brut</span>
              <span class="font-bold">{{ userStore.formatAmount(518200000) }}</span>
            </div>
            <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div class="h-full bg-emerald-400 w-[68%]"></div>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="opacity-70">Frais API</span>
              <span class="font-bold text-secondary-fixed">{{ userStore.formatAmount(2845000) }}</span>
            </div>
          </div>
        </div>
      </div>

      <AppFooter class="mt-20" />
    </main>

    <BottomNavBar />
  </div>
</template>
