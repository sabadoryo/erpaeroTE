import TagRepository from "../repos/TagRepository";

export default class TagService {
    tagRepository: TagRepository

    constructor() {
        this.tagRepository = new TagRepository();
    }

    async createTag(tagData: any) {
        return this.tagRepository.createTag(tagData.name, tagData.taskId);
    }

    async editTag(tagData: any) {
        return this.tagRepository.editTag(tagData.id, tagData.name, tagData.taskId);
    }

    async getTagById(tagId: string) {
        const task = await this.tagRepository.findTagById(tagId);

        return task;
    }

    async getAllTags() {
        return this.tagRepository.getAllTags();
    }

    async deleteTagById(tagId: string) {
        return this.tagRepository.deleteTagById(tagId);
    }
}