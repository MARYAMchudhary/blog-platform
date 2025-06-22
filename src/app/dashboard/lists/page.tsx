"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setPosts, setPostLoading } from "@/redux/slices/postSlice";
import { fetchUserPosts, summarizePost } from "@/services/postService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

export default function PostsPage() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state: RootState) => state.post);
  const router = useRouter();

  console.log(posts, "posts");
 const { data: session, status } = useSession();
  const getPosts = async () => {
    dispatch(setPostLoading(true));
    try {
      const data = await fetchUserPosts();
      console.log(data, "data");

      dispatch(setPosts(data));
    } catch (err) {
      toast.error("Failed to fetch posts");
    } finally {
      dispatch(setPostLoading(false));
    }
  };

  const handleSummary = async (post: any) => {
    try {
      await summarizePost(post.id, post.content);
      toast.success("Summary generated!");
      getPosts();
    } catch {
      toast.error("Failed to summarize post");
    }
  };

  useEffect(() => {
    getPosts();

  }, []);

   
    useEffect(() => {
      if (status !== "loading" && !session) {
        router.push("/login");
      }
    }, [status]);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4 mt-15">Your Blog Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts && posts.map((post) => (
          <div key={post.id} className="border p-4 mb-4 rounded bg-white shadow">
            <h3 className="font-semibold text-black">{post.title}</h3>
            <p>{post.content}</p>
            {post.summary && (
              <p className="mt-2 text-gray-400">
                <strong>Summary:</strong> {post.summary}
              </p>
            )}


            {post.content .length < 250 ? (
              <h6 className="font-semibold text-yellow-600">
                For Generate Summary Content should be greater than 250 words!
              </h6>
            ) : post.summary ? (
              <h6 className="font-semibold text-green-600">Summary Already Created!</h6>
            ) : (
              <button
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => handleSummary(post)}
              >
                Generate Summary
              </button>
            )}




          </div>
        ))
      )}
    </div>
  );
}
