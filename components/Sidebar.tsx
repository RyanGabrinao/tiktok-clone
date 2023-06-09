import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Bars2Icon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const userProfile = false;
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  return (
    <div>
      <div
        className="block m-2 mt-3 ml-4 text-xl xl:hidden"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? (
          <XCircleIcon className="w-6 h-6" />
        ) : (
          <Bars2Icon className="w-6 h-6" />
        )}
      </div>
      {showSidebar && (
        <div className="flex flex-col justify-start w-20 p-3 mb-10 border-r-2 border-gray-100 xl:w-400 xl:border-0">
          <div className="border-gray-200 xl:border-b-2 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <HomeIcon className="w-6 h-6" />
                </p>
                <span className="hidden text-xl xl:block">For You</span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
