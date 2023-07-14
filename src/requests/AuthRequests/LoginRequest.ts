import { Request } from "express";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";

const authService = new AuthService();
const userService = new UserService();

export default {
    username: {
        notEmpty: {
            errorMessage: "Username should be a valid email."
        },
        isEmail: {
            errorMessage: "Username should be valid email."
        },
        custom: {
            errorMessage: "Username doesn't exists",
            options: async (username: string) => {
                if (await userService.isUserExists(username)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            },
            bail: true
          },
    },
    password: {
        notEmpty: true,
        isLength: {
            options: {
                min:8
            },
            errorMessage: "Password should be at least 8 characters length"
        },
        custom: {
            errorMessage: "Passwords doesn't match",
            options: async (password: string, { req }: any) => {
                console.log("KEK")
                if (await authService.comparePasswords(req.body.username, password)) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            },
            bail: true
        },

    }
}