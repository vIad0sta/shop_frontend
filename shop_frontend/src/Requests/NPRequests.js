import axiosInstance from "./AxiosInstance";

const url = `/nova-post`
export default class NPRequests{
    static async getSettlements(namePattern){
        return (await axiosInstance.get(`${url}/settlements?name=${namePattern}`)).data;
    }
    static async getDepartments(settlementRef){
        return (await axiosInstance.get(`${url}/departments?settlementRef=${settlementRef}`)).data;
    }
}