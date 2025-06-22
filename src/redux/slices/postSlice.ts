// redux/slices/postSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
    id: string;
    title: string;
    content: string;
    summary: string | null;
    user_id: string;
    created_at: string;
}

interface PostState {
    posts: Post[];
    loading: boolean;
}

const initialState: PostState = {
    posts: [],
    loading: false,
};

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        setPostLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.unshift(action.payload);
        },
    },
});

export const { setPosts, setPostLoading, addPost } = postSlice.actions;
export default postSlice.reducer;
