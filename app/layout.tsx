import type { Metadata } from "next";
import { Montserrat, Funnel_Display } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "./_context/user.context";
import { UrlProvider } from "./_context/url.context";

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
          </body>
        </html>
      </UrlProvider>
    </UserContextProvider>
  );
}
