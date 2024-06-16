import axiosClient from "./axiosClient.js";

class Color {
    getColorById = (id) => {
        let url = `/color/${id}`;
        return axiosClient.get(url);
    }
    getAllColor = ()=> {
        let url = "/color";
        return axiosClient.get(url);
    }
}
const colorApi = new Color();

export default colorApi;