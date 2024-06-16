import axiosClient from "./axiosClient.js";

class Cart {
    getCartById = (id) => {
        let url = `/cart/${id}`;
        return axiosClient.get(url);
    };
    deleteProductById = (id) => {
        let url = `cart/idProduct/${id}`;
        return axiosClient.delete(url);
    };
    addCart = (cart) => {
        let url = "/cart";
        return axiosClient.post(url, cart);
    };
    updateCart = (cart) => {
        let url = "/cart";
        return axiosClient.put(url, cart);
    };
    deleteCartByUserID = (id) => {
        let url = `cart/idUser/${id}`;
        return axiosClient.delete(url);
    }

    getCartByIdProduct = (id)=> {
        let url = `cart/id_productforget/${id}`
        return axiosClient.get(url)
    }
    paypalPayment(amount){
        const url = `/buy`
        return axiosClient.post(url, amount)

    }
}
const cartsAPI = new Cart();

export default cartsAPI;
