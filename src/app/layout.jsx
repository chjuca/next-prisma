import Navbar from "@/components/Navbar";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Taskinator with Prisma",
  description: "This is a practice project using Next.js, styled with Tailwind CSS.",
};

export default async function RootLayout({ children }) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        { session && <Navbar/>}
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
