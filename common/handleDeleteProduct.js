import cartsAPI from "../api/cartApi.js";

function getParent(element, selector = '.cart-item') {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}
const handleDeleteProduct = (listElement) => {
    if(listElement & listElement.length <= 0) return 
    listElement.forEach((item) => {
        item.addEventListener("click", async () => {
            const parentElement = getParent(item)
            const idProduct = +item.dataset.product
            await cartsAPI.deleteProductById(idProduct)
            parentElement.innerHTML = "";
        });
    });
}

export default handleDeleteProduct

