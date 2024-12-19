import axios from "axios";

const ApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const setAuthorizationHeader = () => {
  const token = localStorage.getItem('token');

  if (token) {
    ApiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete ApiInstance.defaults.headers.common['Authorization'];
  }
};

// Set the initial Authorization header if token exists
if (typeof globalThis?.window !== 'undefined') {
  setAuthorizationHeader();
}

ApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      setAuthorizationHeader();

      // Redirect to sign-in page
      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
    }
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

// Function to update the token
export const updateToken = (newToken: string) => {
  localStorage.setItem('token', newToken);
  setAuthorizationHeader();
};

export default ApiInstance;
