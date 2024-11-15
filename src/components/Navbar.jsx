import Link from "next/link";

export default function Navbar(){
    return (
        <nav className="bg-white border-b border-gray-200">
          <div className="container mx-auto flex justify-between items-center py-3">
            <h3 className="font-bold text-3xl text-gray-800">
              <Link href="/"> TaskManager </Link>
            </h3>
            <ul className="flex gap-x-2 text-lg font-bold">
              <li>
                <Link href="/new" className="text-gray-600 hover:text-gray-800">
                  New
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-800">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      );
}