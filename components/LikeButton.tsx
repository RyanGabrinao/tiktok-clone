import React, { useState, useEffect } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import useAuthStore from "@/store/authStore";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);
  return (
    <div className="flex gap-6">
      <div className="flex items-center justify-center gap-3 mt-4 cursor-pointer">
        {alreadyLiked ? (
          <div
            className="p-2 rounded-full bg-primary md:p-3"
            onClick={handleDislike}
          >
            <HeartSolid className="text-[#f51997] w-4 h-4" />
          </div>
        ) : (
          <div
            className="p-2 rounded-full bg-primary md:p-3"
            onClick={handleLike}
          >
            <HeartOutline className="w-4 h-4" />
          </div>
        )}
        <p className="font-semibold text-md">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
