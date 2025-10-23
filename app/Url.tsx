"use client";

import { Copy, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useUrls } from "./_context/url.context";

// Utility: safely parse tags string into array
const parseTags = (tags: string): string[] => {
  if (!tags) return [];
  try {
    const parsed = JSON.parse(tags);
    if (Array.isArray(parsed)) return parsed.slice(0, 3); // limit to 3 tags
    return [];
  } catch (error) {
    console.error("Failed to parse tags:", error);
    return [];
  }
};

const Page = ({
  id,
  title,
  description,
  url,
  tags,
  createdAt,
}: {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string;
  createdAt:any
}) => {
  const { deleteUrl } = useUrls();
  const tagArray = parseTags(tags);
  const date = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1e6);
  // Format as YYYY-MM-DD
  const formattedDate = date.toISOString().split('T')[0];
  console.log(formattedDate)


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
      className="flex flex-col gap-3 bg-[#252525] p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-[0_0_5px_gray] hover:-translate-y-1"
      onClick={() => window.open(url, "_blank")}
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
            <Trash size={18} className="hover:text-red-500" />
          </div>
        </div>
      </div>

      <p className="font-mont font-medium text-[14px] max-sm:text-[12px] h-[3.6em] leading-tight line-clamp-3">
        {description}
      </p>

      <div className="w-full flex items-center">
        <div className="flex gap-2 flex-wrap w-full">
          {tagArray.map((tag, index) => (
          <div
            key={index}
            className="font-fd bg-gray-600 rounded-2xl px-2 py-[1px] text-[13px]"
          >
            {tag}
          </div>
        
        ))}
        </div>
        <div className="text-lg w-full flex justify-end ">
          <h2 className="font-semibold text-white-800 text-[13px] font-fd">{formattedDate}</h2>
        </div>
      </div>
    </div>
  );
};

export default Page;
