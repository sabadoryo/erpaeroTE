import FileService from "../../services/FileService";

const fileService = new FileService();

export default {
    id: {
        exists: {
            errorMessage: "File id should be provided"
        },
        custom: {
            errorMessage: "File not found",
            options: async (id: number, { req } : any) => {
                if (await fileService.getFileById(Number(id))) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            },
            bail: true
          },
    }
}