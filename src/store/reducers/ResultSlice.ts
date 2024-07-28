import { createSlice } from "@reduxjs/toolkit"
import { ICharacter } from "../../types"

interface ResultState {
  results: ICharacter[]
  isLoading: boolean
  error: string
}

const defaultState: ResultState = {
  results: [],
  isLoading: false,
  error: "",
}

const resultSlice = createSlice({
  name: "result",
  initialState: defaultState,
  reducers: {},
})

export default resultSlice.reducer
