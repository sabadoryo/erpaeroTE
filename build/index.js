"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var authController_1 = __importDefault(require("./controllers/authController"));
var taskController_1 = __importDefault(require("./controllers/taskController"));
var tagController_1 = __importDefault(require("./controllers/tagController"));
var helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.disable('x-powered-by');
app.use("/api/auth", authController_1.default);
app.use("/api/task", taskController_1.default);
app.use("/api/tag", tagController_1.default);
app.listen(port, function () {
    console.log("AlfredoTZ app listening on port ".concat(port));
});
app.on("error", function (err) {
    console.log(err);
});
