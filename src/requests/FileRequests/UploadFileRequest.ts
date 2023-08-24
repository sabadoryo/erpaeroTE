import FileService from "../../services/FileService";

const fileService = new FileService();

export default {
    file: {
        exists: {
            errorMessage: "File should be provided"
        },
    }
}