
import{configureStore} from"@reduxjs/toolkit";
import { productApi } from "./api/productsApi";

import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";

import { authApi } from "./api/authApi";

import { userApi } from "./api/userApi";

export const store = configureStore({

    reducer:{
      auth: userReducer,
      cart: cartReducer,
      [productApi.reducerPath]  : productApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      userApi.middleware
    ])
}); 

