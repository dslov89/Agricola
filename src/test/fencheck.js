//농장 버튼을 클릭시
function farmHandler(index, data, setUserData) {
  let isTurn = true;
  //규칙이있다고 생각해서 했습니다.
  //count는 fence라고 명시된 타일의 수
  // SequenceCount 떨어져있는 방의 수
  const getFenceCount = (count, SequenceCount) => {
    return 2 * count + 2 * SequenceCount;
  };

  const dx = [1, -1, 5, -5]; // 상하좌우로 연결된 방을 확인하기 위한 오프셋 배열

  //울타리의 연속된게 몇개인지 계산해주는 함수입니다.
  const checkFenceSequence = (farm, indexSequence, count_ul) => {
    if (count_ul === 0) {
      return 0;
    } else {
      let visited = new Set();
      let count = 0;
      //dfs를 이용해서 연결되어있는 애들을 1로 처리했습니다.
      const dfs = (index) => {
        if (index < 0 || index >= farm.length) {
          return;
        }
  
        if (farm[index] !== "fence" || visited.has(index)) {
          return;
        }
  
        visited.add(index);
  
        for (let i = 0; i < dx.length; i++) {
          const nextIndex = index + dx[i];
  
          dfs(nextIndex);
        }
      };
  
      for (let i = 0; i < indexSequence.length; i++) {
        const index = indexSequence[i];
  
        if (visited.has(index)) {
          continue;
        } else {
          count += 1;
          dfs(index);
        }
      }
      // 총 연속되지 않은 것이 몇개인지 return합니다.
      return count;
    }
  };
  //자신의 턴이면서 울타리 라운드카드에 간 경우
  if (isTurn && data.play_array[index]===1) {
    // 비어있거나 외양간만 지을 수 있습니다.
    if (data.farm[index] === "empty" || data.farm[index] === "house") {
      //비어있거나 외양간만 있을 때 지을 수 있음
      const pre_indexSequence = [];
      // farm 배열 순회 fence의 인덱스 번호를 저장합니다.
      for (let i = 0; i < data.farm.length; i++) {
        if (data.farm[i] === "fence") {
          pre_indexSequence.push(i);
        }
      }
      // 클릭한 방의 인덱스를 fence로 바꿔줌 
      let pre_count_ul = data.farm.filter((item) => item === "fence").length;
      //이전에 있던 방의 수를 제외하기 위해 카운드를 센다
      let pre_x = getFenceCount(
        pre_count_ul,
        checkFenceSequence(data.farm, pre_indexSequence, pre_count_ul)
      );
      //
      const newData = Object.assign({}, data, { tree: data.tree });
      // farm의 index를 fence로 바꿔줌
      newData.farm[index] = "fence";

      const indexSequence = [];
      // farm 배열 순회
      for (let i = 0; i < data.farm.length; i++) {
        if (newData.farm[i] === "fence") {
          indexSequence.push(i);
        }
      }
      //현재 사용자가 건설하는 울타리 수와 이전 울타리 전체를 센다
      let count_ul = newData.farm.filter((item) => item === "fence").length;
      let x = getFenceCount(
        count_ul,
        checkFenceSequence(newData.farm, indexSequence, count_ul)
      );
      //모든 울타리 수에서 이전에 가지고 있던 울타리 수를 빼준다
      if (data.tree >= x - pre_x) {
        if (index >= 0 && index <= 4) {
          //css에 적용을 하기위해 이름을 1-> 01 로 바꿔주기 위함입니다.
          const formattedIndex = (index + 1).toString().padStart(2, "0");
          const formattedIndex1 = (index + 2).toString().padStart(2, "0");
          const fenceElement1 = document.querySelector(
            `.fence.fenceRow1.fenceRow${formattedIndex}`
          );
          const fenceElement2 = document.querySelector(
            `.fenceCol.fenceCol1.fenceCol${formattedIndex}`
          );
          const fenceElement3 = document.querySelector(
            `.fence.fenceRow2.fenceRow${formattedIndex}`
          );
          const fenceElement4 = document.querySelector(
            `.fenceCol.fenceCol1.fenceCol${formattedIndex1}`
          );
          // 선택한 방의 주변에 모두 울타리를 치기위함입니다.
          //  울타리 배열에 없으면 1, 있으면 0으로 한다.
          if (data.farm_fence[0][index] === 1) {
            newData.farm_fence[0][index] = 0;
          } else if (data.farm_fence[0][index] === 0) {
            newData.farm_fence[0][index] = 1;
          }

          if (data.farm_fence[1][index] === 1) {
            newData.farm_fence[1][index] = 0;
          } else if (data.farm_fence[1][index] === 0) {
            newData.farm_fence[1][index] = 1;
          }

          if (data.farm_fence[2][index] === 1) {
            newData.farm_fence[2][index] = 0;
          } else if (data.farm_fence[2][index] === 0) {
            newData.farm_fence[2][index] = 1;
          }

          if (data.farm_fence[1][index + 1] === 1) {
            newData.farm_fence[1][index + 1] = 0;
          } else if (data.farm_fence[1][index + 1] === 0) {
            newData.farm_fence[1][index + 1] = 1;
          }
          // data의 자원인 나무를 갱신해줍니다.
          newData.tree -= x - pre_x;
          //데이터를 업데이트 해줍니다.
          setUserData(newData);
        };
        //자원이 없으면 자원부족이라는 내용을 알려줍니다.
      } else {
        console.log("자원부족");
      };
    };
          
  };
};
  
export default farmHandler;
  