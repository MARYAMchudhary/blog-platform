import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: { id: string; email: string } | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState["user"]>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
