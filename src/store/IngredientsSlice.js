import {createSlice} from '@reduxjs/toolkit'

const IngredientsSlice = createSlice({
    name:"ingredientSlice",
    initialState: {ingredientsList: []},
    reducers:{
        replace(state, action){
            state.ingredientsList = action.payload
        },
        add(state, action){
            let ingredient = action.payload
            state.ingredientsList = [...state.ingredientsList, ingredient]
        },
        remove(state, action){
            state.ingredientsList = state.ingredientsList.filter(ingredient => ingredient.id !== action.payload)
        }
    }
})

export const ingredientActions = IngredientsSlice.actions
export default IngredientsSlice.reducer