import connectMongo from "../lib/Mongoose";
import Blog from "../models/Blog";

export const revalidate=60;
const Page=async() =>{
  await connectMongo();
  const blogs=await Blog.find({status:"published"},"tags");
  const topics=[...new Set(
    blogs.flatMap((blog:any)=>blog.tags)
  )];
  return(
    <main className="min-h-screen bg-blue-900 text-white px-6 py-16">

        <div className="mx-auto max-w-6xl">

            {/* Header */}
            <section className="mb-12 text-center">
              <h1 className="text-4xl font-bold md:text-5xl">Explore our topics</h1>
              <p className="mt-4 text-lg text-blue-200">Discover trending technologies,programming languages,frameworks and discussions from the developer community</p>
            </section>
            
            <section>
              {topics.length===0 ? (
                <div  className="rounded-2xl border border-blue-700 bg-blue-800 p-12 text-center">

                        <div className="text-5xl mb-4">
                            📚
                        </div>

                        <h2 className="text-2xl font-bold">
                            No Topics Available
                        </h2>

                        <p className="mt-3 text-blue-200">
                            Topics will appear here when community discussions
                            and blogs are created.
                        </p>

                    </div>

                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {topics.map((topic: string) => (

                            <div
                                key={topic}
                                className="rounded-2xl border border-blue-700 bg-blue-800 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400"
                            >

                                <h2 className="text-2xl font-bold">
                                    {topic}
                                </h2>

                                <p className="mt-3 text-blue-200">
                                    Explore articles, discussions, and resources
                                    related to {topic}.
                                </p>

                            </div>

                        ))}

                </div>
                )}
            </section>
            </div>
            </main>
  );
};

export default Page;
