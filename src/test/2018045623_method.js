export function make_room(index, { data }) {
  if (data.player_array[6] === 1) {
    //농장 확장 버튼을 눌렀을 때
    const dx = [1, -1, 5, -5];
    //상하좌우 판단
    let i = 0;
    //dx 배열을 참조하기 위한 변수 i 선언
    if (data.farm[index] === "empty") {
      //유저가 클릭한 곳에 방이 없을 경우
      //wood room 하나 지어줌
      if (data.tree >= 5 && data.reed >= 2) {
        //보유한 나무 수가 5개 이상이고 보유한 갈대 수가 2개 이상이면
        for (i = 0; i < 4; i++) {
          //상하좌우 판단
          if (index + dx[i] < 0 || index + dx[i] > 14) {
            //해당하는 인덱스의 상하좌우 칸 중 배열의 크기를 벗어나면
            continue;
            //무시
          }
          if (index === 4 || index === 9) {
            if (index === 4) {
              //인덱스 4인 경우
              if (dx[i] === -1 || dx[i] === 5) {
                //인덱스 4는 1행에 있고, 인덱스 5는 2행에 있기 때문에 dx[i] === 1인 경우는 고려해주면 안됨
                if (
                  data.farm[index + dx[i]] === "wood_room" ||
                  data.farm[index + dx[i]] === "soil_room" ||
                  data.farm[index + dx[i]] === "rock_room"
                ) {
                  //인덱스의 상하좌우 칸에 wood_room / soil_room / rock_room 이 있다면, 즉 인덱스의 상하좌우 칸에 방이 있다면
                  data.tree = data.tree - 5;
                  //보유한 나무 수에서 5 빼주기
                  data.reed = data.reed - 2;
                  //보유한 갈대 수에서 2 빼주기
                  data.farm[index] = "wood_room";
                  //해당하는 인덱스의 값을 wood_room으로 갱신해줌
                  break;
                  //농장 확장 한 번 클릭 시 한 번의 작업만 하므로 해당하는 인덱스의 값을 wood_room으로 갱신해주고 반복 문 빠져나옴
                  //
                }
              }
            } else if (index === 9) {
              //인덱스 9인 경우
              if (dx[i] === -1 || dx[i] === -5 || dx[i] === 5) {
                //인덱스 9는 2행에 있고, 인덱스 10는 3행에 있기 때문에 dx[i] === 1인 경우는 고려해주면 안됨
                if (
                  data.farm[index + dx[i]] === "wood_room" ||
                  data.farm[index + dx[i]] === "soil_room" ||
                  data.farm[index + dx[i]] === "rock_room"
                ) {
                  //인덱스의 상하좌우 칸에 wood_room / soil_room / rock_room 이 있다면, 즉 인덱스의 상하좌우 칸에 방이 있다면
                  data.tree = data.tree - 5;
                  //보유한 나무 수에서 5 빼주기
                  data.reed = data.reed - 2;
                  //보유한 갈대 수에서 2 빼주기
                  data.farm[index] = "wood_room";
                  //해당하는 인덱스의 값을 wood_room으로 갱신해줌
                  break;
                  //농장 확장 한 번 클릭 시 한 번의 작업만 하므로 해당하는 인덱스의 값을 wood_room으로 갱신해주고 반복 문 빠져나옴
                }
              }
            }
          } else {
            //인덱스 4와 9가 아닌 모든 경우
            if (
              data.farm[index + dx[i]] === "wood_room" ||
              data.farm[index + dx[i]] === "soil_room" ||
              data.farm[index + dx[i]] === "rock_room"
            ) {
              //인덱스의 상하좌우 칸에 wood_room / soil_room / rock_room 이 있다면, 즉 인덱스의 상하좌우 칸에 방이 있다면
              data.tree = data.tree - 5;
              //보유한 나무 수에서 5 빼주기
              data.reed = data.reed - 2;
              //보유한 갈대 수에서 2 빼주기
              data.farm[index] = "wood_room";
              //해당하는 인덱스의 값을 wood_room으로 갱신해줌
              break;
              //농장 확장 한 번 클릭 시 한 번의 작업만 하므로 해당하는 인덱스의 값을 wood_room으로 갱신해주고 반복 문 빠져나옴
            }
          }
        }
      }
    } else if (data.tree < 5 || data.reed < 2) {
      //보유한 나무 수가 5개 미만 이거나 보유한 갈대 수가 2개 미만인 경우
      data.farm[index] = "empty";
      //해당하는 인덱스 칸을 empty로 설정, 즉 방을 못 짓게 됨
    }
  }
}
export function upgrade_soil(index, { data }) {
  if (data.player_array[6] === 1) {
    //농장 확장 버튼을 눌렀을 때
    if (data.farm[index] === "wood_room") {
      //유저가 클릭한 방이 나무 방인 경우
      if (data.clay >= 5 && data.reed >= 2) {
        //보유한 흙 수가 5개 이상이고 보유한 갈대 수가 2개 이상인 경우
        data.clay = data.clay - 5;
        //보유한 흙 수에서 5 빼주기
        data.reed = data.reed - 2;
        //보유한 갈대 수에서 2 빼주기
        data.farm[index] = "soil_room";
        //해당하는 인덱스의 값을 soil_room으로 갱신해줌
      }
    } else if (data.clay < 5 || data.reed < 2) {
      //보유한 흙 수가 5개 미만이거나 보유한 갈대 수가 2개 미만인 경우
      data.farm[index] = "wood_room";
      //해당하는 인덱스 칸을 wood_room으로 설정, 즉 흙 방을 못 짓게 됨
    }
  }
}
export function upgrade_rock(index, { data }) {
  if (data.player_array[6] === 1) {
    //농장 확장 버튼을 눌렀을 때
    if (data.farm[index] === "soil_room") {
      //해당하는 인덱스의 값이 soil_room일 경우
      if (data.rock >= 5 && data.reed >= 2) {
        //보유한 돌 수가 5개 이상이고 보유한 갈대 수가 2개 이상인 경우
        data.rock = data.rock - 5;
        //보유한 돌 수에서 5 빼 주기
        data.reed = data.reed - 2;
        //보유한 갈대 수에서 2 빼 주기
        data.farm[index] = "rock_room";
        //해당하는 인덱스의 값을 rock_room으로 갱신해줌
      } else if (data.rock < 5 || data.reed < 2) {
        //보유한 돌 수가 5개 미만 이거나 보유한 갈대 수가 2개 미만인 경우
        data.farm[index] = "soil_room";
        //해당하는 인덱스 칸을 soil_room으로 설정, 즉 돌 방을 못 짓게 됨
      }
    }
  }
}
export function rock(index, { data }) {
  if (data.player_array[6] === 1) {
    //농장 확장 버튼을 눌렀을 때
    if (data.farm[index] === "rock_room") {
      //해당하는 인덱스의 값이 rock_room일 경우
      alert("더 이상 업그레이드 불가 합니다.");
      //업그레이드가 불가능 하다는 정보를 가진 경고 창 띄워 줌
    }
  }
}