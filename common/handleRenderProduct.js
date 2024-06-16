const handleRenderProduct = (datas, parentElement, isSlickSlider = false) => {
    const result = datas.map((product) => {
        return `<div class="${
            isSlickSlider
                ? "item-slick2 p-l-15 p-r-15"
                : "col-sm-12 col-md-6 col-lg-4 p-b-50"
        }">
        <!-- Block2 -->
        <div class="block2">
            <div class="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew">
                <img src="data:image/jpg;base64, ${product.image}" width="270" height="360" class="img-handle"  alt="IMG-PRODUCT">

                <div class="block2-overlay trans-0-4">
                    <a href="#" class="block2-btn-addwishlist hov-pointer trans-0-4">
                        <i class="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                        <i class="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
                    </a>

                    <div class="block2-btn-addcart w-size1 trans-0-4">
                        <!-- Button -->
                        <button value="${product.idProduct}" class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4 add-cart-btn">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <div class="block2-txt p-t-20">
                <a href="product-detail.html?id=${product.idProduct}" class="block2-name dis-block s-text3 p-b-5">
                    ${product.title}
                </a>

                <span class="block2-price m-text6 p-r-5">
                    $${product.price}
                </span>
            </div>
        </div>
    </div>`;
    });
    parentElement.innerHTML = result.join("");

    const imgHandler = document.querySelectorAll(".img-handle");
            console.log(imgHandler)
            imgHandler.forEach(img => {
                img.onerror = function() {
                    img.src = "../images/mainIMG.png"
                };
            })
};
export default handleRenderProduct