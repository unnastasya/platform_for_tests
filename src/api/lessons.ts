import axios from "axios";
import { API_BASE_URL } from ".";

export const getLessons = (id: string) => {
	return axios
		.get(`${API_BASE_URL}/allLessons/${id}`)
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
		.then((response) => response.data)
		.catch((error) => error);
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

export const updateLesson = ({
	id,
	data,
}: {
	id: string;
	data: any;
}): Promise<any> => {
	return axios
		.put(`${API_BASE_URL}/lesson/${id}`, data)
		.then((response) => response.data)
		.catch((error) => error);
};

export const changeVisible = (id: any) => {
	return axios
		.put(`${API_BASE_URL}/lesson/changeVisible/${id}`)
		.then((response) => response.data)
		.catch((error) => console.log(error));
};
