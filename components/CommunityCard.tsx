import Link from "next/link";

export default function CommunityCard({
    community,
}: {
    community: any;
}) {

    return (
        <Link
            href={`/communities/${community.slug}`}
            className="block border border-blue-700 bg-blue-800/40 rounded-xl p-5 hover:border-blue-400 hover:bg-blue-800/60 transition"
        >

            <h3 className="text-xl font-semibold">
                {community.name}
            </h3>

            <p className="text-blue-100 mt-2">
                {community.description}
            </p>

            <p className="text-sm text-blue-300 mt-3">
                {community.category}
            </p>

            <p className="text-sm text-blue-300 mt-3">
                👥 {community.members?.length || 0} members
            </p>

        </Link>
    );
}