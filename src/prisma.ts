import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient;

function getPrisma() {
    if (!prisma) {
        prisma = new PrismaClient();
        return prisma;
    } else {
        return prisma;
    }
}



export default getPrisma();