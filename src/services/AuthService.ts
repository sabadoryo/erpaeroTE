import { User } from "@prisma/client";
import UserRepository from "../repos/UserRepository";
import bcrypt, { hash } from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import AuthRepository from "../repos/AuthRepository";

export default class AuthService {
    userRepository: UserRepository
    authRepository: AuthRepository

    constructor() {
        this.userRepository = new UserRepository();
        this.authRepository = new AuthRepository();
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
        return jwt.sign({username : username}, `${process.env.JWT_SECRET}`, { expiresIn: 3600 })
    }

    generateRefreshToken(username: string) {
        return jwt.sign({username : username}, `${process.env.JWT_REFRESH_SECRET}`, { expiresIn: 86400 });
    }

    async isValidRefreshToken(refreshToken: string, username: string) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "") as JwtPayload;
            const blackListedTokens = await this.authRepository.getBlackListedTokens();

            const rawTokens = blackListedTokens.map(blt => blt.token);

            if (decoded.username === username && !rawTokens.includes(refreshToken)) {
                return true;
            }

            return false;
        } catch (err) {
            return false;
        }
    }

    async blackListTokens(token: string) {
        await this.authRepository.blacklistToken(token);

        return true;
    }
}