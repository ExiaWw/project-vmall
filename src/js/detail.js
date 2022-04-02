requirejs.config({
  paths: {
    'jquery': '/lib/jquery-3.4.1.min'
  }
});

define(['jquery', '/js/modules/banner.js', '/js/modules/cartStorage.js', '/api/server.js'], ($, banner, { addCartStorage }, { getDetailBanner, getDetailGood })=>{

  getDetailBanner().then((data)=>{
    banner(data);
  })

  //如何做到同一个页面展示不同的内容呢？根据url的不同来做到
  // http://localhost:8080/views/detail.html?type=phone&goodsid=10086619736763
  // http://localhost:8080/views/detail.html?type=phone&goodsid=10086601038627
  // http://localhost:8080/views/detail.html?type=book&goodsid=10086690375130

  let url = location.href;
  let type = url.match(/type=([^&]+)/)[1];
  let goodsId = url.match(/goodsid=([^&]+)/)[1];
  
  getDetailGood(type, goodsId).then((data)=>{
    good(data);
    gallery();
    message(data);
  })

  function good(data){
    $('.detail_gallery').html(`
      <div class="detail_gallery_normal">
          <img src="${data.photoNormal}" alt="">
          <span></span>
      </div>
      <div class="detail_gallery_large">
          <img src="${data.photoLarge}" alt="">
      </div>
    `);
    $('.detail_message').html(`
      <h2>${data.goodsName}</h2>
      <p>价 格 <span class="detail_message_price">¥${data.goodsPrice}.00</span></p>
      <p>选择颜色 
        ${
          data.chooseColor.map((v, i)=>{
            return `<span class="detail_message_box ${ i === 0 ? 'active' : '' }">${v}</span>`;
          }).join('')
        }
      </p>
      <div class="detail_message_btn clearfix">
          <div class="detail_message_num l">
              <input class="detail_message_number" type="text" value="1">
              <span class="detail_message_add">+</span>
              <span class="detail_message_remove">-</span>
          </div>
          <div class="detail_message_cart l"><a href="javascript:;">加入购物车</a></div>
          <div class="detail_message_computed l"><a href="javascript:;">立即下单</a></div>
      </div>
    `);

    $('#detailGoods').html(`
      <h3>-- 商品详情 --</h3>
      ${
        data.goodsInfo.map((v)=>{
          return `<img src="${v}" alt="">`;
        }).join('')
      }
    `);
  }

  //放大镜
  function gallery(){
    let $detail_gallery_normal = $('.detail_gallery_normal');
    let $detail_gallery_normal_mask = $detail_gallery_normal.find('span'); 
    let $detail_gallery_large = $('.detail_gallery_large');
    let $detail_gallery_large_img = $detail_gallery_large.find('img');
    
    $detail_gallery_normal.on({
      mouseover(){
        $detail_gallery_large.show();
        $detail_gallery_normal_mask.show();
      },
      mouseout(){
        $detail_gallery_large.hide();
        $detail_gallery_normal_mask.hide();
      },
      mousemove(ev){
        let L = ev.pageX - $detail_gallery_normal.offset().left - $detail_gallery_normal_mask.width()/2;
        let T = ev.pageY - $detail_gallery_normal.offset().top - $detail_gallery_normal_mask.height()/2;
        let widthMin = 0;
        let heightMin = 0;
        let widthMax = $detail_gallery_normal.width() - $detail_gallery_normal_mask.width();
        let heightMax = $detail_gallery_normal.height() - $detail_gallery_normal_mask.height();
        let bigImgLeft = $detail_gallery_large_img.width() - $detail_gallery_large.width();
        let bigImgTop = $detail_gallery_large_img.height() - $detail_gallery_large.height();

        if(L<widthMin){
          L = widthMin;
        }
        else if(L>widthMax){
          L = widthMax;
        }
        if(T<heightMin){
          T = heightMin;
        }
        else if(T>heightMax){
          T = heightMax;
        }
        
        $detail_gallery_normal_mask.css({
          left: L,
          top: T 
        });

        let scaleX = L/widthMax;
        let scaleY = T/heightMax;

        $detail_gallery_large_img.css({
          left: - scaleX * bigImgLeft,
          top: - scaleY * bigImgTop
        });

      }
    });
  } 

  //选择商品信息
  function message(data){
    let $detail_message_box = $('.detail_message_box');
    let $detail_message_add = $('.detail_message_add');
    let $detail_message_remove = $('.detail_message_remove');
    let $detail_message_number = $('.detail_message_number');
    let $detail_message_cart = $('.detail_message_cart');

    $detail_message_box.on('click', function(){
      $(this).addClass('active').siblings().removeClass('active');
    });

    $detail_message_add.on('click', function(){
      let value = Number($detail_message_number.val());
      $detail_message_number.val(value+1);
    });

    $detail_message_remove.on('click', function(){
      let value = Number($detail_message_number.val());
      if(value > 1){
        $detail_message_number.val(value-1);
      }
    });

    $detail_message_number.on({
      input(){
        if( isNaN( $(this).val() ) ){
          $(this).val(1);
        }
      },
      blur(){
        if( $(this).val() === '' ){
          $(this).val(1);
        }
      }
    });

    $detail_message_cart.on('click', function(){

      let storage = {
        goodsName: data.goodsName,
        goodsColor: $detail_message_box.filter('.active').html(),
        goodsPrice: data.goodsPrice,
        goodsNumber: Number($detail_message_number.val()),
        goodsChecked: true
      };
      
      addCartStorage(storage);

    });


  }

});