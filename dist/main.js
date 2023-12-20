"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const app = (0, express_1.default)();
require("./app.module");
const server = http_1.default.createServer(app);
const PORT = 4040;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(index_routes_1.default);
app.use((req, res, next) => {
    const response = {
        statusCode: 404,
        message: "Not Found Page",
    };
    return res.status(404).json(response);
});
server.listen(PORT, () => {
    console.log(`Server Run over : http://localhost:${PORT}`);
});
