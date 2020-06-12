!function($){
   const $tel=$('.tel');
   const $telInfo=$('.phone-info');
   const $teltrue=$('.t-true');
   const $password=$('.password');
   const $passInfo=$('.pass-info')
   const $passtrue=$('.p-true');
   const $confirm=$('.confirm');
   const $confirmInfo=$('.confirm-info');
   const $ctrue=$('.c-true');
   const $reg=$('.reg');
   $confirm.attr({
       disabled:true
   });
   
   

   //手机号验证
   let phoneReg=/^1[3456678]\d{9}$/;
   let phoneFlag=true;
   $tel.on('blur',function(){
    if($tel.val()!=''){
        if(phoneReg.test($tel.val())){
            phoneFlag=true;
            $teltrue.show();
            $telInfo.html('');
         }else{
             $teltrue.hide();
            $telInfo.html('手机号格式不正确').css({
                color:"red",
                fontSize:12,
            });
            phoneFlag=false;
         }
     }else{
        $telInfo.html('手机号不能为空').css({
            color:"red",
            fontSize:12,
        });
        phoneFlag=false;
     }

     if(phoneFlag){
         $.ajax({
             type:"post",
             url:"http://it.lsk.com/111/php/cheakPhone.php",
             data:{
                 phoneNum:$tel.val()
             },
             success:function(data){
                 if(data=='1'){
                    phoneFlag=false;
                    $telInfo.html('用户名已被注册').css({
                        color:"red",
                        fontSize:12,
                    });
                 }else{
                     passFlag=true;
                 }
             }
         })
     }
   
   });

   //密码校验
   let passFlag=true;
   let $regLetter=/[a-zA-Z]+/;
   let $regNum=/\d+/;
   let $regother = /[\W\_]+/; //其他字符
   const passReg=$('.pass-reg');
   $password.on('input',function(){
       passReg.hide();
       let count=0;
       let passValue=$(this).val();
       let passLength=passValue.length;
       $passInfo.show();
       if(passLength>=6&&passLength<=20){
           if($regLetter.test(passValue)){
               count++
           }
           if($regNum.test(passValue)){
               count++;
           }
           if($regother.test(passValue)){
               count++;
           }
           switch (count){
               case 1:$passInfo.html('密码强度：弱').css({
                   color:"red",
                   fontSize:12
               });$passtrue.hide();;break
               case 2:$passInfo.html('密码强度：中').css({
                   fontSize:12,
                   color:"blue"
               });
               $passtrue.show();
               break
               case 3:$passInfo.html('密码强度：强').css({
                   fontSize:12,
                   color:'green'
               })
               $passtrue.show();
           }
       }else{
           passReg.show();
           $passInfo.hide()
       }
       if(count>=2){
        $confirm.attr({
            disabled:false
        })

       }
   });
   $password.on('blur',function(){
       if($password.val()==''){
           phoneFlag=false;
           $passInfo.hide()
           
        $passInfo.html('密码为空').css({
            color:"red",
            fontSize:12
        })
       }
   })

   //确认密码
   let confirmFlag=true;
   $confirm.on('blur',function(){
       if($confirm.val()!==$password.val()){
           $ctrue.hide()
           confirmFlag=false;

           $confirmInfo.html('两次密码输入一致').css({
               fontSize:12,
               color:"red"
           })

       }else{
           confirmFlag=true;
          $ctrue.show();
          
       }
   })

   
   //表单提交
   const $regForm=$('#regForm');
   $regForm.on('submit',function(){
       if(!phoneFlag||!passFlag||!confirmFlag){
           alert("请正确填写信息");
           return false;
       }
       
       

   })
    

}(jQuery)