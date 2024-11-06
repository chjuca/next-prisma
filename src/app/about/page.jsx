function AboutPage(){
    return (
        <div className="p-4 text-center">
            <h1 className="text-2xl font-bold">About This Practice Project</h1>
            <p className="mt-4 text-lg">
                This is a practice project using Next.js, styled with Tailwind CSS.
            </p>
            <p className="mt-2 text-lg">
                We are also using Prisma as our ORM and SQLite as our database for simplicity.
            </p>
            <p className="mt-2 text-lg">
                You can find my work on GitHub at <a href="https://github.com/chjuca" className="text-blue-500 underline">chjuca</a>.
            </p>
            <p className="mt-2 text-lg">
                Tools: Next.js, Tailwind CSS, Prisma, SQLite.
            </p>
        </div>
    )
}

export default AboutPage