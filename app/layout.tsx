import type { Metadata } from "next";
import { Montserrat, Funnel_Display } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "./_context/user.context";
import { UrlProvider } from "./_context/url.context";
import { Toaster } from "react-hot-toast";

const mont = Montserrat({
  variable: "--font-mont",
  subsets: ["latin"],
});

const fd = Funnel_Display({
  variable: "--font-fd",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Your URL's",
  description: "Managae your url's seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserContextProvider>
      <UrlProvider>
        <html lang="en">
          <body
            className={`${mont.variable} ${fd.variable} antialiased p-5 h-screen`}
          >
            {children}
            <div>
              <Toaster
                position="bottom-left"
                reverseOrder={false}
                toastOptions={{
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    fontFamily: "monospace",
                  },
                }}
              />
            </div>
          </body>
        </html>
      </UrlProvider>
    </UserContextProvider>
  );
}
