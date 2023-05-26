import { useState } from "react";
import { ReactComponent as Board } from "../asset/roundCard.svg";
import "./ActionBoard.css";
import farmer from "../image/farmer.png";
import "./FarmBoard.css";
import axios from 'axios';
import { nameValue } from "../screen/Start";

import { ReactComponent as Land } from "../asset/land.svg";
import { ReactComponent as Fence } from "../asset/fence.svg";
import { ReactComponent as Grain } from "../asset/grain.svg";
import { ReactComponent as Sheep } from "../asset/sheep.svg";
import { ReactComponent as Facility } from "../asset/facility.svg";
import MainModal from "./MainModal";
import { sendingClient } from "./GameRoomBoard";

function ActionBoard({ data, setData }) {
  const [isTurn, setIsTurn] = useState(true);
  const [roundNum, setRoundNum] = useState(4);
  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [mainSulbi, setMainSulbi] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

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
    console.log("default");
  };

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
    console.log("accumulated");
  };

  //   덤블 버튼 클릭 시 실행할 함수
  function dumbleHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ['tree']
      const value = [1]
      accumulatedActHandler(item, value, 0);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   수풀 버튼 클릭 시 실행할 함수
  function bushHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ['tree']
      const value = [2]
      accumulatedActHandler(item, value, 1);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   자원 시장 버튼 클릭 시 실행할 함수
  function resourceHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      setData({ ...data, reed: data.reed + 1, rock: data.rock+1, food: data.food+1 });
      const item = ['reed', 'rock', 'food']
      const value = [1, 1, 1]
      defaultActHandler(item, value, 2)
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   점토 채쿨장 버튼 클릭 시 실행할 함수
  function clayHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ['clay']
      const value = [2]
      accumulatedActHandler(item, value, 3);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   교습 버튼 클릭 시 실행할 함수
  function teach1Handler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ['food']
      const value = [-2]
      defaultActHandler(item, value, 4);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   유랑극단 버튼 클릭 시 실행할 함수
  function theaterHandler(event) {
    if (isTurn) {
      const button = event.target;  
      const item = ['food'];
      const value = [1];
      accumulatedActHandler(item, value, 5);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  // 농장 확장 버튼 클릭 시 실행할 함수
  function farmExtendHandler(i) {
    // 내턴인지 확인
    if (isTurn && data.round_array[i] === 0) {
      const buttonClass1 = ".actionBtn2";
      const buttonClass2 = ".farmExtend";

      // 두 클래스를 합친 새로운 클래스
      const newClass = `${buttonClass1}${buttonClass2}`;
      const buttonsssss = document.querySelector(newClass);
      movePlayer(buttonsssss, i);

      setData((prevState) => {
        const newRoundArray = [...prevState.round_array];
        newRoundArray[i] = 1;

        const newPlayerArray = [...prevState.player_array];
        newPlayerArray[i] = 1;

        return {
          ...prevState,
          round_array: newRoundArray,
          player_array: newPlayerArray,
        };
      });

      //농부수 -1하기

      //자원 획득 api
      //  보조 설비 카드 api
    }
  }

  //   회합 장소 버튼 클릭 시 실행할 함수
  function spaceHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   곡식 종자 버튼 클릭 시 실행할 함수
  function grainHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ['seed']
      const value = [-2]
      defaultActHandler(item, value, 8);
      movePlayer(button, event);
      setData({ ...data, seed: data.seed + 1 });
      setIsTurn(false);
    }
  }

  //   농지 버튼 클릭 시 실행할 함수
  function farmlandHandler(i) {
    // 내턴인지 확인

    if (isTurn && data.round_array[i] === 0) {
      const buttonClass1 = ".actionBtn2";
      const buttonClass2 = ".clay";

      // 두 클래스를 합친 새로운 클래스
      const newClass = `${buttonClass1}${buttonClass2}`;
      const buttonsssss = document.querySelector(newClass);
      movePlayer(buttonsssss, i);

      setData((prevState) => {
        const newRoundArray = [...prevState.round_array];
        newRoundArray[i] = 1;

        const newPlayerArray = [...prevState.player_array];
        newPlayerArray[i] = 1;

        return {
          ...prevState,
          round_array: newRoundArray,
          player_array: newPlayerArray,
        };
      });
      
      //자원 획득 api
      //  보조 설비 카드 api
    }
    
  }

  //   교습2 버튼 클릭 시 실행할 함수
  function teach2Handler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ['food']
      const value = [-1]
      defaultActHandler(item, value, 10);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   날품팔이 버튼 클릭 시 실행할 함수
  function goodsHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ['food']
      const value = [2]
      defaultActHandler(item, value, 11)
      movePlayer(button, event);
      setData({ ...data, food: data.food + 1 });
      setIsTurn(false);
    }
  }

  //   숲 버튼 클릭 시 실행할 함수
  function forestHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ['tree']
      const value = [3]
      accumulatedActHandler(item, value, 12);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   흙 채굴장 버튼 클릭 시 실행할 함수
  function soilHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ['clay']
      const value = [1]
      accumulatedActHandler(item, value, 13);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //    갈대밭 버튼 클릭 시 실행할 함수
  function reedHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ['reed']
      const value = [1]
      accumulatedActHandler(item, value, 14);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   낚시 버튼 클릭 시 실행할 함수
  function fishingHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ['food']
      const value = [1]
      accumulatedActHandler(item, value, 15);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }
  function cardBtn1Handler() {
    setMainModalVisible(true);
  }
  function cardBtn2Handler() {
    console.log("보조설비");
  }

  //설비 클릭 시
  function facilityHandler() {}

  //울타리 클릭 시
  function fenceHandler() {}

  //곡식 활용 클릭 시
  function roundGrainHandler() {
    if(isTurn){
      console.log("123123123");
      setIsTurn(false);
    }

  }

  // 플레이어 이동
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

  //양 시장 클릭 시
  function sheepHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ['sheep']
      const value = [1]
      accumulatedActHandler(item, value, 19);
      setIsTurn(false);
    }
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
        onClick={() => farmExtendHandler(6)}
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
        onClick={() => farmlandHandler(9)}
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
      {mainModalVisible && (
        <MainModal setIsVisible={setMainModalVisible} mainSulbi={mainSulbi} />
      )}
      <div className="cardBtn2" onClick={cardBtn2Handler}></div>
      {roundNum >= 1 && (
        <Facility className="facilityBtn" onClick={facilityHandler} />
      )}
      {/* <Facility className="facilityBtn" /> */}
      {roundNum >= 2 && (
        <Grain className="facilityBtn2" onClick={roundGrainHandler} />
      )}
      {roundNum >= 3 && (
        <Fence className="facilityBtn3" onClick={fenceHandler} />
      )}
      {roundNum >= 4 && (
        <Sheep className="facilityBtn4" onClick={sheepHandler} />
      )}
    </div>
  );
}

export default ActionBoard;
