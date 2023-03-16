import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon, PauseIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "@/utils";
import useAuthStore from "@/store/authStore";

const Navbar = () => {
  const { userProfile, addUser, removeUser }: any = useAuthStore();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b-2 border-gray-200">
      <Link href="/">
        <h1 className="relative text-3xl font-bold text-[#F51997]">
          TITLE
          {/* <Image className="cursor-pointer" src={Logo} alt="TikTik logo" fill /> */}
        </h1>
      </Link>
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute bg-white md:static top-10 -left-20"
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts and videos"
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
          />
          <button
            onClick={handleSearch}
            className="absolute pl-4 text-2xl text-gray-400 border-l-2 border-gray-300 md:right-5 right-6 top-4"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload" className="flex items-center">
              <button className="flex items-center gap-2 px-2 py-1 font-semibold border-2 md:px-4 text-md">
                <PlusIcon className="w-6 h-6" />
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/" className="inline-block w-fit h-fit">
                <>
                  <Image
                    className="object-cover rounded-full !h-[40px]"
                    width={40}
                    height={62}
                    src={userProfile.image}
                    alt="profile photo"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <ArrowLeftOnRectangleIcon className="w-8 h-8 text-red-400" />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
      {/* <ArrowLeftOnRectangleIcon className="w-20 h-20" /> */}
    </div>
  );
};

export default Navbar;
