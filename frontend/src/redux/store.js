import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/cart/cartSlice'
import productsApi from './features/products/productsApi'
import ordersApi from './features/orders/ordersApi'
import reviewsApi from './features/reviews/reviewsApi'
import emailsApi from './features/emails/emailsApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [emailsApi.reducerPath]: emailsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, ordersApi.middleware, reviewsApi.middleware, emailsApi.middleware),
})