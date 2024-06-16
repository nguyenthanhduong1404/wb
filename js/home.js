import productsAPI from "../api/productApi.js";
import handleRenderPrInHome from "../common/handelRenderPrInHome.js";
const products_container = document.querySelector(".owl-carousel");
const newProductImg = document.querySelector(".new-product");


const getAllProductsInHome = async () => {
    try {
        const result = await productsAPI.getAllProduct();

        handleRenderPrInHome(result, products_container);

        console.log(newProductImg);
        newProductImg.src = `data:image/jpg;base64, ${result[result.length - 1].image}`;
        

        // const newProductName = document.querySelector(".new_product_name");
        // newProductName.innerText = result[result.length - 1].title;
        // const newProductTitle = document.querySelector(".new_product_price");
        // newProductTitle.innerText = result[result.length - 1].price;
        const newProductLink = document.querySelector(".new_product_link");
        newProductLink.href = `product-detail.html?id=${
            result[result.length - 1].idProduct
        }`;
    } catch (error) {
        console.log(error);
    }
};

getAllProductsInHome();

    
newProductImg.onerror = function() {
    newProductImg.src = "../images/mainIMG.png"
};
