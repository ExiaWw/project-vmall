

define(['jquery'], ($)=>{

  function getIndexBanner(){
    return $.ajax('/api/mock/banner.json');
  }
  
  function getIndexGoods(type){  //type: phone  pad  book
    return $.ajax(`/api/mock/${type}.json`);
  }

  function getDetailBanner(){
    return $.ajax('/api/mock/banner2.json');
  }

  function getDetailGood(type, goodsId){
    return $.ajax(`/api/mock/${type}.json`).then((data)=>{
      return data.goods_list.find((v)=>{
        return v.goodsId === goodsId;
      });
    })
  }
  
  return {
    getIndexBanner,
    getIndexGoods,
    getDetailBanner,
    getDetailGood
  }

});