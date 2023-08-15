import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { VideoSlice } from "./features/videoSlice";
import { ProductSlice } from "./features/productSlice";
import { AuthSlice } from "./features/authSlice";
import { apiSlice } from "./features/apiSlice";
import { CommentSlice } from "./features/commentSlice";


export const store=configureStore({
    reducer: {
        video: VideoSlice.reducer,
        product: ProductSlice.reducer,
        auth: AuthSlice.reducer,
        comment: CommentSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch:()=>typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;