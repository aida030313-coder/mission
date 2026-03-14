/*
- **요구사항 분석 전략** :

    Mission 1. 도서 추가(등록) 기능 구현
    + 도서명과 가격을 입력 후 "확인" 버튼 클릭하면 도서가 추가된다.
    + 도서명과 가격을 입력 후 "엔터키" 눌려지면 도서를 추가한다. 
    + 입력된 도서명 또는 가격 값이 누락되었을 경우 추가되지 않는다. (예외사항)
    + 도서 추가가 완료되면 입력 필드는 초기화한다.
    + 도서가 추가되면 총 도서의 갯수를 카운팅해서 표시한다.

    Mission 2. 도서 수정 기능 구현
    + 도서 정보의 "수정" 버튼 클릭시 모달 창이 뜬다.
    + 모달 창에서는 수정할 도서의 기존 도서명과 가격이 미리 입력되어 있어야 한다.
    + 모달창에서 신규 도서명, 가격을 입력받고 저장 버튼 클릭시 입력된 도서명, 가격으로 수정되며 모달창이 닫힌다.
    
    Mission 3. 도서 삭제 기능 구현
    + 도서 정보의 "삭제" 버튼 클릭시 브라우저의 confirm 창이 뜬다.
    + 해당 confirm 창에서 "확인" 버튼을 클릭하면 해당 도서가 삭제된다.
    + 도서 삭제 완료 시 도서의 갯수를 카운팅 하여 화면에 표현한다.

    Mission 4. 
    + 도서 데이터를 localStorage에 저장한다.
        + 신규 도서 추가 시 저장
        + 신규 도서 수정 시 저장
        + 신규 도서 삭제 시 저장
    - 도서 데이터를 localStorage에서 읽어온다.
*/


const $ = (selector) => document.querySelector(selector);


// 저장소 객체(데이터 저장 및 읽어오기 기능)
const store = {
    setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    setLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}


function Product() {

    // 현재 Product 함수 내에서 변하는 데이터 - 도서
    this.books = [];

    // 초기화 함수
    this.init = () => {
        this.books = store.getLocalStorage("books") || [];
        if(this.books.length !==0) {
            renderBook();
        }
    }

    // 재사용 함수. 도서의 갯수 카운팅해서 출력
    const updateBookCount = () => {
        $("#book-count").innerText = $("#book-list").children.length;
    }

    // 렌더링용 함수. 도서 정보 렌더링
    const renderBook = () => {
        const bookItems = 
                    this.books   // [{}, {}, ...]
                        .map((book) => {
                            return `
                            <li class="book-item">
                                <div class="book-info">
                                    <span class="book-name">${book.title}</span>
                                    <span class="book-price">₩${book.price.toLocaleString()}</span>
                                </div>
                                <div class="book-actions">
                                    <button class="edit-btn modal-toggle-btn" data-modal-target="editModal">수정</button>
                                    <button class="delete-btn">삭제</button>
                                </div>
                            </li>
                        `
                    }).join("")

            $("#book-list").innerHTML = bookItems;

            updateBookCount();
    }

    // 가능용 함수 1. 도서 추가 기능
    const registBook = () => {

        const bookName = ($("#book-name-input").value);
        const bookPrice = Number($("#book-price-input").value);

        if(!bookName.trim() || !bookPrice) {
            alert('값이 누락되었습니다. 값을 입력해주세요!');
            return;
        }

        // 1) 도서 상태 변경 (새로운 도서 추가)
        this.books.push({
            title: bookName,
            price: bookPrice
        });


        // 2) 변경된 상태 저장 (key, value)
        store.setLocalStorage("books", this.books);

        
        // 3) 변경된 상태에 맞춰서 요소 렌더링
        const bookItems = 
            this.books   // [{}, {}, ...]
                .map((book) => {
                    return `
                    <li class="book-item">
                        <div class="book-info">
                            <span class="book-name">${book.title}</span>
                            <span class="book-price">₩${book.price.toLocaleString()}</span>
                        </div>
                        <div class="book-actions">
                            <button class="edit-btn modal-toggle-btn" data-modal-target="editModal">수정</button>
                            <button class="delete-btn">삭제</button>
                        </div>
                    </li>
                `         // ["<li></li>", "<li></li>", ...]
            }).join("")   // "<li></li><li></li><li></li>"

        $("#book-list").innerHTML = bookItems;

        $("#book-regist-form").reset();
        $("#book-name-input").focus();

        updateBookCount();
    }


    // 가능용 함수 2_1. 도서 수정폼에 기존데이터 출력
    const editBookForm = (e) => {

        const $bookItem = e.target.closest(".book-item");
            const bookName = $bookItem.querySelector(".book-name").innerText;
            const bookPrice = Number($bookItem.querySelector(".book-price").innerText.replace(/[₩,]/g, ""));
            const bookIndex = Array.from($("#book-list").children).indexOf($bookItem);

            $("#edit-book-name").value = bookName;
            $("#edit-book-price").value = bookPrice;
            $("#edit-book-index").value = bookIndex;

    }

    
    // 기능용 함수 2_2. 도서 수정 요청 기능
    const editBook = () => {

        const editBookName = $("#edit-book-name").value;
        const editBookPrice = Number($("#edit-book-price").value);
        const editBookIndex = Number($("#edit-book-index").value);

        // 1) 도서 상태 변경(기존 도서 찾아서 수정)
        this.books[editBookIndex] = {
            title: editBookName,
            price: editBookPrice
        };

        // 2) 변경된 상태 저장
        store.setLocalStorage("books", this.books);

        // 3) 변경된 상태에 맞춰 요소 렌더링
        renderBook();

        // 모달창 닫기
        $("#editModal .modal-close").click();
    }

    // 기능용 함수 3. 도서 삭제 기능
    const deleteBook = (e) => {

        if(confirm("정말 삭제하시겠습니까?")) {   // true일 경우

            const deleteBookIndex = Array.from($("#book-list").children).indexOf(e.target.closest(".book-item"));

            // 1) 도서 상태 변경 (기존 도서 찾아서 삭제)
            this.books.splice(deleteBookIndex, 1);

            // 2) 변경된 상태 저장
            store.setLocalStorage("books", this.books);

            // 3) 변경된상태에 맞춰 요소 렌더링
            const bookItems = 
                    this.books   // [{}, {}, ...]
                        .map((book) => {
                            return `
                            <li class="book-item">
                                <div class="book-info">
                                    <span class="book-name">${book.title}</span>
                                    <span class="book-price">₩${book.price.toLocaleString()}</span>
                                </div>
                                <div class="book-actions">
                                    <button class="edit-btn modal-toggle-btn" data-modal-target="editModal">수정</button>
                                    <button class="delete-btn">삭제</button>
                                </div>
                            </li>
                        `
                        }).join("")

                $("#book-list").innerHTML = bookItems;

                updateBookCount();
        }
    }

    // Mission 1. 도서 추가
    $('#book-regist-form').addEventListener('submit', (e) => {
        e.preventDefault();
        registBook();

        })



    // Mission 2_1. 도서 수정
    $("#book-list").addEventListener('click', (e) => {
        // 클릭이벤트가 발생한 요소(이벤트 대상)가 수정버튼일 때만
        if(e.target.classList.contains('edit-btn')) {
            editBookForm(e);

        }

        // Mission 3. 도서 삭제
        if(e.target.classList.contains('delete-btn')) {
            deleteBook(e);
        }
    });

    // Mission 2_2. 도서 수정 요청 기능
    // 모달창에 폼 제출 시 입력된 도서명, 가격으로 수정되도록 구성
    $("#book-edit-form").addEventListener('submit', (e) => {
        e.preventDefault();
        editBook();
    })

}

const product = new Product();
product.init();   // 강제로 초기화


// localStorage 개념
// localStorage.setItem("test1", "저장할 데이터1");
// localStorage.setItem("test2", 2);

// // 저장되는 데이터는 문자열로 저장된다.
// localStorage.getItem("test1");

// // 문자열로 저장되기에 내가 의도한 데이터 형식으로 저장되지 않음
// localStorage.setItem("books", [{title: "제목", price: 10000}, {title: "제목2", price: 20000}]);

// // JS 객체를 JSON 문자열로 변환해서 저장해야 한다.
// localStorage.setItem("books", JSON.stringify([{title: "제목", price: 10000}, {title: "제목2", price: 20000}]));

// localStorage.getItem("books");
// // 꺼낼때도 js 객체로 변환하려면 파싱해야 한다.
// JSON.parse(localStorage.getItem("books"));

