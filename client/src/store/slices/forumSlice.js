import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forumAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

// Async thunks
export const fetchForums = createAsyncThunk(
  'forum/fetchForums',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await forumAPI.getForums(courseId);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch forums';
      return rejectWithValue(message);
    }
  }
);

export const fetchForumPosts = createAsyncThunk(
  'forum/fetchForumPosts',
  async ({ forumId, params = {} }, { rejectWithValue }) => {
    try {
      const response = await forumAPI.getForumPosts(forumId, params);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch forum posts';
      return rejectWithValue(message);
    }
  }
);

export const createForumPost = createAsyncThunk(
  'forum/createForumPost',
  async ({ forumId, postData }, { rejectWithValue }) => {
    try {
      const response = await forumAPI.createForumPost(forumId, postData);
      toast.success('Post created successfully');
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create post';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateForumPost = createAsyncThunk(
  'forum/updateForumPost',
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const response = await forumAPI.updateForumPost(postId, postData);
      toast.success('Post updated successfully');
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update post';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteForumPost = createAsyncThunk(
  'forum/deleteForumPost',
  async (postId, { rejectWithValue }) => {
    try {
      await forumAPI.deleteForumPost(postId);
      toast.success('Post deleted successfully');
      return postId;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete post';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Initial state
const initialState = {
  forums: [],
  currentForum: null,
  posts: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  }
};

// Slice
const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetCurrentForum: (state) => {
      state.currentForum = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Forums
      .addCase(fetchForums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForums.fulfilled, (state, action) => {
        state.loading = false;
        state.forums = action.payload;
      })
      .addCase(fetchForums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Forum Posts
      .addCase(fetchForumPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForumPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchForumPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Forum Post
      .addCase(createForumPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      
      // Update Forum Post
      .addCase(updateForumPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      
      // Delete Forum Post
      .addCase(deleteForumPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  }
});

export const { clearError, resetCurrentForum, setPosts } = forumSlice.actions;
export default forumSlice.reducer;