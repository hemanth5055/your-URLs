"use client";

import { db } from "@/firbase.config";
import { addDoc, collection } from "firebase/firestore";
import { Plus } from "lucide-react";
import { useState } from "react";

const Page = ({ userId }: { userId: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const addUrl = async () => {
    // Handle submission logic here
    if (title && description && url) {
      const collRef = collection(db, "urls");
      const result = await addDoc(collRef, {
        userId,
        title,
        description,
        url,
      });
      console.log(result);
    }
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        className="bg-[#2F2F2F] rounded-3xl px-4 py-[10px] font-medium cursor-pointer flex gap-2"
        onClick={() => setShowModal(true)}
      >
        <Plus /> <span className="font-fd text-[16px]">Add URL</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background blur */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal content */}
          <div className="relative rounded-xl p-8 w-[500px] max-w-full z-10 shadow-lg flex flex-col gap-4 bg-[#252525]">
            <h2 className="text-3xl font-bold font-fd text-center mb-2">
              Add a New URL
            </h2>

            {/* Title input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="rounded-2xl p-2 py-3 w-full bg-[#1E1E1E] text-white outline-none placeholder:font-fd font-mont font-medium "
            />

            {/* Description input */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="rounded-2xl p-2 py-3 w-full bg-[#1E1E1E] text-white outline-none placeholder:font-fd font-mont font-medium  resize-none"
              rows={3}
            />

            {/* URL input */}
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="rounded-2xl p-2 py-3 w-full bg-[#1E1E1E] text-white outline-none placeholder:font-fd font-mont font-medium"
            />

            {/* Action buttons */}
            <div className="flex justify-center gap-2 mt-2">
              <button
                className="px-6 py-2 rounded-2xl bg-[#A2F369] cursor-pointer text-black font-fd font-medium"
                onClick={addUrl}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
