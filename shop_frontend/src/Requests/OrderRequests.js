import axiosInstance from "./AxiosInstance";

const url = `/orders`
export default class OrderRequests{
    static async getAllOrders(params){
        return (await axiosInstance.get(`${url}?${new URLSearchParams(params)}`)).data;
    }
    static async getOrder(orderId){
        return (await axiosInstance.get(`${url}/${orderId}`)).data;
    }
    static async getOrderItems(orderId){
        return (await axiosInstance.get(`${url}/${orderId}/orderItems`)).data;
    }
    static async getOrdersBySession(){
        return (await axiosInstance.get(`${url}/session`)).data;
    }
    static async getOrdersStatuses(){
        return (await axiosInstance.get(`${url}/statuses`)).data;
    }
    static async getOrdersPagesAmount(){
        return (await axiosInstance.get(`${url}/pages`)).data;
    }
    static async addOrder(body, cartId){
        return (await axiosInstance.post(`${url}/carts/${cartId}`, body)).data;
    }
    static async addSpecificOrder(body, idArray){
        return (await axiosInstance.post(`${url}/carts/spec/${idArray}`, body)).data;
    }
    static async deleteOrder(orderId){
        return (await axiosInstance.delete(`${url}/${orderId}`)).data;
    }
}