const handleRenderPrInHome = (datas, parentElement) => {
  const result = datas.map((product) => {
      return `<div class="owl-item">
      <div class="bbb_viewed_item d-flex flex-column align-items-center justify-content-center text-center">
          <div class="bbb_viewed_image"><img src="data:image/jpg;base64, ${product.image}" height="250px" width="250px" alt="" class="img-handle"></div>
          <div class="bbb_viewed_content text-center">
              <div class="bbb_viewed_price">$${product.price}</div>
              <div class="bbb_viewed_name"><a href="product-detail.html?id=${product.idProduct}">${product.title}</a></div>
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

  $(document).ready(function()
{

   
        if($('.bbb_viewed_slider').length)
        {
            var viewedSlider = $('.bbb_viewed_slider');

            viewedSlider.owlCarousel(
            {
                loop:true,
                margin:30,
                autoplay:true,
                autoplayTimeout:6000,
                nav:false,
                dots:false,
                responsive:
                {
                    0:{items:1},
                    575:{items:2},
                    768:{items:3},
                    991:{items:4},
                    1199:{items:4}
                }
            });

            if($('.bbb_viewed_prev').length)
            {
                var prev = $('.bbb_viewed_prev');
                prev.on('click', function()
                {
                    viewedSlider.trigger('prev.owl.carousel');
                });
            }

            if($('.bbb_viewed_next').length)
            {
                var next = $('.bbb_viewed_next');
                next.on('click', function()
                {
                    viewedSlider.trigger('next.owl.carousel');
                });
            }
        }


    });

};
export default handleRenderPrInHome