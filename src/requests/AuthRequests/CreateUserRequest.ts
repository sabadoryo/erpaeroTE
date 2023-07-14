import UserService from "../../services/UserService";

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
            errorMessage: "Username already exists.",
            options: async (value: string) => {
                return await userService.isUserExists(value) ? Promise.reject() : Promise.resolve(); 
            }
          },
    },
    password: {
        notEmpty: true,
        isLength: {
            options: {
                min:8
            }
        },
        errorMessage: "Password should be at least 8 characters length"
    }
}