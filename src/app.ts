import express, { Application, Router } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import { LogStream } from "./utils/logger";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import PetitionsRoutes from "./routes/petitionsRoutes";
import swaggerUi from "swagger-ui-express";
import Config from "./utils/config";
import * as swaggerDocument from './config/swagger.json';

class App {
	public app: Application;
	public petitionRouter: PetitionsRoutes;

	constructor() {
		this.app = express();
		this.middleware();
		this.petitionRouter = new PetitionsRoutes();
		this.routes();
	}

	private middleware(): void {
		this.app.use(cors());
		this.app.use(morgan("combined", { stream: new LogStream() }));
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(helmet());
		this.app.use(cookieParser());
		this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	}

	private routes(): void {
		this.app.use("/api/v1", this.petitionRouter.router);
	}

	public start(): void {
		const port = new Config().getPort();
		this.app.set("PORT", process.env.PORT || 3000);
		this.app.listen(this.app.get("PORT"), () => {
			console.log(`Server is listening on port ${port}`);
		});
	}
}

export default App;
