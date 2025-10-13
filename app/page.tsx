"use client";
import { auth } from "@/firbase.config"; // make sure firebase is initialized in this file
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Copy, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/signin");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full flex flex-col h-full">
      {/* nav-bar */}
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-4xl font-fd">Your URL's</h1>
        </div>

        {/* tools */}
        <div className="flex items-center gap-5">
          <div className="bg-[#2F2F2F] rounded-3xl px-4 py-[10px] font-medium cursor-pointer flex gap-2">
            <Plus /> <h4 className="font-fd text-[16px]">Add URL</h4>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#A2F369] flex justify-center items-center">
            <h1 className="font-fd text-black font-medium">R</h1>
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

            <p className="font-mont font-medium text-[14px] tracking-[-0.015em] leading-tight">
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
