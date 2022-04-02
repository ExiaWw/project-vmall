requirejs.config({
  paths: {
    'jquery': '/lib/jquery-3.4.1.min'
  }
});

define(['jquery', '/js/modules/cartStorage.js'], ($)=>{

  //购物车的数据要进行持久化，对数据进行本地存储，存储的内容 -> [{}, {}, {}]
  

  //下面这个数据要在详情页去准备好
  /* {
        goodsName,
        goodsColor,
        goodsPrice,
        goodsNumber,
        goodsChecked
     } */

  //往购物车添加相同产品的时候，要做处理。

  //本地存储的功能开发，最好做成一个模块，因为详情页和购物车页都要使用。
  
  

});