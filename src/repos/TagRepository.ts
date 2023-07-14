import prisma from "../prisma";

export default class TagRepository {
    createTag(name: string, taskId: string) {
        return prisma.tag.create({
            data: {
                name,
                task_id: taskId
            }
        })
    }

    editTag(id:string, name: string, taskId: string) {
        return prisma.tag.update({
            where: {
                id
            },
            data: {
                name,
                task_id: taskId
            }
        })
    }

    findTagById(id: string) {
        return prisma.tag.findFirst({
            where: {
                id
            },
            include: {
                task: true
            }
        })
    }

    getAllTags() {
        return prisma.tag.findMany({
            include: {
                task: true
            }
        });
    }

    deleteTagById(id: string) {
        return prisma.tag.delete({
            where: {
                id
            }
        })
    }
}