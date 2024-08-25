import axiosInstance from "./AxiosInstance";
const url = '/users'
export default class RegisteredUserRequests {
    static async getUser(id){
        return (await axiosInstance.get(`${url}/${id}`)).data;
    }
    static async getCart(id) {
        return (await axiosInstance.get(`${url}/${id}/carts`)).data;
    }
    static async getOrders() {
        return (await axiosInstance.get(`${url}/orders`)).data;
    }
    static async updateUser(userId, body){
        return (await axiosInstance.patch(`${url}/${userId}`, body)).data;
    }
}