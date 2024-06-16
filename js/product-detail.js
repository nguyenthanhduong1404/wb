import productsAPI from "../api/productApi.js";
import CartAPI from "../api/cartApi.js";
import colorApi from "../api/colorApi.js";
 const products_container = document.querySelector(".detail-product");
 import Toast from "../common/toast.js";

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

let value = params.id;
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if(!userInfo) {
	window.location.href = "login.html"
}

let color=""

const getColor = async () => {
    try {
        const result = await colorApi.getColorById(value);
        color =result[0].nameColor;
    } catch (error) {
        console.log(error);
    }
};

getColor();

const getProduct = async () => {
    try {
        const result = await productsAPI.getProductById(value);
        console.log(result);
        
                products_container.innerHTML = `<div class="w-size13 p-t-30 respon5">
				<div class="wrap-slick3 flex-sb flex-w">
					<div class="slick3">
						<div class="item-slick3" data-thumb="images/thumb-item-01.jpg">
							<div class="wrap-pic-w">
								<img src="data:image/jpg;base64, ${result[0].image}" class="img-handle" width="500" height="600" alt="IMG-PRODUCT">
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="w-size14 p-t-30 respon5">
				<h4 class="product-detail-name m-text16 p-b-13">
					${result[0].title}
				</h4>

				<span class="m-text17">
					$${result[0].price}
				</span>
				<!--  -->
				<div class="p-t-33 p-b-60">
					
					<div class="flex-m flex-w">
						<div class="s-text15 w-size15 t-center">
							Màu sắc : ${color}
						</div>
					</div>

					<div class="">
						<div class="w-size16 flex-m flex-w">
							
								<div class="flex-w bo5 of-hidden m-r-22 m-t-10 m-b-10">
									<button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
										<i class="fs-12 fa fa-minus" aria-hidden="true"></i>
									</button>

									<input class="size8 m-text18 t-center num-product quantity" type="number" name="num-product" data-quantity="${result[0].quantity}" value="1" disabled>

									<button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2">
										<i class="fs-12 fa fa-plus" aria-hidden="true"></i>
									</button>
								</div>
							
							<div class="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
								<!-- Button -->
								<button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4 cartBtn">
									Add to Cart
								</button>
							</div>	
							
						<div class="s-text19 ">
							Số sản phẩm còn lại : ${result[0].quantity}
						</div>
					

							
							
						</div>
					</div>
				</div>
				<!--  -->
				<div class="wrap-dropdown-content p-t-15 p-b-14 active-dropdown-content">
					<h5 class="js-toggle-dropdown-content  flex-sb-m cs-pointer m-text19 color0-hov trans-0-4">
						Mô tả sản phẩm
						
					</h5>

					<div class="dropdown-content p-t-15 p-b-23">
						<p class="s-text8">
							${result[0].descr}
						</p>
					</div>

					<div class="wrap-dropdown-content bo6 p-t-15 p-b-14 ">
					<h5 class="js-toggle-dropdown-content flex-sb-m cs-pointer m-text19 color0-hov trans-0-4">
						Chính sách đổi trả
						
					</h5>

					<div class="dropdown-content p-t-15 p-b-23">
						<p class="s-text8">
							Khách hàng được đổi hoặc trả sản phẩm trong vòng 60 ngày kể từ ngày nhận được sản phẩm.
						</p>
					</div>
				</div>

				<div class="wrap-dropdown-content bo7 p-t-15 p-b-14">
					<h5 class="js-toggle-dropdown-content flex-sb-m cs-pointer m-text19 color0-hov trans-0-4">
						Lưu ý
					</h5>

					<div class="dropdown-content p-t-15 p-b-23">
						<p class="s-text8">
						Chúng tôi có quyền quyết định dừng việc hỗ trợ đổi trả và trả lại tiền cho khách hàng nếu phát hiện khách hàng sử dụng chính sách để trục lợi (như việc đổi quá nhiều lần).
						</p>
					</div>
				</div>
				</div>
			</div>`
        
			const imgHandler = document.querySelectorAll(".img-handle");
            console.log(imgHandler)
            imgHandler.forEach(img => {
                img.onerror = function() {
                    img.src = "../images/mainIMG.png"
                };
            })
		// handle btn quantity
		const btnDown = document.querySelector(".btn-num-product-down");
		const btnUp = document.querySelector(".btn-num-product-up");
		const num_product = document.querySelector(".num-product");
		
		btnDown.addEventListener("click", () => {
			if(num_product.value >1)
			{
				num_product.value--;
			}
            
        });

		btnUp.addEventListener("click", () => {
            if(parseInt(num_product.value) < parseInt(num_product.getAttribute("data-quantity")))
			{
				num_product.value++;
			}
            
        });


		//

		const cartBtn = document.querySelector(".cartBtn");
		cartBtn.onclick = () => {
			addCart (idUser,value, num_product.value);
			num_product.value=1

		}

    } catch (error) {
        console.log(error);
    }
};

getProduct();

let idUser = localStorage.getItem("userInfo");


let infoUser = JSON.parse(idUser)

const addCart = async (idUser, idProduct, quantity) => {
    try {
        const cart = {
            idUser: infoUser.idUser,
            idProduct: idProduct,
			quantity: quantity
        };
        const result = await CartAPI.addCart(cart);
		console.log(result)
        if (result.status == true)
		{
			Toast("Thêm sản phẩm thành công", "success");
		}
		else if (result.code == "ER_DUP_ENTRY")
		{
			Toast("Sản phẩm đã có trong giỏ hàng");
		}

    } catch (e) {
        console.log(e);
    }
};

export default addCart

// const cartBtn = document.querySelector(".cartBtn");
// console.log(cartBtn)


