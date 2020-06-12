!function(){
    let detailId=window.location.search.substr(7);
    let minpicsUl=$('.minpics ul');
    console.log(detailId);
    let strHtml='';
    $.ajax({
        url:"http://it.lsk.com/111/php/getDetails.php",
        data:{
            picid:detailId
        },
        success:function(data){
            let d=JSON.parse(data);
            let picsArr=d.spics.split(';');
            console.log(d.picurl);
            $('.smallpic').find('img').attr({
                src:d.picurl
            });
            $('.scalepic img').attr({
                src:d.picurl
                // background:`url(${d.picurl}) no-repeat ` 
            })
           strHtml+=``;
           $.each(picsArr,function(index,value){
            strHtml+=`<li><img src=${value} alt=""> </li>`;
            
           });
           strHtml+=``;
           minpicsUl.append(strHtml);
           
        }
    });

    const $smallpic=$('.smallpic');
    const $smallM=$('.pic-show .smallM');
    const $smallimg=$('.smallpic img');
    const $scalebox=$('.pic-show .scalepic')
    let $scaleimg=$('.scalepic img');

    //小图部分 
    let lisize=-1;
   
    minpicsUl.on("mouseover","li",function(){
     
        let $src=$(this).find("img").attr('src');
        lisize=$(".minpics ul").children().length;
        $scaleimg=$('.scalepic img');
        $smallimg.attr({
            src:$src
        });
        $scaleimg.attr({
            src:$src
        })
    });
    let $num=5;
    let $leftArrow=$('.left-arrow');
    let $rightArrow=$('.right-arrow');
    
   
    //右箭头点击 图片左移
    $rightArrow.on('click', function() {
        let $lists = $(".minpics ul").children();
        if ($lists.size() > $num) { 
            $num++;
            $leftArrow.css('color', '#333');
            if ($lists.size() == $num) {
                $rightArrow.css('color', '#fff');
            }
            $(".minpics ul").animate({
                left: -($num - 5) * $lists.eq(0).outerWidth(true)
            });
        }
    });
    // 点击左箭头 图片右移
    $leftArrow.on('click', function() {
        let $lists = $(".minpics ul").children();
        //限制点击的条件
        if($num>5){
            $num--;
            $rightArrow.css('color', '#333');
            if ($lists.length<=$num) {
                $leftArrow.css('color', '#fff');
            }
            $(".minpics ul").animate({
                left:-($num-5) * $lists.eq(0).outerWidth(true)
            });
        }
    });

    $rightArrow.on('click', function() {
        let $lists = $(".minpics ul").children();
        if ($lists.size() > $num) { //限制点击的条件
            $num++;
            $leftArrow.css('color', '#333');
            if ($lists.size() == $num) {
                $rightArrow.css('color', '#fff');
            }
            $(".minpics ul").animate({
                left: -($num - 6) * $lists.eq(0).outerWidth(true)
            });
        }
    });
    
    $rightArrow.on("click",function(){
        let $lis=$(".minpics ul").children();
        let $length=$lis.length
        console.log('hhhhkkkk');
        // $click=$length%$num;
        // $clickNum=$click;
        console.log("click:"+$click);
        console.log("lll:"+$(".minpics ul").children().length)
        //限制点击的条件
           $click++;
           if($click==$clickNum){
              $leftArrow.css('color', '#fff');
              return
           }else{
            $leftArrow.css('color', '#333');
           }
            $(".minpics ul").animate({
                left: ($click-1) * $lis.eq(0).outerWidth(true)
            });
       
    })


    //放大镜效果
   
   
    
    let scale=$('.scalepic').width()/$smallM.width()
    let size=$smallimg.width()*scale;
    
   
    $scaleimg.width( parseInt(size));
    $scaleimg.height( parseInt(size));
    $('.pic-show dt').hover(function(){
        $(this).on('mousemove',function(event){
            var e=event||window.event;
            let $topValue= e.pageY-$smallpic.offset().top-$smallM.width()/2;
            let $leftValue=e.pageX-$smallpic.offset().left-$smallM.height()/2;
            
            if($leftValue<=0){
                $leftValue=0;
            }else if($leftValue>$(this).width()-$smallM.width()){
                $leftValue=$(this).width()-$smallM.width()
            }

            if($topValue<0){
                $topValue=0;
            }else if($topValue>=$(this).height()-$smallM.height()){
                $topValue=$(this).height()-$smallM.height();
            }
            
            $smallM.css({
                visibility: "visible",
                top:$topValue,
                left:$leftValue
            });
            $('.scalepic').show();
            $scaleimg.css({
                
                top:-$topValue*scale,
                left:-$leftValue*scale
            })
        });
    },function(){
         $smallM.css({
            visibility: "hidden"
         })
         $('.scalepic').hide()

    });

    //小图部分

  

     let goodsId=[];
     let goodsNum=[];

     //取出cookie
     function getCookies(){
         if($.cookie('cookiesId')&&$.cookie('cookiesNum')){
             goodsId=$.cookie('cookiesId').split(',');
             goodsNum=$.cookie('cookiesNum').split(',');
         }else{
             goodsId=[];
             goodsNum=[];
         }
     }

      //购物车
      $('.cart').on('click',function(){
          let countValue=$('.numText').val();
          console.log(countValue);
          let picId=detailId;
          getCookies();
          if($.inArray(picId,goodsId)!=-1){
              //取出该位置的数量
              let num=parseInt(goodsNum[$.inArray(picId,goodsId)])+parseInt(countValue);
              goodsNum[$.inArray(picId,goodsId)]=num;
              $.cookie('cookiesNum',goodsNum,{expires:7,path:'/'});
               
          }else{
              goodsId.push(picId);
              $.cookie('cookiesId',goodsId,{expires:7,path:'/'});
              goodsNum.push(countValue);
              $.cookie('cookiesNum',goodsNum,{expires:7,path:'/'});
          }

          alert('购物车加入成功');
      });
   
    
}()