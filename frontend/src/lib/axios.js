import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" 
		? `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api`
		: "/api",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;