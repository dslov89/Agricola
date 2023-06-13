import {
  make_room,
  upgrade_soil,
  upgrade_rock,
  rock,
} from "./2018045623_method";

describe("make_room", () => {
  it('해당하는 인덱스의 값이 "empty"이고, 해당하는 인덱스를 기준으로 상하좌우에 방이 있을 경우, 보유한 나무 수가 5개 이상, 보유한 갈대 수가 2개 이상 조건을 토대로 해당하는 인덱스에 "wood_room" 설치 가능 여부', () => {
    const index = 11;
    //해당하는 인덱스 값
    //5와 10은 index가 될 수 없다. 왜냐하면 게임판에서 기본적으로 5번과 10번 인덱스에는 나무방이 지어져 있기 때문에 5번과 10번을 제외한 다른 인덱스 번호로 테스트 해야 함
    const data = {
      player_array: [0, 0, 0, 0, 0, 0, 1],
      //농장 확장 버튼을 누르면 player_array의 6번 인덱스가 1로 바뀜, 즉 테스트 시에는 항상 농장 확장 버튼을 눌렀다고 가정하기 위해 player_array는 고정
      farm: [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "wood_room",
        "empty",
        "empty",
        "empty",
        "empty",
        "wood_room",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      //make_room의 테스트에서는 farm 배열의 값 고정 (게임판 형식에 맞췄기 때문)
      tree: 5,
      //보유한 나무 개수
      reed: 2,
      //보유한 갈대 개수
    };

    make_room(index, { data });
    //make_room 함수 호출
    expect(data.tree).toBeGreaterThanOrEqual(0);
    //보유한 나무 개수 - 5를 한 것이 0보다 크거나 같다
    expect(data.reed).toBeGreaterThanOrEqual(0);
    //보유한 갈대 개수 - 2를 한 것이 0보다 크거나 같다
    expect(data.farm[index]).toBe("wood_room");
    //해당하는 index가 "wood_room"으로 업그레이드 조건 충족 시 data.farm[index]가 "empty"에서 "wood_room"으로 변경됨
    //farm배열의 index번 인덱스의 값이 "wood_room"과 같은 지 확인(객체도 확인)
  });
});

describe("upgrade_soil", () => {
  it('해당하는 인덱스의 값이 "wood_room"이고 보유한 흙이 5개 이상, 보유한 갈대가 2개 이상 조건을 토대로 해당하는 인덱스에 "soil_room"으로 업그레이드 가능 여부', () => {
    const index = 1;
    //해당하는 인덱스 값
    const data = {
      player_array: [0, 0, 0, 0, 0, 0, 1],
      //농장 확장 버튼을 누르면 player_array의 6번 인덱스가 1로 바뀜, 즉 테스트 시에는 항상 농장 확장 버튼을 눌렀다고 가정하기 위해 player_array는 고정
      farm: [
        "wood_room",
        "wood_room",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      clay: 5,
      //보유한 흙 개수
      reed: 2,
      //보유한 갈대 개수
    };

    upgrade_soil(index, { data });
    //upgrade_soil 함수 호출
    expect(data.clay).toBeGreaterThanOrEqual(0);
    //보유한 흙 개수 - 5를 한 것이 0보다 크거나 같다
    expect(data.reed).toBeGreaterThanOrEqual(0);
    //보유한 갈대 개수 - 2를 한 것이 0보다 크거나 같다
    expect(data.farm[index]).toBe("soil_room");
    //해당하는 index가 "soil_room"으로 업그레이드 조건 충족 시 data.farm[index]가 "wood_room"에서 "soil_room"으로 변경됨
    //farm배열의 index번 인덱스의 값이 "soil_room"과 같은 지 확인(객체도 확인)
  });
});

describe("upgrade_rock", () => {
  it('해당하는 인덱스의 값이 "soil_room"이고 보유한 돌이 5개 이상, 보유한 갈대가 2개 이상 조건을 토대로 해당하는 인덱스에 "rock_room"으로 업그레이드 가능 여부', () => {
    const index = 0;
    //해당하는 인덱스 값
    const data = {
      player_array: [0, 0, 0, 0, 0, 0, 1],
      //농장 확장 버튼을 누르면 player_array의 6번 인덱스가 1로 바뀜, 즉 테스트 시에는 항상 농장 확장 버튼을 눌렀다고 가정하기 위해 player_array는 고정
      farm: [
        "soil_room",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      rock: 5,
      //보유한 돌 개수
      reed: 2,
      //보유한 갈대 개수
    };
    upgrade_rock(index, { data });
    //upgrade_rock 함수 호출
    expect(data.rock).toBeGreaterThanOrEqual(0);
    //보유한 돌 개수 - 5를 한 것이 0보다 크거나 같다
    expect(data.reed).toBeGreaterThanOrEqual(0);
    //보유한 갈대 개수 - 2를 한 것이 0보다 크거나 같다
    expect(data.farm[index]).toBe("rock_room");
    //해당하는 index가 "rock_room"으로 업그레이드 조건 충족 시 data.farm[index]가 "soil_room"에서 "rock_room"으로 변경됨
    //farm배열의 index번 인덱스의 값이 "rock_room"과 같은 지 확인(객체도 확인)
  });
});

describe("rock", () => {
  it('해당하는 인덱스의 값이 "rock_room"일 경우 업그레이드가 불가하므로 경고 창 띄우는 지 여부 확인', () => {
    const index = 0;
    //해당하는 인덱스 값
    const data = {
      player_array: [0, 0, 0, 0, 0, 0, 1],
      //농장 확장 버튼을 누르면 player_array의 6번 인덱스가 1로 바뀜, 즉 테스트 시에는 항상 농장 확장 버튼을 눌렀다고 가정하기 위해 player_array는 고정
      farm: [
        "rock_room",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      rock: 5,
      //보유한 돌 개수
      reed: 2,
      //보유한 갈대 개수
    };
    const alertMock = jest.fn();
    //가짜 함수 alertMock 생성
    global.alert = alertMock;
    //전역 개체의 alert 속성에 alertMock 값을 할당
    rock(index, { data });
    //rock 함수 호출
    expect(alertMock).toHaveBeenCalledWith("더 이상 업그레이드 불가 합니다.");
    //"더 이상 업그레이드 불가 합니다."인수로 alertMock 함수가 한 번 이상 호출되었는 지 확인
  });
});
