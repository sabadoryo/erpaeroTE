"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
var http_status_codes_1 = require("http-status-codes");
var customResponse_1 = __importDefault(require("../customResponse"));
var CreateTagRequest_1 = __importDefault(require("../requests/TagRequests/CreateTagRequest"));
var EditTagRequest_1 = __importDefault(require("../requests/TagRequests/EditTagRequest"));
var authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
var GetSpecificTagRequest_1 = __importDefault(require("../requests/TagRequests/GetSpecificTagRequest"));
var DeleteSpecificTagRequest_1 = __importDefault(require("../requests/TagRequests/DeleteSpecificTagRequest"));
var TagService_1 = __importDefault(require("../services/TagService"));
var tagRouter = express_1.default.Router();
var tagService = new TagService_1.default();
tagRouter.post("/", authenticateToken_1.default, (0, validateRequest_1.default)(CreateTagRequest_1.default), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tagData, tag;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tagData = req.body;
                return [4 /*yield*/, tagService.createTag(tagData)];
            case 1:
                tag = _a.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED)
                    .send((0, customResponse_1.default)(http_status_codes_1.StatusCodes.CREATED, "Tag created.", [], tag));
                return [2 /*return*/];
        }
    });
}); });
tagRouter.put("/", (0, validateRequest_1.default)(EditTagRequest_1.default), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tagData, tag;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tagData = req.body;
                return [4 /*yield*/, tagService.editTag(tagData)];
            case 1:
                tag = _a.sent();
                res.status(http_status_codes_1.StatusCodes.ACCEPTED)
                    .send((0, customResponse_1.default)(http_status_codes_1.StatusCodes.ACCEPTED, "Tag edited.", [], tag));
                return [2 /*return*/];
        }
    });
}); });
tagRouter.get("/", authenticateToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tags;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tagService.getAllTags()];
            case 1:
                tags = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK)
                    .send((0, customResponse_1.default)(http_status_codes_1.StatusCodes.OK, "Tags found.", [], tags));
                return [2 /*return*/];
        }
    });
}); });
tagRouter.get("/:tagId", authenticateToken_1.default, (0, validateRequest_1.default)(GetSpecificTagRequest_1.default), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tags;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tagService.getTagById(req.params.tagId)];
            case 1:
                tags = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK)
                    .send((0, customResponse_1.default)(http_status_codes_1.StatusCodes.OK, "Tag found.", [], tags));
                return [2 /*return*/];
        }
    });
}); });
tagRouter.delete("/:tagId", authenticateToken_1.default, (0, validateRequest_1.default)(DeleteSpecificTagRequest_1.default), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tags;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tagService.deleteTagById(req.params.tagId)];
            case 1:
                tags = _a.sent();
                res.status(http_status_codes_1.StatusCodes.ACCEPTED)
                    .send((0, customResponse_1.default)(http_status_codes_1.StatusCodes.ACCEPTED, "Tag deleted.", [], tags));
                return [2 /*return*/];
        }
    });
}); });
exports.default = tagRouter;