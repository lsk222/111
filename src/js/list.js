! function($) {
    let array_default = []; //排序前的li数组
    let array = []; //排序中的数组
    let prev = null;
    let next = null;
  
    //1.渲染列表页的数据-默认渲染第一页
    const $listdetail=$('#druglist-wrap .list-detail');
    console.log($listdetail);
    $.ajax({
        url: 'http://it.lsk.com/111/php/listdata.php', //默认获取后端接口的10条
        dataType: 'json'
    }).done(function(data) {
        console.log("hhh"+data);
        let $strhtml = '';
        $.each(data, function(index, value) {
            $strhtml += `
            <li>
                <dl>
                    <dt>
                        <a href="details.html?picid=${value.id}"><img class="lazy" data-original="${value.picurl}" width="200px" height="200px"   alt=""></a>
                    </dt>
                    <dd>
                        <span class='price'>￥${value.price}</span>
                        <p>${value.title}</p>
                    </dd>
                </dl>
            </li> `;
        });
        
        $listdetail.append($strhtml);
        //添加懒加载,添加到渲染的列表下面
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });

        array_default = []; //排序前的li数组
        array = []; //排序中的数组
        prev = null;
        next = null;
        //将页面的li元素加载到两个数组中
        $('.list-detail li').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });
    //渲染的外部无法获取内部的元素对象，通过事件委托实现。

    //2.分页思路
    //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get和page)
    $('.page').pagination({
        pageCount: 3, //总的页数
        jump: false, //是否开启跳转到指定的页数，布尔值。
        coping: true, //是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function(api) {
            console.log(api.getCurrent()); //获取的当前点击的页码
            $.ajax({
                url: 'http://it.lsk.com/111/php/listdata.php?page='+api.getCurrent(),
                data: {
                    page: api.getCurrent() //传递页码
                },
                dataType: 'json'
            }).done(function(data) {
                console.log( typeof data);
                // let d=JSON.parse(data);
                console.log(data);
                let $strhtml = ``;
                $.each(data, function(index, value) {
                    $strhtml += `
                    <li>
                        <dl>
                            <dt>
                                <a href="details.html?picid=${value.id}" target="_blank""><img class="lazy" data-original="${value.picurl}" width="200" height="200" alt="" ></a>
                            </dt>
                            <dd>
                                <span class="price">￥${value.price}</span>
                                <p>${value.title}</p>
                            </dd>
                        </dl>
                    </li> `;
                });
               
                $listdetail.html($strhtml);
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
                //重新赋值
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                //将页面的li元素加载到两个数组中
                $('.list-detail li').each(function(index, element) {
                    array[index] = $(this); //排序的
                    array_default[index] = $(this); //重置的
                });
            })
        }
    });

    //3.排序
    //默认排序-重置
    $('.selected').eq(0).on('click', function() {
        $.each(array_default, function(index, value) {
            $listdetail.append(value);
        });
        return;
    });
    //价格升序
    $('.increase').on('click', function() {
        console.log('升序排列')
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        // $('.list ul').empty();//清空原来的列表
        //这里能够省略empty
        //append在追加的时候，如果追加的是jquery的元素对象，而jquery元素对象在你追加的元素中存在，直接取出存在的元素，从后面追加。
        //如果追加的是内容结构，依然和appendChild一样，后面继续追加。
        $.each(array, function(index, value) {
            console.log(value); //n.fn.init [li, context: li]
            $listdetail.append(value);
        });
    });
    //价格降序
    $('button').eq(2).on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        // $('.list ul').empty();//清空原来的列表
        $.each(array, function(index, value) {
            $('.list ul').append(value);
        });
    })


}(jQuery);