import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { courseAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

// Async thunks
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await courseAPI.getCourses(params);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch courses';
      return rejectWithValue(message);
    }
  }
);

export const fetchCourseBySlug = createAsyncThunk(
  'courses/fetchCourseBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await courseAPI.getCourseBySlug(slug);
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch course';
      return rejectWithValue(message);
    }
  }
);

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await courseAPI.createCourse(courseData);
      toast.success('Course created successfully');
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create course';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const response = await courseAPI.updateCourse(id, courseData);
      toast.success('Course updated successfully');
      return response.data.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update course';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id, { rejectWithValue }) => {
    try {
      await courseAPI.deleteCourse(id);
      toast.success('Course deleted successfully');
      return id;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete course';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const fetchCourseLessons = createAsyncThunk(
  'courses/fetchCourseLessons',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await courseAPI.getCourseLessons(courseId);
      return { courseId, lessons: response.data.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch lessons';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  courses: [],
  currentCourse: null,
  lessons: {},
  categories: [],
  filters: {
    search: '',
    category: '',
    level: '',
    price: '',
    rating: '',
    sortBy: 'newest',
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
  loading: {
    courses: false,
    currentCourse: false,
    lessons: false,
    creating: false,
    updating: false,
    deleting: false,
  },
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    updateCourseInList: (state, action) => {
      const index = state.courses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    removeCourseFromList: (state, action) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
    },
    addCourseToList: (state, action) => {
      state.courses.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading.courses = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading.courses = false;
        state.courses = action.payload.courses;
        state.pagination = {
          ...state.pagination,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
          page: action.payload.page,
        };
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading.courses = false;
        state.error = action.payload;
      })
      
      // Fetch course by slug
      .addCase(fetchCourseBySlug.pending, (state) => {
        state.loading.currentCourse = true;
        state.error = null;
      })
      .addCase(fetchCourseBySlug.fulfilled, (state, action) => {
        state.loading.currentCourse = false;
        state.currentCourse = action.payload;
        state.error = null;
      })
      .addCase(fetchCourseBySlug.rejected, (state, action) => {
        state.loading.currentCourse = false;
        state.error = action.payload;
      })
      
      // Create course
      .addCase(createCourse.pending, (state) => {
        state.loading.creating = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading.creating = false;
        state.courses.unshift(action.payload);
        state.error = null;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading.creating = false;
        state.error = action.payload;
      })
      
      // Update course
      .addCase(updateCourse.pending, (state) => {
        state.loading.updating = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading.updating = false;
        const index = state.courses.findIndex(course => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        if (state.currentCourse && state.currentCourse.id === action.payload.id) {
          state.currentCourse = action.payload;
        }
        state.error = null;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading.updating = false;
        state.error = action.payload;
      })
      
      // Delete course
      .addCase(deleteCourse.pending, (state) => {
        state.loading.deleting = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading.deleting = false;
        state.courses = state.courses.filter(course => course.id !== action.payload);
        if (state.currentCourse && state.currentCourse.id === action.payload) {
          state.currentCourse = null;
        }
        state.error = null;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading.deleting = false;
        state.error = action.payload;
      })
      
      // Fetch course lessons
      .addCase(fetchCourseLessons.pending, (state) => {
        state.loading.lessons = true;
        state.error = null;
      })
      .addCase(fetchCourseLessons.fulfilled, (state, action) => {
        state.loading.lessons = false;
        state.lessons[action.payload.courseId] = action.payload.lessons;
        state.error = null;
      })
      .addCase(fetchCourseLessons.rejected, (state, action) => {
        state.loading.lessons = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  setFilters,
  clearFilters,
  setPagination,
  setCurrentCourse,
  clearCurrentCourse,
  updateCourseInList,
  removeCourseFromList,
  addCourseToList,
} = coursesSlice.actions;

// Selectors
export const selectCourses = (state) => state.courses.courses;
export const selectCurrentCourse = (state) => state.courses.currentCourse;
export const selectCourseLessons = (courseId) => (state) => state.courses.lessons[courseId] || [];
export const selectCoursesLoading = (state) => state.courses.loading;
export const selectCoursesError = (state) => state.courses.error;
export const selectCoursesFilters = (state) => state.courses.filters;
export const selectCoursesPagination = (state) => state.courses.pagination;

export default coursesSlice.reducer;