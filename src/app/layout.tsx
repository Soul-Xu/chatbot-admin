// 'use client'
// import { Inter } from 'next/font/google'
// import { useRef, useEffect } from 'react'
// import { Provider } from 'react-redux'
// import { makeStore, AppStore } from '../lib/store'
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
// import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const store = makeStore();
//   const persistor = persistStore(store);

//   return (
//     // <Provider store={storeRef.current}>
//     //   <html lang="en">
//     //     <body className={inter.className}>
//     //       <div id="page-transition">{children}</div>
//     //     </body>
//     //   </html>
//     // </Provider>
//     <Provider store={store}>
//       <PersistGate persistor={persistor} loading={null}>
//         <html lang="en">
//           <body className={inter.className}>
//             <div id="page-transition">{children}</div>
//           </body>
//         </html>
//       </PersistGate>
//     </Provider>
//   )
// }

'use client'
import { Inter } from 'next/font/google'
import React, { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.document.title = "AI助手管理后台";
    }
  }, [])

  return (
    <Provider store={storeRef.current}>
      <html lang="en">
        <body className={inter.className}>
          <div id="page-transition">{children}</div>
        </body>
      </html>
    </Provider>
  )
}
