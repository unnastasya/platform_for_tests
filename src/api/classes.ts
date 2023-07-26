import axios from "axios";

const API_BASE_URL = "https://platform-for-tests-backend.vercel.app";

export const getOneClass = (id: string) => {
	return axios
		.get(`${API_BASE_URL}/class/${id}`)
		.then((response) => response.data)
		.catch((error) => error);
};

export const getAllClasses = () => {
	return axios
		.get(`${API_BASE_URL}/class`)
		.then((response) => response.data)
		.catch((error) => error);
};

export const deleteOneClass = (id: string) => {
	return axios.delete(`${API_BASE_URL}/class/${id}`);
};

export const addClass = (data: any): Promise<any> => {
	return axios
		.post(`${API_BASE_URL}/class`, data)
		.then((response) => response.data)
		.catch((error) => error);
};
