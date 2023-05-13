import { useState } from "react";
import { ReactComponent as Board } from "../asset/roundCard.svg";
import "./ActionBoard.css";

function ActionBoard({ data, setData }) {
  const [isTurn, setIsTurn] = useState(true);

  //   덤블 버튼 클릭 시 실행할 함수
  function dumbleHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setData({ ...data, tree: data.tree + 1 });
      console.log("hi");
      setIsTurn(false);
    }
  }

  //   수풀 버튼 클릭 시 실행할 함수
  function bushHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   자원 시장 버튼 클릭 시 실행할 함수
  function resourceHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   점토 채쿨장 버튼 클릭 시 실행할 함수
  function clayHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   교습 버튼 클릭 시 실행할 함수
  function teach1Handler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   유랑극단 버튼 클릭 시 실행할 함수
  function theaterHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   농장 확장 버튼 클릭 시 실행할 함수
  function farmExtendHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   회합 장소 버튼 클릭 시 실행할 함수
  function spaceHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   곡식 종자 버튼 클릭 시 실행할 함수
  function grainHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   농지 버튼 클릭 시 실행할 함수
  function farmlandHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   교습2 버튼 클릭 시 실행할 함수
  function teach2Handler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   날품팔이 버튼 클릭 시 실행할 함수
  function goodsHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   숲 버튼 클릭 시 실행할 함수
  function forestHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   흙 채굴장 버튼 클릭 시 실행할 함수
  function soilHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //    갈대밭 버튼 클릭 시 실행할 함수
  function reedHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }

  //   낚시 버튼 클릭 시 실행할 함수
  function fishingHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setIsTurn(false);
    }
  }
  function cardBtn1Handler() {
    console.log("주요설비");
  }
  function cardBtn2Handler() {
    console.log("보조설비");
  }

  return (
    <div className="boardContainer">
      <Board className="round" />
      {/* 덤블 버튼 */}
      <div className="actionBtn dumble" onClick={dumbleHandler}></div>
      {/* 수풀 버튼 */}
      <div className="actionBtn bush" onClick={bushHandler}></div>
      {/* 자원 시장 버튼 */}
      <div className="actionBtn resource" onClick={resourceHandler}></div>
      {/* 점토 채굴장 버튼 */}
      <div className="actionBtn clay" onClick={clayHandler}></div>
      {/* 교습1 버튼 */}
      <div className="actionBtn teach1" onClick={teach1Handler}></div>
      {/* 유랑극당 버튼 */}
      <div className="actionBtn theater" onClick={theaterHandler}></div>
      {/* 농장 확장 버튼 */}
      <div
        className="actionBtn actionBtn2 farmExtend"
        onClick={farmExtendHandler}
      ></div>
      {/* 회합 장소 버튼 */}
      <div
        className="actionBtn   actionBtn2 space"
        onClick={spaceHandler}
      ></div>
      {/* 곡식 종자 버튼 */}
      <div className="actionBtn  actionBtn2 grain" onClick={grainHandler}></div>
      {/* 농지 버튼 */}
      <div
        className="actionBtn  actionBtn2  clay"
        onClick={farmlandHandler}
      ></div>
      {/* 교습2 버튼 */}
      <div
        className="actionBtn actionBtn2  teach1"
        onClick={teach2Handler}
      ></div>
      {/* 날품팔이 버튼 */}
      <div
        className="actionBtn actionBtn2  theater"
        onClick={goodsHandler}
      ></div>
      {/* 숲 버튼 */}
      <div
        className="actionBtn  actionBtn3 forest"
        onClick={forestHandler}
      ></div>
      {/* 흙 채굴장 버튼 */}
      <div className="actionBtn  actionBtn3  clay" onClick={soilHandler}></div>
      {/* 갈대밭 버튼 */}
      <div className="actionBtn actionBtn3  teach1" onClick={reedHandler}></div>
      {/* 낚시 버튼 */}
      <div
        className="actionBtn actionBtn3  theater"
        onClick={fishingHandler}
      ></div>
      <div className="cardBtn1" onClick={cardBtn1Handler}></div>
      <div className="cardBtn2" onClick={cardBtn2Handler}></div>
    </div>
  );
}

export default ActionBoard;
