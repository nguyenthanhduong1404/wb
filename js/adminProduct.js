import productsAPI from "../api/productApi.js";
import cartsAPI from "../api/cartApi.js";
import billApi from "../api/billApi.js";
import Toast from "../common/toast.js";
const getNameColor = (colorID) => {
    const colorList = [
        { idColor: 1, nameColor: "Đỏ" },
        { idColor: 2, nameColor: "Xanh" },
        { idColor: 3, nameColor: "Tím" },
        { idColor: 4, nameColor: "Vàng" },
        { idColor: 5, nameColor: "Hồng" },
        { idColor: 6, nameColor: "Đen" },
        { idColor: 7, nameColor: "Trắng" },
    ];
    const getColor = colorList.filter((colorItem) => {
        return colorItem.idColor === colorID;
    });
    if (getColor.length > 0) return getColor[0].nameColor;
    return "Not Found";
};
const getNameBrand = (BrandID) => {
    const brandList = [
        { brandID: 1, brand: "HERMES" },
        { brandID: 2, brand: "LOUIS VUITTON" },
        { brandID: 3, brand: "CHANEL" },
        { brandID: 4, brand: "FENDI" },
        { brandID: 5, brand: "vinGroup" },
        { brandID: 8, brand: "vinHome" },
    ];
    const getBrand = brandList.filter((brandItem) => {
        return brandItem.brandID === BrandID;
    });
    if (getBrand.length > 0) return getBrand[0].brand;
    return "Not Found";
};

const body_table = document.querySelector(".body-table-product");
const renderProduct = (productList, containerElement) => {
 const newProductList =    productList.map((product, index) => {
        return `
         <tr>
            <th class="text-center">${index + 1}</th>
            <td class="text-center">
                <img class="img-handle" src="data:image/jpg;base64, ${product.image}"
                    width="100"
                    height="100"
                    />
            </td>
            <td class="text-center">
                <span >${product.title}</span>
            </td>
            <td class="color-primary text-center">${getNameColor(+product.idColor)}</td>
            <td class="color-primary text-center">${getNameBrand(+product.idBrand)}</td>
            <td class="color-primary text-center">$${product.price}</td>
            <td class="color-primary text-center">
            ${product.quantity}
            </td>
            <td class="color-primary text-center" data-id="${product.idProduct}">
                <a href="add-update-product.html?idProduct=${product.idProduct}" class="update-admin-product btn-action btn-action--update">
                    Cập nhật
                </a>
                <button class="delete-admin-product btn-action btn-action--delete">
                    Xóa
                </button>
            </td>
        </tr> 
        `;
    });
    if(containerElement) {
        containerElement.innerHTML = newProductList.join("");
    }

    const deleteButtonList = document.querySelectorAll(".btn-action--delete")
    deleteButtonList.forEach(item=> {
        item.addEventListener("click", async () => {
            const idProduct = +item.parentElement.dataset.id
            // handle prodcut can not delete
         
            const billResultD = await billApi.getBillByIdProduct(idProduct)
            console.log(billResultD,"billResultD")
            console.log(billResultD.length,"billResultD.length")
            const cartResultD = await cartsAPI.getCartByIdProduct(idProduct)
            console.log(cartResultD.length,"cartResultD.length")
            console.log(cartResultD,"cartResultD")


            if (  billResultD.length!=0  || cartResultD.length!=0  )
            {
                Toast('Sản phẩm đã mua không thể xóa')
            }
            else{

                // delete
                await productsAPI.deleteProductById(idProduct)
                Toast('Sản phẩm đã được xóa thành công', 'success')
                setTimeout(() => {
                    location.reload();
                }, 1200)
            }

        })
    })
};
const handlerProduct = async () => {
    try {
        const productList = await productsAPI.getAllProduct();
        if (productList && productList.length > 0) {
            renderProduct(productList, body_table)

            // fillter
            const searchInput = document.querySelector(".search-product-input");
            const searchBtn = document.querySelector(".search-product-btn");
            searchBtn.addEventListener("click", async () =>{
                // const filterResult = productList.filter((item) => {
                //     return item.title.includes(searchInput.value)
                // })
                // console.log(filterResult)
                if(searchInput.value)
                {
                    const filterResult = await productsAPI.getProductByName(searchInput.value);
                    renderProduct(filterResult, body_table)
                }
                else{
                    handlerProduct()
                }
                // hanhdle
                const imgHandler = document.querySelectorAll(".img-handle");
                console.log(imgHandler)
                imgHandler.forEach(img => {
                    img.onerror = function() {
                        img.src = "../images/mainIMG.png"
                    };
                })

            })

            // handle img
            const imgHandler = document.querySelectorAll(".img-handle");
            console.log(imgHandler)
            imgHandler.forEach(img => {
                img.onerror = function() {
                    img.src = "../images/mainIMG.png"
                };
            })
        }
    } catch (error) {
        console.log(error);
    }
};

handlerProduct()
