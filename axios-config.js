import axios from "axios";

const api = axios.create({
	baseURL:
		"https://us-central1-taugor-appcenter.cloudfunctions.net/webApi/api/v1"
});

export default api;