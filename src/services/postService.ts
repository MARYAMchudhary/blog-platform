import axios from "axios";

export const fetchUserPosts = async () => {
    const res = await axios.get("/api/posts/lists");
    return res.data;
};

export const createPost = async (title: string, content: string) => {
    const res = await axios.post("/api/posts/create", { title, content });
    return res.data;
};

export const summarizePost = async (id: string, content: string) => {
    const res = await axios.post("/api/posts/summary", { postId: id, content });
    return res.data;
};
