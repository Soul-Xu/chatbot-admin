import { configureStore } from '@reduxjs/toolkit'
import { urlSlice } from './features/slices/urlSlice'
import { faqSlice } from './features/slices/faqSlice'
import { tagSlice } from './features/slices/tagSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      currentUrl: urlSlice.reducer,
      faq: faqSlice.reducer,
      tag: tagSlice.reducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']