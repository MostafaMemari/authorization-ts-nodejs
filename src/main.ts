import express from "express";
import { Application, Request, Response, NextFunction } from "express";
import http, { Server } from "http";
import { ResponseMethod } from "./types/public.types";
import ApplicationRouter from "./routes/index.routes";
const app: Application = express();

const server: Server = http.createServer(app);
const PORT = 4040;

app.use(ApplicationRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const response: ResponseMethod = {
    statusCode: 404,
    message: "Not Found Page",
  };
  return res.status(404).json(response);
});
server.listen(PORT, () => {
  console.log(`Server Run over : http://localhost:${PORT}`);
});
