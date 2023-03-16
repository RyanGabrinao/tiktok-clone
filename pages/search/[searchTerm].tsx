import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useRouter } from "next/router";
import VideoCard from "@/components/VideoCard";
import NoResults from "@/components/NoResults";
import { IUser, Video } from "@/types";
import { BASE_URL } from "@/utils";
import useAuthStore from "@/store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();
  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const searchedAccounts = allUsers?.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="w-full">
      <div className="flex w-full gap-10 mt-10 mb-8 bg-white border-b-2 border-gray-200">
        <p
          className={`text-xl font-semibold cursor-pointer ${accounts} mt-2`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex items-center gap-3 p-2 font-semibold border-b-2 border-gray-200 rounded cursor-pointer">
                  <div className="relative w-12 h-12">
                    <Image
                      src={user.image}
                      fill
                      className="rounded-full"
                      alt="user profile"
                    />
                  </div>
                  <div>
                    <p className="flex items-center gap-1 font-bold lowercase text-md text-primary">
                      {user.userName.replaceAll(" ", "")}
                      <CheckBadgeIcon className="w-4 h-4 text-blue-400" />
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Video Results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 md:mt-16 md:justify-start">
          {videos.length ? (
            videos.map((video: Video, idx) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults text={`No Video Results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;
