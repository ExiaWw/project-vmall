
//banner实现功能的，公共模块

define(['jquery'], ()=>{

  let $bannerList = $('.banner-list');

  function banner(data){
    
    let html = `
      <ul>
        ${
          data.banner_list.map((v, i)=>{
            return `
              <li class="${ i === 0 ? 'show' : '' }"><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>
            `;
          }).join('')
        }
      </ul>
      <ol>
        ${
          data.banner_list.map((v, i)=>{
            return `
              <li class="${ i === 0 ? 'active' : '' }"></li>
            `;
          }).join('')
        }
      </ol>
    `;

    $bannerList.html(html);

    handle();

  }

  //完成录播图的交互
  function handle(){

    $bannerList.on('mouseover', 'ol li', function(){

      $(this).addClass('active').siblings().removeClass('active');

      $bannerList.find('ul li').eq( $(this).index() ).addClass('show').siblings().removeClass('show');

    });

  }

  return banner;

});