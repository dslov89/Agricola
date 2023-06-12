<div align="center">
  
<img src="https://github.com/dslov89/Agricola/assets/71018440/ad428ee1-36a8-47a8-9d1a-46aaff1bf165"  width=150 >
  
 #### 소프트웨어공학 아고라팀의 아그리콜라 보드게임 :computer: 프론트엔드
</div>

<br/>

## :memo: 프로젝트 소개

안녕하세요:smiley: 

소프트웨어공학 아고라팀의 아그리콜라 보드게임 :computer: 웹 페이지 입니다

저희 팀은 프론트엔드 5명 백엔드 1명으로 구성되어 있습니다.   

백엔드는 [이곳](https://github.com/weightsforfun/agricola-server)을 클릭해 주세요 

<br/>

## :orange_book: 시작 가이드

### Installation & Backend
```
$ git clone https://github.com/weightsforfun/agricola-server.git
$ cd agricola-server/
```

### Installation & Frontend
```
$ git clone https://github.com/dslov89/Agricola.git
$ cd agricola

$ npm install 
$ npm start
```

<br/>

##  :hammer: 기술 스택

### Enviroment & FrontEnd
<div>
  <img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visual studio&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

</div>

### Config
<div>
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> 
  </div>
  
### Development & FrontEnd
<div>
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
     <img src="https://img.shields.io/badge/sockjs-010101?style=for-the-badge&logo=socketdotio&logoColor=white">
       <img src="https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
  </div>

### Communication 

  <div>
  <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"> 
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> 
  <img src="https://img.shields.io/badge/googlesheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white"> 
    <img src="https://img.shields.io/badge/jirasoftware-0052CC?style=for-the-badge&logo=jirasoftware&logoColor=white"> 
  </div>
  
<br>

## :art: 화면 구성
<div align="center">
  <table>
    <tr align="center">
      <th>게임방 화면</th>
      <th>게임 화면</th>
    </tr>
    <tr>
      <td><img src="https://github.com/dslov89/Agricola/assets/71018440/84d24642-4e77-4fec-bb5a-ae39c2d8101f" alt="gif-main-page" width="370"></td>
      <td><img src="https://github.com/dslov89/Agricola/assets/71018440/84d24642-4e77-4fec-bb5a-ae39c2d8101f"alt="gif-function1" width="370"></td>
    </tr>
    <tr align="center">
      <th>카드</th>
      <th>농장</th>
    </tr>
    <tr>
      <td><img src="https://github.com/dslov89/Agricola/assets/71018440/84d24642-4e77-4fec-bb5a-ae39c2d8101f" alt="gif-function2" width="370"></td>
      <td><img src= "https://github.com/dslov89/Agricola/assets/71018440/84d24642-4e77-4fec-bb5a-ae39c2d8101f"alt="gif-function3" width="370"></td>
    </tr>
  </table>
</div>

<br/>

## :books: 주요 기능

###  통신 방법
SockJS와 Stomp를 활용한 4인 온라인 아그리콜라 게임

###  게임룸
방 생성 시, 타 유저가 로그인하면 자동으로 방 목록 업데이트   
한 게임룸의 입장 가능 인원수는 4   
4명이 모두 한 게임룸에 입장해야 게임 시작   

### 인 게임
게임 시작 시, 랜덤으로 보조 설비 카드 7장 및 직업 카드 7장 획득   
모든 행동하기 칸 구현   
라운드 카드는 4라운드까지 구현   
턴 넘어갈 때마다 농장 업데이트 내용 반영   
울타리 설치 시, 농장 내 빈 공간 클릭하면 자동으로 울타리 설치 가능     
수확 시, 행동하기 칸 및 라운드 칸 이용 불가

###  게임 종료
모든 유저에게 점수판 팝업

<br/>

## :scroll: 디자인 설계
  ### 아키텍쳐 디자인
  <img src="https://github.com/dslov89/Agricola/assets/71018440/84d24642-4e77-4fec-bb5a-ae39c2d8101f">
  
   데이터저장소가 중앙에 있어 다른 컨포넌트들이 데이터 수정하고 접근하기 쉬운 **Data Centered Architectures**를 따르고 있다
   
  <br/>
  
  
  ### 디렉터리 구조 
  
  ```
📦src
 ┣ 📂asset
 ┃ ┣ 📂job // 직업카드 이미지
 ┃ ┣ 📂main // 주요설비카드 이미지
 ┃ ┣ 📂sub // 보조설비카드 이미지
 ┣ 📂components
 ┃ ┣ 📜ActionBoard.css
 ┃ ┣ 📜ActionBoard.js // 액션 보드 게임 판 
 ┃ ┣ 📜CardBoard.js // 유저 보유 카드 창 
 ┃ ┣ 📜CardBoard.module.css
 ┃ ┣ 📜FarmBoard.css 
 ┃ ┣ 📜Farms.js // 각 유저 농장 
 ┃ ┣ 📜FarnBoard.js // 모든 유저 농장 
 ┃ ┣ 📜GameRoomBoard.css
 ┃ ┣ 📜GameRoomBoard.js // 게임방 입장 화면
 ┃ ┣ 📜MainModal.js // 주요 설비 카드 모달창
 ┃ ┣ 📜MainModal.module.css
 ┃ ┣ 📜ScoreBoard.js // 점수 계산 모달창
 ┃ ┣ 📜ScoreBoard.module.css
 ┃ ┣ 📜SubModal.js // 보조 설비 카드 모달창
 ┃ ┣ 📜SubModal.module.css
 ┃ ┣ 📜UserBoard.css
 ┃ ┣ 📜UserBoard.js // 각 유저 정보판
 ┃ ┗ 📜Users.js // 모든 유저 정보판 
 ┣ 📂image // 그 외 이미지 
 ┣ 📂screen // 화면 js
 ┃ ┣ 📜Error.js // 잘못된 URL 화면
 ┃ ┣ 📜first.css
 ┃ ┣ 📜Main.css 
 ┃ ┣ 📜Main.js // 게임 창 화면
 ┃ ┣ 📜Root.js
 ┃ ┗ 📜Start.js // 게임 준비 화면 
 ┣ 📂store // 데이터 저장 js
 ┃ ┣ 📜data-context.js // 공통 자원 데이터
 ┃ ┗ 📜user-context.js // 유저 자원 데이터 
 ┣ 📂utill
 ┃ ┗ 📜http.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
  ```

  
