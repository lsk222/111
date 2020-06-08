!function(){
    $.ajax({
         url:"http://it.lsk.com/111/php/index-list.php",
        success:function(data){
            let d=JSON.parse(data);
            console.log(d);
            let $drugList=$("#drug-List");
            let strHtml=``;
            for(let p of d){
                let header=p.header;
                let milpics=p.milpic.split(';');
                let nav=p.nav.split(',');
                let picurl=p.picurl.split(';');
                let price=p.price.split(';');
                let titile=p.title.split(';');
                console.log(milpics)
                strHtml+=`
                    <div class="drug1">
                    <div class="drug1-list">
                    <div class="listHeader">
                        ${header}
                    </div>
                    <ul>
                `;
                for(var i=0;i<nav.length;i++){
                   strHtml+=`<li> <a href="">${nav[i]}</a></li>`
                }
                strHtml+=`</ul>
                </div>`;
                strHtml+=`
                    <div class="drug1-detail">
                    <div class="detail-L">
                        <img  class="lazy" data-original="${picurl[0]}" width="605px" height='284px'>

                    </div>
                    <div class="detail-R">
                        <img class="lazy" data-original="${picurl[1]}" alt="" width="202px" height='284px'>
                        <img class="lazy" data-original="${picurl[2]}" alt=""  width="202px" height='284px'>
                    </div> 
                     `;
                 strHtml+=`<div class="detail-B">`;
                 for(var i=0;i<milpics.length;i++){
                     strHtml+=`
                     <dl>
                        <dt>
                            <img class="lazy" data-original="${milpics[i]}" alt="" width="100px" height="100px">
                        </dt>
                        <dd>
                            <p>【宝信良药】益安宁丸</p>
                            <em>790.0</em>
                        </dd>
                     </dl>
                     `;
                 }
                 strHtml+=`  </div> </div></div>`
            }
            $drugList.html(strHtml);
            $(function() {
                $("img.lazy").lazyload({ effect: "fadeIn" });
            });
        }
    });

    $.ajax({
        url:"http://it.lsk.com/111/php/asksicks.php",
        success:function(data){
            let d=JSON.parse(data);
            console.log(d);
            const sickTop=$('#ask-sick .ask-left .sick-top')
            let strHtml=`
            <div class="header-list">
            <ul>`;            
           $.each(d,function(index,value){
            strHtml+=`<li><a href="">${value.questions}</a><span>${value.date}</span></li>`  
           });
           
           sickTop.append(strHtml);

        }
    })
    
}()