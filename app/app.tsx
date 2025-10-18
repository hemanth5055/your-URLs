"use client";
import React, { useContext } from "react";
import { ArrowUpRight, Copy, Loader, Plus } from "lucide-react";
import { UserContext } from "./_context/user.context";
import { signOut } from "firebase/auth";
import { auth } from "@/firbase.config";
import { useRouter } from "next/navigation";
import AddUrl from "./AddUrl";

export const App = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signin"); // Redirect after successful logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  return (
    <div className="w-full flex flex-col h-full">
      {/* nav-bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-fd">Your URLs</h1>

        {/* tools */}
        <div className="flex items-center gap-5">
          <AddUrl userId={user.uid}></AddUrl>
          <div
            className="w-[40px] h-[40px] rounded-full bg-[#A2F369] flex justify-center items-center cursor-pointer"
            title="logout"
            onClick={handleLogout}
          >
            <span className="font-fd text-black font-medium">H</span>
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
              <div className="font-fd bg-[#cf5600] rounded-2xl px-3 py-[2px] text-[13px]">
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

export default App;
