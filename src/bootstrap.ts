import { Server } from "@overnightjs/core";
import * as http from "http";
import express from "express";
import cors from "cors";
import { ApiErrorHandler, NotFoundErrorHandler } from "./utils/ApiErrorHandler";
import { BlogController } from "./controllers/blog.controller";
import "./utils/mongoDBConnection";

export class SetupServer extends Server {
  private server?: http.Server;
  constructor(private port: number = 3000) {
    super();
  }
  public init(): void {
    this.setupExpress();
    this.setupControllers();
    this.setupErrorHandler();
  }
  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({ origin: "*" }));
  }
  private setupControllers() {
    const controllers = [new BlogController()];
    super.addControllers(controllers);
  }
  private setupErrorHandler(): void {
    this.app.use(NotFoundErrorHandler);
    this.app.use(ApiErrorHandler);
  }
  public start(): void {
    this.server = http.createServer(this.app);
    this.server.listen(this.port, () => {
      console.log(`Server listen on Port : http://localhost:${this.port}`);
    });
  }
}
