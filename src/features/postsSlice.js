import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = 'https://yondyyfqb2.execute-api.eu-central-1.amazonaws.com/default/lambda-lift';

const initialState = {
    posts: []
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL, { headers: { "Access-Control-Allow-Origin": "*" } })
    return response.data[1].Items
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(user, message, userId) {
                return {
                    payload: {
                        user,
                        message,
                        date: new Date().toISOString(),
                        userId,
                    }
                }
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                action.payload.sort(function (a, b) {
                    return new Date(a.date) - new Date(b.date);
                });
                action.payload.map((post) => {
                    if (post.date) post.date = new Date(post.date).toJSON().slice(0, 16).replace('T', ' ');
                    return post
                })
                state.loading = false
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.loading = false
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.date = new Date().toISOString();
                state.posts.push(action.payload)
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const { postAdded } = postsSlice.actions
export default postsSlice.reducer