import axios from "axios";
import { API_BASE_URL } from ".";

export const addDoneWork = (data: any) => {
	return axios
		.post(`${API_BASE_URL}/doneWork`, data)
		.then((response) => response.data);
};

export const getOneStudentWorks = (activeUserId: string, studentId: string) => {
	return axios
		.get(`${API_BASE_URL}/doneWorkByStudentId/${activeUserId}/${studentId}`)
		.then((response) => response.data);
};

export const getDoneWorks = (id: string) => {
	return axios
		.get(`${API_BASE_URL}/doneWorks/${id}`)
		.then((response) => response.data);
};

export const getStudentsDoneWorks = (id: string) => {
	return axios
		.get(`${API_BASE_URL}/studentsDoneWorks/${id}`)
		.then((response) => response.data);
};

export const getOneDoneWork = (id: any) => {
	return axios
		.get(`${API_BASE_URL}/doneWork/${id}`)
		.then((response) => response.data);
};

export const changeOneDoneWork = (id: any, object: any) => {
	return axios.put(`${API_BASE_URL}/doneWork/${id}`, object);
};
