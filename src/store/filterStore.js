import { create } from 'zustand'

const filterStore = create((set) => ({
    filter: true,
    switch: () => set((state) => ({ filter: !state.filter })),
    filterReset: () => set({ filter: true }),
}))

export default filterStore
