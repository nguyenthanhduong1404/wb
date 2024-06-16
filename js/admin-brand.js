import brandApi from "../api/brandApi.js";
import customersAPI from "../api/customerApi.js";
import Toast from "../common/toast.js";
import fommatDate from "../common/fommatDate.js";
import productsAPI from "../api/productApi.js";

const brandList = document.querySelector(".brand-list");
const nameInput = document.querySelector(".name-input");
const btnAddBrand = document.querySelector(".btn-add-brand");
const btnDelete = document.querySelector(".btn-delete-brand");


const getAllBrand = async () => {
    try {
        const result = await brandApi.getAllBrand();
        const htmlCode = result.map((brand) => {
            return `<tr>
            <td>${brand.idBrand}</td>
            <td>${brand.nameBrand}</td>

            <td><button data-toggle="modal" data-target="#exampleModalCenter" type="button" class="btn btn-danger btn-delete-open mr-3" value=${brand.idBrand}>Xóa</button>
            <button data-toggle="modal" data-target="#exampleModalUpdate" type="button" class="btn btn-primary btn-update-open" value=${brand.idBrand}>Cập nhật</button></td>
        </tr>`
        });
        brandList.innerHTML = htmlCode.join("");

        //xoa
        const btnDeleteOpen = document.querySelectorAll(".btn-delete-open");
        btnDeleteOpen.forEach((item) =>{
            item.addEventListener("click",async () => {
                const resultPr = await productsAPI.getAllProduct();
                const arrBrandDaCo = resultPr.map((product) => {
                    return product.idBrand
                })
                let index = arrBrandDaCo.findIndex((id) =>{
                    return id ==item.value
                })
                console.log(index,"index");
                if(index == -1)
                {
                    await DeleteBrand(item.value)
                    getAllBrand();
                }
                else{
                    Toast("Không thể xóa thương hiệu đã có sản phẩm")
                }
                
            })
        })

        // cap nhat
        const btnUpdateOpen = document.querySelectorAll(".btn-update-open");
        const btnUpdate = document.querySelector(".btn-update-brand");

        btnUpdateOpen.forEach((item) =>{
            item.addEventListener("click",async () => {
                let dataUpdate = await brandApi.getBrandById(item.value)
                document.querySelector(".id-update-input").value= dataUpdate.idBrand
                document.querySelector(".name-update-input").value= dataUpdate.nameBrand
                
                // khi an nut xac nhan
                btnUpdate.addEventListener("click",async () => {
                    let newName = document.querySelector(".name-update-input").value
                    await UpdateBrand({nameBrand:newName}, item.value)
                    Toast("Cập nhật thành công", "success")
                    getAllBrand();
                })
            })
        })

    } catch (error) {
        console.log(error);
    }
};

getAllBrand();

const AddBrand = async () => {
    try {
        const result = await brandApi.createBrand({
            nameBrand: nameInput.value
        });
    } catch (error) {
        console.log(error);
    }
};

const DeleteBrand = async (id) => {
    try {
        const result = await brandApi.deleteBrand(id);
        Toast("Xác nhận thành công", "success")
    } catch (error) {
        console.log(error);
        Toast("Không thể xóa thương hiệu đã có sản phẩm")
    }
};

const UpdateBrand = async (brand, id) => {
    try {
        const result = await brandApi.changeBrand(brand, id);
    } catch (error) {
        console.log(error);
    }
};


// them brand

btnAddBrand.addEventListener("click", async () => {
    await AddBrand();
    Toast("Thêm thành công", "success")
    getAllBrand();
});



