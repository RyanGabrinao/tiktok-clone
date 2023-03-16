import { Video } from "@/types";
import { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { PlayIcon, PauseIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col pb-6 border-b-2 border-gray-200">
      <div>
        <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
          <div className="relative w-8 h-8 md:w-12 md:h-12">
            <Link
              href={`/profile/${post.postedBy._id}`}
              className="inline-block w-fit h-fit"
            >
              <>
                <Image
                  className="object-cover rounded-full"
                  fill
                  src={post.postedBy.image}
                  alt="profile photo"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
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
      </div>
      <div className="relative flex flex-col gap-4 lg:ml-20">
        <h2 className="text-lg text-gray-700">{post.caption}</h2>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              src={post.video.asset.url}
              loop
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            ></video>
          </Link>

          {isHover && (
            <div className="absolute flex gap-10 cursor-pointer bottom-6 left-8 md:left-14 lg:left-0 lg:justify-between w-[100px] md:w-[50px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <PauseIcon className="w-6 h-6 text-black" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <PlayIcon className="w-6 h-6 text-black" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <SpeakerXMarkIcon className="w-6 h-6 text-black" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <SpeakerWaveIcon className="w-6 h-6 text-black" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
