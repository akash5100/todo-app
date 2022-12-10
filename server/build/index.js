"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_1 = require("./routes/v1");
const constants_1 = require("./constants");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('API is running...');
});
// V1 of API
app.use("/v1", v1_1.v1Routes);
app.listen(constants_1.port, () => {
    console.log(`Server running at http://localhost:${constants_1.port}`);
});
