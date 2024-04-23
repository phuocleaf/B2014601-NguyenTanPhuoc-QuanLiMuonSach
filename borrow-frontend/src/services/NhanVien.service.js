import createApiClient from "./api.service";
class NhanVienService {
    constructor(baseUrl = "/api/nhanvien") {
        this.api = createApiClient(baseUrl);
    }
    async signIn(data) {
        return (await this.api.post("/signin", data)).data;
    }
     
    async getNhanVien(id) {
        return (await this.api.get(`/${id}`)).data;
    }
}
export default new NhanVienService();