import TagService from "../../services/TagService";

const tagService = new TagService();

export default {
    tagId: {
        notEmpty: {
            errorMessage: "Id should be provided."
        },
        custom: {
            errorMessage: "Provided tag doesn't exist",
            options: async (tagId: string, { req } : any) => {
                const tag = await tagService.getTagById(tagId);
                
                if (tag) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            },
            bail: true
        },
    },
}