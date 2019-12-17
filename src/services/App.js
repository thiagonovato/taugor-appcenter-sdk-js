import BasicApi from "@basic";

class App extends BasicApi {
	constructor() {
		super({ basePath: "/app" });
	}
}

export default App;
