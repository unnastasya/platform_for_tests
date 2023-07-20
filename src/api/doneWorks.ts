import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const addDoneWork = (data: any) => {
	return axios
		.post(`${API_BASE_URL}/doneWork`, data)
		.then((response) => response.data);
};

export const getOneStudentWorks = (studentId: string) => {
	return axios
		.get(`${API_BASE_URL}/doneWorkByStudentId/${studentId}`)
		.then((response) => response.data);
};

export const getDoneWorks = () => {
	return axios
		.get(`${API_BASE_URL}/doneWork`)
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