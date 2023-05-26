# 현재 한 것
서버에 데이터를 주기(자원 갱신)

각 행동하기 버튼마다 자원 갱신, 플레이어 이동

# 해야 할 것
서버에서 데이터를 받아와서 해야하는 로직들..

slack에 올라 온 수정 사항 (1,2,3,4 번) 읽고 해보기

-----

# 수정 및 추가한 코드

### 기본 로직

                const defaultActHandler = (item, value, cardIndex) => {
                    sendingClient.current.send(
                    '/main-board/resource/update',
                    {},
                    JSON.stringify({
                        Resoure_ID: item,
                        quantity : value,
                        turn: 0,
                        card: cardIndex
                    })
                    );
                };

### 누적 로직
                const accumulatedActHandler = (item, value, cardIndex) => {
                    sendingClient.current.send(
                    '/main-board/resource/update',
                    {},
                    JSON.stringify({
                        Resoure_ID: item,
                        quantity : value,
                        turn: 0,
                        card: cardIndex,
                        count: 1,
                    })
                    );
                };
    

기본, 누적 로직에서 item, value 는 배열형태로 전달

누적 로직 실행 시 count 는 1로 초기화 : (누적 로직에서 count는 라운드 갱신 마다 +1 씩 해서 자원 갱신 시 count * value 로 전달 받으려고 생각중)
    

### 플레이어 이동
                function movePlayer(btn, event) {
                    const button = btn;
                    const buttonRect = button.getBoundingClientRect();
                    const x = event.clientX - buttonRect.left;
                    const y = event.clientY - buttonRect.top;
                    const redBox = document.createElement("div");
                    redBox.style.width = "55px";
                    redBox.style.height = "58px";
                    redBox.style.transform = `translateX(${x-10}px) translateY(${y-10}px)`;
                    redBox.style.backgroundImage = `url(${farmer})`;
                    button.appendChild(redBox);
                }

---

