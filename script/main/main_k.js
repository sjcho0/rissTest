$(document).ready(function(){

    //로드 이벤트
    $(window).on('load',function(){
        /*setTimeout(function(){
            $('.topFirstVisit .txt').addClass('on');
        },1000)*/
        
    });

    //메인팝업
     let mainPopup = new Swiper('.mainPopup .inner',{
        slidesPerView: 1,
        spaceBetween: 1,
        loop: true,
        centeredSlides: true,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
    });
    $(".mainPopup .popupClose").on("click",function(){
        $(".mainPopup").hide();
    });

    const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('— app-height', `${window.innerHeight}px`)
    }
    $(window).on("resize",function(){
        appHeight();
    })

    //팝업존
    let popZone = new Swiper('.popZone .inner',{
        slidesPerView:'auto',
        spaceBetween: 0,
        freeMode: true,
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            710: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView:'auto',
            }
          }
    });
    
    if($('.swiper-scrollbar-drag').width() > 0){
        $('.popZone').addClass('bs');
    }else{
        $('.popZone').removeClass('bs');
    }

    $(window).on('resize',function(){
        if($('.swiper-scrollbar-drag').width() > 0){
            $('.popZone').addClass('bs');
        }else{
            $('.popZone').removeClass('bs');
        }
    });
  
    //학술자료 탭
    $('.academicTab>li>a').click(function(e){
        e.preventDefault();
        $('.academicTab>li').removeClass('on');
        $(this).parent().addClass('on');
        $('.academicContW .academicCont').hide();
        $('.academicContW .academicCont').eq($(this).parent().index()).show();

    });
    let academic = new Swiper('.academicCont .inner',{
        slidesPerView:'auto',
        spaceBetween: 0,
        freeMode: true,
        observer: true,
        observeParents: true,
      });
    $('.academicDepth2 .tab a').click(function(e){
        e.preventDefault();
        $(this).parents('.academicDepth2').find('.tab').removeClass('on');
        $(this).parent().addClass('on');
        $(this).parents('.academicCont').find('.acaInnerCont').hide();
        $(this).parents('.academicCont').find('.acaInnerCont').eq($(this).parent().index()).show();
    });
    $('.academicDepth3W .acaInnerCont>ul>li>a').click(function(e){
        e.preventDefault();
		$(this).parent().addClass('on').siblings().removeClass('on');
    });

    
});    