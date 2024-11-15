import Link from "next/link"

function NotFound() {
    return (
      <section className="flex h-[calc(100vh-7rem)] justify-center items-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Not Found
          </h1>
          <Link href="/" className="text-blue-500 hover:text-blue-700 text-2xl mt-5 inline-block">
            Go Home
          </Link>
        </div>  
      </section>
    );
  }

export default NotFound