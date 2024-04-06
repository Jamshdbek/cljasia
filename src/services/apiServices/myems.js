import request from "../api";

class MyemsApiService {
    static GetMyemsAllPosts = (params) => {

        return request.get('/api/myEms/v1/get-post-list', { params: params })
    }
    static GetSingleMyemsPost = (id) => {

        return request.get(`/api/myEms/v1/get-single-post/${id}`)
    }
    static getNationList = (id) => {

        return request.get(`/api/myEms/v1/get-nation-list/${id}`)
    }
    static getDeliveyCost = (params) => {
        return request.post(`/api/myEms/v1/delivery-cost/${params?.id}`, params)
    }
    static createPost = (params) => {
        return request.post('/api/myEms/v1/create-post', params)
    }
    static createPostFirstApi = () => {
        return request.get('/api/v1/create-post')
    }
    static deletedPostmyEms = (id) => {
        return request.delete(`/api/myEms/v1/cancel-post/${id}`)
    }
    static newDetails = () => {
        return request.get('/api/myEms/v1/new-post-details')
    }
    static getReceivers = (params) => {
        return request.get(`/api/myEms/v1/get-receivers?size=${params.size}&page=${params.page}&search=${params.search}`)
    }
    static searchHsCode = (params) => {
        return request.get(`/api/myEms/v1/search-hs-code?type=${params.type}&search=${params.search}`)
    }
    static searchHsDB = (params) => {
        return request.get(`/api/myEms/v1/search-hs-db?search=${params}`)
    }
    static getNationDetails = (nation) => {
        return request.get(`/api/myEms/v1/get-nation-details/1/${nation}`)
    }
}
export default MyemsApiService