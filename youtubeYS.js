var youtubeYS = (function() {
  var isPlaying = false;
  var json;
  var player;
  var swipe_wrapper, button_video_hide, swiper;
  var userSlideClick = false;
  var isHide = false;
  var isChineseClick = false;
  var isPinyinClick = false;
  var isKoreanClick = false;
  var isWordClick = false;
  var button_play,
    button_next,
    button_prev,
    button_seektoMinus,
    button_seektoAdd,
    button_chinese_add,
    button_chinese_minus,
    button_slide_chinese,
    button_pinyin_add,
    button_pinyin_minus,
    button_slide_pinyin,
    button_korean_add,
    button_korean_minus,
    button_slide_korean,
    button_word_add,
    button_word_minus,
    button_slide_word;

  var words_index_arr = [];
  var player_status;
  var tc_data = [];
  var tc_start;
  var tc_end;
  var current_time;
  var slider_index;
  var video_tc; //재생할 전체구간
  var userSlide = false; //유저의 터치이벤트로 인한 구간 이동인지 구분합니다.
  var playerInterval = null;

  var obj = {
    init: function(data) {
      swiper = document.querySelector(".swiper-container_admin");
      swipe_wrapper = document.querySelector(".swiper-wrapper");
      div_pron_view = document.getElementById("div_pron_view");
      button_video_hide = document.getElementById("button_video_hide");
      button_play = document.getElementById("button_video_play");
      button_next = document.getElementById("button_slide_next");
      button_prev = document.getElementById("button_slide_prev");
      button_seektoMinus = document.getElementById("button_seektoMinus");
      button_seektoAdd = document.getElementById("button_seektoAdd");
      button_chinese_add = document.getElementById("button_chinese_add");
      button_chinese_minus = document.getElementById("button_chinese_minus");
      button_slide_chinese = document.getElementById("button_slide_chinese");
      button_pinyin_add = document.getElementById("button_pinyin_add");
      button_pinyin_minus = document.getElementById("button_pinyin_minus");
      button_slide_pinyin = document.getElementById("button_slide_pinyin");
      button_korean_add = document.getElementById("button_korean_add");
      button_korean_minus = document.getElementById("button_korean_minus");
      button_slide_korean = document.getElementById("button_slide_korean");
      button_word_add = document.getElementById("button_word_add");
      button_word_minus = document.getElementById("button_word_minus");
      button_slide_word = document.getElementById("button_slide_word");
      button_play.onclick = function() {
        if (isPlaying) {
          pauseVideo();
        } else {
          playVideo();
        }
      };

      button_next.onclick = function() {
        pauseVideo();
        swipe_obj.slideNext(300, function() {
          console.log(swipe_obj.realIndex);
        });
        player.seekTo(tc_data[swipe_obj.realIndex].tc_in, true);
      };

      button_prev.onclick = function() {
        pauseVideo();
        swipe_obj.slidePrev(300, function() {
          console.log(swipe_obj.realIndex);
        });
        player.seekTo(tc_data[swipe_obj.realIndex].tc_in, true);
      };

      button_seektoMinus.onclick = function() {
        if (current_time - 3.0 > tc_start) {
          player.seekTo(current_time - 3.0, true);
        }
      };

      button_seektoAdd.onclick = function() {
        if (current_time + 3.0 < tc_end) {
          player.seekTo(current_time + 3.0, true);
        }
      };

      button_chinese_minus.onclick = function() {
        var chinese_li =
          swipe_obj.slides[swipe_obj.realIndex].childNodes[0].childNodes[0];
        var size = parseFloat(chinese_li.style.fontSize);
        chinese_li.style.fontSize = size - 0.1 + "em";
      };
      button_slide_chinese.onclick = function() {
        var chinese_li =
          swipe_obj.slides[swipe_obj.realIndex].childNodes[0].childNodes[0];
        if (!isChineseClick) {
          isChineseClick = true;
          chinese_li.style.display = "none";
        } else {
          isChineseClick = false;
          chinese_li.style.display = "block";
        }
      };
      button_chinese_add.onclick = function() {
        var chinese_li =
          swipe_obj.slides[swipe_obj.realIndex].childNodes[0].childNodes[0];
        var size = parseFloat(chinese_li.style.fontSize);
        chinese_li.style.fontSize = size + 0.1 + "em";
      };

      button_pinyin_minus.onclick = function() {
        var pinyin_li =
          swipe_obj.slides[swipe_obj.realIndex].childNodes[0].childNodes[1];
        var size = parseFloat(pinyin_li.style.fontSize);
        pinyin_li.style.fontSize = size - 0.1 + "em";
      };
      button_slide_pinyin.onclick = function() {
        var pinyin_li =
          swipe_obj.slides[swipe_obj.realIndex].childNodes[0].childNodes[1];
        if (!isPinyinClick) {
          isPinyinClick = true;
          pinyin_li.style.display = "none";
        } else {
          isPinyinClick = false;
          pinyin_li.style.display = "block";
        }
      };
      button_pinyin_add.onclick = function() {
        var pinyin_li =
          swipe_obj.slides[swipe_obj.realIndex].childNodes[0].childNodes[1];
        var size = parseFloat(pinyin_li.style.fontSize);
        pinyin_li.style.fontSize = size + 0.1 + "em";
      };

      button_korean_minus.onclick = function() {
        var korean_li =
          swipe_obj.slides[swipe_obj.realIndex].childNodes[0].childNodes[2];
        var size = parseFloat(korean_li.style.fontSize);
        korean_li.style.fontSize = size - 0.1 + "em";
      };
      button_slide_korean.onclick = function() {
        var korean_li =
          swipe_obj.slides[swipe_obj.realIndex].childNodes[0].childNodes[2];
        if (!isKoreanClick) {
          isKoreanClick = true;
          korean_li.style.display = "none";
        } else {
          isKoreanClick = false;
          korean_li.style.display = "block";
        }
      };
      button_korean_add.onclick = function() {
        var korean_li =
          swipe_obj.slides[swipe_obj.realIndex].childNodes[0].childNodes[2];
        var size = parseFloat(korean_li.style.fontSize);
        korean_li.style.fontSize = size + 0.1 + "em";
      };

      button_word_minus.onclick = function() {
        var word_li = swipe_obj.slides[swipe_obj.realIndex].childNodes[1];
        var size = parseFloat(word_li.style.fontSize);
        word_li.style.fontSize = size - 0.1 + "em";
      };
      button_slide_word.onclick = function() {
        var word_li = swipe_obj.slides[swipe_obj.realIndex].childNodes[1];
        if (!isWordClick) {
          isWordClick = true;
          word_li.style.display = "none";
        } else {
          isWordClick = false;
          word_li.style.display = "block";
        }
      };
      button_word_add.onclick = function() {
        var word_li = swipe_obj.slides[swipe_obj.realIndex].childNodes[1];
        var size = parseFloat(word_li.style.fontSize);
        word_li.style.fontSize = size + 0.1 + "em";
      };

      button_video_hide.onclick = function() {
        if (isHide) {
          isHide = false;
          console.log(isHide);
          var video = document.getElementById("player");
          video.style.display = "block";
          swiper.style.height = "500px";
        } else {
          isHide = true;
          console.log(isHide);
          var video = document.getElementById("player");
          video.style.display = "none";
          swiper.style.height = "800px";
        }
      };
      json = JSON.parse(JSON.stringify(data));
      console.log(json.video);
      var width = document.body.offsetWidth;
      var height = document.body.offsetHeight;
      console.log(width + "," + height);
      player = new YT.Player("player", {
        height: 360,
        width: 500,
        playerVars: {
          rel: 0,
          controls: 1
        },
        /*controls=0 : 기본값은 1입니다. 이 매개변수는 동영상 플레이어 컨트롤을 표시할지 여부를 나타냅니다.
         * - controls=0 – 플레이어 컨트롤이 플레이어에서 표시되지 않습니다.
         * - controls=1 – 플레이어 컨트롤이 플레이어에서 표시됩니다.  IFrame 삽입의 경우 컨트롤이 즉시 표시되고 Flash 플레이어 또한 즉시 로드됩니다.
         * - controls=2 – 플레이어 컨트롤이 플레이어에서 표시됩니다. IFrame 삽입의 경우 사용자가 동영상 재생을 시작한 후 컨트롤이 표시되고 Flash 플레이어가 로드됩니다. */
        events: {
          onReady: onPlayerReady, //로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
          onStateChange: onPlayerStateChange, //플레이어의 상태가 변경될 때마다 실행
          onPlaybackQualityChange: onPlaybackQualityChange, //동영상 재생 품질이 변경될 때마다 실행
          onPlaybackRateChange: onPlaybackRateChange, //재생 속도가 변경될 때마다 실행
          onError: onPlayerError, //플레이어에서 오류가 발생하면 실행
          onApiChange: onPlayerApiChange //플레이어가 공개 API 메소드로 모듈을 로드하거나 언로드했는지 나타내기 위해 실행
        }
      });
      jsonParsing(json);
      tcParsing();
      console.log("재생준비완료");
      tc_start = json.video[1].subtitles[0].tc_in;
      tc_end =
        json.video[1].subtitles[json.video[1].subtitles.length - 1].tc_out;
    }
  };

  function createUI(video) {
    for (let index = 0; index < video[2].words.length; index++) {
      words_index_arr[index] = video[2].words[index].no;
    }
    for (let index = 0; index < video[1].subtitles.length; index++) {
      var tmp_slider = document.createElement("div");
      var tmp_ul = document.createElement("ul");
      var tmp_ul2 = document.createElement("ul");

      tmp_ul2.id = "word_ul";

      tmp_ul.className = "is-lower-tmp_ul";
      tmp_ul2.className = "is-lower-tmp_ul";
      tmp_ul2.style.fontSize = "1.5em";
      var tmp_li_chines = document.createElement("li");
      tmp_li_chines.id = "tmp_li1";
      tmp_li_chines.style.fontSize = "2.0em";
      var tmp_li_pinyin = document.createElement("li");
      tmp_li_pinyin.id = "tmp_li2";
      tmp_li_pinyin.style.fontSize = "1.5em";
      var tmp_li_korean = document.createElement("li");
      tmp_li_korean.id = "tmp_li3";
      tmp_li_korean.style.fontSize = "1.6em";

      tmp_slider.className = "swiper-slide";

      tmp_li_chines.innerText = video[1].subtitles[index].chinese;
      tmp_li_pinyin.innerText = video[1].subtitles[index].pinyin;
      tmp_li_korean.innerText = video[1].subtitles[index].korean;

      tmp_ul.appendChild(tmp_li_chines);
      tmp_ul.appendChild(tmp_li_pinyin);
      tmp_ul.appendChild(tmp_li_korean);
      tmp_slider.appendChild(tmp_ul);

      for (let y = 0; y < words_index_arr.length; y++) {
        if (words_index_arr[y] == video[1].subtitles[index].no) {
          var tmp_li_word = document.createElement("li");
          tmp_li_word.id = "tmp_word_li1";
          //   tmp_li_word.style.fontSize = "2.0em";
          var tmp_li_mean = document.createElement("li");
          tmp_li_mean.id = "tmp_word_li2";
          //   tmp_li_mean.style.fontSize = "1.5em";
          tmp_li_word.innerText = video[2].words[y].word;
          tmp_li_mean.innerText = video[2].words[y].mean;
          tmp_ul2.appendChild(tmp_li_word);
          tmp_ul2.appendChild(tmp_li_mean);
          //   break;
        }
      }
      //   tmp_li_word.innerText = video[2].words[index].word;
      //   tmp_li_mean.innerText = video[2].words[index].mean;
      tmp_slider.appendChild(tmp_ul2);
      swipe_wrapper.appendChild(tmp_slider);
    }
  }

  function mkSwipe() {
    swipe_obj = new Swiper(".swiper-container_admin", {
      spaceBetween: 10,
      watchSlidesProgress: true,
      simulateTouch: false,
      on: {
        init: function() {
          console.log("hello swiper");
        },
        slideChange: function() {
          console.log("change!!!");
        }
      }
    });

    var hide_button = document.getElementById("button_video_hide");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_video_play");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_seektoAdd");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_seektoMinus");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_slide_next");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_slide_prev");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_chinese_minus");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_slide_chinese");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_chinese_add");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_pinyin_minus");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_slide_pinyin");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_pinyin_add");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_korean_minus");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_slide_korean");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_korean_add");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_word_minus");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_slide_word");
    hide_button.style.display = "block";
    hide_button = document.getElementById("button_word_add");
    hide_button.style.display = "block";
  }

  function jsonParsing(json) {
    var video = json.video;
    isChecking = true;
    createUI(video);
    mkSwipe();
  }

  // onReady: onPlayerReady, //로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
  // onStateChange: onPlayerStateChange, //플레이어의 상태가 변경될 때마다 실행
  // onPlaybackQualityChange: onPlaybackQualityChange, //동영상 재생 품질이 변경될 때마다 실행
  // onPlaybackRateChange: onPlaybackRateChange, //재생 속도가 변경될 때마다 실행
  // onError: onPlayerError, //플레이어에서 오류가 발생하면 실행
  // onApiChange: onPlayerApiChange //플레이어가 공개 API 메소드로 모듈을 로드하거나 언로드했는지 나타내기 위해 실행

  /* 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행 */
  function onPlayerReady(event) {
    player.loadVideoById({
      videoId: json.video[0].video_url,
      startSeconds: tc_start,
      endSeconds: tc_end
    });
    // pauseVideo();
  }
  /* 플레이어의 상태가 변경될 때마다 실행 */
  // YT.PlayerState.ENDED
  // YT.PlayerState.PLAYING
  // YT.PlayerState.PAUSED
  // YT.PlayerState.BUFFERING
  // YT.PlayerState.CUED
  function onPlayerStateChange(event) {
    console.log("onPlayerStateChange");
    switch (event.data) {
      case YT.PlayerState.ENDED:
        console.log("END");
        // clearInterval(playerInterval);
        player.loadVideoById({
          videoId: json.video[0].video_url,
          startSeconds: tc_start,
          endSeconds: tc_end
        });
        break;
      case YT.PlayerState.PLAYING:
        player_status = "PLAYING";
        console.log("PLAYING");
        playerInterval = setInterval(playerListener, 100);
        break;
      case YT.PlayerState.PAUSED:
        player_status = "PAUSED";
        console.log("PAUSED");
        clearInterval(playerInterval);
        break;
      case YT.PlayerState.BUFFERING:
        console.log("BUFFERING");
        // clearInterval(playerInterval);
        break;
      case YT.PlayerState.CUED:
        console.log("CUED");
        // clearInterval(playerInterval);
        break;

      default:
        break;
    }
  }
  /* 동영상 재생 품질이 변경될 때마다 실행 */
  function onPlaybackQualityChange(event) {
    console.log("onPlaybackQualityChange");
  }
  /* 재생 속도가 변경될 때마다 실행 */
  function onPlaybackRateChange() {
    console.log("onPlaybackRateChange");
  }
  /* 플레이어에서 오류가 발생하면 실행 */
  function onPlayerError(event) {
    console.log("onPlayerError");
  }
  /* 플레이어가 공개 API 메소드로 모듈을 로드하거나 언로드했는지 나타내기 위해 실행 */
  function onPlayerApiChange(event) {
    console.log("onPlayerApiChange");
  }

  function stopVideo() {
    player.stopVideo();
    isPlaying = false;
  }
  function pauseVideo() {
    player.pauseVideo();
    isPlaying = false;
  }

  function playVideo() {
    player.playVideo();
    isPlaying = true;
  }

  function hideVideo() {
    var video = document.getElementById("player");
    video.style.display = "none";
  }

  function tcParsing() {
    var video = json.video;
    for (let index = 0; index < video[1].subtitles.length; index++) {
      var tc_item = new Object();
      tc_item.tc_in = video[1].subtitles[index].tc_in;
      tc_item.tc_out = video[1].subtitles[index].tc_out;
      tc_data[index] = tc_item;
    }
  }

  function playerListener() {
    current_time = player.getCurrentTime();
    console.log(tc_data.length + "," + current_time);
    for (var i = 0; i < tc_data.length; i++) {
      if (
        current_time >= tc_data[i].tc_in &&
        current_time < tc_data[i].tc_out
      ) {
        now_tc_in = tc_data[i].tc_in;
        now_tc_out = tc_data[i].tc_out;
        swipe_obj.slideTo(i, 200, false);
        return;
      }
    }
  }

  function clickNext() {}

  function clickPrev() {}

  return obj;
})();
