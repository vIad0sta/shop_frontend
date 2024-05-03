import axiosInstance from "./AxiosInstance";
const url = '/auth'
export default class AuthRequests{
    static async registration(body){
        return (await axiosInstance.post(`${url}/registration`, body)).data;
    }
    static async login(body){
        return (await axiosInstance.post(`${url}/login`, body)).data;
    }
    static async restorePassword(body){
        return (await axiosInstance.post(`${url}/forgot-password`, body)).data;
    }
    static async changePassword(body){
        return (await axiosInstance.post(`${url}/change-password`, body)).data;
    }
}