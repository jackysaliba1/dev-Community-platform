import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-blue-900 text-white">

            {/* Hero */}
            <section className="px-6 py-16 sm:py-20 lg:py-24">
                <div className="max-w-5xl mx-auto text-center">

                    <span className="inline-block px-4 py-2 rounded-full bg-blue-800 border border-blue-700 text-blue-200 text-sm font-medium mb-6">
                        About DevCommunity
                    </span>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                        A place for developers to
                        <span className="text-blue-300"> connect, learn, and grow.</span>
                    </h1>

                    <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-blue-100 leading-8">
                        DevCommunity is a developer-focused platform where
                        programmers can discover communities, share knowledge,
                        publish technical blogs, and connect with other
                        developers.
                    </p>

                </div>
            </section>


            {/* What is DevCommunity */}
            <section className="px-6 py-12 sm:py-16">
                <div className="max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                        {/* Text */}
                        <div>
                            <p className="text-blue-300 font-semibold mb-3">
                                OUR PLATFORM
                            </p>

                            <h2 className="text-3xl sm:text-4xl font-bold">
                                Built for developers, by developers
                            </h2>

                            <p className="mt-5 text-blue-100 leading-8">
                                DevCommunity brings developers together in one
                                place. Whether you are learning your first
                                programming language, working on a project, or
                                looking to exchange ideas with experienced
                                developers, you can find people and content
                                that match your interests.
                            </p>

                            <p className="mt-4 text-blue-200 leading-8">
                                Users can create profiles, join communities,
                                publish blogs, explore topics, and discover
                                other developers.
                            </p>
                        </div>


                        {/* Feature Card */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="bg-blue-800 border border-blue-700 rounded-2xl p-6">
                                <div className="text-3xl mb-4">
                                    👨‍💻
                                </div>

                                <h3 className="text-xl font-bold">
                                    Developer Profiles
                                </h3>

                                <p className="mt-2 text-blue-200 text-sm leading-6">
                                    Showcase your skills, experience, links,
                                    and technical interests.
                                </p>
                            </div>

                            <div className="bg-blue-800 border border-blue-700 rounded-2xl p-6">
                                <div className="text-3xl mb-4">
                                    👥
                                </div>

                                <h3 className="text-xl font-bold">
                                    Communities
                                </h3>

                                <p className="mt-2 text-blue-200 text-sm leading-6">
                                    Join communities and connect with
                                    developers who share your interests.
                                </p>
                            </div>

                            <div className="bg-blue-800 border border-blue-700 rounded-2xl p-6">
                                <div className="text-3xl mb-4">
                                    📝
                                </div>

                                <h3 className="text-xl font-bold">
                                    Technical Blogs
                                </h3>

                                <p className="mt-2 text-blue-200 text-sm leading-6">
                                    Read and publish useful technical content
                                    and tutorials.
                                </p>
                            </div>

                            <div className="bg-blue-800 border border-blue-700 rounded-2xl p-6">
                                <div className="text-3xl mb-4">
                                    🔎
                                </div>

                                <h3 className="text-xl font-bold">
                                    Explore Topics
                                </h3>

                                <p className="mt-2 text-blue-200 text-sm leading-6">
                                    Discover technologies, frameworks,
                                    languages, and discussions.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* How it works */}
            <section className="px-6 py-12 sm:py-16 bg-blue-950/50">
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-10">

                        <p className="text-blue-300 font-semibold mb-3">
                            HOW IT WORKS
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Start connecting in three steps
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Step 1 */}
                        <div className="bg-blue-900 border border-blue-800 rounded-2xl p-7 text-center">

                            <div className="w-12 h-12 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                                1
                            </div>

                            <h3 className="text-xl font-bold mt-5">
                                Create your profile
                            </h3>

                            <p className="mt-3 text-blue-200 leading-6">
                                Add your name, username, bio, skills, and
                                professional links.
                            </p>

                        </div>


                        {/* Step 2 */}
                        <div className="bg-blue-900 border border-blue-800 rounded-2xl p-7 text-center">

                            <div className="w-12 h-12 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                                2
                            </div>

                            <h3 className="text-xl font-bold mt-5">
                                Join communities
                            </h3>

                            <p className="mt-3 text-blue-200 leading-6">
                                Find communities related to your favorite
                                technologies and interests.
                            </p>

                        </div>


                        {/* Step 3 */}
                        <div className="bg-blue-900 border border-blue-800 rounded-2xl p-7 text-center">

                            <div className="w-12 h-12 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                                3
                            </div>

                            <h3 className="text-xl font-bold mt-5">
                                Share knowledge
                            </h3>

                            <p className="mt-3 text-blue-200 leading-6">
                                Publish blogs, explore topics, and learn from
                                other developers.
                            </p>

                        </div>

                    </div>

                </div>
            </section>


            {/* Mission */}
            <section className="px-6 py-16 sm:py-20">
                <div className="max-w-4xl mx-auto text-center">

                    <p className="text-blue-300 font-semibold mb-3">
                        OUR MISSION
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-bold">
                        Making developer knowledge more connected
                    </h2>

                    <p className="mt-6 text-blue-100 leading-8 text-base sm:text-lg">
                        Our goal is to create a welcoming environment where
                        developers can learn from each other, share their
                        experiences, discover new technologies, and build
                        meaningful connections within the developer community.
                    </p>

                </div>
            </section>


            {/* CTA */}
            <section className="px-6 pb-20">
                <div className="max-w-5xl mx-auto">

                    <div className="rounded-3xl border border-blue-700 bg-blue-800 p-8 sm:p-12 text-center">

                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Ready to explore?
                        </h2>

                        <p className="mt-4 text-blue-200 max-w-2xl mx-auto">
                            Discover developers, join communities, and explore
                            technical content from the community.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                            <Link
                                href="/developers"
                                className="px-6 py-3 rounded-xl bg-white text-blue-900 font-semibold hover:bg-blue-100 transition"
                            >
                                Explore Developers
                            </Link>

                            <Link
                                href="/communities"
                                className="px-6 py-3 rounded-xl border border-blue-400 text-white hover:bg-blue-700 transition"
                            >
                                Explore Communities
                            </Link>

                        </div>

                    </div>

                </div>
            </section>

        </main>
    );
}