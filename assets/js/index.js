
$(document).ready(function(){
    $('.modal').on('click','#btnCloseModal',function(){
        $('.style-selected span').remove();
        $('#preview li').remove();
        $('.modal').hide();
    });
    $('#addArtModal').on('click','ul.style li',function(){
        let s = $(this).text();
        $('.style-selected').append(`<span>${s}<button type="button" id="btnDelStyle">삭제</button></span>`);
    });
    $('#addArtModal').on('click','ul.cate li',function(){
        let i = $(this).index();
        $('ul.cate li').removeClass();
        $(this).addClass('style-active');
        $('ul.style').hide();
        $(`ul.style:eq(${i})`).show();
    });
    $('#addArtModal').on('click','#btnDelStyle',function(){
        $(this).parent().remove();
    });
    $('#addArtModal').on('change','#btnSwitch',function(){
        $('.select-style-box').toggleClass('hidden');
        $('.style-selected span').remove();
    });
    $('#addArtModal').on('change','input[name="addimg"]',function(){
        if( $(this).val() == '' ){ 
            return false;
        }else{
            readURL(this); 
        }
    });
    $('#btnAddArt').click(function(){
        $('#addArtModal').show();
    });
    $('#widget').on('click','.filter li',function(){
        $('.filter li').toggleClass('filter-active');
        $('.widget-body > div').toggleClass('hidden');
    });
    $('#widget').on('click','nav li',function(){
        $('nav li').removeClass('nav-active');
        $(this).addClass('nav-active');
    });
    $('#widget').on('click','#btnWidgetClose',function(){
        $('.reserve-widget-open').hide();
        $('#btnWidgetOpen').show();
    });
    $('#widget').on('click','#btnWidgetOpen',function(){
        $('.reserve-widget-open').show();
        $('#btnWidgetOpen').hide();
    })
});

// 위젯 실행 - 오늘 날짜 기준 생성
function makeCalendar(){
    let now = new Date();
    let nowY = now.getFullYear();
    let nowM = now.getMonth()+1;
    let nowd = now.getDate();
    let nowday = now.getDay();
    if(nowM < 10){
        nowM = '0'+nowM;
    }
    let ymdd = String(nowY)+String(nowM)+String(nowd);

    $('.day-reserve-list').find('.time').prepend(`03.${nowd}`);

    makeDate(nowd,nowday,ymdd)
}

// 위젯 날짜 앞뒤 버튼으로 이동
function moveDate(d){
    if(d === 'prev'){
        var date = $('#calendar').find('li:first').data('day');
        if(Number(date) < 20210304 || date == undefined){
            return false;
        }else{
            date = date-3;
        };
    }else{
        var date = $('#calendar').find('li:last').data('day');
        if(Number(date) > 20210328 || date == undefined){
            return false;
        }else{
            date = date+3;
        };
    };

    let getY = String(date).substr(0,4);
    let getM = String(date).substr(4,2);
    let getD = String(date).substr(6,2);
    let fullDate = getY+'-'+getM+'-'+getD;
    let nowDay = new Date(fullDate).getDay();
    makeDate(getD,nowDay,date)
}

// 위젯 날짜 선택으로 이동
function selectDate(sdate,sday,symdd){
    let date = new Date().getDate();
    if(sdate == date){
        $('.day-reserve-list').show();
    }else{
        $('.day-reserve-list').hide();
    }
    makeDate(sdate,sday,symdd);
}

// 위젯 날짜 5개 생성 
function makeDate(date,day,ymdd){
    $('#calendar').html('');
    let week = ['일','월','화','수','목','금','토'];
    let list

    for(let i=0; i<5; i++){
        let daynum = day-2;
        let d2 = date-2;

        if(daynum < 0){
            daynum = daynum+7;
        }else if(daynum > 6){
            daynum = daynum-7;
        }
        let d = week[daynum];

        // 3월만
        if(d2 < 1 || d2 > 31){
            list = `<li><p class="day"></p><p class="date"></p></li>`;
        }else{
            if(d === '토'){
                list = `<li class="sat" onclick="selectDate('${d2}','${daynum}','${ymdd-2}')" data-day="${ymdd-2}"><p class="day">${d}</p><p class="date">${d2}</p></li>`;
            }else if(d === '일'){
                list = `<li class="sun" onclick="selectDate('${d2}','${daynum}','${ymdd-2}')" data-day="${ymdd-2}"><p class="day">${d}</p><p class="date">${d2}</p></li>`;
            }else{
                list = `<li onclick="selectDate('${d2}','${daynum}','${ymdd-2}')" data-day="${ymdd-2}"><p class="day">${d}</p><p class="date">${d2}</p></li>`;
            }
        }
        $('#calendar').append(list);
        day++;
        date++;
        ymdd++;
    };
}

// 상세보기 모달
function openModal(cnt, num){
    $('.flexslider').remove();
    $('#albumModal .modal-body').append('<div class="img-slide-box flexslider"><ul id="imgList" class="slides"></ul></div>');
    for(let i=1; i<cnt+1; i++){
        let list = `<li><a href="#"><img src="../assets/img/album${num}/${i}.jpg"></a></li>`;
        $('#imgList').append(list);
    }
    $('#albumNum').text(num);
    $('#albumModal').show();
    $('.flexslider').flexslider({
        animation: "slide",
        slideshowSpeed:4000,
        prevText:'이전',
        nextText:'다음',
        pauseOnAction:false
    });
}

// 우리샵 앨범 / 이달의 아트
function viewFilter(mode){
    $('.view-filter li').toggleClass('filter-active');
    if(mode === 'album'){
        $("#contentView").load("/template/viewAlbum.html");
    }else{
        $("#contentView").load("/template/viewMonthly.html");
    }
}

// 사진 미리보기
function readURL(input){ 
    if(input.files && input.files[0]){ 
        let reader = new FileReader(); 
        reader.onload = function(e){
            $('#preview').append(`<li><img src="${e.target.result}"></li>`); 
        } 
        reader.readAsDataURL(input.files[0]); 
    } 
};