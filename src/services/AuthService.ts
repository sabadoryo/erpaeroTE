import { User } from "@prisma/client";
import UserRepository from "../repos/UserRepository";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

export default class AuthService {
    userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(userData: User) {
        const hashedPassword = await this.hashPassword(userData.password);
        const user = await this.userRepository.createUser(userData.username, hashedPassword);

        return user;
    }
    
    async comparePasswords(username: string, password:string) {
        const user = await this.userRepository.getUserByUsernameOrThrow(username);
        return bcrypt.compare(password, user.password);
    }

    async isUserExists(username: string) {
        const user = await this.userRepository.getUserByUsernameOrThrow(username);
            
        if (user) {
            return Promise.reject();
        }

        return Promise.resolve();
    }

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }

    generateAccessToken(username: string) {
        return jwt.sign({username : username}, process.env.JWT_SECRET || "JWTSECRET", { expiresIn: 86400 })
    }
}