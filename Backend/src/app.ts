import clothingController from "./6-controllers/clothing-controller";
import authController from "./6-controllers/auth-controller";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import config from "./2-utils/config";
import dal from "./2-utils/dal";
import express from "express";
import cors from "cors";

dal.connect();
const server = express();

server.use(cors());
// Tell express to read the body json object:
server.use(express.json());
// Rout any request to the server into controller:
server.use("/api", clothingController);
server.use("/api", authController);
// Rout not found:
server.use("*", routeNotFound);
// Catch all middleware:
server.use(catchAll);

server.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
