import express, { Request, Response } from "express";
import {
    StatusCodes,
} from 'http-status-codes';
import FileService from "../services/FileService";
import authenticateToken from "../middlewares/authenticateToken";
import validateRequestMiddleware from "../middlewares/validateRequest";
import UploadFileRequest from "../requests/FileRequests/UploadFileRequest";
import multer from "multer";
import customResponse from "../customResponse";
import DeleteFileRequest from "../requests/FileRequests/DeleteFileRequest";
import GetFileRequest from "../requests/FileRequests/GetFileRequest";
import { STATUS_CODES } from "http";
import UpdateFileRequest from "../requests/FileRequests/UpdateFileRequest";


const fileRouter = express.Router();
const fileService = new FileService();

const storage = multer.diskStorage({
    destination: "uploaded-files",
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const splittedFileName = file.originalname.split(".");
      const ext = splittedFileName[splittedFileName.length - 1];

      cb(null, file.fieldname + '-' + uniqueSuffix + `.${ext}`)
    }
})
const upload = multer({ storage: storage })

fileRouter.post("/upload", authenticateToken, upload.single('file'), async (req: any, res: any) => {
    const newFile = await fileService.uploadFile(req.file, req.auth.user.id);

    res.status(StatusCodes.CREATED)
        .send(
            customResponse(
                StatusCodes.CREATED,
                "Success.",
                [],
                {
                    file: newFile
                }
            )
        )
});

fileRouter.get("/list", authenticateToken, async (req: any, res: any) => {
    const listSize = req.query.list_size ?? 10;
    const page = req.query.page ?? 1;

    const files = await fileService.getFiles(listSize, page);

    res.status(StatusCodes.OK)
        .send(
            customResponse(
                StatusCodes.OK,
                "Success.",
                [],
                files
            )
        )
});

fileRouter.delete("/delete/:id", authenticateToken, validateRequestMiddleware(DeleteFileRequest),async (req: any, res: any) => {
    await fileService.deleteFile(Number(req.params.id));

    res.status(StatusCodes.OK)
        .send(
            customResponse(
                StatusCodes.OK,
                "Success.",
                [],
                null
            )
        )
})

fileRouter.get("/getFile/:id", authenticateToken, validateRequestMiddleware(GetFileRequest), async(req: any, res: any) => {
    const file = await fileService.getFileById(Number(req.params.id));

    res.status(StatusCodes.OK)
        .send(
            customResponse(
                StatusCodes.OK,
                "Success.",
                [],
                file
            )
        )
});

fileRouter.get("/download/:id", authenticateToken, validateRequestMiddleware(GetFileRequest), async(req: any, res: Response) => {
    const file = await fileService.getFileById(Number(req.params.id));

    res.download(file.path);
})

fileRouter.put("/update/:id", authenticateToken, validateRequestMiddleware(UpdateFileRequest), upload.single('file'), async(req: any, res: Response) => {
    const updatedFile = await fileService.updateFile(Number(req.params.id), req.file, req.auth.user.id);

    res.status(StatusCodes.OK)
        .send(
            customResponse(
                StatusCodes.OK,
                "Success.",
                [],
                updatedFile
            )
        )    
});

export default fileRouter;