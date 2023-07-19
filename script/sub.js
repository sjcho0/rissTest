$(document).ready(function(){

  let searhCnt = $('#divHeader').length;
  if(searhCnt > 0){
    $('#divContents').addClass('up');
  }else{
    $('#divContents').removeClass('up');
    $('#divContents').css('margin-top',0)

  }

  if($('.swipeTab.type2').length){
    let tabSlide2 = new Swiper('.swipeTab.type2 .inner',{
      slidesPerView:'auto',
      spaceBetween: 0,
      freeMode: true,
    });
    $(window).on('load',function(){
      let chk = $('.swipeTab.type2 .tab.on').index();
      tabSlide2.slideTo(chk)
    });
  }
  
  $('.swipeTab .tab a').click(function(e){
    e.preventDefault();
  });

  
  

  
  

});    