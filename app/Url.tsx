"use client";

import { ArrowUpRight, Copy } from "lucide-react";

const Page = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => {
  return (
    <div className="flex flex-col gap-3 bg-[#252525] p-4 rounded-2xl">
      <div className="w-full flex justify-between items-center">
        <h3 className="font-fd text-2xl">{title}</h3>
        <div className="flex gap-2 items-center">
          <div className="flex justify-center items-center cursor-pointer">
            <Copy size={18} />
          </div>
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={() => {
              window.open(url, "_blank");
            }}
          >
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>

      <p className="font-mont font-medium text-[14px] h-[3.6em] leading-tight line-clamp-3">
        {description}
      </p>

      <div className="w-full flex gap-2 flex-wrap">
        <div className="font-fd bg-gray-600 rounded-2xl px-3 py-[2px] text-[13px]">
          Leetcode
        </div>
        <div className="font-fd bg-gray-600 rounded-2xl px-3 py-[2px] text-[13px]">
          Graph
        </div>
      </div>
    </div>
  );
};

export default Page;
