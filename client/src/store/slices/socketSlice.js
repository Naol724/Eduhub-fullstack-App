import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const initialState = {
  connection: null,
  connected: false,
  onlineUsers: [],
  error: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setConnection: (state, action) => {
      state.connection = action.payload;
    },
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    addOnlineUser: (state, action) => {
      if (!state.onlineUsers.find(user => user.id === action.payload.id)) {
        state.onlineUsers.push(action.payload);
      }
    },
    removeOnlineUser: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter(user => user.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    disconnect: (state) => {
      if (state.connection) {
        state.connection.disconnect();
      }
      state.connection = null;
      state.connected = false;
      state.onlineUsers = [];
      state.error = null;
    },
  },
});

export const {
  setConnection,
  setConnected,
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
  setError,
  clearError,
  disconnect,
} = socketSlice.actions;

// Thunk for initializing socket connection
export const initializeSocket = () => (dispatch, getState) => {
  const { auth } = getState();
  
  if (!auth.isAuthenticated || !auth.user) {
    return;
  }

  const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
    auth: {
      token: auth.token,
    },
    transports: ['websocket', 'polling'],
  });

  // Connection events
  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
    dispatch(setConnected(true));
    dispatch(clearError());
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
    dispatch(setConnected(false));
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
    dispatch(setError(error.message));
    dispatch(setConnected(false));
  });

  // User presence events
  socket.on('user_online', (user) => {
    dispatch(addOnlineUser(user));
  });

  socket.on('user_offline', (userId) => {
    dispatch(removeOnlineUser(userId));
  });

  socket.on('online_users', (users) => {
    dispatch(setOnlineUsers(users));
  });

  // Notification events
  socket.on('notification', (notification) => {
    // Import and dispatch notification action
    import('./notificationSlice').then(({ addNotification }) => {
      dispatch(addNotification(notification));
    });
  });

  // Course events
  socket.on('course_updated', (course) => {
    // Import and dispatch course update action
    import('./coursesSlice').then(({ updateCourseInList }) => {
      dispatch(updateCourseInList(course));
    });
  });

  // Forum events
  socket.on('new_forum_post', (post) => {
    // Handle new forum post
    console.log('New forum post:', post);
  });

  // Live class events
  socket.on('class_started', (classInfo) => {
    // Handle live class started
    console.log('Class started:', classInfo);
  });

  socket.on('class_ended', (classInfo) => {
    // Handle live class ended
    console.log('Class ended:', classInfo);
  });

  dispatch(setConnection(socket));
};

// Thunk for joining a room
export const joinRoom = (roomId) => (dispatch, getState) => {
  const { socket } = getState();
  
  if (socket.connection && socket.connected) {
    socket.connection.emit('join_room', roomId);
  }
};

// Thunk for leaving a room
export const leaveRoom = (roomId) => (dispatch, getState) => {
  const { socket } = getState();
  
  if (socket.connection && socket.connected) {
    socket.connection.emit('leave_room', roomId);
  }
};

// Thunk for sending a message
export const sendMessage = (roomId, message) => (dispatch, getState) => {
  const { socket } = getState();
  
  if (socket.connection && socket.connected) {
    socket.connection.emit('send_message', { roomId, message });
  }
};

// Selectors
export const selectSocket = (state) => state.socket;
export const selectSocketConnection = (state) => state.socket.connection;
export const selectSocketConnected = (state) => state.socket.connected;
export const selectOnlineUsers = (state) => state.socket.onlineUsers;
export const selectSocketError = (state) => state.socket.error;

export default socketSlice.reducer;