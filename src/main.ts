import { SetupServer } from "./bootstrap";
const PORT = 3400;

const server = new SetupServer(PORT);
server.init();
server.start();
