import axios from "axios";

const api = axios.create({
	baseURL:
		"https://us-central1-taugor-appcenter.cloudfunctions.net/webApi/v1",
	headers: {
		common: {
			"Access-Control-Allow-Origin": "*"
		}
	}
});

export default api;
