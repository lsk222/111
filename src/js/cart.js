!function(){

    const $tbody=$('tbody');
   
   
   
    async function showCart(id,num){
    //    return new Promise(function(resolve,reject){

    //     })
        $.ajax({
            url:"http://it.lsk.com/111/php/alldata.php",
            dataType:'json'
        }).done(function(data){
            $.each(data,function(index,value){
                console.log(id);
                if(value.id==id){
                    let $clonetr=$('tbody .example').clone(true,true);
                    console.log($clonetr);
                    $clonetr.removeClass();
                    $clonetr.css({display:'',width:"100%"});
                    $clonetr.find('.shownum').html(num);
                    $clonetr.find('img').attr({src:value.picurl})
                    $clonetr.find('.price').html( parseFloat(value.price).toFixed(2)+" (元)");
                    $clonetr.find('.sum').html((num*value.price).toFixed(2)+" (元)")
                    $tbody.append($clonetr);
                    totalSum+=parseFloat((num*value.price).toFixed(2));
                   
                }
            });
            console.log("totalsum"+totalSum);
        })

    }
    var totalSum=0;
    async function cartList(){
        if($.cookie('cookiesId')&&$.cookie('cookiesNum')){
            goodsId=$.cookie('cookiesId').split(',');
            goodsNum=$.cookie('cookiesNum').split(',');
            $.each(goodsId,function(index,value){
                showCart(goodsId[index],goodsNum[index]);
            });
           
       }
    }
    cartList().then(()=>{
        $('.totalSum').html("总价："+totalSum);
    });
}();