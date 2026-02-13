import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enrollmentAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

// Async thunks
export const enrollInCourse = createAsyncThunk(
  'enrollment/enrollInCourse',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await enrollmentAPI.enrollInCourse(courseId);
      toast.success('Successfully enrolled in course!');
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to enroll in course';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchEnrollments = createAsyncThunk(
  'enrollment/fetchEnrollments',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await enrollmentAPI.getEnrollments(params);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch enrollments';
      return rejectWithValue(message);
    }
  }
);

export const fetchEnrolledCourses = createAsyncThunk(
  'enrollment/fetchEnrolledCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await enrollmentAPI.getMyCourses();
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch enrolled courses';
      return rejectWithValue(message);
    }
  }
);

export const updateProgress = createAsyncThunk(
  'enrollment/updateProgress',
  async ({ enrollmentId, progressData }, { rejectWithValue }) => {
    try {
      const response = await enrollmentAPI.updateProgress(enrollmentId, progressData);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update progress';
      return rejectWithValue(message);
    }
  }
);

export const dropCourse = createAsyncThunk(
  'enrollment/dropCourse',
  async (enrollmentId, { rejectWithValue }) => {
    try {
      await enrollmentAPI.dropCourse(enrollmentId);
      toast.success('Successfully dropped course');
      return enrollmentId;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to drop course';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  enrollments: [],
  enrolledCourses: [],
  currentEnrollment: null,
  loading: {
    enrollments: false,
    enrolledCourses: false,
    enrolling: false,
    updating: false,
    dropping: false,
  },
  error: null,
};

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentEnrollment: (state, action) => {
      state.currentEnrollment = action.payload;
    },
    clearCurrentEnrollment: (state) => {
      state.currentEnrollment = null;
    },
    updateEnrollmentProgress: (state, action) => {
      const { enrollmentId, progress } = action.payload;
      const enrollment = state.enrollments.find(e => e.id === enrollmentId);
      if (enrollment) {
        enrollment.progress_percentage = progress;
      }
      if (state.currentEnrollment && state.currentEnrollment.id === enrollmentId) {
        state.currentEnrollment.progress_percentage = progress;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Enroll in course
      .addCase(enrollInCourse.pending, (state) => {
        state.loading.enrolling = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.loading.enrolling = false;
        state.enrollments.push(action.payload);
        state.error = null;
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.loading.enrolling = false;
        state.error = action.payload;
      })
      
      // Fetch enrollments
      .addCase(fetchEnrollments.pending, (state) => {
        state.loading.enrollments = true;
        state.error = null;
      })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.loading.enrollments = false;
        state.enrollments = action.payload.enrollments || action.payload;
        state.error = null;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.loading.enrollments = false;
        state.error = action.payload;
      })
      
      // Fetch enrolled courses
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.loading.enrolledCourses = true;
        state.error = null;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.loading.enrolledCourses = false;
        state.enrolledCourses = action.payload;
        state.error = null;
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.loading.enrolledCourses = false;
        state.error = action.payload;
      })
      
      // Update progress
      .addCase(updateProgress.pending, (state) => {
        state.loading.updating = true;
        state.error = null;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.loading.updating = false;
        const enrollment = state.enrollments.find(e => e.id === action.payload.id);
        if (enrollment) {
          Object.assign(enrollment, action.payload);
        }
        if (state.currentEnrollment && state.currentEnrollment.id === action.payload.id) {
          Object.assign(state.currentEnrollment, action.payload);
        }
        state.error = null;
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.loading.updating = false;
        state.error = action.payload;
      })
      
      // Drop course
      .addCase(dropCourse.pending, (state) => {
        state.loading.dropping = true;
        state.error = null;
      })
      .addCase(dropCourse.fulfilled, (state, action) => {
        state.loading.dropping = false;
        state.enrollments = state.enrollments.filter(e => e.id !== action.payload);
        if (state.currentEnrollment && state.currentEnrollment.id === action.payload) {
          state.currentEnrollment = null;
        }
        state.error = null;
      })
      .addCase(dropCourse.rejected, (state, action) => {
        state.loading.dropping = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  setCurrentEnrollment,
  clearCurrentEnrollment,
  updateEnrollmentProgress,
} = enrollmentSlice.actions;

// Selectors
export const selectEnrollments = (state) => state.enrollment.enrollments;
export const selectEnrolledCourses = (state) => state.enrollment.enrolledCourses;
export const selectCurrentEnrollment = (state) => state.enrollment.currentEnrollment;
export const selectEnrollmentLoading = (state) => state.enrollment.loading;
export const selectEnrollmentError = (state) => state.enrollment.error;
export const selectIsEnrolledInCourse = (courseId) => (state) => 
  state.enrollment.enrollments.some(e => e.course_id === courseId && e.status === 'active');

export default enrollmentSlice.reducer;