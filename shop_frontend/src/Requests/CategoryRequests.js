import axiosInstance from "./AxiosInstance";

const url = '/categories'
export default class CategoryRequests{
    static async getCategories(){
        return (await axiosInstance.get(url)).data;
    }
}