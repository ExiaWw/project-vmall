
define(['jquery'], ($)=>{

  //处理添加的商品（包括处理相同商品的显示）
  function addCartStorage(data){

    let cart = getCartStorage();
    console.log(cart);

  }

  //往本地存储进行设置
  function setCartStorage(cart){
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  //从本地存储中进行获取
  function getCartStorage(){
    let cart = localStorage.getItem('cart');
    if( typeof cart === 'string' && cart.startsWith('[') ){
      return JSON.parse(cart);
    } 
    else{
      return [];
    }
  }

  return {
    addCartStorage,
    setCartStorage,
    getCartStorage
  }

});