import customersAPI from "../api/customerApi.js";
import Toast from "../common/toast.js";

const block = async (id) => {
    try {
        const result = await customersAPI.block(id);
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
}

const unBlock = async (id) => {
    try {
        const result = await customersAPI.unBlock(id);
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
}



const getAllCustomer = async () => {
    try {
        const result = await customersAPI.getAllCustomer();
        const customers = result.filter((item) => {
            return item.idRole == 2
        })
        console.log(customers);
        const listCustomers = document.querySelector(".info-customers");
        const listCustomerInner = customers.map((item) => {
            return `<tr>
            <td>${item.username}</td>
            <td>${item.name}</td>
            <td><span class="text-muted">${item.email}</span>
            </td>
            <td>${item.addressCustomer}</td>
            <td>${item.phone}</td>
            <td><button value=${item.idUser} style="width:92.1px" type="button" class="btn btn-${item.status? "primary" : "danger"}">${item.status? "Khóa" : "Mở khóa"}</button></td>
        </tr>`
        })

        listCustomers.innerHTML = listCustomerInner.join("");

        // block

        
        const listCanBlock = document.querySelectorAll(".btn-primary")
        console.log(listCanBlock);
        listCanBlock.forEach( (item) => {
            item.addEventListener("click", () => {
                function blockr(recall) {
                    block(item.value);
                    item.classList.remove("btn-primary");
                    item.classList.add("btn-danger");
                    item.innerText = "Mở khóa";
                    // recall();
                    Toast("Khóa tài khoản thành công", "success");
                    setTimeout(recall, 1000);
                }
                blockr(getAllCustomer)
                //getAllCustomer();

            })
        })

        // unblock
        
        const listUnBlock = document.querySelectorAll(".btn-danger")
        console.log(listUnBlock);
        listUnBlock.forEach( (item) => {
            item.addEventListener("click", () => {         
                //getAllCustomer();
                function unBlockr(recall) {
                    unBlock(item.value);
                    item.classList.remove("btn-danger");
                    item.classList.add("btn-primary");
                    item.innerText = "Khóa";
                    Toast("Mở khóa tài khoản thành công", "success");
                    setTimeout(recall, 1000);
        
                }
                unBlockr(getAllCustomer)
            })
        })


    } catch (e) {
        console.log(e);
    }
};

getAllCustomer()
