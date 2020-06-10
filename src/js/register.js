!function($){
   const $tel=$('.tel');
   const $telInfo=$('.phone-info');
   const $teltrue=$('.t-true');
   const $password=$('.password');
   const $passInfo=$('.pass-info')
   const $passtrue=$('.t-true');
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
            $teltrue.show();
            $telInfo.html('');
             
         }else{
             $teltrue.hide();
            $telInfo.html('手机号格式不正确').css({
                color:"red",
                fontSize:12,
            });
         }
     }else{
        $telInfo.html('手机号不能为空').css({
            color:"red",
            fontSize:12,
        });
     }
   
   });

   //密码校验
   let $lengthReg=/^/;
   let $regLetter=/[a-zA-Z]+/;
   let $regNum=/\d+/;
   let $regother = /[\W\_]+/; //其他字符
   const passReg=$('.pass-reg');
   $password.on('input',function(){
       passReg.hide();
       let count=0;
       let passValue=$(this).val();
       let passLength=passValue.length;
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
               });break
               case 2:$passInfo.html('密码强度：中').css({
                   fontSize:12,
                   color:"blue"
               });break
               case 3:$passInfo.html('密码强度：强').css({
                   fontSize:12,
                   color:'green'
               })
           }

       }
       if(count>=2){
        $confirm.attr({
            disabled:false
        })

       }
   });

   //确认密码
   $confirm.on('blur',function(){
       if($confirm.val()!==$password.val()){
           $ctrue.hide()
           $confirmInfo.html('两次密码输入一致').css({
               fontSize:12,
               color:"red"
           })
       }else{
          $ctrue.show();
          
       }
   })

   
   //表单提交
   const $regForm=$('.reg-form');
   $regForm.on('submit',function(){

   })
    

}(jQuery)