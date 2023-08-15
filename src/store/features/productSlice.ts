import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseApiResponse } from "../../types/base-api-response";

export interface Product {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    originalPrice: number;
    discount: number;
    videoId: string;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: null | undefined;
}

const initialState = {
    products: [],
    loading: false,
    error: null,
} as ProductState

interface FetchProductParams {
    id?: string;
}

export const fetchProductsByVideo = createAsyncThunk(
    "video/fetchProductsByVideo",
    async (data: FetchProductParams, thunkApi) => {
      const { id } = data;
      try {
        const response = await axios.get<BaseApiResponse<Product[]>>(
          `${import.meta.env.VITE_BASE_URL_BE}products/video/${id}`
        );
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  );


export const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(fetchProductsByVideo.pending, (state, action)=> {
            state.loading = true;
        })
        .addCase(fetchProductsByVideo.fulfilled, (state, action: PayloadAction<BaseApiResponse<Product[]>>)=> {
            state.loading = false;
            state.products = action.payload.data;
        })
        .addCase(fetchProductsByVideo.rejected, (state, action: PayloadAction<any>)=> {
            state.loading = false;
            state.error = action.payload;
        })
    },
})

export default ProductSlice.reducer;