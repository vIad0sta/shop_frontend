import axiosInstance from "./AxiosInstance";

const url = '/carts'
export default class CartRequests{
    static async getCartBySession(){
        return (await axiosInstance.get(url)).data;
    }
    static async addCartItem(body){
        return (await axiosInstance.post(`${url}/${body.cartId}/cartItem`, body)).data;
    }
    static async updateCartItem(cartId, body){
        return (await axiosInstance.patch(`${url}/${cartId}/cartItem`, body)).data;
    }
    static async getCartItems(cartId) {
        return (await axiosInstance.get(`${url}/getCartItems/${cartId}`)).data
    }
    static async deleteCartItem(cartId, productId, clothingSizeId){
        return (await axiosInstance.delete(`${url}/${cartId}/cartItem/${productId}/size/${clothingSizeId}`)).data;
    }
    static async clearCart(cartId){
        return (await axiosInstance.delete(`${url}/${cartId}`)).data;
    }
}