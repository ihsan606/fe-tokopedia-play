import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./../../store/store";
import { fetchVideos } from "./../../store/features/videoSlice";
import MainLayout from "./../../layouts/main.layout";
import VideoCard from "./../../components/video-card";

const VideoPage = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.video);

  useEffect(() => {
    dispatch(fetchVideos());
  }, []);
  return (
    <MainLayout showHeader={true} backgroundColor="bg-gray-900">

      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-content-center h-full">
        {videos.videos.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            videoUrl={video.videoUrl}
            thumbnailUrl={video.thumbnailUrl}
            videoType={video.videoType}
            creator={video.creator}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default VideoPage;
