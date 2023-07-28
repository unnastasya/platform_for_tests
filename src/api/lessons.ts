import axios from "axios";

const API_BASE_URL = "https://platform-for-tests-backend.vercel.app";

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
		.then((response) => response.data).catch((error) => error);
};

export const addLessonToClass = (id: any, obj: any) => {
	return axios.post(`${API_BASE_URL}/classes/${id}/addLesson`, obj);
};

export const getOneStudentLessons = (id: any) => {
	return axios
		.get(`${API_BASE_URL}/oneSudentsLessons/${id}`)
		.then((response) => response.data);
};

export const addImage = (data: any) => {
	return axios
		.post(`${API_BASE_URL}/uploadImage`, data)
		.then((response) => response.data);
};
