import axiosInstance from "./AxiosInstance";

const url = `/orders`
export default class OrderRequests{
    static async getOrders(){
        return (await axiosInstance.get(`${url}`)).data;
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
    static async getOrdersPages(){
        return (await axiosInstance.get(`${url}/pages`)).data;
    }
    static async getSettlements(){
        return (await axiosInstance.get(`${url}/settlements`)).data;
    }
    static async getDepartments(){
        return (await axiosInstance.get(`${url}/departments`)).data;
    }
    static async addOrder(body){
        return (await axiosInstance.post(url, body)).data;
    }
    static async deleteOrder(orderId){
        return (await axiosInstance.delete(`${url}/${orderId}`)).data;
    }
}