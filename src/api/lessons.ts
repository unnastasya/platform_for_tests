import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getLessons = () => {
	return axios
		.get(`${API_BASE_URL}/lesson`)
		.then((response) => response.data);
};

export const getOneLesson = (id: any) => {
	return axios
		.get(`${API_BASE_URL}/lesson/${id}`)
		.then((response) => response.data);
};

export const deleteLesson = (id: any) => {
	return axios.delete(`${API_BASE_URL}/lesson/${id}`);
};

export const addLesson = (object: any) => {
	return axios
		.post(`${API_BASE_URL}/lesson`, object)
		.then((response) => response.data);
};
