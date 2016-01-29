window.ego_toc = $('#text-table-of-contents ul li');
if(0 != window.ego_toc.length){
    window.ego_toc_h = $('#table-of-contents h2');
    window.ego_toc_h_text = $('#table-of-contents h2').text();
    window.ego_n = 0;
    window.ego_tmp = ego_n;
    window.ego_head = $(':header').filter('[id*=header]');
    $(window).scroll(function () {
        var startPoint=0;
        var endPoint=ego_head.length-1;
        var offsetValue=window.pageYOffset+60;
        if(ego_head.eq(ego_tmp).offset().top>offsetValue || offsetValue>ego_head.eq((ego_tmp+1)>(ego_head.length-1)?(ego_head.length-1):(ego_tmp+1)).offset().top){
            while((startPoint+1) < endPoint){
                if(ego_head.eq(Math.floor((startPoint+endPoint)/2)).offset().top > offsetValue){
                    endPoint = Math.floor((startPoint+endPoint)/2);
                }
                else if(ego_head.eq(Math.floor((startPoint+endPoint)/2)).offset().top < offsetValue){
                    startPoint = Math.floor((startPoint+endPoint)/2);
                }
                else{
                    break;
                }
            }
            if(offsetValue>ego_head.eq(ego_head.length-1).offset().top){
                ego_n=ego_head.length-1;
            }
            else{
                ego_n = startPoint;
            }

            ego_toc.eq(ego_tmp).children('a').css('color', '#ffff00');
            ego_tmp = ego_n;
            ego_toc.eq(ego_tmp).children('a').css('color', '#22ff22');
            if(window.pageYOffset < 10){
                ego_toc_h[0].textContent = ego_toc_h_text;
            }
            else{
                ego_toc_h[0].textContent = ego_toc.eq(ego_tmp)[0].children.item(0).textContent;
            }
            //ego_n = parseInt(ego_str.slice(-1));
        }
    });}
(function($){
    $('.fancybox').fancybox();
})(jQuery);
prettyPrint();
