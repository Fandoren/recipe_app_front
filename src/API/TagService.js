import axios from "axios";

export default class TagService {
    static async getAll() {
        const response = await axios.get("http://localhost:10010/api/v1/tags");
        return response
    }

    static async getOne(entityId) {
        return await axios.get("http://localhost:10010/api/v1/tags/" + entityId);
    }

    static async getPage(pageId) {
        return await axios.get("http://localhost:10010/api/v1/tags/page/" + pageId);
    }

    static async save(tag) {
        const response = await axios.post("http://localhost:10010/api/v1/tags", tag);
        return response
    }

    static async remove(tag) {
        const response = await axios.delete("http://localhost:10010/api/v1/tags/" + tag.entityId);
        return response
    }

    static async update(tag) {
        const response = await axios.put("http://localhost:10010/api/v1/tags", tag);
        return response
    }

    static async uploadImage(entityId, imageData) {
        if (imageData.entries().next().value[1] !== null) {
            const response = await axios.post("http://localhost:10010/api/v1/tags/" + entityId + "/image", imageData);
            return response;
        }
    }

    static async getImage(entityId) {
            const response = await axios.get("http://localhost:10010/api/v1/tags/" + entityId + "/image");
            return response;
    }
}