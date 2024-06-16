import brandApi from "../api/brandApi.js";
import colorApi from "../api/colorApi.js";
import productsAPI from "../api/productApi.js";
import Toast from "../common/toast.js";

var base64String = "";
const selectBrand = document.querySelector(".brand-list");
const selectColor = document.querySelector(".color-list");
const titleInput = document.querySelector(".title-input");
const priceInput = document.querySelector(".price-input");
const quantityInput = document.querySelector(".quantity-input");
const descriptionInput = document.querySelector(".description-area");
const imageInput = document.querySelector(".image-input");
const btnSubmit = document.querySelector(".btn-submit-product");
let valueSubmit = {
    title: "",
    image: "",
    idColor: null,
    idBrand: null,
    price: 0,
    quantity: 0,
    descr: "",
};
const renderSelect = (list, containerElement, type) => {
    const newList = list.map((item) => {
        return `
    <option  value="${type ? item.idBrand : item.idColor}">
        ${type ? item.nameBrand : item.nameColor}
    </option>
        `;
    });
    const defaultOption = ` <option value="">
             Please select
        </option>`;
    newList.unshift(defaultOption);
    if (containerElement) {
        containerElement.innerHTML = newList.join("");
    }
};

const handleRenderBrand = async () => {
    try {
        const brandList = await brandApi.getAllBrand();
        if (brandList && brandList.length > 0) {
            renderSelect(brandList, selectBrand, "BRAND");
        }
    } catch (error) {
        console.log(error);
    }
};
const handleRenderColor = async () => {
    try {
        const colorList = await colorApi.getAllColor();
        if (colorList && colorList.length > 0) {
            renderSelect(colorList, selectColor);
        }
    } catch (error) {
        console.log(error);
    }
};

handleRenderBrand();
handleRenderColor();

const setValueInput = (inputElm, value) => {
    inputElm.value = value;
};

const setValueSelect = (select, value) => {
    let i = 0;
    while (i < 10) {
        if (+select.options[i].value === value) {
            select.options[i].selected = true;
            return;
        }
        i++;
    }
};

const handleLoadProductUpdate = async () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("idProduct")) {
        const idProduct = +params.get("idProduct");
        const product = await productsAPI.getProductById(idProduct);
        if (product && product.length > 0) {
            setValueInput(titleInput, product[0].title);
            setValueInput(quantityInput, product[0].quantity);
            setValueInput(priceInput, product[0].price);
            setValueInput(descriptionInput, product[0].descr);
            setValueSelect(selectBrand, product[0].idBrand);
            setValueSelect(selectColor, product[0].idColor);
        }
    }
};

handleLoadProductUpdate();

const convertImageToBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = function () {
        base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    };

    reader.readAsDataURL(file);
};

const getValueInput = (inputElm, key) => {
    inputElm.addEventListener("change", (e) => {
        if (key === "image") {
            valueSubmit[key] = inputElm["files"][0];
            convertImageToBase64(inputElm["files"][0]);
            return;
        }
        valueSubmit[key] = e.target.value;
    });
};

getValueInput(titleInput, "title");
getValueInput(priceInput, "price");
getValueInput(quantityInput, "quantity");
getValueInput(descriptionInput, "descr");
getValueInput(imageInput, "image");
getValueInput(selectBrand, "idBrand");
getValueInput(selectColor, "idColor");

const handleSubmit = (data, btnSubmit) => {
    if (btnSubmit) {
        btnSubmit.addEventListener("click", async (e) => {
            console.log(123)
            try {
                // e.preventDefault();
                data.image = base64String;
                const params = new URLSearchParams(window.location.search);
                if (params.has("idProduct")) {
                    const id = params.get("idProduct");
                    const resProductById = await productsAPI.getProductById(id);
                    if (resProductById && resProductById.length > 0) {
                        for (const key in data) {
                            if (!data[key]) {
                                delete data[key];
                            }
                        }
                        data = { ...resProductById[0], ...data };
                        delete data.idProduct;
                    }
                    const res = await productsAPI.updateProduct(id, data);

                    if (res && res.status) {
                        Toast("Cập nhật sản phẩm thành công", "success");
                    } else {
                        Toast("Cập nhật sản phẩm thất bại");
                        return;
                    }
                } else {
                    const res = await productsAPI.createProduct(data);

                    if (res && res.status) {
                        Toast("Thêm sản phẩm thành công", "success");
                    } else {
                        Toast("Thêm sản phẩm thất bại");
                        return;
                    }
                }
                setTimeout(() => {
                    window.location.href = "adminProduct.html";
                }, 1200);
            } catch (error) {
                console.log(error);
            }
        });
    }
};
handleSubmit(valueSubmit, btnSubmit);
