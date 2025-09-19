async function fetchBooks(query) {
    const params = new URLSearchParams({
        target: "title",
        query,
        size: 50
    });

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: "KakaoAK 94450f317ee684fc75e500ae45e06cc8"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
    }

    return response.json();
}

async function bookData() {
    try {          

        const querise = [
            { query: '도서', sectionId: 'a' },
            { query: '만화', sectionId: 'b' },
            { query: '웹툰', sectionId: 'c' },
            { query: '책', sectionId: 'd' },
            { query: '자바스크립트', sectionId: 'e' },
            { query: '에세이', sectionId: 'f' },
            { query: 'NEW', sectionId: 'g' },
            { query: '소설', sectionId: 'h' },
            { query: '인기', sectionId: 'i' },
            { query: '이벤트', sectionId: ''},
            { query: 'Pink', sectionId: ''}
        ];

        for (const { query, sectionId } of querise ){
            const data = await fetchBooks(query);

            // 영역 선택
            // const section = $('#' + sectionId).find('.lanking__slide-wrap');
            // const mainBox = $(section).find('.lanking__slide');

            const section = document.querySelector(`#${sectionId}`);
            const mainBox = section.querySelectorAll(".swiper-slide");


            mainBox.forEach((box, i) => {
                const doc = data.documents[i];

                const titleElement = document.createElement("h3");
                //titleElement.textContent = doc.title;
                //box.appendChild(titleElement);

                // 3. <img> 요소 생성 및 src 설정
                const imgElement = document.createElement("img");
                imgElement.src = doc.thumbnail;
                box.appendChild(imgElement);

                // 3. <img> 요소 생성 및 src 설정
                // const writerElement = document.createElement("p");
                // imgElement = doc.authors;
                // box.appendChild(writerElement);
            });

        }

    } catch (error) {
        console.log('에러 발생', error);
    }
}

bookData();