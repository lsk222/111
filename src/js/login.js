!function($){
   
    const $submit=$('.sub');
    console.log($submit);
    const $tips=$('.tips');
    $submit.on('click',function(){
        let $tel=$('.tel').val();
        let $password=$('.password').val();
        console.log($tel);
        console.log($password);
        console.log('kkkk');
        if($tel&&$password){
            $.ajax({
                type:'post',
                data:{
                    phoneNum:$tel,
                    password:$password
                },
                url:"http://it.lsk.com/111/php/getUser.php",
                success:function(data){
                    console.log("data"+data);
                    if(data=="1"){
                        location.href="../src/index.html"
                    }else{
                        $tips.html("用户名或者密码错误").css({
                            padding:"5px",
                            color:'red'
                        })
                    }
    
                }
            })
        }

    })
  
}(jQuery)