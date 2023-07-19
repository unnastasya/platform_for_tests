import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getLessons = () => {
	return axios
		.get(`${API_BASE_URL}/lesson`)
		.then((response) => response.data);
};
