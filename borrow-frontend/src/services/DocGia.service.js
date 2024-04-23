import createApiClient from "./api.service";
class DocGiaService {
    constructor(baseUrl = "/api/docgia") {
        this.api = createApiClient(baseUrl);
    }
    
    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async signIn(data) {
        return (await this.api.post("/signin", data)).data;
    }

    async getDocGia(id) {
        return (await this.api.get(`/${id}`)).data;
    }
}
export default new DocGiaService();