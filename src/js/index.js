
requirejs.config({
  paths: {
    'jquery': '/lib/jquery-3.4.1.min'
  }
});

define(['jquery', '/js/modules/banner.js', '/api/server.js'], ($, banner, { getIndexBanner, getIndexGoods })=>{

  getIndexBanner().then((data)=>{
    banner(data);
  })

  getIndexGoods('phone').then((data)=>{
    goods('#phone', data);
  })
  getIndexGoods('book').then((data)=>{
    goods('#book', data);
  })
  getIndexGoods('pad').then((data)=>{
    goods('#pad', data);
  })

  function goods(selector, data){
    let html = `
      <h2 class="goods_title">${data.title}</h2>
      <ul class="goods_list clearfix">
        ${
          data.goods_list.map((v)=>{
            return `
                <li>
                  <a target="_blank" href="/views/detail.html?type=${data.type}&goodsid=${v.goodsId}">
                      <div><img src="${v.goodsImg}" alt=""></div>
                      <h3>${v.goodsName}</h3>
                      <p>¥${v.goodsPrice}</p>
                  </a>
                </li>
            `;
          }).join('').repeat(3)
        }
      </ul>
    `;
    $(selector).html(html);
  }

});