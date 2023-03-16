import React from "react";
import {
  VideoCameraSlashIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-8xl">
        {text === "No comments yet" ? (
          <ChatBubbleLeftEllipsisIcon className="w-12 h-12" />
        ) : (
          <VideoCameraSlashIcon className="w-12 h-12" />
        )}
      </p>
      <p className="text-2xl">{text}</p>
    </div>
  );
};

export default NoResults;
