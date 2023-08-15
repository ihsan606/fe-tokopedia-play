import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import axios from "axios";
import { BaseApiResponse } from "../../types/base-api-response";

export interface Comment {
    id?: string;
    content: string;
    username?: string;
    videoId: string;
    userId: string;
}

const COMMENT_URL = 'comments';


export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        createComment: builder.mutation({
            query: (data: Comment)=> ({
                url: `${COMMENT_URL}`,
                method: 'POST',
                body: data
            }),
        }),
        getComments: builder.query<Comment[], string>({
            query: (id)=> ({url: `${COMMENT_URL}/video/${id}`, method: 'GET'})
        })

    })
})

interface FetchCommentParams {
    id?: string;
}

export const fetchCommentsByVideo = createAsyncThunk(
    "video/fetchCommentsByVideo",
    async (data: FetchCommentParams, thunkApi) => {
      const { id } = data;
      try {
        const response = await axios.get<BaseApiResponse<Comment[]>>(
          `${import.meta.env.VITE_BASE_URL_BE}comments/video/${id}`
        );
        return response.data;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  );


interface CommentState {
    comments: Comment[];
    loading: boolean;
    error?: null;
}

const initialState = {
    comments: [],
    loading: false,
    error: null
} as CommentState

export const CommentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<Comment>)=> {
            state.comments.push(action.payload);
        }
    },
    extraReducers(builder) {
      builder
        .addCase(fetchCommentsByVideo.pending, (state, action)=> {
            state.loading = true;
        })
        .addCase(fetchCommentsByVideo.fulfilled, (state, action: PayloadAction<BaseApiResponse<Comment[]>>)=> {
            state.loading = false;
            state.comments = action.payload.data;
        })
        .addCase(fetchCommentsByVideo.rejected, (state, action: PayloadAction<any>)=> {
            state.loading = false;
            state.error = action.payload;
        })
    },
});


export default CommentSlice.reducer;
export const { addComment } = CommentSlice.actions;
export const { useCreateCommentMutation, useLazyGetCommentsQuery } = commentApiSlice;