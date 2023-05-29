# 현재 한 것
slack에 올라 온 수정 사항 (1,2,3,4 번)

1번 입장하기 눌렀을때 웹소켓 버튼 눌러서 연결되고 각 방 만들때는 입장하기만 있는게 좋을거 같음 >> 완료

2번 처음에 게임방 나오는 화면에 접속했을때 내가 그냥 id없이 get으로 /game-rooms하면 현재 있는 모든 게임방 불러옴 그거로 접속하자 마자 이미 만들어져 있는 게임방을 불러와야함 >> 완료

3번 roomId는 front에서 값을 저장하는게 아니라 rest api 사용하면 내가 Request로 그 게임방 id 보낼꺼임 그럼 그거로 id값 설정해주게 로직 바꿔야함 >> 완료

4번 그리고 이제 inituser하면 사람수에 맞게 turn response로 보내니까 그거 기반으로 turn 저장해주면 될거 같음 >> turn 로컬 스토리지에 저장 까지는 했음.

UUID 받아서 로컬 스토리지에 저장함. 나중에 같이 보내주면 될 듯?

# 해야 할 것

send 할 때 Dto랑 이름 맞추기


# 수정 및 추가한 코드(큰 것만)

GameRoomApi.java
    @PostMapping()
    public String createGameRoom(){
        Long gameRoomID = gameRoomService.createGameRoom();
        <!-- return gameRoomID + "is created"; -->
        return String.valueOf(gameRoomID);
    }
게임룸 자릿수가 2가 넘는 ID(ex. 10, 21 ...) 받아오기 용이하게 하기 위해 수정하였음.
---

