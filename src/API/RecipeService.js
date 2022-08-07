import axios from "axios";


export default class RecipeService {

    static async getAll() {
        const response = await axios.get("http://localhost:10010/api/v1/recipes");
        return response
    }

    static async getOne(entityId) {
        return await axios.get("http://localhost:10010/api/v1/recipes/" + entityId);
    }

    static async getPage(pageId) {
        return await axios.get("http://localhost:10010/api/v1/recipes/page/" + pageId);
    }

    static async getPageFilteredByProductsAndTags(pageId, arr) {
        return await axios.post("http://localhost:10010/api/v1/recipes/page/" + pageId, arr);
    }

    static async getByProductIdIn(entityId) {
        return await axios.get("http://localhost:10010/api/v1/recipes/products/" + entityId);
    }

    static async save(recipe) {
        const response = await axios.post("http://localhost:10010/api/v1/recipes", recipe);
        return response
    }

    static async remove(recipe) {
        const response = await axios.delete("http://localhost:10010/api/v1/recipes/" + recipe.entityId);
        return response
    }

    static async update(recipe) {
        const response = await axios.put("http://localhost:10010/api/v1/recipes", recipe);
        return response
    }

    static async uploadImage(entityId, imageData) {
        if (imageData.entries().next().value[1] !== null) {
            const response = await axios.post("http://localhost:10010/api/v1/recipes/" + entityId + "/image", imageData);
            return response;
        }
    }

    static async getImage(entityId) {
            const response = await axios.get("http://localhost:10010/api/v1/recipes/" + entityId + "/image");
            return response;
    }

}