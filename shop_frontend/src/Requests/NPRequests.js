import axiosInstance from "./AxiosInstance";

const url = `/nova-post`
export default class NPRequests{
    static async getSettlements(namePattern){
        return (await axiosInstance.get(`${url}/settlements?name=${namePattern}`)).data;
    }
    static async getWarehouses(settlementRef){
        return (await axiosInstance.get(`${url}/warehouses?settlementRef=${settlementRef}`)).data;
    }
}