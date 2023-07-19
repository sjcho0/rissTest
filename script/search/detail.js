$(document).ready(function(){

  //서지상세 시작

  //검색탭
  let tabSlide1 = new Swiper('.swipeTab.type1 .inner',{
    slidesPerView:'auto',
    spaceBetween: 0,
    freeMode: true,
  });
  $(window).on('load',function(){
    let chk = $('.swipeTab.type1 .tab.on').index();
    tabSlide1.slideTo(chk)
  });
  $('.swipeTab.type1 .toggleBtn').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $('.swipeTabBg').hide();
      $('.swipeTab').removeClass('all');
      tabSlide1 = new Swiper('.swipeTab.type1 .inner',{
        slidesPerView:'auto',
        spaceBetween: 0,
        freeMode: true,
      });
    }else{ 
      $(this).addClass('on');
      $('.swipeTabBg').show();
      $('.swipeTab').addClass('all')
      tabSlide1.destroy();
      
    }
    return false;
  });
  
  //추천자료 열고닫기
  $('.infoDetailW .recommendCont .tit').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).parent().next('.recommendArea').slideUp();
    }else{
      $(this).addClass('on');
      $(this).parent().next('.recommendArea').slideDown();
    }
    return false;
  });


  //다국어초록 더보기
  $('.addInfoMore').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).prev().removeClass('on')
      $(this).text('더보기')
      $(this).attr('title','더보기');
      $('.kakaoTrans').removeClass('on')
      $('.translate').hide();
      $('.translateCont').hide();
      $('.selectLang').removeClass('on');
      $('.langContent>div').removeClass('on');
      $('.translateCont .transResult').removeClass('on');
    }else{
      $(this).addClass('on');
      $(this).prev().addClass('on');
      $(this).text('접기')
      $(this).attr('title','접기');
    }
    return false;
  });

  //카카오번역보기
  $('.kakaoTrans').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).parents('.additionalInfo').find('.translate').slideUp();
      //$(this).parents('.additionalInfo').find('.abstract').show();
    }else{
      $(this).addClass('on');
      $(this).parents('.additionalInfo').find('.translate').slideDown();
      //$(this).parents('.additionalInfo').find('.abstract').hide();
    }
    return false;
  });

  $('.selectLang').click(function(){
    $('.selectLang').removeClass('on');
    $(this).addClass('on');
    $('.langContent>div').removeClass('on')
    $('.langContent>div').eq($(this).parent().index()).addClass('on')
    return false
  });

  $('.langSelectW .translateBtn').click(function(e){
    e.preventDefault();
    $('.addInfoMore').addClass('on');
    $('.addInfoMore').prev().addClass('on');
    $('.addInfoMore').text('접기')
    $('.addInfoMore').attr('title','접기');

    $('.translateCont').show();
    $('.translateCont .transResult').addClass('on');
  });

  $('.translateCont .transResult').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).next().slideUp();
    }else{
      $(this).addClass('on');
      $(this).next().slideDown();
    }
    return false
  });

  //소장기관 instituteMore 
  $(".instituteMore").on("click",function(){
    if($(this).parent().hasClass("on")){
      $(this).parent().removeClass("on");
      $(this).text("소장기관 펼쳐보기");
      $(this).attr('title','소장기관 펼쳐보기');
    }else{
      $(this).parent().addClass("on");
      $(this).text("소장기관 접어보기");
      $(this).attr('title','소장기관 접어보기');
    }
    return false
  });

  //analysisTab
  $('.analysisTab .tab>a').click(function(){
    $('.analysisTab .tab').removeClass('on');
    $(this).parent().addClass('on')
    $('.analysisTabCont>div').hide();
    $('.analysisTabCont>div').eq($(this).parent().index()).show();
    return false;
  });

  //usageAnalysisMore
  $('.usageAnalysisMore').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).text('더보기');
      $(this).attr('title','더보기');
      $('.usageAnalysis .analysis').removeClass('on');
      $('.usageAnalysis .analysis').eq(0).addClass('on');
    }else{
      $(this).addClass('on');
      $(this).text('접기');
      $(this).attr('title','접기');
      $('.usageAnalysis .analysis').addClass('on');
    }
    return false
  });


  //공개강의
  let videoList = new Swiper('.videoList .inner',{
    slidesPerView: "auto",
    spaceBetween: 0,
    freeMode: true,
  });

   //학술지 패싯
   $('.thesisFacet .titArea .tit').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).parent().next('.thFacetCont').stop().slideUp();
    }else{
      $(this).addClass('on');
      $(this).parent().next('.thFacetCont').stop().slideDown();
    }
    return false;
  });
  
  $('.thShList .thShListBtn').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).parents('li').find('ul').slideUp();
    }else{
      $(this).addClass('on');
      $(this).parents('li').find('ul').slideDown();
    }
    return false;
  });

  //내보내기
  $('.export').click(function(e){
    e.preventDefault();
    let ph = $('.exportPop .popHeader').outerHeight(true);
    $('.exportPop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
    $('.blackBg1').show();
    $('.exportPop').addClass('on');
  });
  $('.exportPopClose').click(function(e){
    e.preventDefault();
    $('.blackBg1').hide();
    $('.exportPop').removeClass('on');
    $(this).parents('.divPopup').removeClass('long');
  });

  //내책장담기
  $('.save').click(function(e){
    e.preventDefault();
    let ph = $('.savePop .popHeader').outerHeight(true);
    $('.savePop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
    $('.blackBg1').show();
    $('.savePop').addClass('on');
  });
  $('.savePopClose').click(function(e){
    e.preventDefault();
    $('.blackBg1').hide();
    $('.savePop').removeClass('on');
    $(this).parents('.divPopup').removeClass('long');
  });

  //카테고리 열기
  $('#interestCodeName1').click(function(){
    let ph = $('.categoryPop .popHeader').outerHeight(true);
    $('.categoryPop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
    $('.blackBg1').show();
    $('.categoryPop').addClass('on');
    $('#newCabinet_div2').removeClass('long')
  });
  $('.categoryPopClose').click(function(e){
    e.preventDefault();
    $('.categoryPop').removeClass('on');
    $(this).parents('.divPopup').removeClass('long');
  });

  //카테고리 폴더
  $('.folderList>li>a').click(function(e){
    e.preventDefault();
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).next().slideUp();
    }else{
      $(this).addClass('on');
      $(this).next().slideDown();
    }
  }); 
  
  $('.folderList>li>ul>li>a').click(function(e){
    e.preventDefault();
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).next().slideUp();
    }else{
      $(this).addClass('on');
      $(this).next().slideDown();
    }
  }); 

  //원문보기 팝업
  $('.viewOrigin').click(function(e){
    e.preventDefault();
    $('.blackBg1').show();
    $('.viewOriginPop').addClass('on');
    
  });

  $('.viewOriginPopClose').click(function(e){
    e.preventDefault();
    $('.blackBg1').hide();
    $('.viewOriginPop').removeClass('on');
    $(this).parents('.divPopup').removeClass('long');
    
  });

  $('.viewOriginBtn').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).next('.viewOriginList').stop().slideUp();
    }else{
      $(this).addClass('on')
      $(this).next('.viewOriginList').stop().slideDown();
    }
    return false;
  });

  //소장기관
  $('.infoDetail .infoCont .institute .instituteInfo1').click(function(){
    let ph = $('.agencyInfo .popHeader').outerHeight(true);
    $('.agencyInfo .popCont').css({'height':'calc(100% - ' +ph+'px)'})
    $('.blackBg1').show();
    $('.agencyInfo').addClass('on');
    return false
  });

  $('.agencyInfoClose').click(function(e){
    e.preventDefault();
    $('.blackBg1').hide();
    $('.agencyInfo').removeClass('on');
    $(this).parents('.divPopup').removeClass('long');
  });

  $('.infoDetail .infoCont .institute>li a.txt').click(function(){
    let ph = $('.keepInfo .popHeader').outerHeight(true);
    $('.keepInfo .popCont').css({'height':'calc(100% - ' +ph+'px)'})
    $('.blackBg1').show();
    $('.keepInfo').addClass('on');
    return false
  });

  $('.keepInfoClose').click(function(e){
    e.preventDefault();
    $('.blackBg1').hide();
    $('.keepInfo').removeClass('on');
    $(this).parents('.divPopup').removeClass('long');
  });

  //공유하기
  $('.infoDetail .btnBunch>ul>li>a.share').click(function(e){
    e.preventDefault();
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).next('.btnShareList').slideUp();
    }else{
      $(this).addClass('on');
      $(this).next('.btnShareList').slideDown();
    }
  });

  //오류접수
  $('.infoDetail .btnBunch>ul>li>a.recept').click(function(e){
    e.preventDefault();
    let ph = $('.errorReceptionPop .popHeader').outerHeight(true);
    $('.errorReceptionPop .popCont').css({'height':'calc(100% - ' +ph+'px)'});
    $('.blackBg1').show();
    $('.errorReceptionPop').addClass('on');
  });

  $('.errorReceptionPopClose').click(function(e){
    e.preventDefault();
    $('.blackBg1').hide();
    $('.errorReceptionPop').removeClass('on');
    $(this).parents('.divPopup').removeClass('long');
  });

  //인용정보
  $('.kcInfoToggle').click(function(e){
    e.preventDefault();
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).next('.kcToggleArea').slideUp();
    }else{
      $(this).addClass('on');
      $(this).next('.kcToggleArea').slideDown();
    }
  });

});    


