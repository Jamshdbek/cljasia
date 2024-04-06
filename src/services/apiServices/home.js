import request from "../api";

class HomeApiService {
    static GetHomeDailyStatistics = () => {
        return request.get("/api/v1/daily");
    };

    static GetHomeMonthlyStatistics = () => {
        return request.get("/api/v1/monthly-price");
    };

    static GetHomeFilterStatistics = (params) => {
        return request.get("/api/v1/period-statistic", { params: { ...params } });
    };

    
}

export default HomeApiService;