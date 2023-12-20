import express from "express";
import { Application } from "express";
import http, { Server } from "http";
import ApplicationRouter from "./routes/index.routes";
const app: Application = express();

import "./app.module";
import "./modules/mongoDBConnection";
import { AllExceptionHandler, notFoundHander } from "./modules/errorHendler";

const server: Server = http.createServer(app);
const PORT = 4040;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ApplicationRouter);

notFoundHander(app);
AllExceptionHandler(app);

server.listen(PORT, () => {
  console.log(`Server Run over : http://localhost:${PORT}`);
});
