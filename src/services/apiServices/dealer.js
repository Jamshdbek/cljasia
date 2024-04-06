import request from "../api";

class DealerApiService {
    static GetAllData = () => {
        return request.get("/v1");
    };

    static GetAllDealersPrices = () => {
        return request.get("/api/user-web/v1/dealers");
    };

    static GetCityDealersPrices = (params) => {
        return request.get(`/api/v1/dealer-prices`, { params: { ...params } });
    };

    static GetDataCityDealersPrices = (id) => {
        return request.get(`/api/v1/get-price-details/${id}`);
    };

    static PostDealerPrice = (params) => {
        return request.post("/api/v1/create-dealer-price-details", params);
    };

    static PutDealerPrice = (params) => {
        return request.put("/api/v1/update", params);
    };

    static GetDealersAccounting = (params) => {
        console.log("params",params)
        return request.get(
            `/api/v1/accounting-search?dealerId=${params.dealerId}&year=${params.year}&month=${params.month}&date=${params.date}` 
        );
    };

    static PostDealerAccountingNote = (params) => {
        return request.post("/api/v1/accounting", params);
    };

    static GetBoxOrder = (params) => {
        return request.get("/api/box-order/v1",{ params:{...params}});
    };

    static GetBoxPrice = (params) => {
        return request.get("/box-price/v1", params);
    };

    static AddBoxOrder = (params) => {
        return request.post("/api/box-order/v1", params);
    };

    static UpdateBoxOrderStatus = (params) => {
        return request.put("/api/box-order/v1", params);
    };

    static UpdateBoxOrderPrice = (params) => {
        return request.put("/box-price/v1", params);
    };

    static AddBoxOrderPrice = (params) => {
        return request.put("/box-price/v1", params);
    };
}

export default DealerApiService;
