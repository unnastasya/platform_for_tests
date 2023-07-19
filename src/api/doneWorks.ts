import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const addDoneWork = (data: any) => {
	return axios
		.post(`${API_BASE_URL}/doneWork`, data)
		.then((response) => response.data);
};
