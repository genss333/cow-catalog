import API from "./baseApi";

export default {
    async get(url, params) {
        return await API.get(url, { params });
    },
    async post(url, data) {
        return await API.post(url, data);
    },
    async put(url, data) {
        return await API.put(url, data);
    },
    async delete(url, data) {
        return await API.delete(url, data);
    },
};