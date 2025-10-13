import React from "react";

const page = () => {
  return (
    <div className="w-full h-full  flex flex-col">
      <div className="">
        <h1 className="text-4xl font-fd">Your URL's</h1>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-[#2a2828] rounded-2xl font-mont text-[18px] px-4 py-2 font-medium cursor-pointer italic">
          Sign In with Google
        </div>
      </div>
    </div>
  );
};

export default page;
