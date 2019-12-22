import localForage from 'localforage'

export const LocalTanks = localForage.createInstance({
  name: 'reefAqua',
  storeName: 'tanks',
})