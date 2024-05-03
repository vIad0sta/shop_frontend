import axiosInstance from "./AxiosInstance";

const url = '/reviews'
export default class ReviewRequests{
    static async getReview(reviewId){
        return (await axiosInstance.get(`${url}/${reviewId}`)).data;
    }
    static async addReview(body){
        return (await axiosInstance.post(`${url}`, body)).data;
    }
    static async updateReview(body){
        return (await axiosInstance.patch(`${url}`, body)).data;
    }
    static async deleteReview(reviewId){
        return (await axiosInstance.delete(`${url}/${reviewId}`)).data;
    }
    static async deleteReviewAdmin(reviewId){
        return (await axiosInstance.delete(`${url}/${reviewId}/admin`)).data;
    }
}