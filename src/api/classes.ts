import axios from "axios";
import { API_BASE_URL } from ".";

export const getOneClass = (id: string) => {
	return axios
		.get(`${API_BASE_URL}/class/${id}`)
		.then((response) => response.data)
		.catch((error) => error);
};

export const getAllClasses = (id: string) => {
	return axios
		.get(`${API_BASE_URL}/allClasses/${id}`)
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

export const updateClass = ({
	id,
	data,
}: {
	id: string;
	data: any;
}): Promise<any> => {
	return axios
		.put(`${API_BASE_URL}/class/${id}`, data)
		.then((response) => response.data)
		.catch((error) => error);
};

export const getClassesUsers = (id: string) => {
	return axios
		.get(`${API_BASE_URL}/classUsers/${id}`)
		.then((response) => response.data)
		.catch((error) => error);
};
