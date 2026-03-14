// /layout/header.html 웹문서 요청 -> html 문구 텍스트
fetch("/layout/header.html")   // fetch(""): 서버에 있는 파일을 가져와라
  .then((response) => response.text())   // 응답이 오면 내용물을 텍스트(글자) 형태로 바꿔줌
  .then((responseText) => {
    // console.log(responseText);
    document.querySelector(".container").insertAdjacentHTML("afterbegin", responseText);
  })                                // 도입해라.가장인접한곳에.html코드를.


// **공통 레이아웃 분리 - Header