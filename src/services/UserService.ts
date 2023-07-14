import UserRepository from "../repos/UserRepository";


export default class UserService {
    userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository();
    }

    async isUserExists(username: string) {
        const user = await this.userRepository.getUserByUsername(username);
        
        if (user) {
            return true;
        }

        return false;
    }
}