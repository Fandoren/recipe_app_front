import axios from "axios";

export default class ProductService {

    static async getAll() {
        const response = await axios.get("http://localhost:10060/api/v1/products");
        return response
    }

    static async getOne(entityId) {
        return await axios.get("http://localhost:10060/api/v1/products/" + entityId);
    }

    static async getByTagId(entityId) {
        return await axios.get("http://localhost:10060/api/v1/products/tags/" + entityId);
    }

    static async getAllByIds(entityIds) {
        return await axios.post("http://localhost:10060/api/v1/products/list", entityIds)
    }

    static async getPage(pageId) {
        return await axios.get("http://localhost:10060/api/v1/products/page/" + pageId);
    }

    static async getPageFilterByIds(pageId, entityIds) {
        console.log(entityIds)
        return await axios.post("http://localhost:10060/api/v1/products/page/" + pageId, entityIds)
    }

    static async save(product) {
        const response = await axios.post("http://localhost:10060/api/v1/products", product);
        return response
    }

    static async remove(product) {
        const response = await axios.delete("http://localhost:10060/api/v1/products/" + product.entityId);
        return response
    }

    static async update(product) {
        const response = await axios.put("http://localhost:10060/api/v1/products", product);
        return response
    }

    static async uploadImage(entityId, imageData) {
        if (imageData.entries().next().value[1] !== null) {
            const response = await axios.post("http://localhost:10060/api/v1/products/" + entityId + "/image", imageData);
            return response;
        }
    }

    static async getImage(entityId) {
            const response = await axios.get("http://localhost:10060/api/v1/products/" + entityId + "/image");
            return response;
    }

}