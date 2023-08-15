import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./userSlice";
import axios from "axios";
import { BaseApiResponse } from "../../types/base-api-response";

export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  imageId?: string | null;
  videoType: string;
  creator: User | null;
}

interface VideoState {
  videos:  Video[];
  video: Video;
  loading: boolean;
  error: null | undefined;
}

const initialState = {
  videos: [],
  video: { id: '', title: '', thumbnailUrl: '', videoUrl: '', videoType:'', creator: null, error: null},
  loading: false,
  error: null
} as VideoState;

interface FetchVideoParams {
  id?: string; 
}

export const fetchVideos = createAsyncThunk(
  "video/fetchVideos",
  async (data, thunkApi) => {
    try {
      const response = await axios.get<BaseApiResponse<Video[]>>(
        `${import.meta.env.VITE_BASE_URL_BE}videos?conn=5g`
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchDetailVideo = createAsyncThunk(
  "video/fetchDetailVideo",
  async (data: FetchVideoParams, thunkApi) => {
    const { id } = data;
    try {
      const response = await axios.get<BaseApiResponse<Video>>(
        `${import.meta.env.VITE_BASE_URL_BE}videos/${id}`
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const VideoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder
        .addCase(fetchVideos.pending, (state, action)=> {
            state.loading = true;
        })
        .addCase(fetchVideos.fulfilled, (state, action: PayloadAction<BaseApiResponse<Video[]>>)=> {
            state.loading = false;
            state.videos = action.payload.data;
        })
        .addCase(fetchVideos.rejected, (state, action: PayloadAction<any>)=> {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchDetailVideo.fulfilled, (state, action: PayloadAction<BaseApiResponse<Video>>)=> {
          state.loading = false;
          state.video = action.payload.data
          const parts = action.payload.data.thumbnailUrl.split('/');
          const image = parts[parts.length - 1].split('.')[0];
          state.video.imageId = image;
      })
  },
});


export default VideoSlice.reducer;
