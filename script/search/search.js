$(document).ready(function(){

  //검색목록 시작

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

  //원문보기 여러개
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


  //목차보기 버튼
  $('.divViewListBtn').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).parents('.btns').find('.divViewList').stop().slideUp();
    }else{
      $(this).addClass('on')
      $(this).parents('.btns').find('.divViewList').stop().slideDown();
    }
    return false;
  });

  //강의보기 버튼
  $('.videoListPopBtn').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).parents('.btns').find('.videoListPop').stop().slideUp();
    }else{
      $(this).addClass('on')
      $(this).parents('.btns').find('.videoListPop').stop().slideDown();
    }
    return false;
  });


  //facet
  $('.facetBtn').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $('.facet').removeClass('on');
    }else{
      $(this).addClass('on');
      $('.facet').addClass('on');
    }
    return false;
  });
  $('.facetClose').click(function(){
    $('.facetBtn').removeClass('on');
    $('.facet').removeClass('on');
    return false;
  });

  $('.facetList>li>a').click(function(){
    if($(this).parent().hasClass('on')){
      $(this).parent().removeClass('on');
      $(this).next('.listCont').slideUp()
    }else{
      $(this).parent().addClass('on');
      $(this).next('.listCont').slideDown()
    }
    return false;
  });

  $('.facetCont .facetList>li .listCont a.allToggleBtn').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).prev().removeClass('all')
    }else{
      $(this).addClass('on');
      $(this).prev().addClass('all')
    }
    return false;
  });

	$(document).on('click', '.facetCont .facetList .listCont>ul>li label', function() {
		if(!$(this).prev().is(":checked")==true){
			$('.btnAction').removeClass('on');
			$(this).parent().find('.btnAction').addClass('on');
      $(this).parent().addClass('on');
		} else {
			$(this).parent().find('.btnAction').removeClass('on');
      $(this).parent().removeClass('on');
		}
	});


	
	$(document).on('click', '.facetCont .facetList .listCont>ul>li input:checkbox', function() {
		if(!$(this).is(":checked")){
		$('.facetCont .facetList .listCont>ul>li input:checkbox').each(function(key, val) {
			if(val.checked) {
				$('.btnAction').removeClass('on');
				$(val).parent().find('.btnAction').addClass('on');
				return false;
			}
		});
		}
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

  //추천자료 열고닫기
  $('.recommendCont .tit').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).parent().next('.recommendArea').slideUp();
    }else{
      $(this).addClass('on');
      $(this).parent().next('.recommendArea').slideDown();
    }
    return false;
  });

  //권호소장정보
  $('.institute>li a.txt').click(function(){
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

});    


