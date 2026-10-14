import axios from 'axios';
import initialData from '../mock/data.json';

// Initialize localStorage with mock data if not present
const STORAGE_KEY = 'lunora_store_db_v1';

export const getStoredData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error('Failed to parse local storage data', err);
    return initialData;
  }
};

export const saveStoredData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Create Axios client configured for REST API base
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.lunora-fashion.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to mimic local database async responses
export const mockApiCall = (actionFn, delay = 200) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const db = getStoredData();
      const result = actionFn(db);
      saveStoredData(db);
      resolve(result);
    }, delay);
  });
};






export default apiClient;
