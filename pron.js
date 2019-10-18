var pronVideoSYS = (function() {
  var isChecking = false;

  var isMouseDown = false;

  var parent_all,
    section,
    subtitle,
    baseinput,
    baseinput_check,
    checkresult,
    result_name,
    result_size,
    result_type,
    ul_div,
    div_pron_view,
    swipe_container,
    swipe_wrapper,
    swipe_slider,
    swipe_obj,
    youtube_div,
    player,
    remot_div,
    button_table,
    button_table_chinese,
    button_table_pinyin,
    button_table_korean,
    button_table_word,
    button_chinese_add,
    button_chinese_minus,
    button_pinyin_add,
    button_pinyin_minus,
    button_korean_add,
    button_korean_minus,
    button_word_add,
    button_word_minus,
    button_video_hide,
    button_video_play,
    button_slide_next,
    button_slide_prev,
    button_seektoAdd,
    button_seektoMinus,
    button_slide_chinese,
    button_slide_pinyin,
    button_slide_korean,
    button_slide_word;

  point = [];

  var remot_left;
  var remot_top;
  var user_left;
  var user_top;

  var jsonResult;

  var obj = {
    init: function() {
      obj = new pronVideo();
    },
    getData: function() {
      if (isChecking) {
        return jsonResult;
      } else {
        return;
      }
    }
  };

  function pronVideo() {
    parent_all = document.querySelector(".section");
    section = document.querySelector(".container");

    remot_div = document.createElement("div");
    remot_div.id = "remot_div";
    remot_div.className = "box";
    remot_div.style.display = "none";
    parent_all.appendChild(remot_div);

    remot_div.addEventListener("mousedown", e => {
      isMouseDown = true;
      remot_left = e.clientX;
      point = [
        e.clientX - remot_div.offsetLeft,
        e.clientY - remot_div.offsetTop
      ];
      remot_top = e.clientY;
      console.log(point[0] + "," + point[1]);
    });

    window.addEventListener("mousedown", e => {
      if (isMouseDown) {
        console.log(e.clientX + "dlrjfkd" + e.clientY);
      }
    });

    window.addEventListener("mouseup", e => {
      isMouseDown = false;
    });

    window.addEventListener("mousemove", e => {
      if (isMouseDown) {
        var offsetX = e.clientX - remot_left;
        var offsetY = e.clientY - remot_top;

        var coor = "Coordinates: (" + e.clientX + "," + e.clientY + ")";
        document.getElementById("demo").innerHTML = coor;
        remot_div.style.left = e.clientX - point[0] + "px";
        remot_div.style.top = e.clientY - point[1] + "px";
      }
    });

    /**background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    color: #4a4a4a;
    display: block;
    padding: 1.25rem; */

    baseinput = document.createElement("input");
    baseinput.className = "button";
    baseinput.id = "file";
    baseinput.type = "file";
    baseinput.onchange = checkClick;

    baseinput_check = document.createElement("input");
    baseinput_check.className = "button";
    baseinput_check.type = "button";
    baseinput_check.value = "파일정보확인";
    baseinput_check.onclick = jsonRequest;

    checkresult = document.createElement("div");
    checkresult.id = "resultdiv";
    checkresult.className = "box";

    section.appendChild(baseinput);
    section.appendChild(baseinput_check);
    section.appendChild(checkresult);

    ul_div = document.createElement("ul");
    ul_div.style.marginBottom = "10px";

    result_name = document.createElement("li");

    result_name.id = "result_name";
    result_size = document.createElement("li");
    result_size.id = "result_size";
    result_type = document.createElement("li");
    result_type.id = "result_type";

    ul_div.appendChild(result_name);
    ul_div.appendChild(result_size);
    ul_div.appendChild(result_type);

    checkresult.appendChild(ul_div);

    div_pron_view = document.createElement("div");
    div_pron_view.id = "div_pron_view";
    div_pron_view.className = "box";

    checkresult.appendChild(div_pron_view);

    youtube_div = document.createElement("div");
    youtube_div.id = "player";
    div_pron_view.appendChild(youtube_div);

    button_video_hide = document.createElement("button");
    button_video_hide.id = "button_video_hide";
    button_video_hide.className = "button is-info";
    button_video_hide.innerText = "비디오 활성화/비활성화";
    button_video_hide.style.display = "none";
    button_video_hide.style.margin = "auto";

    button_video_play = document.createElement("button");
    button_video_play.id = "button_video_play";
    button_video_play.className = "button is-info";
    button_video_play.innerText = "▶";
    button_video_play.style.display = "none";

    button_seektoAdd = document.createElement("button");
    button_seektoAdd.id = "button_seektoAdd";
    button_seektoAdd.className = "button is-info";
    button_seektoAdd.innerText = "+5";
    button_seektoAdd.style.display = "none";

    button_seektoMinus = document.createElement("button");
    button_seektoMinus.id = "button_seektoMinus";
    button_seektoMinus.className = "button is-info";
    button_seektoMinus.innerText = "-5";
    button_seektoMinus.style.display = "none";

    button_slide_next = document.createElement("button");
    button_slide_next.id = "button_slide_next";
    button_slide_next.className = "button is-info";
    button_slide_next.innerText = "＞";
    button_slide_next.style.display = "none";

    button_slide_prev = document.createElement("button");
    button_slide_prev.id = "button_slide_prev";
    button_slide_prev.className = "button is-info";
    button_slide_prev.innerText = "＜";
    button_slide_prev.style.display = "none";

    button_chinese_minus = document.createElement("button");
    button_chinese_minus.id = "button_chinese_minus";
    button_chinese_minus.className = "button is-info";
    button_chinese_minus.innerText = "-";
    button_chinese_minus.style.display = "none";

    button_slide_chinese = document.createElement("button");
    button_slide_chinese.id = "button_slide_chinese";
    button_slide_chinese.className = "button is-info";
    button_slide_chinese.innerText = "중국어";
    button_slide_chinese.style.display = "none";
    // button_slide_chinese.style.margin = "10px auto";

    button_chinese_add = document.createElement("button");
    button_chinese_add.id = "button_chinese_add";
    button_chinese_add.className = "button is-info";
    button_chinese_add.innerText = "+";
    button_chinese_add.style.display = "none";

    button_pinyin_minus = document.createElement("button");
    button_pinyin_minus.id = "button_pinyin_minus";
    button_pinyin_minus.className = "button is-info";
    button_pinyin_minus.innerText = "-";
    button_pinyin_minus.style.display = "none";

    button_slide_pinyin = document.createElement("button");
    button_slide_pinyin.id = "button_slide_pinyin";
    button_slide_pinyin.className = "button is-info";
    button_slide_pinyin.innerText = "한어병음";
    button_slide_pinyin.style.display = "none";
    // button_slide_pinyin.style.margin = "10px auto";

    button_pinyin_add = document.createElement("button");
    button_pinyin_add.id = "button_pinyin_add";
    button_pinyin_add.className = "button is-info";
    button_pinyin_add.innerText = "+";
    button_pinyin_add.style.display = "none";

    button_korean_minus = document.createElement("button");
    button_korean_minus.id = "button_korean_minus";
    button_korean_minus.className = "button is-info";
    button_korean_minus.innerText = "-";
    button_korean_minus.style.display = "none";

    button_slide_korean = document.createElement("button");
    button_slide_korean.id = "button_slide_korean";
    button_slide_korean.className = "button is-info";
    button_slide_korean.innerText = "한국어";
    button_slide_korean.style.display = "none";
    // button_slide_korean.style.margin = "10px auto";

    button_korean_add = document.createElement("button");
    button_korean_add.id = "button_korean_add";
    button_korean_add.className = "button is-info";
    button_korean_add.innerText = "+";
    button_korean_add.style.display = "none";

    button_word_minus = document.createElement("button");
    button_word_minus.id = "button_word_minus";
    button_word_minus.className = "button is-info";
    button_word_minus.innerText = "-";
    button_word_minus.style.display = "none";

    button_slide_word = document.createElement("button");
    button_slide_word.id = "button_slide_word";
    button_slide_word.className = "button is-info";
    button_slide_word.innerText = "단어";
    button_slide_word.style.display = "none";

    button_word_add = document.createElement("button");
    button_word_add.id = "button_word_add";
    button_word_add.className = "button is-info";
    button_word_add.innerText = "+";
    button_word_add.style.display = "none";

    mkPlayTable();
    mkChineseTable();
    mkPinyinTable();
    mkKoreanTable();
    mkWordsTable();

    remot_div.appendChild(button_video_hide);
    remot_div.appendChild(button_table);
    remot_div.appendChild(button_table_chinese);
    remot_div.appendChild(button_table_pinyin);
    remot_div.appendChild(button_table_korean);
    remot_div.appendChild(button_table_word);

    // remot_div.appendChild(button_slide_chinese);
    //remot_div.appendChild(button_slide_pinyin);
    //remot_div.appendChild(button_slide_korean);
    // remot_div.appendChild(button_slide_word);

    swipe_container = document.createElement("div");
    swipe_container.id = "swiper-parent";
    swipe_container.className = "swiper-container_admin";
    swipe_wrapper = document.createElement("div");
    swipe_wrapper.className = "swiper-wrapper";
    // swipe_slider = document.createElement("div");
    // swipe_slider.className = "swiper-slide";

    swipe_container.appendChild(swipe_wrapper);

    div_pron_view.appendChild(swipe_container);
  }

  function checkClick() {
    isChecking = false;
    var file = document.getElementById("file");
    var name, size, type;
    var reader = new FileReader();
    reader.onload = function() {
      remot_div.style.display = "block";
      jsonParsing(reader.result);
    };

    name = document.getElementById("result_name");
    size = document.getElementById("result_size");
    type = document.getElementById("result_type");

    name.innerHTML = "file name : " + file.files[0].name;
    size.innerHTML = "file size : " + file.files[0].size;
    type.innerHTML = "file type : " + file.files[0].type;

    reader.readAsText(file.files[0], "utf-8");
  }

  function jsonParsing(json) {
    var jsonObj = JSON.parse(json);
    var jsonMenu = jsonObj;
    jsonResult = jsonMenu;
    isChecking = true;
    // for (let index = 0; index < jsonMenu.length; index++) {
    //   var tmp_slider = document.createElement("div");
    //   var tmp_span = document.createElement("span");
    //   tmp_slider.className = "swiper-slide";
    //   tmp_span.innerText = index;
    //   tmp_slider.appendChild(tmp_span);
    //   swipe_wrapper.appendChild(tmp_slider);
    // }
    // mkSwipe();
  }

  function mkPlayTable() {
    button_table = document.createElement("table");
    button_table.id = "button_table";
    var table_row = document.createElement("tr");
    var table_data1 = document.createElement("td");
    var table_data2 = document.createElement("td");
    var table_data3 = document.createElement("td");

    var table_data1_5 = document.createElement("td");
    var table_data2_5 = document.createElement("td");

    table_data1.appendChild(button_slide_prev);
    table_data1_5.appendChild(button_seektoMinus);
    table_data2.appendChild(button_video_play);
    table_data2_5.appendChild(button_seektoAdd);
    table_data3.appendChild(button_slide_next);

    table_row.appendChild(table_data1);
    table_row.appendChild(table_data1_5);
    table_row.appendChild(table_data2);
    table_row.appendChild(table_data2_5);
    table_row.appendChild(table_data3);

    button_table.appendChild(table_row);

    button_table.style.margin = "auto";
  }

  function mkChineseTable() {
    button_table_chinese = document.createElement("table");
    button_table_chinese.id = "button_table_chinese";
    var table_row = document.createElement("tr");
    var table_data1 = document.createElement("td");
    var table_data2 = document.createElement("td");
    var table_data3 = document.createElement("td");
    table_data1.appendChild(button_chinese_minus);
    table_data2.appendChild(button_slide_chinese);
    table_data3.appendChild(button_chinese_add);
    table_row.appendChild(table_data1);
    table_row.appendChild(table_data2);
    table_row.appendChild(table_data3);

    button_table_chinese.appendChild(table_row);
    button_table_chinese.style.margin = "auto";
  }

  function mkPinyinTable() {
    button_table_pinyin = document.createElement("table");
    button_table_pinyin.id = "button_table_pinyin";
    var table_row = document.createElement("tr");
    var table_data1 = document.createElement("td");
    var table_data2 = document.createElement("td");
    var table_data3 = document.createElement("td");
    table_data1.appendChild(button_pinyin_minus);
    table_data2.appendChild(button_slide_pinyin);
    table_data3.appendChild(button_pinyin_add);
    table_row.appendChild(table_data1);
    table_row.appendChild(table_data2);
    table_row.appendChild(table_data3);

    button_table_pinyin.appendChild(table_row);
    button_table_pinyin.style.margin = "auto";
  }

  function mkKoreanTable() {
    button_table_korean = document.createElement("table");
    button_table_korean.id = "button_table_korean";
    var table_row = document.createElement("tr");
    var table_data1 = document.createElement("td");
    var table_data2 = document.createElement("td");
    var table_data3 = document.createElement("td");
    table_data1.appendChild(button_korean_minus);
    table_data2.appendChild(button_slide_korean);
    table_data3.appendChild(button_korean_add);
    table_row.appendChild(table_data1);
    table_row.appendChild(table_data2);
    table_row.appendChild(table_data3);

    button_table_korean.appendChild(table_row);
    button_table_korean.style.margin = "auto";
  }

  function mkWordsTable() {
    button_table_word = document.createElement("table");
    button_table_word.id = "button_table_word";
    var table_row = document.createElement("tr");
    var table_data1 = document.createElement("td");
    var table_data2 = document.createElement("td");
    var table_data3 = document.createElement("td");
    table_data1.appendChild(button_word_minus);
    table_data2.appendChild(button_slide_word);
    table_data3.appendChild(button_word_add);
    table_row.appendChild(table_data1);
    table_row.appendChild(table_data2);
    table_row.appendChild(table_data3);

    button_table_word.appendChild(table_row);
    button_table_word.style.margin = "auto";
  }

  function mkSwipe() {
    swipe_obj = new Swiper(".swiper-container_admin", {
      spaceBetween: 0,
      watchSlidesProgress: true,
      on: {
        init: function() {
          console.log("hello swiper");
        },
        slideChange: function() {
          console.log("change!!!");
        }
      }
    });
  }

  return obj;
})();
