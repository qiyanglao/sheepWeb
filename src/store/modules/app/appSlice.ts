import type { PayloadAction } from '@reduxjs/toolkit'
import { createAppSlice } from '../../createAppSlice'

export interface AppSliceState {
  loading: boolean
}

const initialState: AppSliceState = {
  loading: false
}

export const appSlice = createAppSlice({
  name: 'app',
  initialState,
  reducers: create => ({
    setLoading: create.reducer((state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    })
  }),
  selectors: {
    selectLoading: app => app.loading
  }
})

export const { setLoading } = appSlice.actions

export const { selectLoading } = appSlice.selectors
