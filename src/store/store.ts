import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { counterSlice } from './modules/counter/counterSlice'
import { quotesApiSlice } from './modules/quotes/quotesApiSlice'
import { appSlice } from './modules/app/appSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

// import logger from "redux-logger";

const rootReducer = combineSlices(counterSlice, quotesApiSlice, appSlice)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(
        quotesApiSlice.middleware
        //  logger
      )
    },
    preloadedState
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
