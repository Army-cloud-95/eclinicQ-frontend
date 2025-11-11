import axiosInstance from "../lib/axios";

export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/auth/register", formData);
    return response.data; 
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

// PASSWORD login
export const loginPassword = async ({ userName, password }) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      userName,
      method: "PASSWORD",
      password,
    });
    return response.data;
  } catch (error) {
    const payload = error?.response?.data || { message: error.message };
    console.error("Login failed:", payload);
    throw error;
  }
};

// OTP login - step 1: request OTP
export const loginOtpStart = async ({ userName }) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      userName,
      method: "OTP",
    });
    return response.data;
  } catch (error) {
    const payload = error?.response?.data || { message: error.message };
    console.error("OTP request failed:", payload);
    throw error;
  }
};

// OTP login - step 2: verify OTP using challengeId from step 1 response
export const loginOtpVerify = async ({ challengeId, userName, otp }) => {
  try {
    const response = await axiosInstance.post("/auth/verify-otp", {
      challengeId,
      userName,
      otp,
    });
    return response.data;
  } catch (error) {
    const payload = error?.response?.data || { message: error.message };
    console.error("OTP verify failed:", payload);
    throw error;
  }
};
