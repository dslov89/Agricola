import farmHandler from './fencheck';

describe('farmHandler', () => {
  it('should handle farm reservation correctly', async () => {
    // 초기 데이터 설정
    const data = {
      farm: ["fence", "empty", "empty", "empty", "empty"],
      play_array: [0, 1, 1, 0, 1],
      tree: 15,
      farm_fence: [
        [1, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0]
      ]
    };

    // 가짜(setUserData) 함수 생성
    const setUserData = jest.fn();
    
    //1번째 인덱스로 함수를 돌리고 newdate는 예측 값
    farmHandler(1, data, setUserData); 

    const newData = {
      farm: ["fence", "fence", "empty", "empty", "empty"],
      play_array: [0, 1, 1, 0, 1],
      tree: 13, 
      farm_fence: [
        [1, 1, 0, 0, 0, 0], // 0번째줄 가로
        [1, 0, 1, 0, 0, 0], // 1번째줄 세로
        [1, 1, 0, 0, 0, 0]
      ]
    };
    expect(setUserData).toHaveBeenCalledWith(newData); //호출 결과 비교
    
    farmHandler(4, newData, setUserData); 
    //4번째 인덱스로 함수를 돌리고 newdate2는 예측 값
    const newData2 = {
      farm: ["fence", "fence", "empty", "empty", "fence"],
      play_array: [0, 1, 1, 0, 1],
      tree: 9, 
      farm_fence: [
        [1, 1, 0, 0, 1, 0], // 0번째줄 가로
        [1, 0, 1, 0, 1, 1], // 1번째줄 세로
        [1, 1, 0, 0, 1, 0]
      ]
    };
    expect(setUserData).toHaveBeenCalledWith(newData2); //호출 결과 비교

  });
});