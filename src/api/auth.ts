import axios from "axios";

const API_BASE_URL = "https://platform-for-tests-backend.vercel.app";

export const login = (data: any) => {
	return axios
		.post(`${API_BASE_URL}/auth/login`, data)
		.then((response) => response)
		.catch((error) => ({
			status: error.response.status,
			errorMessage: error.response.data.error,
		}));
};

export const getUsersByClassId = (id: string) => {
	return axios
		.get(`${API_BASE_URL}/userByClassId/${id}`)
		.then((response) => response.data);
};

export const getOneUser = (id: string) => {
	return axios
		.get(`${API_BASE_URL}/user/${id}`)
		.then((response) => response.data);
};
