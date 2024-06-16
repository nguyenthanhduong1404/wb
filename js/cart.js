import billApi from "../api/billApi.js";
import cartsAPI from "../api/cartApi.js";
import handleDeleteProduct from "../common/handleDeleteProduct.js";
import { getProductInCart } from "../common/handleRenderCart.js";
import productsAPI from "../api/productApi.js";
import Toast from "../common/toast.js";

const wrap_item = document.querySelector(".table-shopping-cart .wrap-item");
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (!userInfo) {
    window.location.href = "login.html";
}
const handleRenderProductInCart = async () => {
    const productList = await getProductInCart();
    if (productList.length <= 0) {
        return;
    }
    const newProductList = productList.map((product) => {
        return `  <tr class="table-row cart-item " >
        <td class="column-1">
            <div
                class="cart-img-product b-rad-4 o-f-hidden remove-product" data-product="${
                    product.idProduct
                }"
            >
                <img
                src="data:image/jpg;base64, ${
                    product.image
                }" width="90" height="120"
                    alt="IMG-PRODUCT"
                    class="img-handle"
                />
            </div>
        </td>
        <td class="column-2">${product.title}</td>
        <td class="column-3">$ ${product.price}</td>
        <td class="column-4">
            <div class="flex-w bo5 of-hidden w-size17">
                <button
                    class="btn-num-product-down btn-down color1 flex-c-m size7 bg8 eff2"
                >
                    <i
                        class="fs-12 fa fa-minus"
                        aria-hidden="true"
                    ></i>
                </button>
                <input
                    class="size8 m-text18 t-center num-product"
                    type="number"
                    name="num-product1"
                    data-quantity="${product.quantity}"
                    quantity="${product.quantity}"
                    value="${product.quantityChoice}"
                    disabled
                />
                <button
                    class="btn-num-product-up btn-up color1 flex-c-m size7 bg8 eff2"
                >
                    <i
                        class="fs-12 fa fa-plus"
                        aria-hidden="true"
                    ></i>
                </button>
            </div>
        </td>
        <td class="column-5 product-price" data-price="${
            product.price
        }"  data-id="${product.idProduct}">$ <span>${
            +product.quantityChoice * product.price
        }</span>
        </td>
    </tr>`;
    });
    wrap_item.innerHTML = newProductList.join("");

    //
    const imgHandler = document.querySelectorAll(".img-handle");
    console.log(imgHandler);
    imgHandler.forEach((img) => {
        img.onerror = function () {
            img.src = "../images/mainIMG.png";
        };
    });

    const btnDownList = document.querySelectorAll(".btn-down");
    const btnUpList = document.querySelectorAll(".btn-up");
    const num_productList = document.querySelectorAll(".num-product");
    const productPrices = document.querySelectorAll(".product-price");
    const totalPriceEl = document.querySelector(".total-price");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    let totalPriceBefore = 0;
    productPrices.forEach((product) => {
        const priceUpdate = +product.innerText.slice(2);
        totalPriceBefore += priceUpdate;
    });
    totalPriceEl.textContent = `$ ${totalPriceBefore}`;

    btnDownList.forEach((btnDown, index) => {
        btnDown.addEventListener("click", () => {
            let quantityChoice = +num_productList[index].value;
            const priceOfProduct = productPrices[index].dataset.price;
            if (quantityChoice === 0) return;
            +num_productList[index].value--;
            productPrices[index].innerHTML = `$ ${
                +priceOfProduct * +num_productList[index].value
            }`;
        });
    });

    btnUpList.forEach((btnUp, index) => {
        btnUp.addEventListener("click", () => {
            const quantityAvailable = +num_productList[index].dataset.quantity;
            const priceOfProduct = productPrices[index].dataset.price;
            if (+num_productList[index].value === quantityAvailable) return;
            +num_productList[index].value++;
            productPrices[index].innerHTML = `$ ${
                +priceOfProduct * +num_productList[index].value
            }`;
        });
    });

    const btn_updateCart = document.querySelector(".btn-Update-Cart");
    btn_updateCart.addEventListener("click", () => {
        let cart_item = document.querySelectorAll(".cart-item");
        if (cart_item && cart_item.length === 0) {
            Toast("Không có đơn hàng nào!");
            return;
        }
        let totalPrice = 0;
        productPrices.forEach(async (product, index) => {
            const priceUpdate = +product.innerText.slice(2);
            const idProduct = product.dataset.id;
            if (priceUpdate === 0) {
                await cartsAPI.deleteProductById(idProduct);
                product.parentNode.remove();
            }

            totalPrice += priceUpdate;
            const quantity = +num_productList[index].value;
            const cartItem = {
                idUser: userInfo.idUser,
                idProduct: idProduct,
                quantity: quantity,
            };
            await cartsAPI.updateCart(cartItem);
        });
        Toast("Cập nhật giỏ hàng thành công", "success");
        totalPriceEl.textContent = `$ ${totalPrice}`;
        cart_item = null;
    });

    let cartItem_list_remove = document.querySelectorAll(
        ".cart-item .remove-product"
    );

    handleDeleteProduct(cartItem_list_remove);
};

const handleRenderInfoUser = () => {
    const address = document.querySelector(".address");
    const fullName = document.querySelector(".fullName");
    const phoneNumber = document.querySelector(".phoneNumber");
    const infoUser = JSON.parse(localStorage.getItem("userInfo"));
    if (infoUser) {
        address.textContent = infoUser.addressCustomer;
        fullName.textContent = infoUser.name;
        phoneNumber.textContent = infoUser.phone;
    }
};
const getDate = () => {
    const d = new Date();
    const mm = d.getMonth() + 1;
    const dd = d.getDate();
    const yy = d.getFullYear();
    const myDateString = yy + "-" + mm + "-" + dd;
    return myDateString;
};
const handleCreateBill = async () => {
    const date = getDate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const product_price_El = document.querySelectorAll(".product-price");
    const input_quantity_El = document.querySelectorAll(".num-product");
    const bill = {
        idUser: userInfo.idUser,
        dateBill: date,
        status: 0,
    };
    if (product_price_El.length === 0 || input_quantity_El.length === 0) {
        Toast("không có đơn hàng nào ");
        return;
    }
    const resultBill = await billApi.createBill(bill);
    if (resultBill) {
        product_price_El.forEach(async (item, index) => {
            const idBill = resultBill.data;
            const idProduct = item.getAttribute("data-id");
            const quantity = +input_quantity_El[index].value;
            const price = quantity * item.getAttribute("data-price");
            const billDetail = {
                idBill,
                idProduct,
                quantity,
                price,
            };
            await billApi.createBillDetail(billDetail);

            const allPr = document.querySelector(".num-product");
            let PrQuan = parseInt(allPr.getAttribute("quantity"));

            // sua so luong
            const valueImportProduct = {
                idProduct,
                quantityImport: PrQuan - quantity,
            };
            const changeQuantityPr = await productsAPI.modifiProduct(
                valueImportProduct
            );
        });
        await cartsAPI.deleteCartByUserID(userInfo.idUser);
        Toast("Bạn đã đặt hàng thành công", "success");
        setTimeout(() => {
            window.location.href = "purchase-order.html";
        }, 1500);
    }
};

const orderProduct = document.querySelector(".order-product");
const handleOrderProduct = () => {
    orderProduct.addEventListener("click", async () => {
        handleCreateBill();
    });
};
handleOrderProduct();
handleRenderInfoUser();
handleRenderProductInCart();
// paypal
const buttonPaypal = document.querySelector(".paypal-button");
buttonPaypal.addEventListener("click", async () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const product_price_El = document.querySelectorAll(".product-price");
        const input_quantity_El = document.querySelectorAll(".num-product");
        if (product_price_El.length === 0 || input_quantity_El.length === 0) {
            Toast("không có đơn hàng nào ");
            return;
        }
        let cartArr = []
        product_price_El.forEach(async (item, index) => {
            const idProduct = item.getAttribute("data-id");
            const quantity = +input_quantity_El[index].value;
            const price = quantity * item.getAttribute("data-price");
            const billDetail = {
                idProduct,
                quantity,
                price,
            };
            
            cartArr.push(billDetail)
            
        });
        
        const res = await cartsAPI.paypalPayment({user:userInfo.idUser, productList: cartArr});
        if(res && res.url){
            window.location.href = res.url;
        }
    } catch (error) {
        console.log(error);
    }
});


