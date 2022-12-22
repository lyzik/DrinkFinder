import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const fetchData = createAsyncThunk(
    'dataSlice/fetchData',
    async (currentGlass) => {
        return await
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${currentGlass}`)
        .then(res => res.json())
    }
)

const initialState = {
    status: null,
    drinks: [],
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
                state.status = "success"
                state.drinks = [...state.drinks, ...action.payload.drinks]
            })
            .addCase(fetchData.rejected, (state) => {
                state.status = "rejected"
            })
    }
})

export default dataSlice.reducer