import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true' || false,
  sidebarOpen: false,
  language: localStorage.getItem('language') || 'en',
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  loading: {
    global: false,
    courses: false,
    profile: false,
  },
  modals: {
    searchOpen: false,
    profileOpen: false,
    settingsOpen: false,
  },
  theme: {
    primaryColor: '#3B82F6',
    fontSize: 'medium',
    compactMode: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode.toString());
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', action.payload.toString());
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    updateNotificationSettings: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setCoursesLoading: (state, action) => {
      state.loading.courses = action.payload;
    },
    setProfileLoading: (state, action) => {
      state.loading.profile = action.payload;
    },
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key] = false;
      });
    },
    updateTheme: (state, action) => {
      state.theme = { ...state.theme, ...action.payload };
    },
    resetUI: () => initialState,
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  toggleSidebar,
  setSidebarOpen,
  setLanguage,
  updateNotificationSettings,
  setGlobalLoading,
  setCoursesLoading,
  setProfileLoading,
  openModal,
  closeModal,
  closeAllModals,
  updateTheme,
  resetUI,
} = uiSlice.actions;

// Selectors
export const selectDarkMode = (state) => state.ui.darkMode;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectLanguage = (state) => state.ui.language;
export const selectNotificationSettings = (state) => state.ui.notifications;
export const selectLoading = (state) => state.ui.loading;
export const selectModals = (state) => state.ui.modals;
export const selectTheme = (state) => state.ui.theme;

export default uiSlice.reducer;