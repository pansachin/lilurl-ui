import axios from 'axios';

const API_BASE_URL = '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const urlService = {
  // Create a shortened URL
  createShortUrl: async (longUrl) => {
    try {
      const response = await api.post('/lilurl', { long_url: longUrl });
      return response.data.result;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get URL details by short code
  getUrlByShortCode: async (shortCode) => {
    try {
      const response = await api.get(`/${shortCode}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get URL details by ID
  getUrlById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;
