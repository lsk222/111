class lunbo{
    constructor(){
        this.imgBox=$('.img-box');
        this.lunboUl=$('#main-body .lunbo');
        this.lunboLis=$('.lunbo li');
        this.btns=$('.btn li');
        this.index=0;
    }
    init(){
        let copyLi=this.lunboLis.first().clone(true,true);
        let mytimer=-1;
        console.log(this.lunboUl);
         this.lunboUl.append(copyLi).css({
            width:this.lunboLis.first().width()*this.lunboUl.children().length+'px'
        });
       
        let _this=this;
        //按钮悬浮 切换图片
        this.btns.on('mouseover',function(){
            _this.index=$(this).index();
            console.log($(this).index());
            lunBoSwitch();
        });
        autoPlay();
        function  lunBoSwitch(){
            if(_this.index>_this.lunboLis.length){
                _this.index=0;
                _this.lunboUl.css({
                    left:0
                })
                _this.index=1;

            }
            _this.lunboUl.animate({
                left:-_this.lunboLis.first().width()*_this.index+'px'
            },600);
            _this.btns.eq(_this.index%_this.lunboLis.length).css({
                backgroundColor:'red'
            }).siblings().css({
                backgroundColor:'grey'
            });
        }

        
        function autoPlay(){
            mytimer=setInterval(function(){
                console.log(111);
                _this.index++;
                lunBoSwitch();
            },3000);
        }
        this.imgBox.hover(function(){
            console.log('stop');
            clearInterval(mytimer);
        },function(){
            autoPlay();
        });
       
    }
      
}
new lunbo().init();