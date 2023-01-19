import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const fetchData = createAsyncThunk(
    'dataSlice/fetchData',
    async (letter) => {
        return await
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(res => res.json())
    }
)

const initialState = {
    status: null,
    drinks: [],
    fetchedDrinks: [],
}

const dataSlice = createSlice({
    name: 'dataSlice',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                console.log(action.payload.drinks)
                if(action.payload.drinks){
                    state.status = "success"
                    state.drinks = [...state.drinks, ...action.payload.drinks]
                    state.fetchedDrinks = action.payload.drinks
                }else state.status = "failed"
            })
            .addCase(fetchData.rejected, (state) => {
                state.status = "rejected"
            })
    }
})

export default dataSlice.reducer