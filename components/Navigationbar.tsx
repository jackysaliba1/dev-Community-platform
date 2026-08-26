"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Navigationbar = () => {
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="border-b border-blue-800 bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="text-xl sm:text-2xl font-bold text-white hover:text-blue-300 transition"
                    >
                        DevCommunity
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">

                        <Link
                            href="/"
                            className="hover:text-blue-300 transition"
                        >
                            Home
                        </Link>

                        <Link
                            href="/about"
                            className="hover:text-blue-300 transition"
                        >
                            About
                        </Link>

                        <Link
                            href="/blogs"
                            className="hover:text-blue-300 transition"
                        >
                            Blogs
                        </Link>

                        <Link
                            href="/communities"
                            className="hover:text-blue-300 transition"
                        >
                            Communities
                        </Link>

                        <Link
                            href="/topics"
                            className="hover:text-blue-300 transition"
                        >
                            Topics
                        </Link>

                        <Link
                            href="/developers"
                            className="hover:text-blue-300 transition"
                        >
                            Developers
                        </Link>

                        {/* User */}
                        {session ? (
                            <div className="flex items-center gap-4">

                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 hover:text-blue-300 transition"
                                >
                                    {session.user?.image ? (
                                        <img
                                            src={session.user.image}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                                            {session.user?.name
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}

                                    <span className="max-w-32 truncate">
                                        {session.user?.name}
                                    </span>
                                </Link>

                                <button
                                    onClick={() => signOut()}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition"
                                >
                                    Logout
                                </button>

                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-100 transition"
                            >
                                Login
                            </Link>
                        )}

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-blue-800 transition"
                        aria-label="Toggle navigation menu"
                    >
                        {menuOpen ? (
                            <span className="text-2xl">✕</span>
                        ) : (
                            <span className="text-2xl">☰</span>
                        )}
                    </button>

                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="lg:hidden border-t border-blue-800 py-4">

                        <div className="flex flex-col gap-2">

                            <Link
                                href="/"
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-blue-800 transition"
                            >
                                Home
                            </Link>

                            <Link
                                href="/about"
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-blue-800 transition"
                            >
                                About
                            </Link>

                            <Link
                                href="/blogs"
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-blue-800 transition"
                            >
                                Blogs
                            </Link>

                            <Link
                                href="/communities"
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-blue-800 transition"
                            >
                                Communities
                            </Link>

                            <Link
                                href="/topics"
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-blue-800 transition"
                            >
                                Topics
                            </Link>

                            <Link
                                href="/developers"
                                onClick={() => setMenuOpen(false)}
                                className="px-4 py-3 rounded-lg hover:bg-blue-800 transition"
                            >
                                Developers
                            </Link>

                            <div className="border-t border-blue-800 my-2" />

                            {session ? (
                                <>
                                    <Link
                                        href="/profile"
                                        onClick={() => setMenuOpen(false)}
                                        className="px-4 py-3 rounded-lg hover:bg-blue-800 transition flex items-center gap-3"
                                    >
                                        {session.user?.image ? (
                                            <img
                                                src={session.user.image}
                                                alt="Profile"
                                                className="w-9 h-9 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                                                {session.user?.name
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}

                                        <span>
                                            {session.user?.name}
                                        </span>
                                    </Link>

                                    <button
                                        onClick={() => {
                                            setMenuOpen(false);
                                            signOut();
                                        }}
                                        className="w-full text-left px-4 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-medium transition"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-3 bg-white text-blue-900 rounded-lg font-semibold text-center hover:bg-blue-100 transition"
                                >
                                    Login
                                </Link>
                            )}

                        </div>

                    </div>
                )}

            </div>
        </nav>
    );
};

export default Navigationbar;