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
           strHtml+=``;
        //    $.each(picsArr,function(index,value){
        //     strHtml+=`<li><img src=${value} alt=""> </li>`;
            
        //    });
           strHtml+=``;
           minpicsUl.append(strHtml);
           
        }
    });
    
}()