import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import NoResults from "@/components/NoResults";
import { IUser, Video } from "@/types";
import { BASE_URL } from "@/utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const { user, userVideos, userLikedVideos } = data;

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };

    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div className="w-full">
      <div className="flex w-full gap-6 mb-4 bg-white md:gap-10">
        <div className="relative w-28 h-28">
          <Image
            src={user.image}
            fill
            className="rounded-full"
            alt="user profile"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="flex items-center justify-center gap-1 font-bold tracking-wider lowercase md:text-2xl text-md text-primary">
            {user.userName.replaceAll(" ", "")}
            <CheckBadgeIcon className="w-4 h-4 text-blue-400" />
          </p>
          <p className="text-xs text-gray-400 capitalize md:text-xl">
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex w-full gap-10 mt-10 mb-10 bg-white border-b-2 border-gray-200">
          <p
            className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>

        <div className="flex flex-wrap gap-6 md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
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
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
