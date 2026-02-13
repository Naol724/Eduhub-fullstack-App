const logger = require('../utils/logger');

// Store connected users
const connectedUsers = new Map();

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`);

    // Handle user authentication
    socket.on('authenticate', (userData) => {
      if (userData && userData.userId) {
        connectedUsers.set(socket.id, {
          userId: userData.userId,
          username: userData.username,
          role: userData.role
        });
        socket.join(`user_${userData.userId}`);
        logger.info(`User authenticated: ${userData.username} (${userData.userId})`);
      }
    });

    // Handle joining course rooms
    socket.on('join_course', (courseId) => {
      socket.join(`course_${courseId}`);
      logger.info(`User ${socket.id} joined course ${courseId}`);
    });

    // Handle leaving course rooms
    socket.on('leave_course', (courseId) => {
      socket.leave(`course_${courseId}`);
      logger.info(`User ${socket.id} left course ${courseId}`);
    });

    // Handle forum messages
    socket.on('forum_message', (data) => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        const messageData = {
          ...data,
          userId: user.userId,
          username: user.username,
          timestamp: new Date().toISOString()
        };
        
        // Broadcast to course forum
        socket.to(`course_${data.courseId}`).emit('new_forum_message', messageData);
        logger.info(`Forum message sent by ${user.username} in course ${data.courseId}`);
      }
    });

    // Handle live class events
    socket.on('join_live_class', (classId) => {
      socket.join(`class_${classId}`);
      const user = connectedUsers.get(socket.id);
      if (user) {
        socket.to(`class_${classId}`).emit('user_joined_class', {
          userId: user.userId,
          username: user.username
        });
        logger.info(`User ${user.username} joined live class ${classId}`);
      }
    });

    socket.on('leave_live_class', (classId) => {
      socket.leave(`class_${classId}`);
      const user = connectedUsers.get(socket.id);
      if (user) {
        socket.to(`class_${classId}`).emit('user_left_class', {
          userId: user.userId,
          username: user.username
        });
        logger.info(`User ${user.username} left live class ${classId}`);
      }
    });

    // Handle chat messages in live classes
    socket.on('class_chat_message', (data) => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        const messageData = {
          ...data,
          userId: user.userId,
          username: user.username,
          timestamp: new Date().toISOString()
        };
        
        socket.to(`class_${data.classId}`).emit('new_class_message', messageData);
        logger.info(`Chat message sent by ${user.username} in class ${data.classId}`);
      }
    });

    // Handle notifications
    socket.on('mark_notification_read', (notificationId) => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        // Emit to user's personal room
        socket.to(`user_${user.userId}`).emit('notification_read', notificationId);
      }
    });

    // Handle typing indicators
    socket.on('typing_start', (data) => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        socket.to(`course_${data.courseId}`).emit('user_typing', {
          userId: user.userId,
          username: user.username,
          forumId: data.forumId
        });
      }
    });

    socket.on('typing_stop', (data) => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        socket.to(`course_${data.courseId}`).emit('user_stopped_typing', {
          userId: user.userId,
          forumId: data.forumId
        });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        logger.info(`User disconnected: ${user.username} (${socket.id})`);
      } else {
        logger.info(`User disconnected: ${socket.id}`);
      }
      connectedUsers.delete(socket.id);
    });

    // Handle errors
    socket.on('error', (error) => {
      logger.error(`Socket error for ${socket.id}:`, error);
    });
  });

  // Helper function to send notification to specific user
  const sendNotificationToUser = (userId, notification) => {
    io.to(`user_${userId}`).emit('new_notification', notification);
  };

  // Helper function to broadcast to course
  const broadcastToCourse = (courseId, event, data) => {
    io.to(`course_${courseId}`).emit(event, data);
  };

  // Helper function to broadcast to live class
  const broadcastToClass = (classId, event, data) => {
    io.to(`class_${classId}`).emit(event, data);
  };

  // Expose helper functions
  io.sendNotificationToUser = sendNotificationToUser;
  io.broadcastToCourse = broadcastToCourse;
  io.broadcastToClass = broadcastToClass;
  io.getConnectedUsers = () => Array.from(connectedUsers.values());
};

module.exports = socketHandler;