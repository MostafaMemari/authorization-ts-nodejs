"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionHandler = exports.notFoundHander = void 0;
function notFoundHander(app) {
    app.use((req, res, next) => {
        const response = {
            statusCode: 404,
            message: "Not Found Page",
        };
        return res.status(404).json(response);
    });
}
exports.notFoundHander = notFoundHander;
function AllExceptionHandler(app) {
    app.use((error, req, res, next) => {
        const statusCode = +error?.status || 500;
        const message = error?.message || "InternalServerError";
        const response = {
            statusCode,
            message: message,
        };
        return res.status(statusCode).json(response);
    });
}
exports.AllExceptionHandler = AllExceptionHandler;
