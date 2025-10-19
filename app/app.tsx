"use client";
import React, { useContext, useState } from "react";

import { UserContext } from "./_context/user.context";
import { signOut } from "firebase/auth";
import { auth } from "@/firbase.config";
import { useRouter } from "next/navigation";
import AddUrl from "./AddUrl";
import ShowUrl from "./ShowUrl";

export const App = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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
          <AddUrl></AddUrl>
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
          placeholder="Search urls"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* urls grid */}
      <ShowUrl searchQuery={searchQuery}></ShowUrl>
    </div>
  );
};

export default App;
