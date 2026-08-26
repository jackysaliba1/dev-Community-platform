"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/communities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== ""),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create community");
        return;
      }

      // Community created successfully
      router.push("/communities");

    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-blue-900 px-6 py-16 text-white">

      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold">
            Create a Community
          </h1>

          <p className="mt-4 text-blue-200">
            Create a space where developers can connect,
            learn, and share ideas.
          </p>

        </div>


        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-blue-700 bg-blue-800 p-8 shadow-xl"
        >

          {/* Name */}
          <div className="mb-6">

            <label
              htmlFor="name"
              className="mb-2 block font-semibold"
            >
              Community Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. React Developers"
              required
              className="w-full rounded-xl border border-blue-600 bg-blue-900 px-4 py-3 text-white placeholder-blue-400 outline-none focus:border-blue-300"
            />

          </div>


          {/* Description */}
          <div className="mb-6">

            <label
              htmlFor="description"
              className="mb-2 block font-semibold"
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what your community is about..."
              rows={5}
              required
              className="w-full resize-none rounded-xl border border-blue-600 bg-blue-900 px-4 py-3 text-white placeholder-blue-400 outline-none focus:border-blue-300"
            />

          </div>


          {/* Tags */}
          <div className="mb-6">

            <label
              htmlFor="tags"
              className="mb-2 block font-semibold"
            >
              Tags
            </label>

            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, JavaScript, Frontend"
              className="w-full rounded-xl border border-blue-600 bg-blue-900 px-4 py-3 text-white placeholder-blue-400 outline-none focus:border-blue-300"
            />

            <p className="mt-2 text-sm text-blue-300">
              Separate tags with commas.
            </p>

          </div>


          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          )}


          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-white px-6 py-3 font-semibold text-blue-900 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Community"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/communities")}
              className="rounded-xl border border-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </main>
  );
};

export default page;