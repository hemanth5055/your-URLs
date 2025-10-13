"use client";
import { auth, provider } from "@/firbase.config";
import { getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation"; 
import { useEffect } from "react";

import React from "react";

const Page = () => {
  const router = useRouter();
  const authL = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authL, (user) => {
      if (user) router.push("/");
    });
    return () => unsubscribe();
  }, [authL, router]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      router.push("/");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="">
        <h1 className="text-4xl font-fd">Your URL's</h1>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div
          className="bg-[#2a2828] rounded-2xl font-mont text-[18px] px-4 py-2 font-medium cursor-pointer italic"
          onClick={handleGoogleLogin}
        >
          Sign In with Google
        </div>
      </div>
    </div>
  );
};

export default Page;
