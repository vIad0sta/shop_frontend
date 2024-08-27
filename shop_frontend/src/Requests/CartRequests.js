import axiosInstance from "./AxiosInstance";

const url = '/carts'
export default class CartRequests{
    static async getCartBySession(){
        return (await axiosInstance.get(url)).data;
    }
    static async addCartItem(body){
        return (await axiosInstance.post(`${url}/${body.cartId}/items`, body)).data;
    }
    static async updateCartItem(cartId, body){
        return (await axiosInstance.patch(`${url}/${cartId}/items`, body)).data;
    }
    static async getCartProducts(cartId) {
        return (await axiosInstance.get(`${url}/${cartId}/items`)).data
    }
    static async deleteCartItem(cartItemId){
        return (await axiosInstance.delete(`${url}/items/${cartItemId}`)).data;
    }
    static async clearCart(cartId){
        return (await axiosInstance.delete(`${url}/${cartId}`)).data;
    }
}