$(document).ready(function() {
    /** 검색 목록 전체 체크 */
    //개별항목 체크/체크해제
    $("#allChk").click(function() {
        checkAll('control_no', $(this).is(":checked"));
    });

    //전체 체크/체크해제
    $("input[name=control_no]").click(function() {
        $("#allChk").prop("checked", isCheckAll('control_no'));
        $(this).prop("checked", $(this).is(":checked"));
    });
    
    //최근검색어 전체 삭제
    $("#allHistoryDeLi").click(function() {
        delKeywordForTodayList("all", "0");
    });
    //최근검색어 자동저장
    $("#noAutoSave").click(function() {
        var autoSaveCookie = getCookie("autoSave");

        if (autoSaveCookie == "" || autoSaveCookie == undefined || autoSaveCookie == "Y") {
            setCookie("autoSave", "N", 3600);
            $("#noAutoSave").attr("title", "자동저장켜기");
            $("#noAutoSave").text("자동저장켜기");
            $("#noAutoLi").attr("class", "noAutoOn");
        } else {
            setCookie("autoSave", "Y", 3600);
            $("#noAutoSave").attr("title", "자동저장끄기");
            $("#noAutoSave").text("자동저장끄기");
            $("#noAutoLi").attr("class", "");
        }
        return false;
    });    
    /** 정렬 (정확도순, 인기도순 등) 검색 */
    $("#sortSelect").on("change", function() {
        var col = $("#tabForm").find("[name=colName]").val();
        orderSearch(col);
    });
    /** 정렬 (내림차순, 오름차순) 검색 */
    $("#orderSelect").on("change", function() {
        var col = $("#tabForm").find("[name=colName]").val();
        orderSearch(col);
    });
    /** 필터 항목보기 순서 정렬 */
    $("#facetOrderBySel").on("change", function() {
        var colName = $("#tabForm").find("[name=colName]").val();
        var orderBy = $(this).val();
        if (orderBy == "textOrder") {
            facetNameSort(colName);
        } else {
            facetCountSort(colName);
        }
    });
    /** 필터 선택해제 */
    $("#allDel").click(function() {
        $("#TopSearch").find("[name=fsearchMethod]").val("");
        $("#TopSearch").find("[name=exQuery]").val("");
        $("#TopSearch").find("[name=exQueryText]").val("");
        $("#TopSearch").find("[name=iStartCount]").val("0");
        $("#TopSearch").attr("action", "/search/Search.do");
        $("#TopSearch").submit();
    });
    /** 통합검색 엔터 이벤트 
    $("#query").on("keyup", function(e) {
        if (e.keyCode == 13) {
            searchCheckValue();
        }
    });*/
    /** 통합검색 버튼 이벤트 
    $("#topSearchBtn").on("click", function(e) {
        searchCheckValue();
        return false;
    });*/
    /** 필터 검색 버튼 이벤트 */
    $(".facetCont .facetList .listCont>ul>li a.btnAction").on('click', function() {
        goGroupSearch();
        return false;
    });
    /** 내서재 담기 버튼 이벤트 */
    $("#putIntoMyCabinetBtn").on("click", function() {
        putInputMyCabinetFormSubmit('/myriss/ajax/PutIntoMyCabinetAjax.do');
        return false;
    });
    /** 내책장 담기 > 새 책장 만들어 자료 담기 버튼 이벤트 */
    $("#newPutIntoMyCabinetBtn").on("click", function() {
        putInputMyCabinetFormSubmit('/myriss/ajax/PutIntoMyCabinetAjax.do');
        return false;
    });
    /** 검색결과 하단 > 연관검색어, 이 검색어로 많이 본 자료, 활용도 높은 자료 > 토글 이벤트  */
    $('.totalSearchResult .recommendCont .tit').click(function() {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).parent().next('.recommendArea').slideUp();
        } else {
            if ($(this).parents(".recommendCont").find("#relatedKeyword").length) {
                // 추천시스템 연관검색어
                getRecommendRelatedKeywords(keyword4aiq.replace("'", ""), target4aiq);
            }
            $(this).addClass('on');
            $(this).parent().next('.recommendArea').slideDown();
        }
        return false;
    });
    //강의보기 버튼
    $('.btns .videoListPopBtn').click(function() {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).parents('.btns').find('.videoListPop').stop().slideUp();
        } else {
            var lectureKey = $(this).attr("lectureKey");
            var lectureEncKey = $("#lecture_enc_key_" + lectureKey).val();
            $(this).addClass('on')
            $(this).parents('.btns').find('.videoListPop').stop().slideDown();
            f_getLectures(this, lectureEncKey, lectureKey);
        }
        return false;
    });
    
    //검색상세화면 뜨는 팝업
    $('span.searchInput, .searchInputW .searchBtn').on('click touchend', function() {
        // 최신검색어 조회
        latestSearchKeywordAjax();  
        // 인기검색어 조회
        keywordHistoryRankingAjax();
        
        $('html, body').css('overflow', 'hidden');
        $('.blackBg1').show();
        $('#divSearch').addClass('on');
      

        //0초 후 포커스
		setTimeout(function(){
			$('.searchInputW .searchInput').focus();
		},0);
    });
    
});
// 검색 버튼 이벤트 
var ButtonSet = {
    ddodDownloadSubmit: function(controlNo, imageFormat, ddodFlag) {
        with (document.f) {
            control_no.value = controlNo;
            fulltext_kind.value = imageFormat;
            loginFlag.value = 1;
            ddodDownloadSubmit(ddodFlag);
            loginFlag.value = '';
        }
    },
    fulltextDownload: function(controlNo, matType, matSubtype, imageFormat, tGubun) {
        with (document.f) {
            control_no.value = controlNo;
            p_mat_type.value = matType;
            p_submat_type.value = matSubtype;
            fulltext_kind.value = imageFormat;
            t_gubun.value = tGubun;
            content_page.value = '';//목차검색조회 페이지값 초기화
            fulltextDownload();
        }
    },
    contentFulltextDownload: function(controlNo, matType, matSubtype, imageFormat, tGubun, contentPage) {
        with (document.f) {
            control_no.value = controlNo;
            p_mat_type.value = matType;
            p_submat_type.value = matSubtype;
            fulltext_kind.value = imageFormat;
            t_gubun.value = tGubun;
            content_page.value = contentPage;
            fulltextDownload();
        }
    },
    urlDownload: function(urltype, controlNo, matType, matSubtype, imageFormat, tGubun) {
        with (document.f) {
            control_no.value = controlNo;
            p_mat_type.value = matType;
            url_type.value = urltype;
            urlDownload(urltype);
        }
    },
    publicUrlDownload: function(urltype, controlNo, matType, matSubtype, imageFormat, orgCode, tGubun) {
        with (document.f) {
            control_no.value = controlNo;
            p_mat_type.value = matType;
            url_type.value = urltype;
            mingan_org_storage.value = orgCode;
            publicUrlDownload(urltype);
        }
    },
    checkKyoboUrl: function(urlTypeW, urlTypeM, controlNo, matType, academicUserYn, isLogin) {

        if (isLogin == "2") {
            if (academicUserYn == "Y") {
                ButtonSet.kyoboUrlDownload(urlTypeM, controlNo, matType, '', '', '');
            } else {
                ButtonSet.kyoboUrlDownload(urlTypeW, controlNo, matType, '', '', '');
            }
        } else {
            if (confirm('\'스콜라\' 미구독 기관 이용자는 오후 4시부터 익일 오전 7시까지\nRISS 개인 로그인을 통해 무료로 원문보기를 사용하실 수 있습니다.\n\n개인로그인으로 전환 하시겠습니까?')) {
                if (academicUserYn == "Y") {
                    ButtonSet.kyoboUrlDownload(urlTypeM, controlNo, matType, '', '', '');
                } else {
                    ButtonSet.kyoboUrlDownload(urlTypeW, controlNo, matType, '', '', '');
                }
            } else {
                ButtonSet.urlDownload(urlTypeW, controlNo, matType, '', '', '');
            }
        }

    },
    kyoboUrlDownload: function(urltype, controlNo, matType, matSubtype, imageFormat, tGubun) {
        with (document.f) {
            control_no.value = controlNo;
            p_mat_type.value = matType;
            url_type.value = urltype;
            kyoboUrlDownload(urltype);
        }
    },
    memberUrlDownload: function(orgcode, urltype, controlNo, matType, matSubtype, imageFormat, tGubun) {
        with (document.f) {
            control_no.value = controlNo;
            p_mat_type.value = matType;
            url_type.value = urltype;
            memberUrlDownload(urltype, controlNo, orgcode);
        }
    },
    publicMemberUrlDownload: function(orgcode, urltype, controlNo, matType, matSubtype, imageFormat, tGubun) {
        with (document.f) {
            control_no.value = controlNo;
            p_mat_type.value = matType;
            url_type.value = urltype;
            publicMemberUrlDownload(urltype, controlNo, orgcode);
        }
    },
    overFulltextDownload: function(url, dbname, controlNo, matType) {
        with (document.f) {
            control_no.value = controlNo;
            p_mat_type.value = matType;
            overFulltextDownload(url, dbname);
        }
    },
    memberFulltextDownlod: function(viewcode, orgcode, p_mat_type) {
        var x = window.open("/search/download/FullTextDownload.do?viewcode=" + viewcode + "&orgcode=" + orgcode + "&p_mat_type=" + p_mat_type + "&loginFlag=1", "FulltextDownload", "status=0,toolbar=0,Titlebar=0,width=840,height=680,resizable=1");
    }
}

function alertFullTextLayer(controlNo, orgStorage, minganOrgStorage, urlType, minganCd, gubun) {
    $('#f input[name=control_no]:hidden').val(controlNo);
    $('#f input[name=org_storage]:hidden').val(orgStorage);
    $('#f input[name=fulltmingan_org_storage]:hidden').val(minganOrgStorage);
    $('#f input[name=url_type]:hidden').val(urlType);
    $('#f input[name=mingan_cd]:hidden').val(minganCd);
    $('#f input[name=gubun]:hidden').val(gubun);
    $('#alertFulltextLayer').css("display", "");
}

function openFulltextLayer() {
    var controlNo = $('#f input[name=control_no]:hidden').val();
    var orgStorage = $('#f input[name=org_storage]:hidden').val();
    var minganOrgStorage = $('#f input[name=fulltmingan_org_storage]:hidden').val();
    var urlType = $('#f input[name=url_type]:hidden').val();
    var minganCd = $('#f input[name=mingan_cd]:hidden').val();
    var gubun = $('#f input[name=gubun]:hidden').val();

    openFulltext(controlNo, orgStorage, minganOrgStorage, urlType, minganCd, gubun);
    $('#alertFulltextLayer').css("display", "none");
}

function openFulltext(aControlNo, orgStorage, minganOrgStorage, urlType, minganCd, gubun) {
    var pars = "control_no=" + aControlNo + "&org_storage=" + orgStorage + "&mingan_org_storage=" + minganOrgStorage + "&url_type=" + urlType + "&gubun=" + gubun;
    var cw = 700;
    var ch = 700;
    var sw = screen.availWidth;
    var sh = screen.availHeight;
    //열 창의 포지션
    var px = (sw - cw) / 2;
    var py = (sh - ch) / 2;
    var option = "";
    // PDF, Dcollecton 자료외에는 전체화면으로 호출
    if (minganCd == "90" || minganCd == "91" || minganCd == "07") {
        option = "scrollbars=no, toolbar=no, resizable=1, status=no, location=no, menu=no, Width=" + cw + ", Height=" + ch + ",left=" + px + ",top=" + py;
        if ((minganCd == "07" && gubun == "KYOBO")) {
            pars += "&loginFlag=1";
        }
    }
    var url = "/search/download/openFullText.do?" + pars;
    var f = window.open(url, "_blank", option);
}

//상호대차 팝업
function OpenOrder(ctrl_no, type, v_ctrl_no) {
    var targetName = 'order';
    if (!v_ctrl_no) v_ctrl_no = "";
    var win = window.open('/order/OrderForm.do?requestType=requestPanel&loginFlag=1&ctrl_no=' + ctrl_no + '&type=' + type + '&v_ctrl_no=' + v_ctrl_no + '&conType=real', targetName, "status=0,toolbar=0,Titlebar=0,scrollbars=1,resizable=1,width=838px,height=550px");
    win.focus();
}

//오늘 본 자료
window.onpageshow = function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
        getTodayViewContents()
    }
}
// 검색 탭 이동
function goTabCate(col, obj) {
    setFsearchSession("N");
    var frm = document.tabForm;
    
    if (col == "re_s_over") {
        if (frm.query.value == '' && document.TopSearch.query.value == '') {
            alert("질의어가 존재 하지 않습니다.");
            return false;
        }
    }

    if (col == "re_e_over" || col == "re_s_over") {
        if (frm.resultKeyword.value == '' && frm.query.value == '' && document.TopSearch.query.value == '') {
            alert("질의어가 존재 하지 않습니다.");
            return false;
        }

        frm.icate.value = col;
        if (document.TopSearch.query.value != '') {
            frm.query.value = document.TopSearch.query.value;
            frm.fsearchMethod.value = "search";
            frm.isDetailSearch.value = "N";
            frm.isFDetailSearch.value = "N";
            frm.queryText.value = "";
            frm.resultKeyword.value = "";
            frm.p_year1.value = "";
            frm.p_year2.value = "";
            frm.facetList.value = "";
            frm.facetListText.value = "";
        } else {
            frm.fsearchMethod.value = "";
        }

        if (col == "re_s_over") {
            frm.fsearchSort.value = "";
            frm.fsearchOrder.value = "";
        }

    } else {
        if (frm.queryText.value == '' && frm.query.value == '' && document.TopSearch.query.value == '') {
            alert("질의어가 존재 하지 않습니다.");
            return false;
        }
    }
    $(obj).parent().addClass('on').siblings().removeClass('on');
    frm.colName.value = col;
    frm.action = "/search/Search.do";
    if (col == "re_e_over" || col == "re_s_over") frm.action = "/fsearch/Fsearch.do";
    frm.submit();
}
// 해외 세션 등록
function setFsearchSession(val) {
    if (val == null || val == "") val = "N"; //기본값 N
    var url = "/fsearch/setFsearchYnSession.do?fsearchYn=" + val;
    $.ajax({
        type: "GET",
        url: url,
        success: function() {
            sessionStorage.setItem('fsearchYn', val);
        }, error: function(request, status, error) {
            console.log(request);
            console.log(error);
        }
    });
}

/* 체크박스 전체 체크/체크해제
 * chkBoxId : 체크박스ID
 * chkFlag : true:전체체크,false:전체체크해제
 */
function checkAll(chkBoxId, chkFlag) {

    $("input[name=" + chkBoxId + "]:checkbox").each(function() {
        if($(this).hasClass("textReadOnly")) {/* disabled 인 경우는 체크 처리하지 않음 */}
        else {$(this).prop("checked", chkFlag);}
    });
}

//체크박스 전체체크 여부 확인
function isCheckAll(chkBoxId) {
    var isCheckAll = true;
    $("input[name=" + chkBoxId + "]:checkbox").each(function() {
        if (!$(this).is(":checked")) {
            isCheckAll = false;
        }
    });
    return isCheckAll;
}
/** 키워드 통합검색 */
function goKeywordSearch(target) {

    $("input[name='calName']").val("all");
    $("#query").val($(target).find(".keyword").text());
    $("#TopSearch").submit();
}

/** 키워드 유효성 체크 */
function mainValCheck(form) {

    if (trim(form.query.value) == '') {
        alert('키워드를 입력하세요');
        return false;
    }
    form.query.value = CharacterCheck(form.query.value);
    if (trim(form.query.value) == '') {
        alert("검색어에 특수문자( ? * , )는 입력할 수 없습니다.");
        return false;
    }
    if (trim(CharacterCheck2(form.query.value)) == '') {
        alert("검색어가 알파벳(a~z an at and by for from in is it its on or the with)만으로 이루어져 있습니다. \n다른 검색어를 입력하십시오. ");
        form.query.focus();
        return false;
    }
    form.strQuery.value = "";
    form.queryText.value = "";
    return true;
}

/** 인기검색어 조회 */
function keywordHistoryRankingAjax() {
    jQuery.ajax({
        url: '/search/ajax/keywordHistoryRankingAjax.do',
        type: 'post',
        dataType: "json",
        success: function(result) {
            var vHtml = [];
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    var changeRateVal = "";
                    var addClass = "";
                    if (result[i].changeRate == 0) { changeRateVal = "-"; addClass = ""; }
                    else if (result[i].changeRate == 1) { changeRateVal = "&darr;" + result[i].changeCnt; addClass = "down"; }
                    else if (result[i].changeRate == 2) { changeRateVal = "&uarr;" + result[i].changeCnt; addClass = "up"; }
                    else if (result[i].changeRate == 3) { changeRateVal = "New"; addClass = "new"; }

                    var vKeywordList = '<li class="list">' +
                        '<a href="#search" onClick="goKeywordSearch(this)">' +
                        '<span class="num">' + result[i].rn + '</span>' +
                        '<span class="keyword">' + result[i].keyword + '</span>' +
                        '<span class="info ' + addClass + '">' + changeRateVal + '</span>' +
                        '</a>' +
                        '</li>';
                    vHtml.push(vKeywordList);
                }
            }

            var now = new Date();
            var keywordDateVal = now.getFullYear() + "-" + ('00' + (now.getMonth() + 1)).slice(-2) + "-" + now.getDate() + " 기준";
            $("#divSearch .keywordList .titArea .date").empty();
            $("#divSearch .keywordList .titArea .date").html(keywordDateVal);
            $("#divSearch .keywordList > ul").empty();
            $("#divSearch .keywordList > ul").html(vHtml.join(''));
            
            var searchInputText = $("input.searchInput").val();
            $("input.searchInput").val("");
            /*$("input.searchInput").focus();*/
            $("input.searchInput").val(searchInputText);

        },
        error: function(content, result) {
            console.log(content)
            console.log(result)
        }
    });
}

/** 최근검색어 조회 */
function latestSearchKeywordAjax() {
    jQuery.ajax({
        url: '/search/ajax/latestSearchKeywordAjax.do',
        type: "post",
        dataType: "json",
        success: function(result) {
            var vHtml = [];
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    var vKeywordList = '<li id="today_keyword_' + (result.length - i) + '">' +
                        '<div>' +
                        '<a href="#search" class="txt" title="' + result[i].queryTEXT + '" onclick="lastestQuery(\'' + result[i].query + '\',\'' + result[i].queryText + '\',\'' + result[i].exQuery + '\',\'' + result[i].cate + '\',\'' + result[i].count + '\')">' + result[i].queryTEXT + '</a>' +
                        '<a href="#del" class="delete" title="삭제" onclick="javascript:delKeywordForTodayList(\'sub\',\'' + (result.length - i) + '\');"><img src="/images/commons/delType2.png" alt="최근검색어 삭제"></a>' +
                        '</div>' +
                        '</li>';
                    vHtml.push(vKeywordList);
                }
                $("#divSearch .searchHistory #noHisotry").remove();
                $("#divSearch .searchHistory #latestSearchKeywordW").empty();
                $("#divSearch .searchHistory #latestSearchKeywordW").html(vHtml.join(''));
                $("#allHistoryDeLi").attr("class", "");
            } else {
                $("#divSearch .searchHistory #noHisotry").empty();
                $("#divSearch .searchHistory #latestSearchKeywordW").remove();
                vHtml.push("<p class='noHistory' id='noHisotry'>최근 검색어가 없습니다.</p>");
                $("#divSearch .searchHistory .titArea").after(vHtml.join(''));
                $("#allHistoryDeLi").attr("class", "allHistoryDel");
            }
            //최근검색어 자동저장
            var autoSaveCookie = getCookie("autoSave");

            if (autoSaveCookie == "" || autoSaveCookie == undefined || autoSaveCookie == "Y") {
                $("#noAutoSave").attr("title", "자동저장끄기");
                $("#noAutoSave").text("자동저장끄기");
                $("#noAutoLi").attr("class", "");
            } else {
                $("#noAutoSave").attr("title", "자동저장켜기");
                $("#noAutoSave").text("자동저장켜기");
                $("#noAutoLi").attr("class", "noAutoOn");
            }

        },
        error: function(content, result) { alert(result); }
    });
}

/** 최근검색어 검색된 조건으로 검색 */
function lastestQuery(query, queryText, exQuery, cate, cnt) {
    if (document.querySelectorAll("form[name='last']").length > 1)
        var f = document.last[0];
    else
        var f = document.last;
    f.query.value = query;
    f.queryText.value = queryText;
    f.exQuery.value = exQuery;
    f.searchCnt.value = cnt.replace(",", "");
    f.colName.value = cate;
    if (cate == 're_e_over') {
        if (queryText != null && queryText != '' && queryText.indexOf("<rsRESEARCH>") > -1) {
            queryText = queryText.substring(0, queryText.indexOf("<rsRESEARCH>"));
            f.queryText.value = queryText;
            f.resultKeyword.value = queryText;
            f.resultSearchYn.value = "true";
        }
        else if (query != null && query != "") {
            f.resultKeyword.value = query;
        } else if (queryText != null && queryText != '') {
            f.resultKeyword.value = queryText;
            f.isFDetailSearch.value = "Y";
            f.fsearchMethod.value = "searchDetail";
            fsearchDetailQuery(queryText);
            f.method = "GET";
        }
        setFsearchSession('Y');
        f.action = "/fsearch/Fsearch.do";
    } else {
        setFsearchSession('N');
        f.action = "/search/Search.do";
    }
    f.submit();
}

/** 최근검색어 전체/선택 삭제 */
function delKeywordForTodayList(gubun, prow) {
    try {
        if (gubun == 'all') {
            if (confirm('초기화 하시겠습니까?')) {
                jQuery.ajax(
                    {
                        url: "/search/DelKeywordForTodayMapListAjax.do",
                        type: "post",
                        data: {
                            prow: gubun
                        },
                        dataType: "text",
                        success: function(result) {
                            latestSearchKeywordAjax();
                        },
                        error: function(content, result) {
                        }
                    }
                );
            }
        } else {
            jQuery.ajax(
                {
                    url: "/search/DelKeywordForTodayMapListAjax.do",
                    type: "post",
                    data: {
                        prow: prow
                    },
                    dataType: "text",
                    success: function(result) {
                        latestSearchKeywordAjax();
                    },
                    error: function(content, result) {
                    }
                }
            );
        }
    } catch (ex) { }
}

/** 페이징 검색 */
function goPage(count) {
    $("#TopSearch").find("[name=iStartCount]").val(count);
    $("#TopSearch").attr("action", "/search/Search.do");
    $("#TopSearch").submit();
}

function goFPage(count) {
    $("#TopSearch").find("[name=fsearchMethod]").val("");
    $("#TopSearch").find("[name=pageNumber]").val(count);
    $("#TopSearch").attr("action", "/fsearch/Fsearch.do");
    $("#TopSearch").submit();
}

/** 정렬 검색 */
function orderSearch(col) {
    if (col == "re_e_over" || col == "re_s_over") {
        $("#TopSearch").find("[name=fsearchMethod]").val("");
        if (col == "re_s_over") {
            $("#TopSearch").find("[name=fsearchSort]").val("");
            $("#TopSearch").find("[name=fsearchOrder]").val("");
        } else {
            $("#TopSearch").find("[name=fsearchSort]").val($("select[name=fsearchSort]").val());
            $("#TopSearch").find("[name=fsearchOrder]").val($("select[name=fsearchOrder]").val());
        }
        $("#TopSearch").find("[name=pageNumber]").val("1");
    } else {
        $("#TopSearch").find("[name=strSort]").val($("select[name=strSort] option:selected").val());
        $("#TopSearch").find("[name=order]").val($("select[name=order] option:selected").val());
        $("#TopSearch").find("[name=iStartCount]").val("0");
        $("#TopSearch").find("[name=fsearchMethod]").val("");
    }
    $("#TopSearch").find("[name=pageScale]").val($("select[name=pageScale]").val());
    $("#TopSearch").attr("action", "/search/Search.do");
    if (col == "re_e_over" || col == "re_s_over") $("#TopSearch").attr("action", "/fsearch/Fsearch.do");
    $("#TopSearch").submit();
}
// 좁혀본 항목 보기순서 - 가나다순
function facetNameSort(colName) {
    if (colName != "re_e_over" && colName != "re_s_over") $("#TopSearch").find("[name=orderBy]").val("NAME");

    var sortIds = $("#facetListDiv li .listCont .facsetFiedlList");
    $.each(sortIds, function(key, sortId) {
        var pTitle = $(sortId).parent().parent().parent().parent().children('a').text();
        if (pTitle == '주요구분') return true;
        var itemList = $(sortId).find('li').get();
        itemList.sort(function(a, b) {
            var a = $(a).find('label').text().toUpperCase().replace(/\n/g, "").replace(/\t/g, "");
            var b = $(b).find('label').text().toUpperCase().replace(/\n/g, "").replace(/\t/g, "");
            if (pTitle == '발행연도') {
                if (a.length > 4) a = a.substr(0, 4);
                if (b.length > 4) b = b.substr(0, 4);
                if ($.isNumeric(a) || $.isNumeric(b)) {
                    if (!$.isNumeric(a)) a = 0;
                    if (!$.isNumeric(b)) b = 0;
                }
                return (a > b) ? -1 : (a < b) ? 1 : 0;
            } else {
                return (a < b) ? -1 : (a > b) ? 1 : 0;
            }
        });
        $(sortId).append(itemList);
    });
}
// 좁혀본 항목 보기순서 - 검색량순
function facetCountSort(colName) {
    if (colName != "re_e_over" && colName != "re_s_over") $("#TopSearch").find("[name=orderBy]").val("");
    var sortIds = $("#facetListDiv li .listCont .facsetFiedlList");
    $.each(sortIds, function(key, sortId) {
        if (colName == 're_e_over' && key == 0) return true;
        var itemList = $(sortId).find('li').get();
        itemList.sort(function(a, b) {
            var a = $(a).children('label').find('.total').text();
            a = pad(a.replace(/[,\(\)]/g, ''), 15);
            var b = $(b).children('label').find('.total').text();
            b = pad(b.replace(/[,\(\)]/g, ''), 15);
            return (b < a) ? -1 : (b > a) ? 1 : 0;
        });
        $(sortId).append(itemList);
    });
}

function pad(str, max) {
    return str.length < max ? pad("0" + str, max) : str;
}

// 필터 검색
function goGroupSearch() {
    var frm = document.TopSearch;
    if (frm.colName.value == 're_e_over') {
        var limiterList = frm.limiterList.value;
        var limiterListText = frm.limiterListText.value;
        var facetList = frm.facetList.value;
        var facetListText = frm.facetListText.value;
        var fsearchDB = frm.fsearchDB.value;
        var ret = false;
        // 학술연구정보서비스 검색
        $("form[name=group] input:checkbox").each(function() {
            if (this.checked) {
                var vTitle = $(this).closest("ul").attr("title");
                var vCurrname = this.title;
                vTitle = vTitle + " [" + vCurrname + "]";

                if (this.id == "limiter1" || this.id == "limiter2") {
                    var vValue = this.value;
                    vValue = vValue.replace("addlimiter(", "");
                    vValue = vValue.replace(")", "");
                    vValue = encodeURIComponent(vValue);

                    if (limiterListText.indexOf(vValue) > -1) return true;

                    if (limiterList) limiterList += "@";
                    limiterList += vValue;

                    limiterListText += vCurrname;
                    limiterListText += "@@";
                    limiterListText += vValue;
                    limiterListText += "◈";

                } else if (this.id == "limiter3") {
                    var starDate = $("#pubStYear").val();
                    var endDate = $("#pubEdYear").val();

                    if (starDate == "" && endDate == "") {
                        ret = true;
                        return false;
                    }

                    if (limiterListText.indexOf("DT1") > -1) {
                        var vArry = limiterListText.split("◈");

                        var tempText = "";
                        for (var i = 0; i < vArry.length - 1; i++) {
                            if (vArry[i].indexOf("DT1") == -1) {
                                tempText += vArry[i] + "◈";
                            } else {
                                var val = vArry[i].split("@@");
                                if (val.length > 1) limiterList = limiterList.replace("@" + val[1], "");
                                if (val.length > 1) limiterList = limiterList.replace(val[1], "");
                            }
                        }

                        limiterListText = tempText;
                    }

                    var vValue = "DT1:";

                    if (starDate) {
                        vValue += starDate + "-01";
                        vCurrname += " " + starDate;
                    }

                    vValue += "/";
                    vCurrname += " ~"

                    if (endDate) {
                        vValue += endDate + "-12";
                        vCurrname += " " + endDate;
                    }

                    vValue = encodeURIComponent(vValue);
                    if (limiterList) limiterList += "@";

                    limiterList += vValue;

                    limiterListText += vCurrname;
                    limiterListText += "@@";
                    limiterListText += vValue;
                    limiterListText += "◈";

                } else {
                    var vValue = this.value;
                    var spl = vValue.split(":");
                    if (spl.length > 1) {
                        //2020.12.01 Facet 검색 특수 기호 처리
                        //, -> \\, : => \\: 변경 후 URL인코딩
                        vValue = spl[0] + ":" + encodeURIComponent(spl[1].replace(",", "\\,"));
                        if (spl.length > 2) {
                            vValue = vValue + encodeURIComponent("\\:" + spl[2]);
                        }
                    }
                    if (facetListText.indexOf(vValue) > -1) return true;
                    if (facetList) facetList += ",";
                    facetList += vValue;
                    facetListText += vTitle;
                    facetListText += "@@";
                    facetListText += vValue;
                    if (this.name == "contentsDb" || this.name == "contentDbPublishers") {
                        facetListText += "@@";
                        facetListText += this.title;
                        if (fsearchDB) fsearchDB += ",";
                        fsearchDB += this.title;
                    }
                    facetListText += "◈";
                }
            }
        });

        if (ret) {
            alert("시작년도를 입력하세요");
            return true;
        }

        document.TopSearch.fsearchMethod.value = "";
        document.TopSearch.fsearchDB.value = fsearchDB;
        document.TopSearch.limiterList.value = limiterList;
        document.TopSearch.facetList.value = facetList;
        document.TopSearch.limiterListText.value = limiterListText;
        document.TopSearch.facetListText.value = facetListText;
        frm.pageNumber.value = 1;
        frm.action = "/fsearch/Fsearch.do";
        frm.target = "_self";
    } else if (frm.colName.value == 're_s_over') {
        var facetList = frm.facetList.value;
        var facetListText = frm.facetListText.value;
        // 해외전자정보서비스 검색
        $("form[name=group] input:checkbox").each(function() {
            if (this.checked) {
                var vTitle = $(this).closest("ul").attr("title");
                var vCurrname = this.title;
                vTitle = vTitle + " [" + vCurrname + "]";

                var vValue = this.value;
                var spl = vValue.split(":");
                if (spl.length > 1) {
                    //2020.12.01 Facet 검색 특수 기호 처리
                    //, -> \\, : => \\: 변경 후 URL인코딩
                    vValue = spl[0] + ":" + encodeURIComponent(spl[1].replace(",", "\\,"));
                    if (spl.length > 2) {
                        vValue = vValue + encodeURIComponent("\\:" + spl[2]);
                    }
                }

                if (facetListText.indexOf(vValue) > -1) return true;
                if (facetList) facetList += ",";
                facetList += vValue;
                facetListText += vTitle;
                facetListText += "@@";
                facetListText += vValue;
                facetListText += "◈";
            }
        });

        document.TopSearch.facetList.value = facetList;
        document.TopSearch.facetListText.value = facetListText;
        frm.pageNumber.value = 1;
        frm.action = "/fsearch/Fsearch.do";
        frm.target = "_self";
    } else {
        var exQuery = "";
        var exQueryText = "";
        var oldExQueryText = frm.exQueryText.value;
        // 필터 체크된 항목 쿼리 생성
        $(".facetCont .facetList .listCont>ul>li input:checkbox").each(function() {
            if ($(this).is(":checked")) {
                var vValue = $(this).val();
                var faset_inx = $(this).closest("ul").attr("faset_inx");
                var vTitle = $("#groupTitle_" + faset_inx).text();
                var vCurrname = $(this).next("label").find("span.type").text();
                vTitle = vTitle + " [" + vCurrname + "]";
                var vName = this.name;
                vName = vName.replace("c_use_", "");
                vName = vName + ":" + vValue;

                if (oldExQueryText.indexOf(vName) > -1) return true;

                exQueryText += vTitle;
                exQueryText += "@@";
                exQueryText += vName;
                exQueryText += "◈";
                exQuery += vName;
                exQuery += "◈";
            }
        });
        frm.exQuery.value = frm.exQuery.value + exQuery;
        frm.exQueryText.value = frm.exQueryText.value + exQueryText;
        frm.iStartCount.value = 0;
        frm.action = "/search/Search.do";
        frm.target = "_self";
    }
    frm.submit();
}
// 그룹 해제
function fnGroupDel(str) {
    var frm = document.TopSearch;
    var oldExQueryText = frm.exQueryText.value;
    var oldExQuery = frm.exQuery.value;

    var vArry = str.split("@@");
    if (vArry.length > 1 && oldExQueryText) oldExQueryText = oldExQueryText.replace(str + "◈", "");
    if (vArry.length > 1 && oldExQuery) oldExQuery = oldExQuery.replace(vArry[1] + "◈", "");

    frm.exQueryText.value = oldExQueryText;
    frm.exQuery.value = oldExQuery;
    frm.iStartCount.value = 0;
    frm.action = "/search/Search.do";
    frm.target = "_self";
    frm.submit();
}
// 유효성 체크 후 검색
function searchCheckValue() {
    var form = document.TopSearch;
    try {
        //통합검색일경우
        //해외전자자료에서 RISS보유자료로 탭 변경 뒤 검색 시
        if (form.colName.value == "re_e_over") {
            form.colName.value = "all";
        }
        if (!form.query.value) {
            alert('키워드를 입력해 주세요.');
            return false;
        }

        form.query.value = CharacterCheck(form.query.value);

        if (!trim(form.query.value)) {
            alert("검색어에 특수문자( ? * , )는 입력할 수 없습니다.");
            return false;
        }

        if (!trim(CharacterCheck2(form.query.value))) {
            alert("검색어가 알파벳(a~z an at and by for from in is it its on or the with)만으로 이루어져 있습니다. \n다른 검색어를 입력하십시오. ");
            form.query.focus();
            return false;
        }

        if ($("#sc").prop("checked")) { //결과내검색을 했을경우
            form.isDetailSearch.value = "Y";
            form.isFDetailSearch.value = "N";
        } else {  //결과내 검색을 하지 않았을경우
            form.queryText.value = "";
            form.exQuery.value = "";
            form.exQueryText.value = "";
            form.resultKeyword.value = "";
            form.facetList.value = "";
            form.limiterList.value = "";
            form.facetListText.value = "";
            form.limiterListText.value = "";
            form.fsearchDB.value = "";
            form.isDetailSearch.value = "N";
            form.isFDetailSearch.value = "N";
            form.mat_type.value = "";
            form.mat_subtype.value = "";
            form.fulltext_kind.value = "";
            form.t_gubun.value = "";
            form.learning_type.value = "";
            form.ccl_code.value = "";
            form.inside_outside.value = "";
            form.fric_yn.value = "";
            form.image_yn.value = "";
            form.gubun.value = "";
            form.kdc.value = "";
            form.ttsUseYn.value = "";
            form.l_sub_code.value = "";
        }
        form.iStartCount.value = 0;
        form.pageNumber.value = 1;

        form.submit();
    } catch (e) {
        return false;
    }
}
// 새 책장 토글 이벤트
var isNewCabinet_div_show = false;
function togleNewCabinetForm() {
    
    $("#newMyCabinetBtn").hide(); // 새 책장 등록 버튼 숨기기
    $("#modMyCabinetBtn").hide(); // 새 책장 등록 버튼 숨기기
    
    if($("#newCabinet_div").length != 0) {
        if (isNewCabinet_div_show == false) {
            let ph = $('.myPop .popHeader').outerHeight(true);
            $('.myPop .popCont').css({ 'height': 'calc(100% - ' + ph + 'px)' })
            jQuery("#newCabinet_div").removeClass('on');
            jQuery("#newCabinet_div2").addClass('on');
            isNewCabinet_div_show = true;
            jQuery("#isNewCabinet").val("Y");
        } else {
            jQuery("#newCabinet_div").addClass('on');
            jQuery("#newCabinet_div2").removeClass('on');
            isNewCabinet_div_show = false;
            jQuery("#isNewCabinet").val("N");
            myPopClear();
        }        
    } else {
        jQuery("#newCabinet_div2").removeClass('on');
        jQuery("#newCabinet_div2").removeClass('long');
        $('.blackBg1').hide();
        myPopClear();
    }
}
// 카테고리 선택
function fnCategori(interestCode, interestCodeString) {
    if (($("#categoryPop").find("input[name='interestCode1']").val() != "")
        && ($("#categoryPop").find("input[name='interestCode2']").val() != "")
        && ($("#categoryPop").find("input[name='interestCode3']").val() != "")) {
        alert("관심 분야는 최대 3개까지 입력 하실 수 있습니다.");
        return;
    }

    if ((interestCode == $("#categoryPop").find("input[name='interestCode1']").val())
        || (interestCode == $("#categoryPop").find("input[name='interestCode2']").val())
        || (interestCode == $("#categoryPop").find("input[name='interestCode3']").val())) {
        alert("동일한 분야가 존재합니다.");
        return;
    } else {
        if ($("#categoryPop").find("input[name='interestCode1']").val() == "") {
            $("#categoryPop").find("input[name='interestCode1']").val(interestCode);
            $("#categoryPop").find("input[name='interestCodeName1']").val(interestCodeString);
            $("#categoryPop").find("input[name='interestCodeName1']").focus()
            return;
        }

        if ($("#categoryPop").find("input[name='interestCode2']").val() == "") {
            $("#categoryPop").find("input[name='interestCode2']").val(interestCode);
            $("#categoryPop").find("input[name='interestCodeName2']").val(interestCodeString);
            $("#categoryPop").find("input[name='interestCodeName2']").focus()
            return;
        }

        if ($("#categoryPop").find("input[name='interestCode3']").val() == "") {
            $("#categoryPop").find("input[name='interestCode3']").val(interestCode);
            $("#categoryPop").find("input[name='interestCodeName3']").val(interestCodeString);
            $("#categoryPop").find("input[name='interestCodeName3']").focus()
            return;
        }
    }
}
// 선택한 카테고리 새책장 입력으로 전달
function onOk() { // 등록버튼 클릭
    // 책장카테고리의 경우 formCheck()로 필수값 확인이 불가하므로 별도의 확인 작업을 한다.
    if (($("#categoryPop").find("input[name='interestCode1']").val() == ""
        && $("#categoryPop").find("input[name='interestCode2']").val() == ""
        && $("#categoryPop").find("input[name='interestCode3']").val() == "")
        || ($("#categoryPop").find("input[name='dirName']").val() == "")
        || ($("#categoryPop").find("radio[name='bOpen']").val() == "")) {
        alert('필수값에 빈값이 있습니다.');

        if ($("#categoryPop").find("input[name='interestCode1']").val() == ""
            && $("#categoryPop").find("input[name='interestCode2']").val() == ""
            && $("#categoryPop").find("input[name='interestCode3']").val() == "") {
            $("#categoryPop").find("input[name^='interestCodeName']").each(function(i) {
                if (jQuery(this).val() == "") {
                    try {
                        new Effect.Highlight(this, {
                            keepBackgroundImage: true
                        });
                    } catch (Exception) {
                    }
                }
            });
        }
    } else {
        $("#newCabinet_div2").find("input[name='interestCode1']").val(
            $("#categoryPop").find("input[name='interestCode1']").val());
        $("#newCabinet_div2").find("input[name='interestCode2']").val(
            $("#categoryPop").find("input[name='interestCode2']").val());
        $("#newCabinet_div2").find("input[name='interestCode3']").val(
            $("#categoryPop").find("input[name='interestCode3']").val());

        $("#newCabinet_div2").find("input[name='interestCodeName1']").val(
            $("#categoryPop").find("input[name='interestCodeName1']").val());
        $("#newCabinet_div2").find("input[name='interestCodeName2']").val(
            $("#categoryPop").find("input[name='interestCodeName2']").val());
        $("#newCabinet_div2").find("input[name='interestCodeName3']").val(
            $("#categoryPop").find("input[name='interestCodeName3']").val());

        $('.categoryPop').removeClass('on');
        $('.categoryPop').removeClass('long');
    }
}
// 책장카테고리1번 취소 버튼 클릭
function reset1() { 
    $("#categoryPop").find("input[name='interestCode1']").val("");
    $("#categoryPop").find("input[name='interestCodeName1']").val("");
}
// 책장카테고리2번 취소 버튼 클릭
function reset2() { 
    $("#categoryPop").find("input[name='interestCode2']").val("");
    $("#categoryPop").find("input[name='interestCodeName2']").val("");
}
// 책장카테고리3번 취소 버튼 클릭
function reset3() { 
    $("#categoryPop").find("input[name='interestCode3']").val("");
    $("#categoryPop").find("input[name='interestCodeName3']").val("");
}
// 카테고리 검색
function goCategorySrch() {
    $("#categorySearchList").empty();
    $("#categorySrchFrm").find("[name=keyword]").val($("#categoryKeyword").val());
    $.ajax({
        type: "POST",
        url: "/myriss/ajax/CategorySearchJsonAjax.do",
        data: $("#categorySrchFrm").serialize(),
        dataType: "json",
        success: function(result) {
            var resultCnt = result.length;
            var html = [];
            if (resultCnt > 0) {
                for (var i = 0; i < resultCnt; i++) {
                    var t_myCabinetBean = result[i];
                    html.push("<tr>");
                    html.push("<td>" + t_myCabinetBean.interest_r_code_name + "</td>");
                    html.push("<td>" + t_myCabinetBean.interest_s_code_name + "</td>");
                    html.push("<td class='taL'><a href='#redirect' onclick='javascript:setForm(\"" + t_myCabinetBean.interest_code + "\",\"" + t_myCabinetBean.interest_code_string + "\");'>" + t_myCabinetBean.interest_code_name + "</a></td>");
                    html.push("</tr>");
                }
            } else {
                html.push("<tr>");
                html.push("<td align='center' colspan='3'>검색결과가 없습니다.</td>");
                html.push("</tr>");
            }

            $("#categorySearchList").append(html);
        },
        error: function(request, status, error) {
            var html = [];
            html.push("<tr>");
            html.push("<td align='center' colspan='3'>검색결과가 없습니다.</td>");
            html.push("</tr>");
            $("#categorySearchList").append(html);
        }
    });
}
// 카테고리 선택
function setForm(interestCode, interestCodeString) {
    if (($("#categoryPop").find("input[name='interestCode1']").val() != "")
        && ($("#categoryPop").find("input[name='interestCode2']").val() != "")
        && ($("#categoryPop").find("input[name='interestCode3']").val() != "")
    ) {
        alert("관심 분야는 최대 3개까지 입력 하실 수 있습니다.");
        return;
    }

    if ((interestCode == $("#categoryPop").find("input[name='interestCode1']").val())
        || (interestCode == $("#categoryPop").find("input[name='interestCode2']").val())
        || (interestCode == $("#categoryPop").find("input[name='interestCode3']").val())
    ) {
        alert("동일한 분야가 존재합니다.");
        return;
    } else {
        if ($("#categoryPop").find("input[name='interestCode1']").val() == "") {
            $("#categoryPop").find("input[name='interestCode1']").val(interestCode);
            $("#categoryPop").find("input[name='interestCodeName1']").val(interestCodeString);
            $("#categoryPop").find("input[name='interestCodeName1']").focus();
            return;
        }

        if ($("#categoryPop").find("input[name='interestCode2']").val() == "") {
            $("#categoryPop").find("input[name='interestCode2']").val(interestCode);
            $("#categoryPop").find("input[name='interestCodeName2']").val(interestCodeString);
            $("#categoryPop").find("input[name='interestCodeName2']").focus();
            return;
        }

        if ($("#categoryPop").find("input[name='interestCode3']").val() == "") {
            $("#categoryPop").find("input[name='interestCode3']").val(interestCode);
            $("#categoryPop").find("input[name='interestCodeName3']").val(interestCodeString);
            $("#categoryPop").find("input[name='interestCodeName3']").focus();
            return;
        }
    }
}
// 새책장 담기
function putInputMyCabinetFormSubmit(url) {
    if ($("#isNewCabinet").val() == "Y") {
        // 책장카테고리의 경우 formCheck()로 필수값 확인이 불가하므로 별도의 확인 작업을 한다.
        if (($("#newCabinet_div2").find("input[name='interestCode1']").val() == ""
            && $("#newCabinet_div2").find("input[name='interestCode2']").val() == ""
            && $("#newCabinet_div2").find("input[name='interestCode3']").val() == ""
        )
            || ($("#newCabinet_div2").find("input[name='dirName']").val() == "")
        ) {
            alert('필수항목을 기재해주세요.');
            if ($("#newCabinet_div2").find("input[name='interestCode1']").val() == ""
                && $("#newCabinet_div2").find("input[name='interestCode2']").val() == ""
                && $("#newCabinet_div2").find("input[name='interestCode3']").val() == ""
            ) {
                $("#newCabinet_div2").find("input[name^='interestCodeName']").each(function(i) {
                    if ($(this).val() == "") { }
                });
            }

            if ($("#newCabinet_div2").find("input[name='dirName']").val() == "") { }
        } else {
            goPutIntoMyCabinet(url);
        }
    } else {
        goPutIntoMyCabinet(url);
    }
}

var db = ""; //임시로 입력값을 저장할 변수
// 입력 내용 길이 계산
function checkLength(index) {
    var memo = $("#memo" + index).val();
    if (db != memo) {
        var memoLength = calBytes(memo);
        // 메모에 입력된 길이를 표시한다.
        $("#memoLength" + index).val(memoLength);
        if (memoLength > 300) {
            alert("메모는 300bytes까지만 입력하실 수 있습니다.");
            var cutStr = cutByteString(memo, 300);
            $("#memo" + index).val(cutStr);
        }
        db = memo;
    } else { }
    setTimeout("checkLength(" + index + ")", 10);
}
// 입력취소 버튼 클릭시 수행
function cancel() { 
    $("#interestCode1").val("");
    $("#interestCode2").val("");
    $("#interestCode3").val("");
    $("#interestCodeName1").val("");
    $("#interestCodeName2").val("");
    $("#interestCodeName3").val("");
    $("input[name='dirName']").val("");
    $("#memo").val("");
    $("#memoLength").text("0");
    /* jQuery("input[name='bOpen']").each(function(i){
        this.checked = false;
    }); */
}
// 새 책장 담기
function goPutIntoMyCabinet(url) {
    jQuery.ajax({
        url: url,
        type: "post",
        data: $("#putIntoMyCabinetFrm").serialize(),
        dataType: "json",
        success: function(result) {
            var resultMessage = result.resultMessage.replace(/\\n/g,'\r\n');
            if (confirm(resultMessage)) {
                $(location).attr("href", "/myriss/mycab/MyCabinetList.do");
            } else {
                $('.blackBg1').hide();
                $('.savePop').removeClass('on');
                $('#newCabinet_div').removeClass('long');
            }

        },
        error: function(content, result) { alert(result); }
    });
}
// 내책장 초기화
function savePopClear() {
    $("#putIntoMyCabinetFrm").find("[name=p_control_no]").each(function() {
        $(this).remove();
    });
    $("#putIntoMyCabinetFrm").find("[name=loginFlag]").remove();
    myPopClear();
    categoryPopClear();
}
// 새책장 초기화
function myPopClear() {
    $("#newCabinet_div2").find("input[type=text]").each(function() {
        $(this).val("");
    });
    $("#newCabinet_div2").find("[name=memo]").val("");
}
// 카테고리 초기화
function categoryPopClear() {
    $("#categoryPop").find("input[type=text]").each(function() {
        $(this).val("");
    });
    $("#categoryPop").find("input[type=hidden]").each(function() {
        $(this).val("");
    });
}

function PutIntoMyCabinetViewAjax() {
    jQuery.ajax({
        url: '/myriss/ajax/PutIntoMyCabinetViewAjax.do',
        type: 'post',
        data: $("#putIntoMyCabinetFrm").serialize(),
        dataType: "json",
        success: function(result) {

            var myCabinetSimpleList = result.myCabinetSimpleList;
            var titleList = result.titleList;
            $("#dirId").empty();
            for (var i = 0; i < myCabinetSimpleList.length; i++) {
                var myCabinetSimpleBean = myCabinetSimpleList[i];
                $("#dirId").append($("<option/>", { value: ((-1 == myCabinetSimpleBean.dirId) ? "" : myCabinetSimpleBean.dirId), text: myCabinetSimpleBean.dirName }));
            }

            $("#putIntoMyCabinetSelectedDiv").empty();
            $("#newCabinetList").empty();
            for (var i = 0; i < titleList.length; i++) {
                var title = titleList[i];
                $("#putIntoMyCabinetSelectedDiv").append(title + "<br/>");
                $("#newCabinetList").append(title + "<br/>");
            }

            let ph = $('.savePop .popHeader').outerHeight(true);
            $('.savePop .popCont').css({ 'height': 'calc(100% - ' + ph + 'px)' })
            $('.blackBg1').show();
            $('.savePop').addClass('on');

        },
        error: function(content, result) {
            console.log(content)
            console.log(result)
        }
    });
}

function foreignSrchUrl() {
    var resultSearch = comResultSearch;
    var rissQueryText = changeStr(comRissQueryText);
    var queryTexts = "";
    var edsUrl = "";
    var rissQuery = changeStr(comRissQuery);
    if ((rissQuery == null || rissQuery == "") && (rissQueryText == null || rissQueryText == "")) {
        edsUrl = "/index.do";
    } else {
        //해외전자정보서비스 가기 버튼 url 설정
        if ((rissQuery != null && rissQuery != '') && (rissQueryText != null && rissQueryText != '')) { //결과내 재검색
            queryTexts = rissQueryText.split("@");
            var edsQuertText = "";
            if (queryTexts.length == 4) { //검색어가 두 건 일때 
                var edsQr1 = queryTexts[0].substring(queryTexts[0].indexOf(',') + 1);
                var edsQr2 = queryTexts[2].substring(queryTexts[2].indexOf(',') + 1);
                edsUrl = "/fsearch/Fsearch.do?sflag=1&resultSearch=true&resultSearchYn=true&fsearchMethod=search&colName=re_e_over&resultKeyword=" + edsQr1 + "&queryText=" + edsQr1 + "&strQuery=" + edsQr1 + "&query=" + edsQr2;
            } else { //검색어가 두건 이상일때
                for (var q in queryTexts) {
                    if (q == 0) edsQuertText = queryTexts[q].substring(queryTexts[q].indexOf(',') + 1);
                    else if (q == (queryTexts.length - 2)) rissQuery = queryTexts[q].substring(queryTexts[q].indexOf(',') + 1);
                    else if ((q % 2) == 0 && q != 0) edsQuertText += "@AND,all:" + queryTexts[q].substring(queryTexts[q].indexOf(',') + 1);
                }
                edsUrl = "/fsearch/Fsearch.do?sflag=1&resultSearch=true&resultSearchYn=true&fsearchMethod=search&colName=re_e_over&&queryText=" + edsQuertText + "&resultKeyword=" + edsQuertText + "&query=" + rissQuery;
            }
        } else if ((rissQuery != null || rissQuery != '') && (rissQueryText == null || rissQueryText == '')) { //통합검색
            edsUrl = "/fsearch/Fsearch.do?sflag=1&fsearchMethod=search&colName=re_e_over&isFDetailSearch=N&query=" + rissQuery + "&strQuery=" + rissQuery;
        } else { //상세검색
            queryTexts = rissQueryText.split("@");
            edsUrl = "/fsearch/Fsearch.do?sflag=1&isFDetailSearch=Y&colName=re_e_over&resultKeyword=&isDetailSearch=Y&fsearchMethod=searchDetail";
            if (queryTexts.length > 0) edsUrl += "&fsearchfield1=" + changeFieldName(queryTexts[0].substring(0, queryTexts[0].indexOf(','))) + "&fsearchKeyWord1=" + encodeURIComponent(queryTexts[0].substring(queryTexts[0].indexOf(',') + 1));
            if (queryTexts.length >= 3) {
                edsUrl += "&fsearchSqlType1=" + queryTexts[1].substring(queryTexts[1].indexOf(',') + 1);
                edsUrl += "&fsearchfield2=" + changeFieldName(queryTexts[2].substring(0, queryTexts[2].indexOf(','))) + "&fsearchKeyWord2=" + encodeURIComponent(queryTexts[2].substring(queryTexts[2].indexOf(',') + 1));
            }
            if (queryTexts.length >= 5) {
                edsUrl += "&fsearchSqlType2=" + queryTexts[3].substring(queryTexts[3].indexOf(',') + 1);
                edsUrl += "&fsearchfield3=" + changeFieldName(queryTexts[4].substring(0, queryTexts[4].indexOf(','))) + "&fsearchKeyWord3=" + encodeURIComponent(queryTexts[4].substring(queryTexts[4].indexOf(',') + 1));
            }
            if (queryTexts.length >= 7) {
                edsUrl += "&fsearchSqlType3=" + queryTexts[5].substring(queryTexts[5].indexOf(',') + 1);
                edsUrl += "&fsearchfield4=" + changeFieldName(queryTexts[6].substring(0, queryTexts[6].indexOf(','))) + "&fsearchKeyWord4=" + encodeURIComponent(queryTexts[6].substring(queryTexts[6].indexOf(',') + 1));
            }
            if (queryTexts.length >= 9) {
                edsUrl += "&fsearchSqlType4=" + queryTexts[7].substring(queryTexts[5].indexOf(',') + 1);
                edsUrl += "&fsearchfield5=" + changeFieldName(queryTexts[8].substring(0, queryTexts[8].indexOf(','))) + "&fsearchKeyWord5=" + encodeURIComponent(queryTexts[8].substring(queryTexts[8].indexOf(',') + 1));
            }
        }
    }
    return edsUrl;
}

function changeStr(str) {
    if (str == null) return null;
    str = str.replace(/&#034;/g, '\"').replace(/&#039;/g, "\'").replace(/ /g, " ").replace(/&amp;/g, "&");
    return str;
}

// 인기검색어, 내가찾은 검색어
function doKeyword(query) {
    $("#TopSearch").find("[name=query]").val(query);
    $("#TopSearch").find("[name=iStartCount]").val("0");
    $("#TopSearch").find("[name=strSort]").val("RANK");
    $("#TopSearch").submit();
}

/*
 * 목차검색조회
 */
function contentView(target, key, matType, matSubtype, imageFormat, page) {
    //znAll, znTitle, znKtoc
    var text = $("form[name=ReSearch]").find("[name=query]").val();
    var texts = $("form[name=ReSearch]").find("[name=queryText]").val();
    var target_g = target.substring(1);
    
    if( $("#" + target).hasClass("on") && page == -1) {
        $("#" + target).removeClass("on");
        $("#" + target).css("display", "none");
    } else {        
        jQuery.ajax({
            type: "POST",
            url: "/search/ajax/detail/QuickContentAjax.do",
            dataType: "html",
            data: {
                target: target_g,
                control_no: key,
                p_mat_type: matType,
                p_submat_type: matSubtype,
                fulltext_kind: imageFormat,
                page: page,
                query: text,
                queryText: texts
            },
            success: function(html) {
                if (html.indexOf("잠시후 다시 이용해주세요.") == -1) document.getElementById(target).style.display = "block";
                else document.getElementById(target).style.display = "none";
                $("#" + target).css("height", "180px");
                $("#" + target).addClass("on");
                $("#" + target).html(trim(html));
            },
            error: function(result) {
                document.getElementById(target).style.display = "none";
                jQuery("#" + target).html("");
                alert("조회시 일시적인 문제가 발생하였습니다.\n다시 시도해 주세요.");
            }
        });
    }    
}

// 목차 DB조회
// UT_BIB_DESC_DIVIDE
function tocView(target, key, page) {

    jQuery.ajax({
        type: "POST",
        url: "/search/ajax/detail/tocViewAjax.do",
        dataType: "html",
        data: {
            target: target,
            control_no: key,
            page: page
        },
        success: function(html) {
            if (html.indexOf("잠시후 다시 이용해주세요.") == -1) document.getElementById(target).style.display = "block";
            else document.getElementById(target).style.display = "none";

            jQuery("#" + target).html(trim(html));
        },
        error: function(result) {
            document.getElementById(target).style.display = "none";
            jQuery("#" + target).html("");
            alert("조회시 일시적인 문제가 발생하였습니다.\n다시 시도해 주세요.");
        }
    });
}

function changeFieldName(field) {
    var newField = "all";
    if (field == 'znTitle') newField = "title";
    else if (field == 'znCreator') newField = "author";
    else if (field == 'znSubject') newField = "subject";
    else if (field == 'znAbstract') newField = "abstract";
    else if (field == 'znPublisher') newField = "publish";
    else if (field == 'srch_isbn') newField = "isbn";

    return newField;
}

function opNullChk(op) {
    var newOp = op;

    if (op == null || op == '') newOp = "AND";

    return newOp;
}

function ServicePauseChk(svc_yn) { //서비스상태가 일지중지인지 여부 확인
    if (svc_yn == "P") {
        alert("해당 원문제공기관의 사정으로 서비스가 잠시 중단되었습니다.");
        return false;
    } else {
        return true;
    }
}

function fulltextDownload() {
    var isiPhone = /iPhone/.test(navigator.userAgent);
    var isiPad = /iPad/.test(navigator.userAgent);
    var isAndroid = /Android/.test(navigator.userAgent);
    var form = document.f;
    form.loginFlag.value = "1";
    var pars = jQuery(form).serialize();
    if (isiPhone == true || isAndroid == true || isiPad == true) {
        if (isAndroid) {
            window.open("/search/download/FullTextDownload.do?" + pars, "FulltextDownload", "status=0,toolbar=0,Titlebar=0,width=840,height=680,resizable=1");
        } else {
            var x = window.open("/search/download/FullTextDownload.do?" + pars, "FulltextDownload", "status=0,toolbar=0,Titlebar=0,width=840,height=680,resizable=1");
            if (x == null)
                document.location.href = "/etc/MobileAppleInfo.html";
        }
    } else {
        window.open("/search/download/FullTextDownload.do?" + pars, "", "status=0,toolbar=0,Titlebar=0,scrollbars=1,width=840,height=680,resizable=1"); // FulltextDownload  팝업Name 해제(복수의 원문보기 적용. 2013.09.06)
    }
}

/*상세보기시 */
function publicUrlDownload(urltype) {
    var isiPhone = /iPhone/.test(navigator.userAgent);
    var isiPad = /iPad/.test(navigator.userAgent);
    var isAndroid = /Android/.test(navigator.userAgent);
    var form = document.f;
    form.loginFlag.value = "1";
    form.url_type.value = urltype;
    var pars = jQuery(form).serialize();

    window.open("/PublicPopup.do", "_blank", "left=540,top=240,width=550,height=240,status=no,menubar=no,resizable=yes,scrollbars=no");

}

function urlDownload(urltype) {
    var isiPhone = /iPhone/.test(navigator.userAgent);
    var isiPad = /iPad/.test(navigator.userAgent);
    var isAndroid = /Android/.test(navigator.userAgent);
    var form = document.f;
    form.loginFlag.value = "1";
    form.url_type.value = urltype;
    var pars = jQuery(form).serialize();
    if (isiPhone == true || isAndroid == true || isiPad == true) {
        var x = window.open("/search/download/UrlLoad.do?" + pars);
        if (x == null)
            document.location.href = "/etc/MobileAppleInfo.html";
    } else {
        window.open("/search/download/UrlLoad.do?" + pars);
    }
}


function checkKyoboUrl(urlTypeW, urlTypeF, academicUserYn, isLogin) {
    if (isLogin == "2") {
        if (academicUserYn == "Y") {
            kyoboUrlDownload(urlTypeM);
        } else {
            kyoboUrlDownload(urlTypeW);
        }
    } else {
        if (confirm('스콜라의 경우 소속기관이 구독 중이 아닌 이용자는  오후 4시부터 익일 오전 7시까지\nRISS 개인 로그인을 통해 무료로 원문보기를 사용하실 수 있습니다.\n\n개인로그인으로 전환 하시겠습니까?')) {
            if (academicUserYn == "Y") {
                kyoboUrlDownload(urlTypeM);
            } else {
                kyoboUrlDownload(urlTypeW);
            }
        } else {
            urlDownload(urlTypeW);
        }
    }
}

function kyoboUrlDownload(urltype) {
    var isiPhone = /iPhone/.test(navigator.userAgent);
    var isiPad = /iPad/.test(navigator.userAgent);
    var isAndroid = /Android/.test(navigator.userAgent);
    var form = document.f;
    //form.action="/PopupLogin.do?loginFlag=1";
    //form.action="/LoginRedirect.do";
    form.loginFlag.value = "1";
    form.url_type.value = urltype;

    var pars = jQuery(form).serialize();

    var cw = 700;
    var ch = 700;
    var sw = screen.availWidth;
    var sh = screen.availHeight;

    //열 창의 포지션
    var px = (sw - cw) / 2;
    var py = (sh - ch) / 2;

    var option = "scrollbars=no, toolbar=no, resizable=1, status=no, location=no, menu=no, Width=" + cw + ", Height=" + ch + ",left=" + px + ",top=" + py;

    if (isiPhone == true || isAndroid == true || isiPad == true) {
        var x = window.open("/search/download/KyoboUrlLoad.do?" + pars);
        if (x == null)
            document.location.href = "/etc/MobileAppleInfo.html";
    } else {
        var url = "/search/download/KyoboUrlLoad.do?" + pars;
        var f = window.open(url, "download", option);
    }

}
function publicMemberUrlDownload(urltype, viewcode, orgcode) {
    var isiPhone = /iPhone/.test(navigator.userAgent);
    var isiPad = /iPad/.test(navigator.userAgent);
    var isAndroid = /Android/.test(navigator.userAgent);
    var form = document.f;
    form.loginFlag.value = "1";
    form.url_type.value = urltype;
    var pars = jQuery(form).serialize();
    window.open("/PublicPopup.do", "_blank", "left=540,top=240,width=550,height=240,status=no,menubar=no,resizable=yes,scrollbars=no");
}

function memberUrlDownload(urltype, viewcode, orgcode) {


    var isiPhone = /iPhone/.test(navigator.userAgent);
    var isiPad = /iPad/.test(navigator.userAgent);
    var isAndroid = /Android/.test(navigator.userAgent);
    var form = document.f;
    form.loginFlag.value = "1";
    form.url_type.value = urltype;
    var pars = jQuery(form).serialize();

    if (isiPhone == true || isAndroid == true || isiPad == true) {
        var x = window.open("/search/download/UrlLoad.do?" + pars + "&viewcode=" + viewcode + "&orgcode=" + orgcode);
        if (x == null)
            document.location.href = "/etc/MobileAppleInfo.html";
    } else {
        window.open("/search/download/UrlLoad.do?" + pars + "&viewcode=" + viewcode + "&orgcode=" + orgcode);
    }

}

//DDOD다운로드
function ddodDownloadSubmit(flag) {  //DDOD원문보기 (kind=1:원문다운로드, kind=2:원문미리보기)
    var isiPhone = /iPhone/.test(navigator.userAgent);
    var isiPad = /iPad/.test(navigator.userAgent);
    var isAndroid = /Android/.test(navigator.userAgent);
    var targetName = 'download';
    if (isiPhone == true || isAndroid == true || isiPad == true) {
        if (isAndroid) {
            var win = window.open('', targetName, "width=650,height=600,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,top=0,left=0");
            var f = document.f;
            f.action = "/search/download/ddodDownload.do?loginFlag=1";
            f.DDODFlag.value = (flag == 'undefined' ? '' : flag);
            f.target = targetName;
            f.submit();
            win.focus();
        } else {
            var x = window.open('', targetName, "width=650,height=600,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,top=0,left=0");
            var f = document.f;
            f.action = "/search/download/ddodDownload.do?loginFlag=1";
            f.DDODFlag.value = (flag == 'undefined' ? '' : flag);
            f.target = targetName;
            f.submit();
            win.focus();
            if (x == null)
                document.location.href = "/etc/MobileAppleInfo.html";
        }
    } else {
        var win = window.open('', targetName, "width=650,height=600,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,top=0,left=0");
        var f = document.f;
        f.action = "/search/download/ddodDownload.do?loginFlag=1";
        f.DDODFlag.value = (flag == 'undefined' ? '' : flag);
        f.target = targetName;
        f.submit();
        win.focus();
    }
}

//******************************************************************
//인용하기
//******************************************************************
function refApplyAjax(control_no, p_mat_type) {
    jQuery.ajax({
        type: "POST",
        dataType: 'json',
        url: "/search/ajax/refApplyAjax.do",
        data: { control_no: control_no, p_mat_type: p_mat_type },
        success: function(data) {
            var textArea;
            var text = "";
            var agentNavi = navigator.userAgent.toLowerCase();
            if (agentNavi.match(/ipad|iphone/i)) {
                textArea = document.createElement('textArea');
                text = data.result;
                text = text.replace(/(<([^>]+)>)/ig, "");
                textArea.value = text;
            } else {
                textArea = document.createElement('div');
                textArea.innerHTML = "";
                textArea.innerHTML = data.result;
                text = textArea.textContent;
            }

            textArea.style.position = "absolute";
            textArea.style.top = 0;
            textArea.style.left = 0;
            textArea.style.width = -1;
            textArea.style.margin = 0;
            textArea.style.padding = 0;
            textArea.style.border = 0;
            document.body.appendChild(textArea);
            var range = document.createRange();
            //          range.selectNodeContents(textArea);
            range.selectNode(textArea);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            if (agentNavi.match(/ipad|iphone/i)) {
                textArea.setSelectionRange(0, 999999);
            }
            try {
                success = document.execCommand('copy', false, null);
            } catch (e) {
                success = false;
            }

            if (success) {
                document.body.removeChild(textArea);
                alert("논문의 정보가 복사 되었습니다. 논문을 인용할 위치에 붙여넣기 하세요. 설정 변경은 RISS 웹에서만 가능하며 로그인 후,\"설정>검색환경설정>인용하기 환경설정\" 메뉴에서 인용하기 양식 변경이 가능합니다.");
            } else {
                document.body.removeChild(textArea);
                prompt("해당 브라우저는 복사기능을 지원하지 않습니다. 선택 후 Ctrl + C 를 눌러주세요.", text);
            }

            selection.removeAllRanges();
        },
        error: function(result) {
        }
    });
}

function newTtsPopupView(control_no, p_mat_type, s_mat_type, mat_subtype_cd, imageFormat) {
    var uri = "";
    jQuery.ajax({
        type: "POST",
        url: "/search/download/newTtsView.do",
        dataType: "json",
        data: {
            control_no: control_no,
            p_mat_type: p_mat_type,
            s_mat_type: s_mat_type,
            mat_subtype_cd: mat_subtype_cd,
            imageFormat: imageFormat
        },
        success: function(res) {
            url = res.url;
            if (uri == '음성 서비스 대상이 아닙니다.') {
                alert(url);
                location.reload();
            } else {
                url = url.replace('DcLoOrgPer', 'SvcOrgDownLoad');
                url = url.replace('sItemId', 'item_id');
                url = url.replace('/common/orgView/', '/jsp/common/SvcOrgDownLoad.jsp?item_id=');
                url = url.replace(';', '');

                window.open('http://ttsn.riss.kr/custom/external-resources/view.do?externalId=' + encodeURIComponent(url));

                if (new Date() >= new Date('2022-08-10 00:00:00') && new Date() <= new Date('2022-08-26 23:59:59')) {
                    if (getCookie("pop_alert_220811") != "done") {
                        var pTop = 50;
                        var pLeft = 380;
                        var pWidth = 624;
                        var pHeight = 882 + 26;
                        window.open("http://www.riss.kr/main/etc/PopupEventView.do?survey_gubun=20220810", "popup_20220810", "top=" + pTop + ",left=" + pLeft + ",width=" + pWidth + ",height=" + pHeight + ",status=no,menubar=no,resizable=yes,scrollbars=yes");

                    }
                }

            }
        },
        error: function(result) {
            jQuery("#" + target).html("");
            alert("조회시 일시적인 문제가 발생하였습니다.\n다시 시도해 주세요.");
        }
    });
}

function overFulltextDownload(url, dbname) {
    var isiPhone = /iPhone/.test(navigator.userAgent);
    var isiPad = /iPad/.test(navigator.userAgent);
    var isAndroid = /Android/.test(navigator.userAgent);
    var form = document.f;
    form.loginFlag.value = "1";
    var pars = jQuery(form).serialize();
    if (isiPhone == true || isAndroid == true || isiPad == true) {
        if (isAndroid) {
            window.open(url + pars, dbname, "status=0,toolbar=0,Titlebar=0,width=950,height=720,resizable=1");
        } else {
            var x = window.open(url + pars, dbname, "status=0,toolbar=0,Titlebar=0,width=950,height=720,resizable=1");
            if (x == null)
                document.location.href = "/etc/MobileAppleInfo.html";
        }
    } else {
        window.open(url + pars, dbname, "status=0,toolbar=0,Titlebar=0,width=950,height=720,resizable=1");
    }
}

function delDocsForTodayList(gubun, prow) {
    if (gubun == 'all') {
        if (confirm('초기화 하시겠습니까?')) {
            jQuery.ajax(
                {
                    url: "/search/ajax/DelDocsForTodayListAjax.do",
                    type: "post",
                    data: {
                        prow: gubun
                    },
                    dataType: "text",
                    success: function(result) {
                        getTodayViewContents();
                    },
                    error: function(content, result) {
                    }
                }
            );
        }
    } else {
        jQuery.ajax(
            {
                url: "/search/ajax/DelDocsForTodayListAjax.do",
                type: "post",
                data: {
                    prow: prow
                },
                dataType: "text",
                success: function(result) {
                    getTodayViewContents();
                },
                error: function(content, result) {
                }
            }
        );
    }
}

function getTodayViewContents() {

    $.ajax({
        type: "POST",
        url: "/search/getTodayViewContents.do",
        dataType: "json",

        success: function(data) {

            var length = data.length;
            var todayView = $('#today_view');
            var todayContentList = $("#today_content_list");
            if (length === 0) {
                todayContentList.html('<li><span class="txt">오늘 본 자료가 없습니다.</span></li>');
            } else {
                todayContentList.html('');
                $.each(data, function(idx, val) {
                    var html = '<li>';
                    if (val.p_mat_type_name == 'FSEARCH') {
                        html += '<a href="/fsearch/DetailView.do?dbId=' + val.p_mat_type + '&amp;';
                        html += 'an=' + val.control_no + '" title="' + val.title + '">';
                    }
                    else if (val.p_mat_type_name == 'RISS') {
                        html += '<a href="/search/detail/DetailView.do?p_mat_type=' + val.p_mat_type + '&amp;';
                        html += 'control_no=' + val.control_no + '" title="' + val.title + '">';
                    }

                    html += '<span class="txt">' + val.title + '</span>';
                    html += '</a>';
                    html += '<a href="#redirect" class="listDel" onclick="javascript:delDocsForTodayList(\'sub\', \'' + (length - (idx + 1) + 1) + '\');" ><img src="/images/search/listDel1.png" alt="목록삭제"></a>';
                    html += '</li>';
                    todayContentList.append(html);
                });

            }
        },
        error: function(request, status, error) {
            todayContentList.html('<li><span class="txt">오늘 본 자료가 없습니다.</span></li>');
        }
    });
}

function LoginSubmit(){   
	var loginYn = $("#loginYn").val();
	var loginRole = $("#loginRole").val();
	
	//로그인이 되어있지 않으면
	if (loginYn == "N") {
		if (loginRole != undefined && loginRole != "ROLE_USERS") {
            window.open("/common/error/accessDenied.do", "popup", "left=540,top=240,width=550,height=440,status=no,menubar=no,resizable=yes,scrollbars=no");
        }else {
                var loginFrm = $("<form></form>");
                loginFrm.attr("name", "loginFrm");
                loginFrm.attr("method", "post");
                loginFrm.attr("action", "/LoginRedirect.do");
                loginFrm.append($("<input/>", { type: "hidden", name: "directUrl", value: $(location).attr("href") }));
                loginFrm.appendTo("body");
                loginFrm.submit();
            }
	}
}

//서지상세페이지 URL 복사
function clip(clipUrl){
	const clipText = document.createElement('textarea');
	document.body.appendChild(clipText);
	clipText.value = clipUrl;
	clipText.select();
	document.execCommand('copy');
	document.body.removeChild(clipText);
	alert('URL이 저장되었습니다.');
}

function notice_setCookie(name, value, expiredays) {
    var todayDate = new Date();
    if (typeof expiredays != 'undefined')
        todayDate.setDate(todayDate.getDate() + expiredays);
    else
        todayDate.setDate(todayDate.getDate() + 999999);
    document.cookie = name + "=" + escape(value) + "; path=/; expires="
            + todayDate.toGMTString() + ";";
}
