import axios from '../lib/axios';

// Create Hospital API
export const createHospital = async (hospitalData) => {
  try {
    const response = await axios.post('/hospitals/create', hospitalData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
