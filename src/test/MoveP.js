import React from "react";

export default function MoveP({index, Action, turn}) { // index : 버튼의 index, Action : 행동하기 버튼 총 20개에 대한 정보, turn : 현재 내 턴인지

    let actionArray = Action;

    const dumbleHandler = () => {
        //덤블 버튼 클릭 시 실행되는 내용
    }
    const checkOtherPlayer = (index) => { // 버튼 점거 중인 유저의 index에 맞게 색깔을 반환( 원래는 img반환하는데 테스팅을 위해 문자열로 대체 )

      if (actionArray[index] === 1) {
        return "red";
      } else if (actionArray[index] === 2) {
        return "yellow";
      } else if (actionArray[index] === 3) {
        return "green";
      } else if (actionArray[index] === 4) {
        return "blue";
      }
      else if(actionArray[index] > 4 && actionArray[index] < 1)    // 존재하지 않는 유저 index가 올 시 경고 메시지 출력
        console.warn("존재하지 않는 유저index입니다.");
    };

  const btnStyle = {    // 버튼의 위치를 지정하기 위한 style
    width: "55px",
    height: "58px",
    top: "0px",
    left: "0px",
    position: "absolute"
  };

  const btnStyle2 = {
    width: "55px",
    height: "58px",
    top: "0px",
    left: "50px",
    position: "absolute"
  };

  const btnStyle3 = {
    width: "55px",
    height: "58px",
    top: "0px",
    left: "70px",
    position: "absolute"
  };

  const moveOtherPlayer = (index) => {  // 버튼 index에 맞는 style을 부여하고 점거 중인 유저의 index에 맞는 색깔을 반환
    if (Action[index] !== 0 && (index >= 0 && index <= 19) && turn !== true) {   // 다른 유저가 선택한 버튼을 클릭 시 경고 메시지 출력
      console.warn("이미 다른 유저가 선택한 버튼입니다.");
      return "";
    }     
    if (index < 0 || index > 19) {  // 존재하지 않는 버튼 index가 올 시 경고 메시지 출력
      console.warn("존재하지 않는 버튼 인덱스입니다.");
      return "";
    }
    else if (index === 1 || index === 5)  // 버튼 index에 맞는 style을 부여
      return (
        <div style={btnStyle2} data-testid="btn">
          {checkOtherPlayer(index)}
        </div>
      );
    else if (index === 12 || index === 14)
      return (
        <div style={btnStyle3} data-testid="btn">
          {checkOtherPlayer(index)}
        </div>
      );
    else
      return (
        <div style={btnStyle} data-testid="btn">
          {checkOtherPlayer(index)}
        </div>
      );
  };

  return (  // 버튼 클릭 시 실행되는 내용
    <div className="actionBtn dumble" onClick={dumbleHandler}>
      {moveOtherPlayer(index)}
    </div>
  );
}
