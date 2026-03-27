import { reactive } from 'vue'

export type KycStatus = 'none' | 'pending' | 'verified' | 'rejected'

export type Provider = 'M-Pesa' | 'Airtel Money' | 'Orange Money' | 'EquityBCDC' | 'Rawbank' | 'Illicocash'
export type Channel = 'mobile_money' | 'bank'

interface Transaction {
  id: string
  date: string
  label: string
  amount: number
  type: 'incoming' | 'outgoing'
  status: 'completed' | 'pending' | 'failed'
  provider: Provider
  channel: Channel
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  isRead: boolean
  type: 'info' | 'success' | 'warning'
}

interface UserProfile {
  name: string
  email: string
  phone: string
  role: string
  joined: string
  avatar: string
}

export interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  status: 'active' | 'inactive'
  icon: string
  iconBg: string
  iconText: string
}

interface UserStore {
  kycStatus: KycStatus
  user: UserProfile
  isDarkMode: boolean
  balance: number
  currency: string
  transactions: Transaction[]
  notifications: Notification[]
  apiKeys: ApiKey[]
  setKycStatus: (status: KycStatus) => void
  updateProfile: (data: Partial<UserProfile>) => void
  toggleDarkMode: () => void
  addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void
  addNotification: (notif: Omit<Notification, 'id' | 'time' | 'isRead'>) => void
  markAllNotificationsAsRead: () => void
  formatAmount: (amount: number) => string
  addApiKey: (name: string) => void
  revokeApiKey: (id: string) => void
  save: () => void
}

const STORAGE_KEY = 'inopas_user_data'
const STORE_VERSION = 2 // Bump to force migration (v1 = EUR, v2 = CDF)

const defaultUser = {
  name: 'Nsole Antigravity',
  email: 'nsole.antigravity@inopas.com',
  phone: '+33 6 12 34 56 78',
  role: 'Administrateur Entreprise',
  joined: 'Mars 2024',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO80Q1jjW8rbmYMvQ2uAebn26cXCl9zRqjfMwQfMCi0maHGeeAxteGDxUX09Srronw--l3CgDlPRXII_TNV79uo76xGbfFkdmGK0GQNGIEDFg-MuxG_67D5Iegqh8KJORUTZVGbP-ePksnin6Ky_di0qSyGvoHkYMf58nj3SLFU_1aQXDwExmc--78pM6r9jvfOLyVVTQLIBNOpDNKi33bKZv8rcDTd69b1IN_XW-sbRU1YQLIrW8cuH1SZ31W0D-zwAvkPW1e1mI'
}

const defaultTransactions: Transaction[] = [
  {
    id: '1',
    date: 'Aujourd\'hui, 14:45',
    label: 'Virement de masse #9021',
    amount: -28400000.00,
    type: 'outgoing',
    status: 'pending',
    provider: 'EquityBCDC',
    channel: 'bank'
  },
  {
    id: '2',
    date: 'Hier, 9:12',
    label: 'Encaissement M-Pesa #771',
    amount: 95210500.50,
    type: 'incoming',
    status: 'completed',
    provider: 'M-Pesa',
    channel: 'mobile_money'
  },
  {
    id: '3',
    date: '21 Mars 2024',
    label: 'Paiement fournisseur Airtel',
    amount: -650000.00,
    type: 'outgoing',
    status: 'completed',
    provider: 'Airtel Money',
    channel: 'mobile_money'
  }
]

const defaultNotifications: Notification[] = [
  { id: '1', title: 'KYC Requis', message: 'Veuillez soumettre vos documents pour activer toutes les fonctions.', time: 'Il y a 2h', isRead: false, type: 'warning' },
  { id: '2', title: 'Bienvenue', message: 'Bienvenue sur INOPAS, votre solution de paiement institutionnel.', time: 'Hier', isRead: true, type: 'info' }
]

const defaultApiKeys: ApiKey[] = [
  {
    id: '1',
    icon: 'terminal',
    name: 'Production principale',
    key: 'pk_live_********************8z2p',
    created: '12 oct. 2023',
    status: 'active',
    iconBg: 'bg-tertiary-container',
    iconText: 'text-on-tertiary-container',
  },
  {
    id: '2',
    icon: 'science',
    name: 'Sandbox de test',
    key: 'sk_test_********************4k91',
    created: '05 janv. 2024',
    status: 'inactive',
    iconBg: 'bg-surface-container-highest',
    iconText: 'text-on-surface-variant',
  }
]

// Migration: clear old data if version mismatch
const rawData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
const savedData = rawData._version === STORE_VERSION ? rawData : {}
if (rawData._version !== STORE_VERSION) {
  localStorage.removeItem(STORAGE_KEY)
}

export const userStore = reactive<UserStore>({
  kycStatus: savedData.kycStatus || 'none',
  user: savedData.user || defaultUser,
  isDarkMode: savedData.isDarkMode || false,
  balance: savedData.balance ?? 12500000000.00,
  currency: savedData.currency || 'CDF',
  transactions: savedData.transactions || defaultTransactions,
  notifications: savedData.notifications || defaultNotifications,
  apiKeys: savedData.apiKeys || defaultApiKeys,
  setKycStatus(status: KycStatus) {
    this.kycStatus = status
    if (status === 'verified') {
      this.addNotification({
        title: 'KYC Approuvé',
        message: 'Votre compte est maintenant entièrement vérifié.',
        type: 'success'
      })
    }
    this.save()
  },
  updateProfile(data: Partial<UserProfile>) {
    this.user = { ...this.user, ...data }
    this.save()
  },
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode
    this.save()
  },
  addTransaction(tx: Omit<Transaction, 'id' | 'date'>) {
    const newTx: Transaction = {
      ...tx,
      id: Math.random().toString(36).substr(2, 9),
      date: 'À l\'instant'
    }
    this.transactions.unshift(newTx)
    this.balance += tx.amount
    
    this.addNotification({
      title: tx.amount > 0 ? 'Paiement reçu' : 'Paiement effectué',
      message: `${tx.label} d'un montant de ${this.formatAmount(Math.abs(tx.amount))}`,
      type: tx.amount > 0 ? 'success' : 'info'
    })

    this.save()
  },
  addNotification(notif: Omit<Notification, 'id' | 'time' | 'isRead'>) {
    const newNotif: Notification = {
      ...notif,
      id: Math.random().toString(36).substr(2, 9),
      time: 'À l\'instant',
      isRead: false
    }
    this.notifications.unshift(newNotif)
    this.save()
  },
  markAllNotificationsAsRead() {
    this.notifications.forEach(n => n.isRead = true)
    this.save()
  },
  formatAmount(amount: number) {
    return amount.toLocaleString('fr-CD', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }) + ' ' + this.currency
  },
  addApiKey(name: string) {
    const newKey: ApiKey = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      key: `pk_live_${Math.random().toString(36).substr(2, 20)}`,
      created: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'active',
      icon: 'key',
      iconBg: 'bg-tertiary-container',
      iconText: 'text-on-tertiary-container',
    }
    this.apiKeys.unshift(newKey)
    this.save()
  },
  revokeApiKey(id: string) {
    const key = this.apiKeys.find(k => k.id === id)
    if (key) {
      key.status = 'inactive'
      this.save()
    }
  },
  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      _version: STORE_VERSION,
      kycStatus: this.kycStatus,
      user: this.user,
      isDarkMode: this.isDarkMode,
      balance: this.balance,
      currency: this.currency,
      transactions: this.transactions,
      notifications: this.notifications,
      apiKeys: this.apiKeys
    }))
  }
})
