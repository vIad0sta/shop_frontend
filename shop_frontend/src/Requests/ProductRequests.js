import axiosInstance from "./AxiosInstance";

const url = '/products'
export default class ProductRequests{
    static async getAllProducts(params){
        return (await axiosInstance.get(`${url}?${new URLSearchParams(params)}`)).data;
    }
    static async getProduct(productId){
        return (await axiosInstance.get(`${url}/${productId}`)).data;
    }
    static async getProductsByIdArray(productIds){
        const promises = productIds.map(productId =>
            axiosInstance.get(`${url}/${productId}`)
        );
        const responses = await Promise.all(promises);
        return responses.map(response => response.data);
    }

    static async getProductReviews(productId){
        return (await axiosInstance.get(`${url}/${productId}/reviews`)).data;
    }
    static async getProductImages(productId) {
        return (await axiosInstance.get(`${url}/${productId}/images`)).data;
    }
    static async getProductsImages() {
        return (await axiosInstance.get(`${url}/images`)).data;
    }
    static async getProductsSizes() {
        return (await axiosInstance.get(`${url}/sizes`)).data;
    }
    static async getProductsPages(params) {
        return (await axiosInstance.get(`${url}/pagesAmount?${new URLSearchParams(params)}`)).data;
    }
    static async addProduct(body){
        return (await axiosInstance.post(`${url}`, body)).data;
    }
    static async updateProduct(body){
        return (await axiosInstance.patch(`${url}`, body)).data;
    }
}