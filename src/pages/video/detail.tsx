import { Link, useParams } from "react-router-dom";
import MainLayout from "../../layouts/main.layout";
import YoutubeShortPlayer from "../../components/youtube-player";
import { useAppDispatch, useAppSelector } from "../../store/store";
import React, { useEffect, useState } from "react";
import { fetchDetailVideo } from "../../store/features/videoSlice";
import { Input } from "../../components/ui/input";
import { transformImage } from "../../helpers/image-transform.helper";
import { Badge } from "../../components/ui/badge";
import { fetchProductsByVideo } from "../../store/features/productSlice";
import { formatPrice } from "../../helpers/format-price.helper";
import {
  Comment,
  addComment,
  fetchCommentsByVideo,
  useCreateCommentMutation,
} from "../../store/features/commentSlice";
import io from "socket.io-client";

import { ScrollArea } from "../../components/ui/scroll-area";
const VideoDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth);
  const initialSocket = io("http://localhost:3000", {
    query: {
      userId: currentUser?.userInfo?.user.id,
      videoId: id,
    },
  });
  const [socket, setSocket] = useState(initialSocket);
  const videos = useAppSelector((state) => state.video);
  const comments = useAppSelector((state) => state.comment);
  const products = useAppSelector((state) => state.product);
  const [bgUrl, setBgUrl] = useState("");
  const [comment, setComment] = useState("");
  const [createComment, { isSuccess: commentSuccees }] =
    useCreateCommentMutation();

  const getImage = async (imageId: string) => {
    const url = await transformImage(imageId);
    setBgUrl(url);
    console.log(url);
    console.log(videos.video.imageId);
    return url;
  };



  const handleChange = (e: any) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    const initialSocket = io('http://localhost:3000', {
      query: {
        userId: currentUser.userInfo?.user.id,
        videoId: id,
      },
    });

    const handleNewComment = (comment: Comment) => {
      console.log('masukin komen nih', comment);
      dispatch(addComment(comment));
    };

    initialSocket.on('newComment', (comment: Comment)=>{
      console.log('ini dari langitt', comment);
      handleNewComment(comment);
    });

    return () => {
      if (initialSocket) {
        initialSocket.disconnect();
      }
    };
  }, [currentUser.userInfo?.user.id, dispatch, id]);

  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      // Kirim komentar baru ke server melalui WebSocket
      socket.emit('newComment', { content: comment });
      setComment('');
    }
  };

  const onEnterComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommentSubmit();
      dispatch(fetchCommentsByVideo({ id: id }));
    }
  };

  useEffect(() => {
    dispatch(fetchDetailVideo({ id: id }));
    dispatch(fetchProductsByVideo({ id: id }));
    dispatch(fetchCommentsByVideo({ id: id }));
    getImage(videos.video.imageId as string);
  }, [videos.video.imageId, id]);

  return (
    <MainLayout
      showHeader={false}
      backgroundColor={``}
      bgImage={bgUrl}
      className="h-screen"
    >
      <div className="h-full relative overflow-hidden flex-grow pt-4">
        <div className="flex my-3 lg:pt-2 xl:pt-2 justify-between absolute w-full -top-4 z-0">
          <div className="flex justify-start items-end">
            <Link to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
            <h3 className="px-3 font-semibold xl:text-xl lg:text-xl text-base truncate">
              {videos.video.title}
            </h3>
          </div>
          <div className="mt-3">
            <span className="p-2 rounded-lg flex-shrink-0 bg-gradient-to-br from-[#369e3d] to-green-500">
              {videos.video.creator?.username}
            </span>
          </div>
        </div>

        <Badge
          className=" absolute top-20 lg:right-24 md:right-24 xl:right-24 right-3"
          variant={"destructive"}
        >
          {videos.video.videoType}
        </Badge>
        <YoutubeShortPlayer
          className=" mt-10 lg:px-20 xl:px-20 md:px-20 px-0"
          videoUrl={videos.video.videoUrl}
          title={videos.video.title}
        />

        <div className="overflow-x-auto absolute overflow-visible gap-4 px-4 xl:bottom-6 bottom-20 md:left-20 lg:left-6 left-4 flex  items-start w-full">
          {products.products.map((product, idx) => (
            <div className=" w-24 bg-white relative flex-shrink-0 rounded-md overflow-hidden shadow-md transform transition-transform hover:scale-105 hover:text-white">
              <img
                className="w-22 h-22 object-cover"
                src={product.imageUrl}
                alt=""
              />

              <div className=" h-10">
                <p className="px-2 font-medium text-xs text-slate-800">
                  {formatPrice(product.price)}
                </p>
                <Badge
                  className=" rounded-sm p-1 absolute top-1 left-1 bg-slate-700 bg-opacity-70"
                  variant={"default"}
                >
                  {idx + 1}
                </Badge>
                {product.discount > 0 && (
                  <>
                    <Badge
                      variant={"destructive"}
                      className="absolute px-1 top-1 right-1 bg-pink-200 text-pink-600"
                    >
                      {product.discount}%
                    </Badge>
                    <p className="px-2 line-through font-light text-xs text-gray-400">
                      {formatPrice(product.originalPrice)}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute lg:bottom-44 lg:left-10 md:left-24 bottom-60 left-10 ">
          <ScrollArea className=" overflow-y-hidden h-56 w-[350px] bg-slate-800 bg-opacity-10 rounded-md p-4">
            {comments.comments.map((cmn) => (
              <div className="flex space-x-2" key={cmn.id}>
                <span className=" text-yellow-500 font-semibold">
                  {cmn.username}
                </span>
                <p>{cmn.content}</p>
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className="lg:px-20 xl:px-24 md:px-28 px-0 mb-3 py-2 w-full lg:fixed xl:fixed md:fixed absolute bottom-0 grid grid-cols-12">
          <Input
            onKeyUp={onEnterComment}
            value={comment}
            onChange={handleChange}
            placeholder="Chat disini"
            className=" col-span-11 rounded-2xl bg-transparent border border-gray-300"
          />
          <div className="flex relative justify-center">
            <img
              src="https://assets.tokopedia.net/assets-tokopedia-lite/v3/play/kratos/3c1ff4ed.svg"
              alt="cart-logo"
            />
            <div>
              <span className="px-2 absolute xl:right-7 lg:right-7 md:right-2 right-1 bottom-1 py-0 text-xs lg:text-sm xl:text-sm md:text-sm rounded-lg bg-[#369e3d]">
                {products.products.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoDetailPage;
