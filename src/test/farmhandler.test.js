import farmHandler from './farmcheck';

describe('farmHandler', () => {
    it('should handle farm reservation correctly', async () => {
      //기본 데이터 값
        const data = {
        farm: ["empty", "empty", "empty", "empty", "empty"],
        play_array: [1, 0, 0, 0, 0]
        };

        const setUserData = jest.fn(); // 가짜(setUserData) 함수 생성

        // 함수를 돌리고나서 예측결과랑 비교를 위해 만들었습니다.
        const expectedData = {
        farm: ["plow", "empty", "empty", "empty", "empty"],
        play_array: [0, 0, 0, 0, 0]
        };

        try {
            // farmHandler 호출 play_array 0번째 인덱스를 이용
            farmHandler(0, data, setUserData); // 첫 번째 어느 버튼을 눌렀는지
            expect(setUserData).toHaveBeenCalledWith(expectedData); // setUserData가 호출되었는지 확인
          } catch (error) {
            throw new Error("농지를 지을 수 없는 곳에 갔습니다..");
          }
    });
});