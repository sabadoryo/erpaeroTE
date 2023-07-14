import prisma from "../prisma";
import { Status } from "@prisma/client";

export default class TaskRepository {
    createTask(title: string, description:string | null, status: Status) {
        return prisma.task.create({
            data: {
                title,
                description,
                status
            }
        })
    }

    editTask(id:string, title: string, description:string | null, status: Status) {
        return prisma.task.update({
            where: {
                id
            },
            data: {
                title,
                description,
                status
            }
        })
    }

    findTaskById(id: string) {
        return prisma.task.findFirst({
            where: {
                id
            },
            include: {
                tags: true
            }
        })
    }

    getAllTasks() {
        return prisma.task.findMany({
            include: {
                tags: true
            }
        });
    }

    deleteTaskById(id: string) {
        return prisma.task.delete({
            where: {
                id
            }
        })
    }
}