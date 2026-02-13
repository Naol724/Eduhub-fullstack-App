import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notificationAPI } from '../../services/api';

// Async thunks
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await notificationAPI.getNotifications(params);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch notifications';
      return rejectWithValue(message);
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (id, { rejectWithValue }) => {
    try {
      await notificationAPI.markAsRead(id);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to mark notification as read';
      return rejectWithValue(message);
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      await notificationAPI.markAllAsRead();
      return null;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to mark all notifications as read';
      return rejectWithValue(message);
    }
  }
);

export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (id, { rejectWithValue }) => {
    try {
      await notificationAPI.deleteNotification(id);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete notification';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: {
    fetching: false,
    marking: false,
    deleting: false,
  },
  error: null,
  settings: {
    email: true,
    push: true,
    sms: false,
    course_updates: true,
    assignment_reminders: true,
    forum_replies: true,
    marketing: false,
  },
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.is_read) {
        state.unreadCount += 1;
      }
    },
    updateNotificationSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading.fetching = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading.fetching = false;
        state.notifications = action.payload.notifications || action.payload;
        state.unreadCount = action.payload.unreadCount || 
          state.notifications.filter(n => !n.is_read).length;
        state.error = null;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading.fetching = false;
        state.error = action.payload;
      })
      
      // Mark as read
      .addCase(markAsRead.pending, (state) => {
        state.loading.marking = true;
        state.error = null;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.loading.marking = false;
        const notification = state.notifications.find(n => n.id === action.payload);
        if (notification && !notification.is_read) {
          notification.is_read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.error = null;
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.loading.marking = false;
        state.error = action.payload;
      })
      
      // Mark all as read
      .addCase(markAllAsRead.pending, (state) => {
        state.loading.marking = true;
        state.error = null;
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.loading.marking = false;
        state.notifications.forEach(notification => {
          notification.is_read = true;
        });
        state.unreadCount = 0;
        state.error = null;
      })
      .addCase(markAllAsRead.rejected, (state, action) => {
        state.loading.marking = false;
        state.error = action.payload;
      })
      
      // Delete notification
      .addCase(deleteNotification.pending, (state) => {
        state.loading.deleting = true;
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading.deleting = false;
        const notification = state.notifications.find(n => n.id === action.payload);
        if (notification && !notification.is_read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications = state.notifications.filter(n => n.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading.deleting = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  addNotification,
  updateNotificationSettings,
  clearNotifications,
} = notificationSlice.actions;

// Selectors
export const selectNotifications = (state) => state.notifications.notifications;
export const selectUnreadCount = (state) => state.notifications.unreadCount;
export const selectNotificationLoading = (state) => state.notifications.loading;
export const selectNotificationError = (state) => state.notifications.error;
export const selectNotificationSettings = (state) => state.notifications.settings;

export default notificationSlice.reducer;