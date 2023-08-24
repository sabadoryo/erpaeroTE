import { Request } from "express";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";

const authService = new AuthService();
const userService = new UserService();

export default {
    refresh_token: {
        notEmpty: {
            errorMessage: "Refresh Token should be provided"
        },
        custom: {
            errorMessage: "Refresh token is invalid",
            options: async (refreshToken: string, { req } : any) => {
                if (await authService.isValidRefreshToken(refreshToken, req.auth.user.username)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            },
            bail: true
          },
    }
}