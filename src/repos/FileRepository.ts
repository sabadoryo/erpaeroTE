import { File } from "@prisma/client";
import prisma from "../prisma";

export default class AuthRepository {
    createFile(file: any) {
        return prisma.file.create({
            data: {
                name: file.name,
                path: file.path,
                extension: file.extension,
                mime_type: file.mime_type,
                size: file.size,
                uploaded_at: new Date(),
                user_id: file.user_id
            }
        })
    }

    getAllFiles(listSize: number, page: number) {
        const skip = (page * listSize) - listSize;
        return prisma.file.findMany({
            take: listSize,
            skip
        });
    }

    getFileById(fileId: number) {
        return prisma.file.findFirstOrThrow({
            where: {
                id: fileId
            }
        })
    }

    deleteFileById(fileId: number) {
        return prisma.file.delete({
            where: {
                id: fileId
            }
        })
    }

    updateFileById(id: number, file: any) {
        return prisma.file.update({
            where: {
                id: id
            },
            data: {
                name: file.name,
                path: file.path,
                extension: file.extension,
                mime_type: file.mime_type,
                size: file.size,
                uploaded_at: new Date(),
                user_id: file.user_id
            }
        })
    }
}