import prisma from "../prisma";

export default class AuthRepository {
    blacklistToken(token: string) {
        return prisma.blackListedToken.create({
            data: {
                token
            }
        })
    }

    getBlackListedTokens() {
        return prisma.blackListedToken.findMany({});
    }
}