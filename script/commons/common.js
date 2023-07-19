let wholeUtil = {
  init: function () {
      this.bind();
  },

  bind: function () {
      $('.wholeMenu').scroll(function () {
        wholeUtil.menuSelect();
      });
  },

  menuSelect: function () {
    $('.wholeMenuNav').find('.on').removeClass('on');
    //$('.wholeMenuNav').find('.strong').removeClass('strong');
    if (this.checkVisible($('#wm1'))) {
      $('[href="#wm1"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm2'))) {
      $('[href="#wm2"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm3'))) {
      $('[href="#wm3"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm4'))) {
      $('[href="#wm4"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm5'))) {
      $('[href="#wm5"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm6'))) {
      $('[href="#wm6"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm7'))) {
      $('[href="#wm7"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm8'))) {
      $('[href="#wm8"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm9'))) {
      $('[href="#wm9"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm10'))) {
      $('[href="#wm10"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm11'))) {
      $('[href="#wm11"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm12'))) {
      $('[href="#wm12"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm13'))) {
      $('[href="#wm13"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#wm14'))) {
      $('[href="#wm14"]').parent('div').addClass('on');
    }
  },

  checkVisible: function (elm, eval) {
      eval = eval || 'object visible';
      let viewportHeight = $(window).height(); // Viewport Height
      let scrolltop = $(window).scrollTop(); // Scroll Top
      let y;
      try {
          y = $(elm).offset().top;
      } catch (e) {
          y = $(window).height();
      }

      let elementHeight = $(elm).height() + 10;

      if (eval == 'object visible') return y < viewportHeight + scrolltop && y > scrolltop - elementHeight;
      if (eval == 'above') return y < viewportHeight + scrolltop;
  },
};

$(document).ready(function(){
  $.fn.hasScrollBar = function() {
    return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) || (this.prop("scrollHeight") > this.prop("clientHeight"));
  };
  let winWidth = window.innerWidth || document.documentElement.clientWidth;
  let lastScrollTop = 0;
  let btnH = $('.detailBtns').height();
  let floatingH = $('.floating').height();
  let wholeTopH = $('.wholeMenuTop').outerHeight(true)
  $('.detailBtns').css('bottom', floatingH);
  if($('.detailBtns>ul>li').length ==1){
    $('.detailBtns').addClass('one')
  }


  let prevScrollpos = window.pageYOffset;
  $(window).on('scroll',function(event){
    winWidth = window.innerWidth || document.documentElement.clientWidth;
    let scroll = $(this).scrollTop();
    floatingH = $('.floating').height();
    if(scroll > 0){
      $('#divHeader').addClass('fix');
      if($('#divContents').hasClass('up')){
        $('#divContents').addClass('on');
      }
    }else{
      $('#divHeader').removeClass('fix');
      if($('#divContents').hasClass('up')){
        $('#divContents').removeClass('on');
      }
    }

    
    let currentScrollpos = window.pageYOffset;
    let scrollRange = $("body").outerHeight(true) - $(window).outerHeight(true);
    if (currentScrollpos >= 0 && prevScrollpos >= 0 && currentScrollpos <= scrollRange && prevScrollpos <= scrollRange) {
      if (prevScrollpos < currentScrollpos) {
        $('.floating').addClass('on')
        $('.detailBtns').css('bottom', 0)
        $('.floating').css('bottom', - floatingH)
        $('.floating .menu>li.foreign a').css('margin-top', 0)
      } else {
        $('.detailBtns').css('bottom', floatingH)
        $('.floating').css('bottom', 0)
        $('.floating').removeClass('on')
        if (winWidth > 767) {
          $('.floating .menu>li.foreign a').css('margin-top', -32)
        } else {
          $('.floating .menu>li.foreign a').css('margin-top', -10)
        }
      }
    }
    prevScrollpos = currentScrollpos;    
  });

  $(window).on('resize',function(){
    winWidth = window.innerWidth || document.documentElement.clientWidth;
    if(winWidth > 767){
      $('.floating .menu>li.foreign a').css('margin-top',-32)
    }else{
      $('.floating .menu>li.foreign a').css('margin-top',-10)
    }
  });

  let tabSlide = new Swiper('#divTabMenu .inner',{
    slidesPerView:'auto',
    spaceBetween: 0,
    freeMode: true,
  });
  let tabSlide3 = new Swiper('.swipeTab.type3 .inner',{
    slidesPerView:'auto',
    spaceBetween: 0,
    freeMode: true,
    observer: true,
    observeParents: true,
  });

 //검색상세화면 뜨는 팝업
 $('.searchInputW').on('click focus', function(){
  $('html, body').css('overflow','hidden');
  $('.blackBg1').show();
  $('#divSearch').addClass('on');
});

$('.searchClose').click(function(){
  $('html, body').css('overflow','visible');
  $('.blackBg1').hide();
  $('#divSearch').removeClass('on');
  return false;
});

$('.shBtn').click(function(){
  if($(this).hasClass('on')){
    $(this).removeClass('on');
    $(this).next('.shManage').slideUp();
  }else{
    $(this).addClass('on');
    $(this).next('.shManage').slideDown();
  }
  return false;
});

//상세검색
$('.detailSearchBtn').click(function(e){
  e.preventDefault();
  $('.detailSearch').slideDown();
});
$('.detailSearchClose').click(function(e){
  e.preventDefault();
  $('.detailSearch').hide();
});
let detailShTab = new Swiper('.detailShTab .inner',{
  slidesPerView:'auto',
  spaceBetween: 0,
  freeMode: true,
  observer: true,
  observeParents: true,

});

$('.detailShTab .toggleBtn').click(function(){
  if($(this).hasClass('on')){
    $(this).removeClass('on');
    $('.detailShTab').removeClass('all');
    detailShTab = new Swiper('.detailShTab .inner',{
      slidesPerView:'auto',
      spaceBetween: 0,
      freeMode: true,
    });
  }else{ 
    $(this).addClass('on');
    $('.detailShTab').addClass('all')
    detailShTab.destroy();
    
  }
  return false;
});
$('.detailShTab a').click(function(e){
  e.preventDefault();
  $('.detailShTab .tab').removeClass('on')
  $(this).parent().addClass('on')
  $('.detailShTabCont').hide();
  $('.detailShTabCont').eq($(this).parent().index()).show();
});

$('.detailShInput>ul>li:nth-of-type(3) .addInput').click(function(e){
  e.preventDefault();
  $(this).hide();
  $(this).prev('.selType3').show();
  $('.detailShInput>ul>li').eq(3).show();
});
$('.detailShInput>ul>li:nth-of-type(4) .addInput').click(function(e){
  e.preventDefault();
  $(this).hide();
  $(this).prev('.selType3').show();
  $('.detailShInput>ul>li').eq(4).show();
}); 


//popCont scroll
$('.divPopup .popCont').on('scroll',function(){
  if($(this).hasScrollBar()){
    $(this).parents('.divPopup').addClass('long');
  }
});

//toggleListForm
$('.toggleListForm>ul>li>a').click(function(e){
  e.preventDefault();
  if($(this).parent().hasClass('on')){
    $(this).parent().removeClass('on');
    $(this).next('.toggleHiddenContent').stop().slideUp();
  }else{
    $(this).parent().addClass('on');
    $(this).next('.toggleHiddenContent').stop().slideDown();
  }
});

//이용약관 팝업
$('.clauseBtn').click(function(e){
  e.preventDefault();
  let ph = $('.clausePop .popHeader').outerHeight(true);
  $('.clausePop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
  $('.blackBg1').show();
  $('.clausePop').addClass('on');
});
$('.clausePopClose').click(function(e){
  e.preventDefault();
  $('.blackBg1').hide();
  $('.clausePop').removeClass('on');
  $(this).parents('.divPopup').removeClass('long');
});



//wholeMenu
$('.allMenu>a').click(function(e){
  e.preventDefault();
  $('.blackBg1').show();
  $('.wholeMenu').addClass('on');
});
$('.wholeMenuClose').click(function(e){
  e.preventDefault();
  $('.blackBg1').hide();
  $('.wholeMenu').removeClass('on');
});
let wholeMenuNav = new Swiper('.wholeMenuNav .inner',{
  slidesPerView:'auto',
  spaceBetween: 0,
  freeMode: true,
});


$('.wholeMenuNav .tab>a').click(function(){
  let i1 = $(this).parent().index();
  $('.wholeMenuNav .tab').removeClass('on');
  $('.wholeMenuNav .tab').addClass('strong');
  $(this).parent().addClass('on');
  $(this).parent().removeClass('strong');
  wholeMenuNav.slideTo(i1);

});
let wm1 = $('#wm1').offset().top - 63;
let wm2 = $('#wm2').offset().top - 63;
let wm3 = $('#wm3').offset().top - 63;
let wm4 = $('#wm4').offset().top - 63;
let wm5 = $('#wm5').offset().top - 63;
let wm6 = $('#wm6').offset().top - 63;
let wm7 = $('#wm7').offset().top - 63;
let wm8 = $('#wm8').offset().top - 63;
let wm9 = $('#wm9').offset().top - 63;
let wm10 = $('#wm10').offset().top - 63;
let wm11 = $('#wm11').offset().top - 63;
let wm12 = $('#wm12').offset().top - 63;
let wm13 = $('#wm13').offset().top - 63;
let wm14 = $('#wm14').offset().top - 63;
$('.wholeMenu').on('scroll',function(){
  scroll = $(this).scrollTop();
  console.log(scroll)
  wholeTopH = $('.wholeMenuTop').outerHeight(true);
  $('.wholeMenuNav .tab').removeClass('strong');
  if(scroll > wholeTopH + 16){
    $('.wholeMenuNav').addClass('fix');
    $('.wholeMenuList').addClass('on');
  }else{
    $('.wholeMenuNav').removeClass('fix');
    $('.wholeMenuList').removeClass('on');
  }

  if(scroll > wm1 && scroll < wm2){
    wholeMenuNav.slideTo(0);
  } else if(scroll > wm2 && scroll < wm3){
    wholeMenuNav.slideTo(1);
  } else if(scroll > wm3 && scroll < wm4){
    wholeMenuNav.slideTo(2);
  } else if(scroll > wm4 && scroll < wm5){
    wholeMenuNav.slideTo(3);
  } else if(scroll > wm5 && scroll < wm6){
    wholeMenuNav.slideTo(4);
  } else if(scroll > wm6 && scroll < wm7){
    wholeMenuNav.slideTo(5);
  } else if(scroll > wm7 && scroll < wm8){
    wholeMenuNav.slideTo(6);
  } else if(scroll > wm8 && scroll < wm9){
    wholeMenuNav.slideTo(7);
  } else if(scroll > wm9 && scroll < wm10){
    wholeMenuNav.slideTo(8);
  } else if(scroll > wm10 && scroll < wm11){
    wholeMenuNav.slideTo(9);
  } else if(scroll > wm11 && scroll < wm12){
    wholeMenuNav.slideTo(10);
  } else if(scroll > wm12 && scroll < wm13){
    wholeMenuNav.slideTo(11);
  } else if(scroll > wm13 && scroll < wm14){
    wholeMenuNav.slideTo(12);
  }
});

  wholeUtil.init();
});    