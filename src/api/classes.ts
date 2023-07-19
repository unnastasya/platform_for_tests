import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const getOneClass = (id: any) => {
	return axios
		.get(`${API_BASE_URL}/class/${id}`)
		.then((response) => response.data)
		.catch((error) => error);
};
