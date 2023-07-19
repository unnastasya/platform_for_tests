import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getOneClass = (id: string) => {
	return axios
		.get(`${API_BASE_URL}/class/${id}`)
		.then((response) => response.data)
		.catch((error) => error);
};

export const getClasses = () => {
	return axios
		.get(`${API_BASE_URL}/class`)
		.then((response) => response.data)
		.catch((error) => error);
};
