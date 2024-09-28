import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IFormData {
  name: string
  age: number | undefined
  email: string
  password: string
  gender: string
  terms: boolean
  image: string
  country: string
}

interface DataState {
  customFormData: IFormData[]
  hookFormData: IFormData[]
}

const initialState: DataState = {
  customFormData: [],
  hookFormData: [],
}

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    addData: (
      state,
      action: PayloadAction<{ data: IFormData; formType: string }>,
    ) => {
      const { data, formType } = action.payload
      if (formType === 'customForm') {
        state.customFormData.push(data)
      } else if (formType === 'hookForm') {
        state.hookFormData.push(data)
      }
    },
  },
})

export const { addData } = dataSlice.actions
export default dataSlice.reducer
