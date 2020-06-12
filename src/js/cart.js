!function(){

    const $tbody=$('tbody');
     function showCart(id,num){
    //    return new Promise(function(resolve,reject){

    //     })
        $.ajax({
            url:"http://it.lsk.com/111/php/alldata.php",
            dataType:'json'
        }).done(function(data){
            $.each(data,function(index,value){
                if(value.id==id){
                    let $clonetr=$('tbody .example').clone(true,true);
                    console.log($clonetr);
                    $clonetr.removeClass();
                    $clonetr.css({display:'',width:"100%"});
                    $clonetr.find('.shownum').html(num);
                    // $clonetr.find('input').attr({checked:"checked"});
                    $clonetr.find('img').attr({src:value.picurl});
                    $clonetr.find('img').attr({id:value.id});
                    $clonetr.addClass('cart-item');
                    $clonetr.find('.price').html( parseFloat(value.price).toFixed(2)+" (元)");
                    $clonetr.find('.sum').html(parseFloat(value.price*num).toFixed(2)+" (元)");
                    $tbody.append($clonetr);
                    totalSum+=parseFloat((num*value.price).toFixed(2));
                    caculatePrice();
                }
            });
            // $('.totalSum').html("总价："+totalSum.toFixed(2)+" 元");
        })

    }
    var totalSum=0;
     function cartList(){
        if($.cookie('cookiesId')&&$.cookie('cookiesNum')){
            goodsId=$.cookie('cookiesId').split(',');
            goodsNum=$.cookie('cookiesNum').split(',');
            $.each(goodsId,function(index,value){
                showCart(goodsId[index],goodsNum[index]);
            });
       }
    }
    cartList();

    //计算总价
    function caculatePrice(){
        let count=0;
        let sum=0;
        let $trs=$('.cart-item');
        let flag=false;
        $.each($trs,function(index,value){
            if($(value).find('input').prop('checked')){
                  let price=parseFloat($(value).find('.price').html()) ;
                  let shuliang=parseFloat($(value).find('.shownum').html());
                  flag=true;
                  sum+=price*shuliang;
                  console.log(price);
                  $(value).find('.sum').html((price*shuliang).toFixed(2)+" 元")

                  $('.totalSum').html("总价："+sum.toFixed(2)+" 元");
                  console.log(sum);
            }
        })
        if(!flag){
            $('.totalSum').html("总价："+"0.00 元");
        }
    }
    const $selectAll=$("#selectAll01");
    //全选反选
    $('.selectAll').on('change',function(){
      
           $('.cart-item input').prop({
               checked:$(this).prop("checked")
           })
           $selectAll.prop({
               checked:$(this).prop("checked")
           })
           caculatePrice();
       
    })

    //
    let $inputs = $('.cart-item:visible').find(':checkbox');
    $('.table').on('change', $inputs, function() {
        //$(this):被委托的元素，checkbox
        if ($('.cart-item:visible').find(':checkbox').length === $('.cart-item:visible').find('input:checked').size()) {
            $('.selectAll').prop('checked', true);
            $selectAll.prop({
                checked:true
            });
        } else {
            $('.selectAll').prop('checked', false);
            $selectAll.prop({
                checked:false
            })
        }
         caculatePrice();
        
    });
    let cookieIds=[];
    let cookieNums=[];
    function getCookies(){
        cookieIds = $.cookie('cookiesId').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
        cookieNums = $.cookie('cookiesNum').split(',');
    }
   
    //删除所选
    $('.delete').on('click',function(){
        getCookies()
        if(confirm('确认要删除吗？？')) {
            $(this).parent('td').parent('.cart-item').remove();
            let id=$(this).parent('td').parent('.cart-item').find("img").prop('id');
            if($.inArray(id,cookieIds)!=-1){
                console.log('删除了哦');
                cookieIds.splice($.inArray(id,cookieIds),1);
                cookieNums.splice($.inArray(id,cookieIds),1)
                $.cookie('cookiesId', cookieIds, { expires: 7, path: '/' });
                $.cookie('cookieNum', cookieNums, { expires: 7, path: '/' });
               
            }
        }
    });
    //删除全选
    const $deleteAll=$('#deleteAll');
    $deleteAll.on('click',function(){
        
        if($selectAll.prop('checked')){
            if(confirm('确认要全部删除吗？？')){
                getCookies();
                cookieIds=[];
                cookieNums=[];
                $('.cart-item').remove();
                $.cookie('cookiesId', cookieIds, { expires: 7, path: '/' });
                $.cookie('cookieNum', cookieNums, { expires: 7, path: '/' });
                $selectAll.prop({ checked:false });
                $('.selectAll').prop({ checked:false});
                caculatePrice();
            }
        }else{
            return;
        }
    })
    
   
    // 点击减少商品数量    
   $tbody.on('click',".cart-item .minus",function(){
       
        getCookies();
        let num=parseFloat( $(this).parent('td').find('.shownum').html());        
        if(num==1){
            return;
        }
        $(this).parent('td').find('.shownum').html( --num)
        let id=$(this).parent('td').parent('td').find('img').prop('id');       
        let index=$.inArray(id,cookieIds);
        console.log(index)
        cookieNums[index]=num;
        caculatePrice();
        $.cookie('cookieNum', cookieNums, { expires: 7, path: '/' });
       
         let price=parseFloat($(this).parent('td').parent('tr').find('.price').html());

            
            $(this).parent('td').parent('tr').find('.sum').html(parseFloat(price*num).toFixed(2)+' (元)');
         
    })

    //点击增加商品数量
    $tbody.on('click',".cart-item .add",function(){
       
        getCookies();
        let num=parseFloat( $(this).parent('td').find('.shownum').html())
                 
            $(this).parent('td').find('.shownum').html( ++num)
            
            let id=$(this).parent('td').parent('tr').find('img').prop('id');       
            
            let index=$.inArray(id,cookieIds);
            console.log(index);
            caculatePrice();
            cookieNums[index]=num;
            $.cookie('cookiesNum', cookieNums, { expires: 7, path: '/' });
            let price=parseFloat($(this).parent('td').parent('tr').find('.price').html());

            
            $(this).parent('td').parent('tr').find('.sum').html(parseFloat(price*num).toFixed(2)+' (元)');
    })
   
}();