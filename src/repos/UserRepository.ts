import prisma from "../prisma";

export default class UserRepository {
    createUser(username: string, password:string) {
        return prisma.user.create({
            data: {
                username,
                password
            },
            select: {
                id: true,
                username: true,
                password: false
            }
        })
    }

    getUserByUsernameOrThrow(username: string) {
        return prisma.user.findFirstOrThrow({
            where: {
                username
            }
        })
    }

    getUserByUsername(username: string) {
        return prisma.user.findFirst({
            where: {
                username
            }
        })
    }
}