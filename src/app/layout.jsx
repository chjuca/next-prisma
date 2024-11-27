import Navbar from "@/components/Navbar";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";

export const metadata = {
  title: "Taskinator with Prisma",
  description: "This is a practice project using Next.js, styled with Tailwind CSS.",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Navbar/>
          {children}
          </SessionWrapper>
      </body>
    </html>
  );
}
