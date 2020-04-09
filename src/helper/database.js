import localForage from 'localforage'

export const LocalTanks = localForage.createInstance({
  name: 'reefAqua',
  storeName: 'tanks',
})

export const LocalBlogs = localForage.createInstance({
  name: 'reefAqua',
  storeName: 'blogs',
})

export const LocalCity = localForage.createInstance({
  name: 'reefAqua',
  storeName: 'map',
})