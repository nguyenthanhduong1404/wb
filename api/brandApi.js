import axiosClient from "./axiosClient.js";

class Brand {
    getAllBrand = () => {
        let url = "/brand";
        return axiosClient.get(url);
    };
    getBrandById = (id) => {
        let url = `/brand/${id}`;
        return axiosClient.get(url);
    };
    createBrand = (brand) => {
        try {
            let url = "/brand";
            return axiosClient.post(url, brand);
        } catch (e) {
            console.log(e);
        }
    };
    deleteBrand = (id) => {
        try {
            let url = `/brand/${id}`;
            return axiosClient.delete(url);
        } catch (e) {
            console.log(e);
        }
    };
    changeBrand = (brand,id) => {
        try {
            let url = `/brand/info/${id}`;
            return axiosClient.put(url, brand);
        } catch (e) {
            console.log(e);
        }
    };
}
const brandApi = new Brand();

export default brandApi;