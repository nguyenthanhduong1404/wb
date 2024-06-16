import axiosClient from "./axiosClient.js";

class Products {
    getAllProduct = () => {
        let url = "/product";
        return axiosClient.get(url);
    };
    getProductById = (id) => {
        let url = `/product/${id}`;
        return axiosClient.get(url);
    }
    getProductByName = (name) => {
        let url = `/product/name/${name}`;
        return axiosClient.get(url);
    }
    deleteProductById = (id) => {
        let url = `/product/${id}`
        return axiosClient.delete(url);
    }

    createProduct = (product) => {
        let url = `/product`
        return axiosClient.post(url, product)
    }

    updateProduct = (id,product) => {
        let url = `/product/${id}`
        return axiosClient.put(url, product)
    }

    modifiProduct = (product) => {
        let url = `/product/changequantity`
        return axiosClient.put(url, product)
    }
}
const productsAPI = new Products();

export default productsAPI;
