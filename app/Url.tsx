"use client";

import { Copy, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useUrls } from "./_context/url.context";

const Page = ({
  id,
  title,
  description,
  url,
}: {
  id: string;
  title: string;
  description: string;
  url: string;
}) => {
  const { deleteUrl } = useUrls();
  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard");
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteUrl(id);
  };
  return (
    <div
      className="flex flex-col gap-3 bg-[#252525] p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-[0_0_5px_white] hover:-translate-y-1"
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <div className="w-full flex justify-between items-center">
        <h3 className="font-fd text-2xl">{title}</h3>
        <div className="flex gap-2 items-center">
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={copyToClipboard}
          >
            <Copy size={18} />
          </div>
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={handleDelete}
          >
            <Trash size={18} className="hover:text-red-500"></Trash>
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
