//농장 버튼을 클릭시 index와 개개인의 data와 가짜함수 setuserdata를 가져옴
function farmHandler(index, data, setUserData) {
  let isTurn = true; // 자신의 턴일때 이며, 웹상에서는 sockjs로 구성
  if (isTurn && data.play_array[index]===1) {
    // 비어있을 때만 농지를 갈 수 있다.
    if (data.farm[index] !== "empty") {
      alert("해당 방은 이미 예약되어 있습니다.");
      console.log("해당 방은 이미 예약되어 있습니다");
    } else {// css에서 선택한 버튼의 위치를 찾습니다
      const roomClass = `.Btn.room${Math.floor(index / 5) + 1}_${
        (index % 5) + 1
      }`;
      // 사용자의 데이터를 불러옵니다
      // 농장의 index를 plow로 바꿔줍니다
      const updatedUserData = { ...data };
      updatedUserData.farm[index] = "plow";
      //행동을 하지 않게 하기위해 0으로 바꾸는 작업입니다.
      updatedUserData.play_array[index] = 0;
      // 데이터를 업데이트 합니다.
      setUserData(updatedUserData);
      //종료
      isTurn = false;
      console.log("isTurn:", isTurn);

    };
  };
};

export default farmHandler;
