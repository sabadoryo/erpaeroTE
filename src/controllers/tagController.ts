import express, { Request, Response } from "express";
import validateRequestMiddleware from "../middlewares/validateRequest";
import { StatusCodes } from "http-status-codes";
import customResponse from "../customResponse";
import CreateTagRequest from "../requests/TagRequests/CreateTagRequest";
import EditTagRequest from "../requests/TagRequests/EditTagRequest";
import authenticateToken from "../middlewares/authenticateToken";
import GetSpecificTagRequest from "../requests/TagRequests/GetSpecificTagRequest";
import DeleteSpecificTagRequest from "../requests/TagRequests/DeleteSpecificTagRequest";
import TagService from "../services/TagService";

const tagRouter = express.Router();
const tagService = new TagService();

tagRouter.post("/", authenticateToken, validateRequestMiddleware(CreateTagRequest), async (req: Request, res: Response) => {
    const tagData = req.body;

    const tag = await tagService.createTag(tagData);

    res.status(StatusCodes.CREATED)
        .send(customResponse(StatusCodes.CREATED, "Tag created.", [], tag))
})

tagRouter.put("/", validateRequestMiddleware(EditTagRequest), async (req: Request, res: Response) => {
    const tagData = req.body;

    const tag = await tagService.editTag(tagData);

    res.status(StatusCodes.ACCEPTED)
        .send(customResponse(StatusCodes.ACCEPTED, "Tag edited.", [], tag))
})

tagRouter.get("/", authenticateToken, async (req: Request, res: Response) => {
    const tags = await tagService.getAllTags();

    res.status(StatusCodes.OK)
        .send(customResponse(StatusCodes.OK, "Tags found.", [], tags))
})

tagRouter.get("/:tagId", authenticateToken, validateRequestMiddleware(GetSpecificTagRequest),async (req: Request, res: Response) => {
    const tags = await tagService.getTagById(req.params.tagId);

    res.status(StatusCodes.OK)
        .send(customResponse(StatusCodes.OK, "Tag found.", [], tags))
})

tagRouter.delete("/:tagId", authenticateToken, validateRequestMiddleware(DeleteSpecificTagRequest),async (req: Request, res: Response) => {
    const tags = await tagService.deleteTagById(req.params.tagId);

    res.status(StatusCodes.ACCEPTED)
        .send(customResponse(StatusCodes.ACCEPTED, "Tag deleted.", [], tags))
})


export default tagRouter;