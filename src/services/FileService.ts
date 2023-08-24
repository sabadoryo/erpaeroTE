import { File } from "buffer";
import FileRepository from "../repos/FileRepository";
import fs from "fs/promises";

export default class FileService {
    fileRepository: FileRepository

    constructor() {
        this.fileRepository = new FileRepository();
    }

    uploadFile(file: any, userId: number) {
        const splittedFileName = file.originalname.split(".");
        const ext = splittedFileName[splittedFileName.length - 1];
        const newFileData = {
            name: file.originalname,
            extension: ext,
            mime_type: file.mimetype,
            size: file.size,
            user_id: userId,
            path: file.path,
            uploaded_at: new Date() 
        };

        return this.fileRepository.createFile(newFileData);
    }

    getFiles(listSize: number, page: number) {
        return this.fileRepository.getAllFiles(listSize, page);
    }

    getFileById(fileId: number) {
        return this.fileRepository.getFileById(fileId);
    }

    async deleteFile(fileId: number) {
        const file = await this.fileRepository.getFileById(fileId);
        
        try {
            await fs.unlink(file.path);
            await this.fileRepository.deleteFileById(fileId);
        } catch (err) {
            console.log(err);
            throw err;
        }
        return null;
    }

    updateFile(id: number, file: any, userId: number) {
        const splittedFileName = file.originalname.split(".");
        const ext = splittedFileName[splittedFileName.length - 1];

        const updatedFile = {
            name: file.originalname,
            extension: ext,
            mime_type: file.mimetype,
            size: file.size,
            user_id: userId,
            path: file.path,
            uploaded_at: new Date() 
        }
        return this.fileRepository.updateFileById(id, updatedFile);
    }
}