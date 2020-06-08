let $navWrap=$('#headerNav-wrap');
let s=document.querySelector('#headerNav-wrap .allsort');
console.log(lis);
lis.hover(function(){
    // alert('1');
  $(this).find('.sortList').show();
},function(){
    $(this).find('.sortList').hide();
})