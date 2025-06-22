"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { createPost } from "@/services/postService";
import { addPost } from "@/redux/slices/postSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(session,"heres session");
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/login");
  //   }
  // }, [status]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const res=await createPost(title, content);
      dispatch(addPost(res.post));
      toast.success("Post created successfully!");
      router.push("/dashboard/lists");
    } catch (err) {
      
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
//response.data
// {
//   "id": "81421996-2367-4e62-8cd2-c9e93d997661",
//   "user_id": "330c8f66-ba9f-41e7-9b28-874ab7d5320c",
//   "title": "hello",
//   "content": "world",
//   "summary": null,
//   "created_at": "2025-06-22T03:46:46.356Z"
// }



  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full border px-3 py-2 rounded h-32"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}
