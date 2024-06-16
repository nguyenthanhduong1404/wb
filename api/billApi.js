import axiosClient from "./axiosClient.js";

class Bill {
    createBill = (bill) => {
        let url = "/bill";
        return axiosClient.post(url, bill);
    };
    createBillDetail = (billDetail) => {
        let url = "/bill_detail";
        return axiosClient.post(url, billDetail);
    }
    getBillByIdUser = (id)=> {
        let url = `/bill/id_user/${id}`
        return axiosClient.get(url)
    }
    getBillByIdProduct = (id)=> {
        let url = `/bill_detail/id_product/${id}`
        return axiosClient.get(url)
    }
    getBillDetailByIdBill = (id)=> {
        let url = `/bill_detail/${id}`
        return axiosClient.get(url)
    }
    getMoney =(year) => {
        let url = `/bill/statistic_revenue/${year}`
        return axiosClient.get(url)
    }
    getYear =() => {
        let url = "/bill/year_bill"
        return axiosClient.get(url)
    }
    getAllBill = () => {
        let url = "/bill";
        return axiosClient.get(url);
    };
    getAllBillDetail = () => {
        let url = "/bill_detail";
        return axiosClient.get(url);
    };
    comfirmBill = (id) => {
        try {
            let url = `/bill/${id}`;
            return axiosClient.put(url);
        } catch (e) {
            console.log(e);
        }
    };
}
const billApi = new Bill();

export default billApi;
