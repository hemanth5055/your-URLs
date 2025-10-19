"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { UserContext } from "./user.context"; // import your UserContext
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firbase.config";
import toast from "react-hot-toast";

interface UrlType {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface UrlContextType {
  urls: UrlType[];
  setUrls: React.Dispatch<React.SetStateAction<UrlType[]>>;
  deleteUrl: (id: string) => Promise<void>;
  urlsLoading: boolean;
}

export const UrlContext = createContext<UrlContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const UrlProvider = ({ children }: Props) => {
  const { user } = useContext(UserContext); // get user from UserContext
  const [urls, setUrls] = useState<UrlType[]>([]);
  const [urlsLoading, setUrlsLoading] = useState(true);

  // Fetch URLs for the current user
  useEffect(() => {
    const fetchUrls = async () => {
      setUrlsLoading(true);
      if (!user) return;
      try {
        const q = query(
          collection(db, "urls"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const items: UrlType[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<UrlType, "id">),
        }));
        setUrls(items);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      } finally {
        setUrlsLoading(false);
      }
    };

    fetchUrls();
  }, [user]);

  // Function to delete URL
  const deleteUrl = async (id: string) => {
    const loadingToast = toast.loading("Deleting URL..."); // shows loading indicator
    try {
      await deleteDoc(doc(db, "urls", id));
      setUrls((prev) => prev.filter((url) => url.id !== id));
      toast.success("URL deleted successfully!", { id: loadingToast });
    } catch (error) {
      console.error("Error deleting URL:", error);
      toast.error("Failed to delete URL.", { id: loadingToast });
    }
  };

  return (
    <UrlContext.Provider value={{ urls, setUrls, deleteUrl, urlsLoading }}>
      {children}
    </UrlContext.Provider>
  );
};

// Custom hook for convenience
export const useUrls = () => {
  const context = useContext(UrlContext);
  if (!context) throw new Error("useUrls must be used within UrlProvider");
  return context;
};
