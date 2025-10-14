"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Copy, Plus } from "lucide-react";
import { UserContext } from "./_context/user.context";

const Page = () => {
  const context = useContext(UserContext);
  const router = useRouter();

  if (!context) {
    throw new Error("Page must be used within a UserContextProvider");
  }

  const { user } = context;

  // Redirect only in useEffect
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  // Optionally show loading until user is determined
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full">
      {/* nav-bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-fd">Your URLs</h1>

        {/* tools */}
        <div className="flex items-center gap-5">
          <button className="bg-[#2F2F2F] rounded-3xl px-4 py-[10px] font-medium cursor-pointer flex gap-2">
            <Plus /> <span className="font-fd text-[16px]">Add URL</span>
          </button>
          <div className="w-[40px] h-[40px] rounded-full bg-[#A2F369] flex justify-center items-center">
            <span className="font-fd text-black font-medium">
              {user.displayName?.[0] ?? "U"}
            </span>
          </div>
        </div>
      </div>

      {/* search-bar */}
      <div className="w-full my-10">
        <input
          type="text"
          name="search"
          id="search"
          className="w-[30%] h-[50px] rounded-3xl bg-[#2F2F2F] pl-4 font-mont font-medium outline-none"
          placeholder="Search by name & tag"
        />
      </div>

      {/* urls grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...Array(1)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 bg-[#252525] p-4 rounded-2xl"
          >
            <div className="w-full flex justify-between items-center">
              <h3 className="font-fd text-2xl">Graph problems</h3>
              <div className="flex gap-2 items-center">
                <Copy size={18} />
                <ArrowUpRight size={18} />
              </div>
            </div>

            <p className="font-mont font-medium text-[14px] leading-tight">
              A curated collection of LeetCode graph problems designed to take
              you from beginner to expert.
            </p>

            <div className="w-full flex gap-2 flex-wrap">
              <div className="font-fd bg-[#CF8E00] rounded-2xl px-3 py-[2px] text-[13px]">
                Leetcode
              </div>
              <div className="font-fd bg-[#006BCF] rounded-2xl px-3 py-[2px] text-[13px]">
                Graph
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
