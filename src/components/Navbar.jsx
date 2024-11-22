import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Navbar(){
    return (
        <nav className="bg-white border-b border-gray-200">
          <div className="container mx-auto flex justify-between items-center py-3">
            <h3 className="font-bold text-3xl text-gray-800">
              <Link href="/"> Taskinator </Link>
            </h3>
            <ul className="flex gap-x-6 text-lg font-semibold">
              <li>
                <Link href="/new" className="text-gray-600 hover:text-gray-800 transition duration-300">
                  New Task
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-800 transition duration-300">
                  About
                </Link>
              </li>
              <li>
                <LogoutButton/>
              </li>
            </ul>
          </div>
        </nav>
      );
}