import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlayIcon, PauseIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { BASE_URL } from "@/utils";
import { Video } from "@/types";
import useAuthStore from "@/store/authStore";
import LikeButton from "@/components/LikeButton";
import Comments from "@/components/Comments";

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { userProfile }: any = useAuthStore();
  const router = useRouter();

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });

      setPost({ ...post, likes: data.likes });
    }
  };

  const addComment = async (e: any) => {
    e.preventDefault();

    if (userProfile && comment) {
      setIsPostingComment(true);
      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: data.comments });
      setComment("");
      setIsPostingComment(false);
    }
  };

  if (!post) return null;

  return (
    <div className="absolute top-0 left-0 flex flex-wrap w-full bg-white lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute z-50 flex gap-6 top-6 left-2 lg:left-6">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <XMarkIcon className="w-8 h-8 text-white" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-screen h-[60vh]">
            <video
              ref={videoRef}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoClick}>
                <PlayIcon className="w-12 h-12 text-white" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute cursor-pointer bottom-5 lg:bottom-10 right-5 lg:right-10">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <SpeakerXMarkIcon className="w-6 h-6 text-white" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <SpeakerWaveIcon className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </div>

      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="mt-10 lg:mt-20">
          <div className="flex items-center gap-3 p-2 font-semibold rounded cursor-pointer">
            <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20">
              <Link
                href={`/profile/${post.postedBy._id}`}
                className="inline-block w-fit h-fit"
              >
                <>
                  <Image
                    className="object-cover rounded-full !h-[50px]"
                    width={50}
                    height={50}
                    src={post.postedBy.image}
                    alt="profile photo"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className="flex flex-col gap-2">
                  <p className="flex items-center gap-2 font-bold md:text-md text-primary">
                    {post.postedBy.userName}{" "}
                    <CheckBadgeIcon className="w-6 h-6 text-blue-400" />
                  </p>
                  <p className="hidden text-xs text-gray-500 capitalize font-md md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className="px-10 text-lg text-gray-600">{post.caption}</p>
          <div className="px-10 mt-10 mb-2">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data },
  };
};

export default Detail;
