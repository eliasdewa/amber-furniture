import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/cart/cartSlice'
import emailsApi from './features/emails/emailsApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [emailsApi.reducerPath]: emailsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emailsApi.middleware),
})