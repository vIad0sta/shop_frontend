import axiosInstance from "./AxiosInstance";

const url = '/payment'
export default class PaymentRequests{
    static async getPaymentButton(body){
        return (await axiosInstance.post(`${url}`, body)).data;
    }
    static async checkPaymentStatus(params){
        return (await axiosInstance.post(`${url}/status?${new URLSearchParams(params)}`, {})).data;
    }
}