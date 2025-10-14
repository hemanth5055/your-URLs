"use client";


import { ProtectedRoute } from "./Protected";
import { App } from "./app";

const Page = () => {
  return (
    <ProtectedRoute>
      <App></App>
    </ProtectedRoute>
  );
};

export default Page;
