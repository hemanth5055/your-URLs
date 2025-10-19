"use client";

import { useEffect, useState } from "react";
import Url from "./Url";
import { useUrls } from "./_context/url.context";

const Page = ({ searchQuery }: { searchQuery: string }) => {
  const { urls, urlsLoading } = useUrls();
  const filteredUrls = urls.filter((item) => {
    if (!searchQuery) return true; 
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.url.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {urlsLoading ? (
        <div className="col-span-full flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg animate-pulse font-fd">
            Loading...
          </p>
        </div>
      ) : filteredUrls.length === 0 ? (
        <div className="col-span-full flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg font-fd">No Data found</p>
        </div>
      ) : (
        filteredUrls.map((item) => (
          <Url
            key={item.id}
            id={item.id}
            url={item.url}
            title={item.title}
            description={item.description}
            tags={item.tags}
          />
        ))
      )}
    </div>
  );
};

export default Page;
