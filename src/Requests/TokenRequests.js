import axiosInstance from "./AxiosInstance";

const url = '/tokens'
export default class TokenRequests{
    static async refreshTokens(){
        return (await axiosInstance.post(`${url}/refresh`, {})).data;
    }
}