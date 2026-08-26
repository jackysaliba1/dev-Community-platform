import { auth } from "@/auth";
import connectMongo from "@/app/lib/Mongoose";
import User from "@/app/models/User";
import { redirect, notFound } from "next/navigation";
import EditProfileForm from "@/components/EditProfileForm";

export default async function EditProfilePage() {

    const session = await auth();

    if (!session?.user?.email) {
        redirect("/login");
    }

    await connectMongo();

    const user = await User.findOne({
        email: session.user.email,
    }).lean();

    if (!user) {
        notFound();
    }

    const userData = {
        name: user.name,
        username: user.username,
        headline: user.headline,
        bio: user.bio,
        skills: user.skills,
        githubURL: user.githubURL,
        linkedInURL: user.linkedInURL,
    };

    return (
        <main className="min-h-screen bg-blue-900 text-white">

            <div className="max-w-3xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold mb-8">
                    Edit Profile
                </h1>

                <EditProfileForm user={userData} />

            </div>

        </main>
    );
}