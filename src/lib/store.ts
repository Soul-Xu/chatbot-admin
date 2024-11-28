// import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // 默认为 localStorage
// import { urlSlice } from './features/slices/urlSlice'
// import { faqSlice } from './features/slices/faqSlice'
// import { tagSlice } from './features/slices/tagSlice'

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['currentUrl', 'faq', 'tag'], // 指定要持久化的 reducer
// };

// const rootReducer = combineReducers({
//   currentUrl: urlSlice.reducer,
//   faq: faqSlice.reducer,
//   tag: tagSlice.reducer,
//   // ...其他reducers
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const makeStore = () => {
//   return configureStore({
//     reducer: persistedReducer,
//   });
// };

// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

import { configureStore } from '@reduxjs/toolkit'
import { urlSlice } from './features/slices/urlSlice'
import { faqSlice } from './features/slices/faqSlice'
import { tagSlice } from './features/slices/tagSlice'
import { templateSlice } from './features/slices/templateSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      currentUrl: urlSlice.reducer,
      faq: faqSlice.reducer,
      tag: tagSlice.reducer,
      template: templateSlice.reducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']