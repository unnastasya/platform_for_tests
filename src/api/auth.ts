import axios from "axios";
import { API_BASE_URL } from ".";

export const login = (data: any) => {
	return axios
		.post(`${API_BASE_URL}/auth/login`, data)
		.then((response) => response.data.user)
		.catch((error) => error.response.data);
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
