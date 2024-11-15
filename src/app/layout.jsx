import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Taskinator with Prisma",
  description: "This is a practice project using Next.js, styled with Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
