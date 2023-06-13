import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 

import MoveP from "./MoveP";

const defaultAction = [ // 행동하기 버튼 총 20개에 대한 정보
    0, 0, 0, 0, 0, // 덤블, 수풀 , ....
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0]; // [각 index : 각 버튼을 점거하고 있는 유저 index를 저장]

const testMoveP = (index, expectedStyle) => {
  let action = defaultAction;
  render(<MoveP index={index} Action = {action}/>); // MoveP 컴포넌트를 렌더링
  const btnElements = screen.getAllByTestId("btn");
  btnElements.forEach((btnElement) => {
    expect(btnElement).toBeInTheDocument();
    expect(btnElement).toHaveStyle(expectedStyle);  // expectedStyle에 해당하는 스타일을 가지고 있는지 확인
  });
};

describe("MoveP", () => {
  it("action[index] 값에 따라서 정상적으로 이미지가 반환되는지 확인", () => {
    let action2 = defaultAction;
    let myturn = true;
    action2[6] = 1; // 6번 인덱스에 해당하는 버튼을 1번 유저가 점거하고 있음
    action2[7] = 2; // 7번 인덱스에 해당하는 버튼을 2번 유저가 점거하고 있음
    action2[8] = 3; // 8번 인덱스에 해당하는 버튼을 3번 유저가 점거하고 있음
    action2[9] = 4; // 9번 인덱스에 해당하는 버튼을 4번 유저가 점거하고 있음
    const actionUserIndex = [1, 2, 3, 4, 10]; // 10은 존재하지 않는 유저 index임, 테스트를 위해 집어 넣음
    const expectedColors = [
      "red", // action[index]가 1인 경우
      "yellow", // action[index]가 2인 경우
      "green", // action[index]가 3인 경우
      "blue", // action[index]가 4인 경우
    ];
    const consoleWarn = console.warn;
    console.warn = jest.fn(); 
    actionUserIndex.forEach((userIndex, btnIndex) => {
      render(<MoveP index={btnIndex + 6} Action={action2} turn = {myturn} />);  
      if (userIndex <= 4 && userIndex > 0) {  // 정상적으로 유저 index가 들어온 경우(1,2,3,4)
        const btnElements = screen.getAllByTestId("btn");
        expect(btnElements[userIndex - 1]).toBeInTheDocument();
        expect(btnElements[userIndex - 1].innerHTML).toContain(expectedColors[userIndex - 1]);
      }
      else if(userIndex > 4 && userIndex < 1) { // 1,2,3,4 말고 다른 유저index가 들어온 경우
        expect(console.warn).toHaveBeenCalledWith(  // 10을 넣어서 
          "존재하지 않는 유저index입니다."            // 해당 경고가 발생하였음.
        );
      }
    });
    console.warn = consoleWarn;
  });

  it("index가 1 또는 5일 때, btnStyle2 스타일이 적용되는지 확인", () => {
    testMoveP(1, "width: 55px; height: 58px; top: 0px; left: 50px; position: absolute;");
    testMoveP(5, "width: 55px; height: 58px; top: 0px; left: 50px; position: absolute;");
  });

  it("index가 12 또는 14일 때, btnStyle3 스타일이 적용되는지 확인", () => {
    testMoveP(12, "width: 55px; height: 58px; top: 0px; left: 70px; position: absolute;");
    testMoveP(14, "width: 55px; height: 58px; top: 0px; left: 70px; position: absolute;");
  });

  it("그 외의 index에 대해서는 btnStyle 스타일이 적용되는지 확인", () => {
    testMoveP(19, "width: 55px; height: 58px; top: 0px; left: 0px; position: absolute;");
  });

  it("존재하지 않는 버튼 인덱스를 눌렀는지 확인 : 버튼 인덱스는 0~19까지만 존재하는데 예를들어, 20을 index로 주면 경고가 떠야함", () => {
    const consoleWarn = console.warn;
    console.warn = jest.fn(); 
    let action3 = defaultAction;
    render(<MoveP index={20} Action = {action3}/>); // 20번 버튼을 누르면 경고가 뜨는지 확인
    expect(console.warn).toHaveBeenCalledWith(
      "존재하지 않는 버튼 인덱스입니다."
    );
    console.warn = consoleWarn; 
  });

  it("중복된 인덱스를 눌렀는 지 확인 : 1, 2, 3 은 이미 선택된 index인데 또 1을 주면 경고가 떠야함", () => {
    const consoleWarn = console.warn;
    console.warn = jest.fn(); 
    let action4 = defaultAction;
    action4[1] = 1;  // 1번 버튼을 1 index의 유저가 점거 중
    action4[2] = 2;  // 2번 버튼을 2 index의 유저가 점거 중
    action4[3] = 3;  // 3번 버튼을 3 index의 유저가 점거 중
    render(<MoveP index={1} Action = {action4}/>);  // 이미 점거 중인 1번 버튼에 다시 접근하려는 시도
    expect(console.warn).toHaveBeenCalledWith(      // 경고창 발생
      "이미 다른 유저가 선택한 버튼입니다."
    );
    console.warn = consoleWarn; 
  });

});
